import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Layout = () => {
    const { auth, setAuth } = useAuth();

    const handleLogout = () => {
        setAuth(null); // Clear the auth state
        // Additional logout logic, like clearing tokens, can be added here
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <header className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center text-3xl font-bold shadow-lg sticky top-0 z-10">
                <div className="relative">
                    Ru<span className="bg-white text-indigo-700 px-2 rounded">n it in</span>
                    <div className="absolute right-4 top-0 flex items-center space-x-2">

                        {auth ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-lg font-medium">Hello, {auth.user?.firstName}</span>
                                <button
                                    onClick={handleLogout}
                                    className="  text-white px-2 py-2 font-medium text-lg transition-transform transform hover:scale-105"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <a
                                href="/login"
                                className="text-white px-2 py-2 transition-transform transform hover:scale-105"
                            >
                                Login
                            </a>
                        )}
                    </div>
                </div>
            </header>
            <main className="flex-grow p-6 bg-white shadow-md rounded-lg mx-4 mt-4">
                <Outlet />
            </main>
            <footer className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center">
                <p className="text-sm">© 2024 Run it in</p>
            </footer>
        </div>
    );
};

export default Layout;
