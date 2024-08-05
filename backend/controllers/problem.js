import Problem from '../models/problem.js';

// Get all problems
export const getProblems = async (req, res) => {
    try {
        const problems = await Problem.find();
        res.json(problems);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Get a single problem with an id
export const getProblem = async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id);
        if (!problem) {
            return res.status(404).send('Problem not found');
        }
        res.json(problem);
    } catch (error) {
        console.error('Error fetching problem:', error);
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Create a new problem
export const createProblem = async (req, res) => {
    const { title, description, testCases } = req.body; // Accept test cases from the request body
    try {
        // Create the new problem
        const newProblem = new Problem({ title, description, testCases });
        const problem = await newProblem.save();
        console.log('Added a new problem with its test cases');
        res.status(201).json(problem);
    } catch (error) {
        console.error('Error creating problem:', error);
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Update a problem
export const updateProblem = async (req, res) => {
    const { id } = req.params;
    const { title, description, testCases } = req.body;

    try {
        // Update the problem's title and description
        const problem = await Problem.findByIdAndUpdate(id, { title, description }, { new: true });

        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }

        // Update test cases
        problem.testCases = testCases;
        await problem.save();

        res.json(problem);
    } catch (error) {
        console.error('Error updating problem:', error);
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Delete a problem
export const deleteProblem = async (req, res) => {
    const { id } = req.params;
    try {
        await Problem.findByIdAndDelete(id);
        res.json({ message: 'Problem deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
