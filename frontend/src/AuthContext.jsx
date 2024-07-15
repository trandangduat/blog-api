import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Cookies from "js-cookie"

export const AuthContext = createContext(null);

export const AuthProvider = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const updateCurrentUser = useCallback((token) => {
        const options = {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }
        fetch('/api/user/current', options)
            .then(response => {
                if (response.ok) return response.json();
                logout();
            })
            .then(data => setUser(data))
            .catch(error => {
                console.log(error);
                logout();
            });
    }, []);

    useEffect(() => {
        const token = Cookies.get('authtoken');
        if (token) {
            setIsAuthenticated(true);
            updateCurrentUser(token);
        } else {
            setIsAuthenticated(false);
        }
    }, [updateCurrentUser]);

    const login = (token) => {
        Cookies.set('authtoken', token, { expires: 1, secure: true, sameSite: 'strict' });
        setIsAuthenticated(true);
        updateCurrentUser(token);
    };
    const logout = () => {
        Cookies.remove('authtoken');
        setIsAuthenticated(false);
        setUser(null);
    };
    const getAuthToken = () => {
        return Cookies.get('authtoken');
    };

    return (
        <AuthContext.Provider value = {{ user, login, logout, getAuthToken, isAuthenticated }}>
            <Outlet />
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);