import { useState, useEffect, useRef } from "react";
import autoAnimate from "@formkit/auto-animate";
import Task from "./task";
import SvgComponent from "./svgIcon";
import axios from "axios";
import { API } from "../backend";
import { toast} from "react-toastify";

const Todo = ({data})=>{
    const [todo, setTodo] = useState({
        ...data
    });
    const [show, setShow] = useState(false);
    const parent = useRef(null);
    useEffect(()=>{
        parent.current && autoAnimate(parent.current);
    }, [parent]);
    const revel = ()=> setShow(!show);

    const updateData = (e)=>{
        /**
         * updating the todo on change( blur event)
         *   
         */
        const todoTitle = e.target.value;
        const user = JSON.parse(localStorage.getItem("user"));
        const jwt = localStorage.getItem("jwt");
        if(todoTitle && !todo._id){
            // create new todo in the database
            axios.post(`${API.todoApi}/todoes/${user._id}/create`,{
                /** data format to pass
                 * title, dueDate, subTasks
                 */
                title: todoTitle,
                subTasks:[]
            },{
                headers:{
                    Authorization: `Bearer ${jwt}`
                }
            }).then((response)=>{
                console.log(response);
            }).catch((error)=>{
                console.log(error);
                toast("sothing went wrong in backend please try again")
            })
        }
        else if(todoTitle){
            // TODO: update

        }

    }
    const deleteTodo = (e)=>{
        
    }

    return(
            <li className="mb-4 w-[620px]  p-1 flex justify-between items-center">
                <div className="w-full" ref={parent}>
                    <input
                        type="text"
                        placeholder="double click to Type"
                        className=" todo-content input w-full max-w-[540px] input-md"
                        readOnly=""
                        value={todo.title}
                        onChange={(e)=>setTodo({...todo, title:e.target.value})}
                        onClick={revel}
                        onBlur={updateData}
                    />
                    {show && <div className="bg-[#2a303c] mt-2 rounded-md w-[85%] p-1 overflow-y-auto float-right mr-8">
                        {todo.task && todo.task.map((sitem)=>(<Task sdata={sitem} todoKey={data._id} key={sitem._id}></Task>))}
                    </div>}
                </div>
                <div>
                    {!show ? (                    
                        <button className="btn btn-circle  btn-outline" name="close-btn" onClick={deleteTodo}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>):(
                        <button className="btn btn-circle btn-success" name="close-btn">
                            <SvgComponent></SvgComponent>
                        </button>
                    )}

                </div>
            </li>

    )
}

export default Todo;