import { createContext, useEffect, useState } from "react"
import PropTypes from 'prop-types'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({})

    //Hydrate on mount or refresh
    useEffect(() => {

    })
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}
//Define prop-types
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
}