import generateFile from "../helpers/generateFile.js";
import processTestCase from "../helpers/processTestCase.js";
import Problem from "../models/problem.js";
import User from "../models/user.js"; // Import the User model

const judge = async (req, res) => {
    const { language = 'cpp', code, problemId } = req.body;
    const userId = req.user; // Get userId from authenticated user

    if (!code) {
        return res.status(400).json({ success: false, message: "Empty code" });
    }

    try {
        // Fetch the problem from the database
        const problem = await Problem.findById(problemId);
        if (!problem) {
            return res.status(404).json({ success: false, message: "Problem not found" });
        }

        // Generate the code file
        const codeFilePath = await generateFile(language, code);
        console.log(`Generated code file at: ${codeFilePath}`);

        // Process each test case
        const results = [];
        let totalTestCases = problem.testCases.length;
        let testCasesPassed = 0;

        for (const testCase of problem.testCases) {
            const { input, expectedOutput } = testCase;
            const result = await processTestCase(language, codeFilePath, input, expectedOutput);
            results.push(result);
            if (result.isCorrect) {
                testCasesPassed += 1;
            }
        }

        // Determine overall success
        const success = testCasesPassed === totalTestCases;

        // Attempt to update the existing problem status
        const updateUser = await User.findOneAndUpdate(
            { _id: userId, "solvedProblems.problemId": problemId },
            {
                $set: {
                    "solvedProblems.$.status": success,
                    "solvedProblems.$.testCasesPassed": testCasesPassed,
                    "solvedProblems.$.totalTestCases": totalTestCases
                }
            },
            { 
                new: true // Return the updated document
            }
        );

        // If the problem wasn't already in solvedProblems, add it
        if (!updateUser) {
            await User.findOneAndUpdate(
                { _id: userId },
                {
                    $push: {
                        solvedProblems: {
                            problemId,
                            status: success,
                            testCasesPassed,
                            totalTestCases
                        }
                    }
                }
            );
        }

        res.json({ success, codeFilePath, results });
    } catch (error) {
        console.error('Error in judge function:', error);
        res.status(500).json({ success: false, message: "An error occurred", error: error.message });
    }
};


export default judge;
