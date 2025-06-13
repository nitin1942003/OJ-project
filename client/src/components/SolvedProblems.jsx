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
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 text-left">
                            <th className="py-3 px-6 font-semibold">Title</th>
                            <th className="py-3 px-6 font-semibold">Test Cases Passed</th>
                            <th className="py-3 px-6 font-semibold">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {problems.map((problem) => (
                            <tr key={problem.problemId._id} className="border-b border-gray-300 hover:bg-gray-50 transition-colors">
                                <td className="py-3 px-6">
                                    <Link
                                        to={`/problems/${problem.problemId._id}`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        {problem.problemId.title}
                                    </Link>
                                </td>
                                <td className="py-3 px-6">
                                    {problem.testCasesPassed}/{problem.totalTestCases}
                                </td>
                                <td className="py-3 px-6">
                                    {problem.status === 'P' ? (
                                        <span className="text-green-600">All Test Cases Passed</span>
                                    ) : problem.status === 'F' ? (
                                        <span className="text-red-600">Failed</span>
                                    ) : problem.status === 'A' ? (
                                        <span className="text-yellow-600">Attempting</span>
                                    ) : (
                                        <span className="text-gray-600">Unknown Status</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
