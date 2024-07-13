import { Link, Outlet } from "react-router-dom";
import './App.css'
import { useAuth } from "./AuthContext";
import { useEffect, useState } from "react";

const App = () => {
  const { getAuthToken, isAuthenticated } = useAuth();
  const authToken = getAuthToken();

  const [msg, setMsg] = useState(null);

  useEffect(() => {
    fetch('/api/protected', {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    })
      .then(response => response.json())
      .then(response => setMsg(response.msg));
  }, []);

  return (
    <>
    <p>{isAuthenticated && msg}</p>
    <p>{getAuthToken()}</p>
    <nav>
    { !isAuthenticated ? (
      <>
      <Link to="login">Login</Link>
      <Link to="signup">Sign up</Link>
      </>
    ) : (
      <>
      <Link to="logout">Logout</Link>
      </>
    )}
    </nav>
    <Outlet />
    </>
  );
}

export default App
