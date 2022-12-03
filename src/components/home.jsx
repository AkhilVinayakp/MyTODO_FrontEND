import { useState } from "react";
import "./home.css"
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API } from "../backend";
import { useNavigate } from "react-router-dom";

const Home = (props)=>{
    
    function invokeToggler(e){

        const toggler = document.querySelector(".container_home");
        console.log("toggling")
        if(toggler.classList.contains('active') && e.target.className === "close"){
            toggler.classList.remove('active');
        }
        else{
            toggler.classList.add("active");
        }
    }
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // for registration
    const [name, setName] = useState("");
    const [regEmail, setRegEmail] = useState("");
    const [regPass, setRegPass] = useState("");
    const navigate = useNavigate();
    const registerUser = (event)=>{
        event.preventDefault();
        if(![name, regEmail, regPass].every(e=>e)){
            toast("All fields are required");
            return;
        }
        axios.post(`${API.userApi}/register`,{
            name,
            email:regEmail,
            password:regPass
        }).then(response =>{
            console.log(response)
            toast("Wow so easy, Please Login!");
            // setting all the inserted values to null
            setName("");
            setRegEmail("");
            setRegPass("");
            const toggler = document.querySelector(".container_home");
            toggler.classList.remove("active");
        })
        .catch(error=>console.log(error))
    }

    const loginUser = (event)=>{
        event.preventDefault();
        console.log("sending the request through the API:", `${API.userApi}/login`)
        axios.post(`${API.userApi}/login`, {
            email,
            password
        }).then(response=>{
            console.log("processed succesfully")
            // console.log(response);
            // setting the data
            const {data} = response;
            localStorage.setItem("jwt", data.token);
            localStorage.setItem("user",JSON.stringify(data.user));
            // TODO : clear above both values during signout
            // Navigating to the dashboard\
            navigate("/dashboard");
            
        })
        .catch((error)=>{
            // console.log(JSON.stringify(error));
            console.log(error)
            const { response } = error;
            if(response){
                // checking the status code.
                if(response.status === 401){
                    console.log("password does not match");
                    toast("Please check the credentials");
                    setPassword("");
                }
            }
        })
    }



    return (
        <div className="mt-24">
            <ToastContainer></ToastContainer>
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
                <button onClick={loginUser} type="submit">
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
                <input type="text" id="reg_name" required="required" value={name} onChange={(e)=>setName(e.target.value)} />
                <label htmlFor="reg_email">Name</label>
                <div className="bar" />
                </div>
                <div className="input-container_home">
                <input type="text" id="reg_email" required="required" value={regEmail} onChange={(e)=>{setRegEmail(e.target.value)}} />
                <label htmlFor="reg_email">Email</label>
                <div className="bar" />
                </div>
                <div className="input-container_home">
                <input type="password" id="reg_password" required="required" value={regPass} onChange={(e)=>{setRegPass(e.target.value)}} />
                <label htmlFor="reg_password">Password</label>
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