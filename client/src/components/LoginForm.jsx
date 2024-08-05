import { useRef, useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { login } from "../services/authService";
import { useNavigate, useLocation } from "react-router-dom";

const LoginForm = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const emailRef = useRef();
    const errorRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    useEffect(() => {
        setErrorMessage('');
    }, [email, password]);

    const handleLogin = async (e) => {
        e.preventDefault();
        const formData = { email, password };
        try {
            const response = await login(formData);
            const accessToken = response?.token;
            const user = response?.user;
            setAuth({ user, password, accessToken });
            setEmail('');
            setPassword('');
            navigate(from, { replace: true });
        } catch (error) {
            if (!error?.response) {
                setErrorMessage('No Server Response');
            } else if (error.response?.status === 400) {
                setErrorMessage('Missing Email or Password');
            } else if (error.response?.status === 401) {
                setErrorMessage('Unauthorized');
            } else {
                setErrorMessage('Login failed');
            }
            errorRef.current.focus();
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-lg'>
                <h2 className='text-3xl font-extrabold text-center text-gray-900 mb-6'>
                    Login
                </h2>

                <p
                    ref={errorRef}
                    className={`mb-4 p-3 rounded-md text-center ${errorMessage ? 'bg-red-100 text-red-600' : 'sr-only'}`}
                >
                    {errorMessage}
                </p>

                <form className='space-y-6' onSubmit={handleLogin}>
                    <div>
                        <label htmlFor='email' className='block text-sm font-semibold text-gray-800'>
                            Email Address
                        </label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            className='w-full px-4 py-2 mt-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                            value={email}
                            ref={emailRef}
                            autoComplete='off'
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor='password' className='block text-sm font-semibold text-gray-800'>
                            Password
                        </label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            className='w-full px-4 py-2 mt-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type='submit'
                        className='w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors'
                    >
                        Sign In
                    </button>
                </form>
                
                <p className='text-sm text-gray-700 mt-6 text-center'>
                    Don't have an account?
                    <br />
                    <span className='mt-2 block'>
                        <a
                            href='/Register'
                            className='text-indigo-600 hover:text-indigo-800 font-semibold'
                        >
                            Sign Up
                        </a>
                    </span>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
