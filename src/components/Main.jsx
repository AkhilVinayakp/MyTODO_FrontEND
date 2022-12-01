import { useEffect, useState } from "react";
import Todo from "./Todo";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { API } from "../backend";
import { useNavigate } from "react-router-dom";


const Main = ()=>{
    // useEffect hook to check whether the user is already logged in or not
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    let userId = "";
    const user = JSON.parse(localStorage.getItem("user"));
    const jwt = localStorage.getItem("jwt");
    // adding the autoAnimate feature
    const [parent, disableAnime] = useAutoAnimate();
    const navigate = useNavigate();
        /**
     * setting up the data  
     */
    const [todos, setTodoes] = useState([]);
    useEffect(()=>{
        // getting the data from local storage
        // console.log("runnin effect")

        if(user && jwt){
            setIsAuthenticated(true)
            console.log("authenticated")
            axios.get(`${API.todoApi}/todoes/${user._id}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                },
                // withCredentials: true
            }).then((response)=>{
                setTodoes(response.data.data);
            }).catch((error)=>{
                console.log("can not connect to backend:", error);
                toast("Loading error.... Please logout and try again")
            })
            userId = user._id;
            toast(`Hey Welcome ${user.name}`);
        }

    }, []);

    if(!isAuthenticated){
        
        return (
            <>
                <h1 className="flex justify-center flex-col gap-6 items-center">You are Not Authorized to visit this page Please login
                    <a href="/">Go to Login</a>
                </h1>
            </>
        )
     }

    function addTask(event) {
        setTodoes([...todos, {title:""}]);
    }
    function singOut(event){
        localStorage.removeItem("user");
        localStorage.removeItem("jwt");
        navigate("/");
    }

    // console.log(jwt)
    return(
        <div className="flex justify-center h-screen items-center py-12">
            <ToastContainer></ToastContainer>
            <div className="card w-[956px] h-full glass">
                <div className="card-body">
                <div className="flex  gap-24">
                    <div className="side-content">
                    <h2 className="text-3xl mb-8">MyTODO</h2>
                    <div className="text-2xl mb-8">
                        <img src="https://img.icons8.com/ultraviolet/80/null/user.png" />
                        <span className="ml-2">{user.name}</span>
                        <button className="btn btn-xs mt-1" onClick={singOut}>
                            sign out
                        </button>   
                    </div>

                    </div>
                    <div className="main-content flex flex-col ml-12">
                    <ul id="todos" className="text-xl max-h-[526px] overflow-y-auto" ref={parent}>
                        {todos.map((item, i)=>(<Todo data={item} key={item._id || i}></Todo>))}
                    </ul>
                    <button id="addTask" className="btn btn-wide btn-outline mt-12" onClick={addTask}>
                        Add Task
                    </button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )

}


export default Main;