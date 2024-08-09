import { useAuth } from "../hooks/useAuth";
import { Link } from 'react-router-dom';

export const WelcomePage = () => {
    const { auth } = useAuth();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <main className="flex flex-col items-center p-8 bg-white rounded-lg shadow-lg text-center max-w-2xl">
                <h1 className="text-4xl font-extrabold text-indigo-700">
                    Welcome, {auth.user?.firstName}!
                </h1>
                <p className="mt-4 text-lg text-gray-700">
                    You are logged in and ready to enhance your coding skills.
                </p>

                <p className="mt-2 text-gray-700">
                    Explore problems created by others or challenge yourself by creating your own.
                </p>

                <div className="mt-6 space-x-4">
                    <Link to="/problems">
                        <button className="bg-indigo-700 text-white py-2 px-4 rounded-full font-semibold hover:bg-indigo-800 transition-colors">
                            Explore Problems
                        </button>
                    </Link>
                    
                </div>
            </main>
        </div>
    );
};
