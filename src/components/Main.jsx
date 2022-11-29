import { useEffect, useState } from "react";
import Todo from "./Todo";
import { Navigate } from "react-router-dom";

const Main = ()=>{
    // useEffect hook to check whether the user is already logged in or not
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(()=>{
        const user = localStorage.getItem("user");
        const jwt = localStorage.getItem("jwt");
        // TODO : token can be expired if it is redirect to login page.
        if(jwt && user){
            // user already signed in so allow access.
           setIsAuthenticated(true)
        }
        else{
            // TODO : need update? redirection to the login page
            setIsAuthenticated(false);
        }
    },[]);
    if(!isAuthenticated){
        // redirection
       return <Navigate replace to={'/login'}></Navigate>
    }
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
                        </div>{" "}
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