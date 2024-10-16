import Problem from '../models/problem.js';
import User from '../models/user.js'; // Import the User model

// Get all problems (Do not send test cases in the response)
export const getProblems = async (req, res) => {
    try {
        // Exclude test cases from the response
        const problems = await Problem.find().select('-testCases');
        res.json(problems);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Get a single problem with an id (Do not send test cases in the response)
export const getProblem = async (req, res) => {
    try {
        // Exclude test cases from the response
        const problem = await Problem.findById(req.params.id).select('-testCases');
        if (!problem) {
            return res.status(404).send('Problem not found');
        }
        res.json(problem);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Get problems created by the authenticated user (Do not send test cases in the response)
export const getUserProblems = async (req, res) => {
    const userId = req.user; // Get userId from the request

    try {
        // Exclude test cases from the response
        const problems = await Problem.find({ userId: userId }).select('-testCases');
        res.json(problems);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Create a new problem
export const createProblem = async (req, res) => {
    let { title, description, testCases } = req.body;
    const userId = req.user;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    if (typeof testCases === 'string') {
        testCases = JSON.parse(testCases);
    }

    try {
        // Create the new problem
        const newProblem = new Problem({ title, description, testCases, userId });
        const problem = await newProblem.save();
        res.status(201).json({ message: 'Problem created successfully' }); // Do not return the problem with test cases
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Update a problem
export const updateProblem = async (req, res) => {
    const { id } = req.params;
    let { title, description, testCases } = req.body;
    const userId = req.user;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    if (typeof testCases === 'string') {
        testCases = JSON.parse(testCases);
    }

    try {
        const problem = await Problem.findById(id);

        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }

        // Check if the user is the creator
        if (problem.userId.toString() !== userId) {
            return res.status(403).json({ message: 'Forbidden: You are not the owner of this problem' });
        }

        // Update the problem's title, description, and test cases
        problem.title = title || problem.title;
        problem.description = description || problem.description;
        problem.testCases = testCases || problem.testCases;

        await problem.save();

        res.json({ message: 'Problem updated successfully' }); // Do not return the updated problem with test cases
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Delete a problem
export const deleteProblem = async (req, res) => {
    const { id } = req.params;
    const userId = req.user;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const problem = await Problem.findById(id);

        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }

        // Check if the user is the creator
        if (problem.userId.toString() !== userId) {
            return res.status(403).json({ message: 'Forbidden: You are not the owner of this problem' });
        }

        await Problem.findByIdAndDelete(id);
        res.json({ message: 'Problem deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

export const getSolvedProblems = async (req, res) => {
    const userId = req.user; // Assuming req.user contains the user ID

    try {
        const user = await User.findById(userId).populate('solvedProblems.problemId');

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const solvedProblems = user.solvedProblems.map(solvedProblem => ({
            problemId: solvedProblem.problemId,
            testCasesPassed: solvedProblem.testCasesPassed,
            totalTestCases: solvedProblem.totalTestCases,
            status: solvedProblem.status
        }));

        res.json({ success: true, solvedProblems });
    } catch (error) {
        console.error('Error fetching solved problems:', error);
        res.status(500).json({ success: false, message: "An error occurred", error: error.message });
    }
};