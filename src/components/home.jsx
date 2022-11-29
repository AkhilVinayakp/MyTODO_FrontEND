import { useState } from "react";
import "./home.css"
import Login from "./login";
import Register from "./register";


const Home = (props)=>{
    function invokeToggler(e){
        console.log(e)
        const toggler = document.querySelector(".container_home");
        console.log("toggling")
        if(toggler.classList.contains('active') && e.target.className === "close"){
            toggler.classList.remove('active');
        }
        else{
            toggler.classList.add("active");
        }
    }
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    // for registration
    const [name, setName] = useState(null);
    const [regEmail, setRegEmail] = useState(null);
    const [regPass, setRegPass] = useState(null);
    const registerUser = ()=>{
        
    }
    return (
        <div className="mt-24">
            <div className="container_home">
            <div className="card_home" />
            <div className="card_home glass rounded-xl py-12">
            <h1 className="title">Login</h1>
            <form>
                <div className="input-container_home">
                <input type="text" id="email_field" required="required" value={email} onChange= {(e)=>setEmail(e.target.value)} />
                <label htmlFor="email_field">Email</label>
                <div className="bar" />
                </div>
                <div className="input-container_home">
                <input type="password" id="password_field" required="required" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                <label htmlFor="password_field">Password</label>
                <div className="bar" />
                </div>
                <div className="button-container_home">
                <button>
                    <span>Go</span>
                </button>
                </div>
            </form>
            </div>
            <div className="card_home alt glass">
            <div className="toggle" onClick={invokeToggler} />
            <h1 className="title">
                Register
                <div className="close" onClick={invokeToggler}>

                </div>
            </h1>
            <form>
                <div className="input-container_home">
                <input type="#{type}" id="reg_name" required="required" value={name} onChange={(e)=>setName(e.target.value)} />
                <label htmlFor="reg_email">Name</label>
                <div className="bar" />
                </div>
                <div className="input-container_home">
                <input type="#{type}" id="reg_email" required="required" value={regEmail} onChange={(e)=>{setRegEmail(e.target.value)}} />
                <label htmlFor="reg_email">Email</label>
                <div className="bar" />
                </div>
                <div className="input-container_home">
                <input type="#{type}" id="reg_password" required="required" value={regPass} onChange={(e)=>{setRegPass(e.target.value)}} />
                <label htmlFor="#{label}">Password</label>
                <div className="bar" />
                </div>
                <div className="button-container_home">
                <button onClick={registerUser} type="submit">
                    <span>Next</span>
                </button>
                </div>
            </form>
            </div>
        </div>
        </div>
    )
}
export default Home;