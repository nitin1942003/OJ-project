import { useAuth } from "../hooks/useAuth";
import { Link } from 'react-router-dom';

export const ProfilePage = () => {
    const { auth } = useAuth();
    return(
        <div>Hello {auth.user?.firstName}! in our upcoming update here we will display your solved problems or status.</div>
    );
};