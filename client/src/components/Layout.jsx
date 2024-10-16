import React from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Layout = () => {
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        setAuth(null); // Clear the auth state
        localStorage.removeItem('auth');
        navigate('/login');
        // Additional logout logic, such as clearing tokens, can be added here
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <header className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center text-3xl font-bold shadow-lg sticky top-0 z-10">
                <div className="relative flex items-center justify-between px-4">
                    {auth?.user && (
                        <div className="flex items-center space-x-4 font-medium text-lg">
                            <Link to='/profile' className='hover:underline'>
                                Profile
                            </Link>
                            <Link to='/problems' className='hover:underline'>
                                Problems
                            </Link>
                        </div>
                    )}

                    <div className="text-center flex-1">
                        <Link to="/">
                        Ru<span className="bg-white text-indigo-700 px-2 rounded">n it in</span>
                        </Link>
                        
                    </div>

                    <div className="flex items-center space-x-2">
                        {auth?.user ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-lg font-medium">Hello, {auth.user.firstName}</span>
                                <button
                                    onClick={handleLogout}
                                    className="text-white px-2 py-2 font-medium text-lg transition-transform transform hover:scale-105"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="text-white px-2 py-2 font-medium text-lg transition-transform transform hover:scale-105"
                            >
                                Login quickly
                            </Link>
                        )}
                    </div>
                </div>
            </header>
            <main className="flex-grow p-6 bg-white shadow-md rounded-lg mx-4 mt-4">
                <Outlet />
            </main>
            <footer className="w-full py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center">
                <p className="text-sm">© 2024 Run it in</p>
            </footer>
        </div>
    );
};

export default Layout;
