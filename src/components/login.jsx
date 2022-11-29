
const Login = ()=>{
    return (
        <div className="card_home">
            <h1 className="title">Login</h1>
            <form>
                <div className="input-container">
                    <input type="email" id="text" required="required" />
                    <label htmlFor="text">Email</label>
                    <div className="bar" />
                </div>
                <div className="input-container">
                    <input type="password" id="password" required="required" />
                    <label htmlFor="#password">Password</label>
                    <div className="bar" />
                </div>
                
                <div className="button-container">
                <button>
                    <span>Go</span>
                </button>
                </div>
                <div className="footer">
                <a href="#">Forgot your password?</a>
                </div>
            </form>
        </div>

    )
}

export default Login;