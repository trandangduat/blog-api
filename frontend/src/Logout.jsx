import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useEffect } from "react";

export const Logout = () => {
    const { logout } = useAuth();
    useEffect(() => {
        logout();
    }, []);

    return <Navigate to="/"></Navigate>
};