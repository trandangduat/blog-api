import { useState } from "react";

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [validationResults, setValidationResults] = useState([]);
    const [dataError, setDataError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("/api/signup", {
            method: "POST",
            body: JSON.stringify({
                username, 
                password,
                "confirm-password": confirm_password
            }),
            headers: {
                "Content-Type": "application/json",
            },
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
                console.log(res.token);
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

            <label htmlFor="confirm-password">Confirm password</label>
            <input 
                type="confirm-password" 
                name="confirm-password"
                value={confirm_password}
                onChange={(e) => setConfirmPassword(e.target.value)}
            >
            </input>

            <button type="submit">Sign up</button>
        </form>
        </>
    );
};

export default SignUp;