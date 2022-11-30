import { useEffect, useState } from "react";
import Todo from "./Todo";

const Main = ()=>{
    // useEffect hook to check whether the user is already logged in or not
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(()=>{
        // getting the data from local storage
        // console.log("runnin effect")
        const user = JSON.parse(localStorage.getItem("user"));
        const jwt = localStorage.getItem("jwt");
        if(user && jwt){
            setIsAuthenticated(true)
            console.log("authenticated")
        }
    }, []);
    if(!isAuthenticated){
        
        return (
            <h1 className="flex justify-center flex-col gap-6 items-center">You are Not Authorized to visit this page Please login
                <a href="/">Go to Login</a>
            </h1>
        )
     }


    // console.log(jwt)
    return(
        <div className="flex justify-center h-screen items-center py-12">
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
                    <ul id="todos" className="text-xl max-h-[526px] overflow-y-auto">
                        <Todo></Todo>
                    </ul>
                    <button id="addTask" className="btn btn-wide btn-outline mt-12">
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