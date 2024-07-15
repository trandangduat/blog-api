import { Link, Outlet } from "react-router-dom";
import './App.css'
import { useAuth } from "./AuthContext";

const App = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <>
      <nav>
      <Link to="/">Home</Link>
      { !isAuthenticated ? (
        <>
          <Link to="login">Login</Link>
          <Link to="signup">Sign up</Link>
        </>
      ) : (
        <>
          <p>Hello, {user && user.username}</p>
          <Link to="logout">Logout</Link>
        </>
      )}
      </nav>
      <Outlet />
    </>
  );
}

export default App
