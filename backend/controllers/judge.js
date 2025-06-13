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
        const status = success ? 'P' : 'F';

        // Update user's solved problems
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if the problem is already in the solvedProblems array
        const existingProblem = user.solvedProblems.find((p) => p.problemId.equals(problemId));

        if (existingProblem) {
            // Update the existing entry
            existingProblem.status = status;
            existingProblem.testCasesPassed = testCasesPassed;
            existingProblem.totalTestCases = totalTestCases;
            existingProblem.code = code;
        } else {
            // Add a new entry to the solvedProblems array
            user.solvedProblems.push({
                problemId,
                status,
                testCasesPassed,
                totalTestCases,
                code,
            });
        }

        // Save the user document
        await user.save();

        res.json({ success, codeFilePath, results });
    } catch (error) {
        console.error('Error in judge function:', error);
        res.status(500).json({ success: false, message: "An error occurred", error: error.message });
    }
};

export default judge;
