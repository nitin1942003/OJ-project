import User from "../models/user.js";

const saveCode = async (req, res) => {
    const { code, problemId } = req.body;
    const userId = req.user; // Get user ID from authenticated user

    if (!code || !problemId) {
        return res.status(400).json({ success: false, message: "Missing code or problemId" });
    }

    try {
        // Check if the problem exists in the user's `solvedProblems` array
        const user = await User.findOne({ _id: userId });

        // If the user doesn't have the problem in their `solvedProblems` array, add it
        const existingProblem = user?.solvedProblems.find((p) => p.problemId.toString() === problemId);

        if (existingProblem) {
            // Update the code for the existing problem
            await User.findOneAndUpdate(
                { _id: userId, "solvedProblems.problemId": problemId },
                {
                    $set: { "solvedProblems.$.code": code }
                },
                { new: true } // Return the updated document
            );
        } else {
            // Add a new entry for the problem
            await User.findOneAndUpdate(
                { _id: userId },
                {
                    $push: {
                        solvedProblems: {
                            problemId,
                            code, // Save the submitted code
                            status: 'A', // Default status for unsolved problems
                            testCasesPassed: 0,
                            totalTestCases: 0
                        }
                    }
                },
                { new: true } // Return the updated document
            );
        }

        res.status(200).json({ success: true, message: "Code saved successfully" });
    } catch (error) {
        console.error("Error saving code:", error);
        res.status(500).json({ success: false, message: "Failed to save code", error: error.message });
    }
};

export default saveCode;
