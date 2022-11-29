const Register = ()=>{
    return(
        <div className="card alt">
            <div className="toggle" />
            <h1 className="title">
                Register
                <div className="close" />
            </h1>
            <form>
                <div className="input-container">
                <input type="#{type}" id="#{label}" required="required" />
                <label htmlFor="#{label}">Username</label>
                <div className="bar" />
                </div>
                <div className="input-container">
                <input type="#{type}" id="#{label}" required="required" />
                <label htmlFor="#{label}">Password</label>
                <div className="bar" />
                </div>
                <div className="input-container">
                <input type="#{type}" id="#{label}" required="required" />
                <label htmlFor="#{label}">Repeat Password</label>
                <div className="bar" />
                </div>
                <div className="button-container">
                <button>
                    <span>Next</span>
                </button>
                </div>
            </form>
        </div>

    )
}

export default Register