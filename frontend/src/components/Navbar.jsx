import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

export const NavBar = () => {
    const { user, isAuthenticated } = useAuth();
    
    return (
        <nav className="fixed top-4 left-0 right-0 z-50">
            <div className="max-w-4xl mx-auto bg-white/75 backdrop-blur-md shadow rounded-xl p-4 flex justify-between">
                <div className="flex">
                    <NavItem link="/" label="Home"></NavItem>
                </div>
                <div className="flex">
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

const NavItem = ({ link, label }) => {
    return (
        <div>
            <Link 
                to={link} 
                className="text-slate-700 px-4 py-2 rounded-xl hover:bg-zinc-200/75 font-semibold"
            >
                {label}
            </Link>
        </div>
    );
}