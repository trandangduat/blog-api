import { useState } from "react";

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(username, password, confirm_password)
    };

    return (
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
    );
};

export default SignUp;