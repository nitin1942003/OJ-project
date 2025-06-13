import { Link } from 'react-router-dom';

export const Home = () => {

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white text-white">
            <main className="flex flex-col items-center p-8bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center max-w-2xl">
                <h1 className="text-4xl font-extrabold text-indigo-700">
                    Welcome!
                </h1>
                <p className="mt-4 text-lg text-gray-700">
                    This is a coding platform where you can create coding problems and solve created by others.
                </p>

                <p className="mt-2 text-gray-700">
                    You can Run it in!!!
                </p>

                <p className="mt-2 text-gray-700">
                    Enter to explore the realm of coders
                </p>

                <div className="mt-6 space-x-4">
                    <Link to="/login">
                        <button className="bg-indigo-700 text-white py-2 px-4 rounded-full font-semibold hover:bg-indigo-800 transform hover:scale-105">
                            Login
                        </button>
                    </Link>
                    <span className="text-gray-900 font-medium">OR</span>
                    <Link to="/register">
                        <button className="bg-indigo-700 text-white py-2 px-4 rounded-full font-semibold hover:bg-indigo-800 transform hover:scale-105">
                            Sign Up
                        </button>
                    </Link>
                </div>
            </main>
        </div>
    );
};
