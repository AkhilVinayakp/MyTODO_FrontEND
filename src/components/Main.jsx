import { useEffect, useId, useState } from "react";
import Todo from "./Todo";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { API } from "../backend";


const Main = ()=>{
    // useEffect hook to check whether the user is already logged in or not
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    let userId = "";
    // adding the autoAnimate feature
    const [parent, disableAnime] = useAutoAnimate();
        /**
     * setting up the data  
     */
    const [todos, setTodoes] = useState([]);
    useEffect(()=>{
        // getting the data from local storage
        // console.log("runnin effect")
        const user = JSON.parse(localStorage.getItem("user"));
        const jwt = localStorage.getItem("jwt");
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
        }
        useId = user._id;
        toast(`Hey Welcome ${user.name}`);
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
                    <div className="btn gap-2">
                        <div id="count_T" className="badge badge-secondary">
                        00
                        </div>
                        TODOS
                    </div>
                    </div>
                    <div className="main-content flex flex-col ml-12">
                    <ul id="todos" className="text-xl max-h-[526px] overflow-y-auto" ref={parent}>
                        {todos.map((item)=>(<Todo data={item} key={item._id}></Todo>))}
                    </ul>
                    <button id="addTask" className="btn btn-wide btn-outline mt-12" onClick={addTask}>
                        Add Task
                    </button>
                    </div>
                </div>
                <div className="card-actions justify-end mt-12">
                    <button id="clear" className="btn btn-primary">
                    Clear All!
                    </button>
                </div>
                </div>
            </div>
        </div>
    )

}


export default Main;