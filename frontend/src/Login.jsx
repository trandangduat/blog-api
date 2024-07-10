const Login = () => {
    return (
        <form method="POST" action="">
            <label htmlFor="username">Username</label>
            <input type="text"></input>
            <label htmlFor="password">Password</label>
            <input type="password"></input>
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;