import { useNavigate } from 'react-router-dom';

export const ProfilePage = () => {
    const navigate = useNavigate();

    const handleShowMyProblems = () => {
        navigate('/profile/my');
    };

    const handleShowSolvedProblems = () => {
        navigate('/profile/solved-problems');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4 text-black">Profile Page</h1>
            <div className="space-y-4 space-x-10">
                <button 
                    onClick={handleShowMyProblems} 
                    className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                >
                    Show My Problems
                </button>
                <button 
                    onClick={handleShowSolvedProblems} 
                    className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                >
                    Show Solved Problems
                </button>
            </div>
        </div>
    );
};
