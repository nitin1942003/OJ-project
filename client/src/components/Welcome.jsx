import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../services/authService";


export const WelcomePage = () => {
    const { auth, setAuth } = useAuth()
    const navigate = useNavigate()

    const logoff = async () => {
        try {
            await logout()
            setAuth({})
            navigate('/')
        } catch (error) {
            console.error('error during logout ', error)
        }
    }
    return (
        <>
            <div className='min-h-screen flex flex-col'>
                <nav className='bg-gray-500 text-white p-4 flex justify-between items-center'>
                    <div className='flex space-x-4'>
                        <Link
                            to='/profile'
                            className='hover:underline'
                        >
                            Profile
                        </Link>
                        <Link
                            to='/problems'
                            className='hover:underline'
                        >
                            Problems
                        </Link>
                    </div>
                    
                </nav>

                <main className='flex-grow p-8'>
                    <h1 className='text-3xl font-bold'>
                        Welcome, {auth.user?.firstName}
                    </h1>
                    <p className='mt-2 text-lg'>You are logged in!</p>
                    <br />
                </main>
            </div>
        </>
    );
};