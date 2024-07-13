import { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [validationResults, setValidationResults] = useState([]);
    const [dataError, setDataError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password
            }),
        })
        .then(res => res.json())
        .then(res => {
            if (res.data_error) {
                setDataError(res.data_error);
                setValidationResults([]);
            } else if (res.errors) {
                setDataError('');
                setValidationResults(res.errors);
            } else {
                login(res.token);
                navigate('/');
            }
        });
    };

    return (
        <>
        <p>{dataError}</p>
        <ul>
            {validationResults.map((res) => (<li key={res.msg}>{res.msg}</li>))}
        </ul>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input 
                type="text" 
                name="username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            >
            </input>
            
            <label htmlFor="password">Password</label>
            <input 
                type="password" 
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            >
            </input>

            <button type="submit">Login</button>
        </form>
        </>
    );
};

export default Login;