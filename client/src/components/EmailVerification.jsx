import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const EmailVerification = () => {
    const { id, token } = useParams();
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const verifyEmail = async () => {
            try {
                if(isMounted){const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/${id}/verify-email/${token}`);

                setMessage(response.data.message);
            }
                
            } catch (error) {
                if(isMounted){
                    setMessage('Invalid or expired verification link.');
                }
                
            } finally {
                if(isMounted){setLoading(false);}   
            }
        };
        verifyEmail();
        return()=>{isMounted=false};
    }, [id, token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Email Verification</h1>
            {loading ? (
                <p>Loading...</p> // Display a loading message or other placeholder
            ) : (
                <p className="text-lg">{message}</p>
            )}
        </div>
    );
};

export default EmailVerification;
