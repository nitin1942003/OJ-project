import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProblems } from '../services/problemService';

export const ProblemsPage = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const problemsData = await getProblems();
        setProblems(problemsData);
      } catch (error) {
        console.error('Error fetching problems:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Problems</h1>

      {loading ? (
        <div className="flex justify-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : Array.isArray(problems) && problems.length === 0 ? (
        <div className="flex justify-center">
          <p className="text-lg text-gray-500 mt-6">No problems available. Please check back later.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-gray-600 font-semibold border-b">Problem Title</th>
              </tr>
            </thead>
            <tbody>
              {problems.map((problem) => (
                <tr key={problem._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 border-b">
                    <Link to={`/problems/${problem._id}`} className="text-blue-600 hover:underline">
                      {problem.title}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
