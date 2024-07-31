import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { MoonIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";

const toggleTheme = () => {
    document.body.classList.toggle("dark");
    if (localStorage.getItem("theme") === "dark") {
        localStorage.setItem("theme", "light");
    } else {
        localStorage.setItem("theme", "dark");
    }
};

export const NavBar = () => {
    const { user, isAuthenticated } = useAuth();

    useEffect(() => {
        if (localStorage.getItem("theme") === "dark") {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, []);

    return (
        <nav className="fixed top-4 left-0 right-0 z-50">
            <div className="max-w-4xl mx-auto bg-white/75 dark:bg-slate-800/50 backdrop-blur-md shadow rounded-xl p-4 flex justify-between">
                <div className="flex">
                    <NavItem link="/" label="Home"></NavItem>
                </div>
                <div className="flex items-center">
                    <NavItem link="#" label={<MoonIcon className="w-5 h-5" />} onClick={toggleTheme} />
                    { !isAuthenticated ? (
                        <>
                            <NavItem link="login" label="Login"></NavItem>
                            <NavItem link="signup" label="Sign Up"></NavItem>
                        </>
                    ) : (
                        <>
                            <p>Hello, {user && user.username}</p>
                            <NavItem link="logout" label="Logout"></NavItem>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

const NavItem = ({ link, label, onClick }) => {
    return (
        <div className="" onClick={onClick}>
            <Link 
                to={link} 
                className="block text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 px-4 py-0 rounded-xl font-semibold"
            >
                {label}
            </Link>
        </div>
    );
}