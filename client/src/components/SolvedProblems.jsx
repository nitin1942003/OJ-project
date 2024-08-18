import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSolvedProblems } from '../services/problemService';

export const SolvedProblems = () => {
    const [problems, setProblems] = useState([]);

    useEffect(() => {
        const fetchSolvedProblems = async () => {
            try {
                const response = await getSolvedProblems(); // Fetch the solved problems
                setProblems(response.solvedProblems); // Assuming the response has a solvedProblems array
            } catch (error) {
                console.error('Error fetching solved problems:', error);
            }
        };

        fetchSolvedProblems();
    }, []);

    if (!problems.length) {
        return <div>No problems solved yet.</div>;
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Solved Problems</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {problems.map((problem) => (
                    <div
                        key={problem.problemId._id}
                        className={`p-4 border border-gray-300 shadow rounded-lg ${
                            problem.status ? 'bg-green-100' : 'bg-red-100'
                        }`}
                    >
                        <h2 className="text-xl font-semibold">
                            <Link to={`/problems/${problem.problemId._id}`}>{problem.problemId.title}</Link>
                        </h2>
                        <p className="mb-4">{problem.problemId.description}</p>
                        <p>
                            Test Cases Passed: {problem.testCasesPassed}/{problem.totalTestCases}
                        </p>
                        <p>Status: {problem.status ? 'Passed' : 'Failed'}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
