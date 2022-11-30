import { useState } from "react";

const Task = (props)=>{
    // console.log(props)
    const [task, setTask] =  useState(props.sdata);
    return(
        <div className="flex justify-center items-center gap-4 w-auto mb-1 py-1 px-1">
            <input type="text" placeholder="Type here" className="input  input-sm w-full max-w-sm" value={task.subTask} onChange={(e)=>setTask({...task, subTask:e.target.value})} />
            <input type="checkbox" className="checkbox checkbox-success" checked={task.isComplete}  />
            <button className="btn btn-circle btn-sm">
                <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"/></svg>
            </button>
        </div>
    )
}

export default Task;