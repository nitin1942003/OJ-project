import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserProblems, deleteProblem, updateProblem } from '../services/problemService';

export const MyProblemsPage = () => {
  const [userProblems, setUserProblems] = useState([]);
  const [editProblemId, setEditProblemId] = useState(null);
  const [editProblemTitle, setEditProblemTitle] = useState('');
  const [editProblemDescription, setEditProblemDescription] = useState('');
  const [editProblemTestCases, setEditProblemTestCases] = useState([]);

  useEffect(() => {
    const fetchUserProblems = async () => {
      try {
        const problemsData = await getUserProblems(); // Fetch problems created by the user
        setUserProblems(problemsData);
      } catch (error) {
        console.error('Error fetching user problems:', error);
      }
    };
    fetchUserProblems();
  }, []);

  const handleEdit = (problem) => {
    setEditProblemId(problem._id);
    setEditProblemTitle(problem.title);
    setEditProblemDescription(problem.description);
    setEditProblemTestCases(problem.testCases || []);
  };

  const handleUpdate = async () => {
    try {
      const updatedProblem = await updateProblem(editProblemId, {
        title: editProblemTitle,
        description: editProblemDescription,
        testCases: editProblemTestCases,
      });
      setUserProblems((prevProblems) =>
        prevProblems.map((problem) => (problem._id === editProblemId ? updatedProblem : problem))
      );
      setEditProblemId(null);
      setEditProblemTitle('');
      setEditProblemDescription('');
      setEditProblemTestCases([]);
    } catch (error) {
      console.error('Error updating problem:', error);
    }
  };

  const handleCloseEditForm = () => {
    setEditProblemId(null);
    setEditProblemTitle('');
    setEditProblemDescription('');
    setEditProblemTestCases([]);
  };

  const handleDelete = async (id) => {
    try {
      await deleteProblem(id);
      setUserProblems((prevProblems) => prevProblems.filter((problem) => problem._id !== id));
    } catch (error) {
      console.error('Error deleting problem:', error);
    }
  };

  const handleEditTestCaseChange = (index, field, value) => {
    const updatedTestCases = [...editProblemTestCases];
    updatedTestCases[index][field] = value;
    setEditProblemTestCases(updatedTestCases);
  };

  const handleAddEditTestCase = () => {
    setEditProblemTestCases([...editProblemTestCases, { title: '', input: '', expectedOutput: '' }]);
  };

  const handleRemoveEditTestCase = (index) => {
    const updatedTestCases = editProblemTestCases.filter((_, i) => i !== index);
    setEditProblemTestCases(updatedTestCases);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Problems</h1>

      {userProblems.length === 0 ? (
        <p className="text-center text-gray-500">You have not created any problems yet.</p>
      ) : (
        <ul className="space-y-4">
          {userProblems.map((problem) => (
            <li key={problem._id} className="p-4 border border-gray-300 rounded">
              <h2 className="text-xl font-semibold mb-2 break-words">
                <Link to={`/problems/${problem._id}`}>{problem.title}</Link>
              </h2>
              <p className="break-words">{problem.description}</p>
              <div className="mt-4 flex space-x-2">
                <button onClick={() => handleEdit(problem)} className="px-4 py-2 bg-blue-500 text-white rounded">
                  Edit
                </button>
                <button onClick={() => handleDelete(problem._id)} className="px-4 py-2 bg-red-500 text-white rounded">
                  Delete
                </button>
              </div>
              {editProblemId === problem._id && (
                <div className="mt-4 p-4 border border-gray-300 rounded">
                  <h2 className="text-xl font-semibold mb-2">Edit Problem</h2>
                  <input
                    type="text"
                    value={editProblemTitle}
                    onChange={(e) => setEditProblemTitle(e.target.value)}
                    placeholder="Problem Title"
                    className="block w-full mb-2 p-2 border border-gray-300 rounded"
                  />
                  <textarea
                    value={editProblemDescription}
                    onChange={(e) => setEditProblemDescription(e.target.value)}
                    placeholder="Problem Description"
                    className="block w-full mb-4 p-2 border border-gray-300 rounded"
                  />

                  <h3 className="text-lg font-semibold mb-2">Test Cases</h3>
                  {editProblemTestCases.map((testCase, index) => (
                    <div key={index} className="mb-4 p-2 border border-gray-300 rounded">
                      <input
                        type="text"
                        value={testCase.title}
                        onChange={(e) => handleEditTestCaseChange(index, 'title', e.target.value)}
                        placeholder="Test Case Title"
                        className="block w-full mb-2 p-2 border border-gray-300 rounded"
                      />
                      <input
                        type="text"
                        value={testCase.input}
                        onChange={(e) => handleEditTestCaseChange(index, 'input', e.target.value)}
                        placeholder="Input"
                        className="block w-full mb-2 p-2 border border-gray-300 rounded"
                      />
                      <input
                        type="text"
                        value={testCase.expectedOutput}
                        onChange={(e) => handleEditTestCaseChange(index, 'expectedOutput', e.target.value)}
                        placeholder="Expected Output"
                        className="block w-full mb-2 p-2 border border-gray-300 rounded"
                      />
                      <button
                        onClick={() => handleRemoveEditTestCase(index)}
                        className="px-4 py-2 bg-red-500 text-white rounded"
                      >
                        Remove Test Case
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={handleAddEditTestCase}
                    className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Add Test Case
                  </button>

                  <div className="flex space-x-4">
                    <button
                      onClick={handleUpdate}
                      className="px-4 py-2 bg-green-500 text-white rounded"
                    >
                      Update Problem
                    </button>
                    <button
                      onClick={handleCloseEditForm}
                      className="px-4 py-2 bg-gray-500 text-white rounded"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
