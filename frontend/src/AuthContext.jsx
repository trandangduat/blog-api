import { createContext, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Cookies from "js-cookie"

export const AuthContext = createContext(null);

export const AuthProvider = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    useEffect(() => {
        if (Cookies.get('authtoken')) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const login = (token) => {
        Cookies.set('authtoken', token, { expires: 1, secure: true, sameSite: 'strict' });
        setIsAuthenticated(true);
    };
    const logout = () => {
        Cookies.remove('authtoken');
        setIsAuthenticated(false);
    };
    const getAuthToken = () => {
        return Cookies.get('authtoken');
    };

    return (
        <AuthContext.Provider value = {{ login, logout, getAuthToken, isAuthenticated }}>
            <Outlet />
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);