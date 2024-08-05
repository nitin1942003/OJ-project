import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProblem, run, judge } from '../services/problemService';

export const ProblemDetailPage = () => {
    const { id } = useParams();
    const [problem, setProblem] = useState(null); // Initialized as null to check loading state
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);
    const [language, setLanguage] = useState('java');
    const [testResults, setTestResults] = useState([]);

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const response = await getProblem(id);
                console.log(response);
                setProblem(response);
            } catch (error) {
                console.error('Error fetching problem:', error);
            }
        };
        fetchProblem();
    }, [id]);

    if (!problem) {
        return <div>Loading...</div>;
    }

    const handleRunCode = async () => {
        setLoading(true);
        try {
            const response = await run({ language, code, input });
            setOutput(response.output);
        } catch (error) {
            console.error('Error running code:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleJudgeCode = async () => {
        if (!problem) {
            console.error('Problem is not defined');
            return;
        }

        try {
            const response = await judge({
                problemId: problem._id,
                code: code,
                language: language,
            });

            if (response && response.results) {
                setTestResults(response.results);
            } else {
                console.error('Invalid response format:', response);
            }
        } catch (error) {
            console.error('Error judging code:', error);
        }
    };

    return (
        <div className="p-8 overflow-auto">
            <div className="flex h-screen p-4 border border-gray-300 shadow-lg rounded-lg overflow-auto">
                {/* Left Side */}
                <div className="w-1/2 p-4 border-r border-gray-300 overflow-y-scroll">
                    <div className="p-4 border border-gray-300 rounded mb-4 h-64 overflow-y-auto">
                        <h1 className="text-2xl font-bold mb-4 break-words">{problem.title}</h1>
                        <p className="break-words">{problem.description}</p>
                    </div>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Input"
                        className="block w-full h-60 p-2 border border-gray-300 rounded overflow-y-auto"
                    />
                    <div className="w-full h-72 p-2 border border-gray-300 rounded overflow-y-auto mt-4">
                        <h2 className="text-xl font-semibold mb-2">Output</h2>
                        <pre>{output}</pre>
                    </div>
                </div>
                {/* Right Side */}
                <div className="w-1/2 p-4 border-r border-gray-300 overflow-y-scroll">
                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-semibold">Select Language</label>
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="p-2 border border-gray-300 rounded mb-4"
                        >
                            <option value="cpp">C++</option>
                            <option value="py">Python</option>
                            <option value="java">Java</option>
                        </select>
                    </div>
                    <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Write your code here..."
                        className="block w-full h-72 p-2 mb-4 border border-gray-300 rounded overflow-y-auto"
                    />
                    <div className="flex flex-col space-y-4">
                        <button
                            onClick={handleRunCode}
                            className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
                        >
                            Run Code
                        </button>
                        <button
                            onClick={handleJudgeCode}
                            className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
                        >
                            Judge Code
                        </button>
                    </div>
                    <div className="w-full h-72 p-2 border border-gray-300 rounded overflow-y-auto mt-4">
                        <h2 className="text-xl font-semibold mb-2">Verdict</h2>
                        {loading && <div>Loading...</div>}
                        {testResults.map((result, index) => (
                            <div key={index}>
                                <h3>{result.title}</h3>
                                <p>Input: {result.input}</p>
                                <p>Expected Output: {result.expectedOutput}</p>
                                <p>User Output: {result.userOutput}</p>
                                <p>Correct: {result.isCorrect.toString()}</p>
                                <br />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
