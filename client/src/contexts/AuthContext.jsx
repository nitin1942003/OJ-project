import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        // Retrieve auth data from local storage if available
        const savedAuth = localStorage.getItem('auth');
        return savedAuth ? JSON.parse(savedAuth) : {}; // Return an empty object if no saved auth data
    });

    // Sync auth state with local storage
    useEffect(() => {
        if (auth && Object.keys(auth).length !== 0) {
            // Save auth data to local storage
            localStorage.setItem('auth', JSON.stringify(auth));
        } else {
            // Remove auth data from local storage if auth state is empty
            localStorage.removeItem('auth');
        }
    }, [auth]);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

// Define prop-types
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
