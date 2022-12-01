import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../backend";
import { toast } from "react-toastify";

const Task = (props)=>{
    /**
     * props.sdata => object corresponding to the current task
     * props.todoKey => cotains the _id of the main task object.  
     */

    const [task, setTask] =  useState(props.sdata);
    const [taskHide, setTaskHide] = useState(false);
    const [taskChange, setTaskChange] = useState(false);
    const mainTodo = props.todoKey;
    const user = JSON.parse(localStorage.getItem("user"));
    const jwt = localStorage.getItem("jwt");
    /**
     * data format of task  
     *      {
                subTask: "subtask name updated 2",
                createDate: "2022-11-25T18:18:53.553Z",
                isComplete: false,
                _id: "6381070ddf377ed32a04aea3"
            }
     */
    const updateSubTaskTitle = (e)=>{
        // changing / creating subtask.
        const subTitle = e.target.value;
        if(!task._id && subTitle){
            // create new subtask
            /**
             * adding data to the subtask list
             * /todoes/:uid/todo/:tid/add  
             */
            axios.put(`${API.todoApi}/todoes/${user._id}/todo/${mainTodo}/add`,{
                task:{
                    subTask: subTitle
                }
            },{
                headers:{
                    Authorization: `Bearer ${jwt}`
                }
            }).then((response)=>{
                console.log("subTask created");
                // update the id
                const newSubTodo = response.data;
                let newTask = newSubTodo.data.task;
                newTask = newTask[newTask.length-1]
                setTask({...task, ...newTask}); // TODO: resolve warnings
                

            }).catch((err)=>{
                console.log(err)
                toast("Somthing went wrong in backend, please reload try again");
            })

        }
        else if(taskChange){
            // if the current does not match with state update.
            axios.put(`${API.todoApi}/todoes/${user._id}/todo/${mainTodo}/task/${task._id}`,{
                update:{
                    ...task, subTask: subTitle
                }
            },{
                headers:{
                    Authorization: `Bearer ${jwt}`
                }
            }).then((response)=>{
                console.log("task title changed");

            }).catch((err)=>{
                console.log(err);
                toast("somthing went wrong, Reaload and try again");
            })
        }
    }
    const deleteSubTask = ()=>{
        setTaskHide(true);
        if(task.subTask){
            /**
             * /api/todoes/:uid/todo/:tid/task/:stid  
             */
            axios.delete(`${API.todoApi}/todoes/${user._id}/todo/${props.todoKey}/task/${task._id}`,{
                headers:{
                    Authorization: `Bearer ${jwt}`
                }
            }).then((response)=>{
                console.log("Subtask deleted.");
                toast(`${task.subTask} removed`);
            }).catch((err)=>{
                console.log(err);
                toast("Somthing went wrong, Please try again after reloading");
            })

        }
    }
    const updateCheck = (e)=>{
        if(e.target.checked != task.isComplete){
            setTask({...task, isComplete:e.target.checked})
            /**
             * update the database.  
             * /todoes/:uid/todo/:tid/task/:stid
             */
            axios.put(`${API.todoApi}/todoes/${user._id}/todo/${mainTodo}/task/${task._id}`,{
                update:{
                    ...task, isComplete: e.target.checked
                }
            },{
                headers:{
                    Authorization: `Bearer ${jwt}`
                }
            }).then((response)=>{
                console.log("task marked as complete");

            }).catch((err)=>{
                console.log(err);
                toast("somthing went wrong, Reaload and try again");
            })

        }
    }
    return(
        <>
            {!taskHide && (
                <div className="flex justify-center items-center gap-4 w-auto mb-1 py-1 px-1">
                <input type="text" placeholder="Type here" className="input  input-sm w-full max-w-sm" value={task.subTask} onChange={(e)=>{setTask({...task, subTask:e.target.value}); setTaskChange(true)}} 
                onBlur={updateSubTaskTitle}
                />
                <input type="checkbox" className="checkbox checkbox-success" checked={task.isComplete} onChange={updateCheck} />
                <button className="btn btn-circle btn-sm" onClick={deleteSubTask}>
                    <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"/></svg>
                </button>
            </div>                
            )}
        </>
    )
}

export default Task;