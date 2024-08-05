import generateFile from "../helpers/generateFile.js";
import processTestCase from "../helpers/processTestCase.js";
import Problem from "../models/problem.js";

const judge = async (req, res) => {
    const { language = 'cpp', code, problemId } = req.body;

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

        // Process each test case
        const results = [];
        for (const testCase of problem.testCases) {
            const { input, expectedOutput } = testCase;
            const result = await processTestCase(language, codeFilePath, input, expectedOutput);
            results.push(result);
        }

        // Determine overall success
        const success = results.every(result => result.isCorrect);
        res.json({ success, codeFilePath, results });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "An error occurred", error: error.message });
    }
};

export default judge;
