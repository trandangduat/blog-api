const SignUp = () => {
    return (
        <form method="POST" action="">
            <label htmlFor="username">Username</label>
            <input type="text"></input>
            <label htmlFor="password">Password</label>
            <input type="password"></input>
            <label htmlFor="confirm-password">Retype password</label>
            <input type="confirm-password"></input>
            <button type="submit">Sign up</button>
        </form>
    );
};

export default SignUp;