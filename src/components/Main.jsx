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
    const [load, setload] = useState(1);
    useEffect(()=>{
        if(user && jwt && load){
            setIsAuthenticated(true)
            axios.get(`${API.todoApi}/todoes/${user._id}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                },
                // withCredentials: true
            }).then((response)=>{
                setTodoes(response.data.data);
                localStorage.setItem('todo', JSON.stringify(response.data.data))
            }).catch((error)=>{
                console.log("can not connect to backend:", error);
                toast("Loading error.... Please logout and try again")
            })
            userId = user._id;
        }

    }, [load]);

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

    const searchTodo = (event)=>{
        const searchTerm = event.target.value;
        // searching on the load data
        if(!searchTerm){
            setload(load+1);
        }
        else{
            const filtered = JSON.parse(localStorage.getItem('todo')).filter((item)=>{
                let main_index = item.title.toLowerCase().indexOf(searchTerm.toLowerCase())+1
                if(!main_index && item.task){
                    // search with in the subtasks
                    const taskfilter = item.task.filter((subtask)=>{
                       return subtask.subTask.toLowerCase().indexOf(searchTerm.toLowerCase())+ 1
                    });
                    if(taskfilter.length){
                        main_index = 1 // setting a truthy value in order to select the object
                        // item.task = taskfilter;
                    }
                }
                return main_index;
            
            });
            setTodoes(filtered);
        }
        
    }

    // console.log(jwt)
    return(
        <div className="flex justify-center  items-center">
            <ToastContainer></ToastContainer>
            <div className="card w-[986px] h-[800px] glass">
                <div className="card-body">
                <div className="flex  gap-24">
                    <div className="side-content flex justify-center">
                        <h2 className="text-3xl pt-1">MyTODO</h2>
                        <div className="dropdown dropdown-end ">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                <img src="https://placeimg.com/80/80/people" />
                                </div>
                            </label>
                            <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-32">
                                <li className="mb-1 mt-1 text-slate-500">{user.name}</li>
                                <li><button onClick={()=>toast("Will be avaiable soon")}>Settings</button></li>
                                <li><button onClick={singOut}>Logout</button></li>
                            </ul>
                        </div>
                    </div>
                    <div className="main-content flex flex-col ml-12">
                    <div className="form-control">
                            <div className="flex mb-3">
                                <div className="flex items-stretch gap-2 w-[620px]">
                                    <input type="text" placeholder="Search" className="input input-bordered w-[90%] border-white" onChange={searchTodo} />
                                    <div className="dropdown dropdown-right flex-end">
                                        <label tabIndex={0} className="btn btn-ghost rounded-btn">Sort</label>
                                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 w-3 ml-2 rounded-sm">
                                            <li><a>By Created</a></li> 
                                            <li><a>By Modified</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
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