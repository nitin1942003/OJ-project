import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProblem, run, judge, save } from '../services/problemService';
import coinImage from '../assets/coin.png';

export const ProblemDetailPage = () => {
    const { id } = useParams();
    const [problem, setProblem] = useState(null);
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);
    const [language, setLanguage] = useState('cpp');
    const [testResults, setTestResults] = useState([]);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [view, setView] = useState('input');
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const response = await getProblem(id);
                setProblem(response);
                setCode(response.savedCode || '');
            } catch (error) {
                console.error('Error fetching problem:', error);
            }
        };
        fetchProblem();
    }, [id]);

    const toggleDetails = (index) => {
        if (expandedIndex === index) {
            setExpandedIndex(null);
        } else {
            setExpandedIndex(index);
        }
    };

    if (!problem) {
        return <div>Loading...</div>;
    }

    const handleSaveCode = async () => {
        try {
            const response = await save({
                problemId: problem._id,
                code: code,
            });
            alert(response.message || 'Code saved successfully!');
        } catch (error) {
            alert('Failed to save code. Please try again.');
        }
    };    

    const handleRunCode = async () => {
        setLoading(true);
        try {
            const response = await run({ language, code, input });
            setOutput(response.output);
            setView('output'); // Automatically switch to output view
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
                setHasSubmitted(true);

                // Check if all test cases passed
                if (response.results.every(result => result.isCorrect)) {
                    triggerCoinPop(); // Trigger the coin pop animation
                }
            } else {
                console.error('Invalid response format:', response);
            }
        } catch (error) {
            console.error('Error judging code:', error);
        }
    };

    // Function to trigger coin animation
    const triggerCoinPop = () => {
        const coin = document.getElementById('coin');
        if (coin) {
            coin.style.display = 'block'; // Show the coin
            coin.style.animation = 'popCoin 1s ease'; // Start animation
            setTimeout(() => {
                coin.style.animation = 'none'; // Reset animation
                coin.style.display = 'none'; // Hide the coin after animation
            }, 1000); // Animation duration is 1s
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

                    <div className="flex space-x-4 mb-4">
                        <button
                            onClick={() => setView('input')}
                            className={`px-4 py-2 rounded ${view === 'input' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        >
                            Custom Input
                        </button>
                        <button
                            onClick={() => setView('output')}
                            className={`px-4 py-2 rounded ${view === 'output' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        >
                            Output
                        </button>
                    </div>

                    <div className="w-full h-72 p-2 border border-gray-300 rounded overflow-y-auto">
                        {view === 'input' ? (
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Custom Input"
                                className="block w-full h-full p-2 border-none"
                            />
                        ) : (
                            <div className="h-full overflow-y-auto">
                                <h2 className="text-xl font-semibold mb-2">Output</h2>
                                <pre>{output}</pre>
                            </div>
                        )}
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
                        <button
                            onClick={handleSaveCode} // Add this line
                            className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
                        >
                            Save Code
                        </button>
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
                            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Run Code
                        </button>
                        <button
                            onClick={handleJudgeCode}
                            className="mb-4 px-4 py-2 bg-indigo-500 text-white rounded"
                        >
                            Judge Code
                        </button>
                    </div>
                    <div className="w-full h-72 p-2 border border-gray-300 rounded overflow-y-auto mt-4">
                        <h2 className="text-xl font-semibold mb-2">Verdict</h2>
                        {loading && <div>Loading...</div>}

                        {/* Check if all test cases are correct */}
                        {hasSubmitted && testResults.every(result => result.isCorrect) && (
                            <div className="text-green-600 py-2 font-bold">Accepted</div>
                        )}
                        {testResults.map((result, index) => (
                            <div key={index} className="mb-4">
                                <button
                                    onClick={() => toggleDetails(index)}
                                    className={`w-30 text-left px-4 py-2 font-semibold rounded focus:outline-none ${result.isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                                >
                                    <span className="truncate">Test Case {index}</span>
                                </button>

                                {expandedIndex === index && (
                                    <div className="mt-2 pl-4">
                                        <p><strong>Input:</strong> {result.input}</p>
                                        <p><strong>Expected Output:</strong> {result.expectedOutput}</p>
                                        <p><strong>User Output:</strong> {result.userOutput}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Coin Image with Inline Styles */}
            <div
                id="coin"
                style={{
                    display: 'none',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100px',
                    height: '100px',
                    animation: 'none'
                }}
            >
                <img
                    src={coinImage} // Use the imported image
                    alt="Coin"
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                />
            </div>

            {/* Coin Animation Inline CSS */}
            <style>
                {`
                @keyframes popCoin {
                    0% {
                        transform: translate(-50%, -50%) scale(0);
                    }
                    50% {
                        transform: translate(-50%, -50%) scale(1.5);
                    }
                    100% {
                        transform: translate(-50%, -50%) scale(1);
                    }
                }
                `}
            </style>
        </div>
    );
};
