import * as React from 'react';
import {useState, useEffect} from "react";

const NewFormTask =props=>{
    const [newTaskName, updateTaskName]=useState({
        name:"",
        status: props.status
    });
    const inputChangeInput=e=>{
        updateTaskName({...newTaskName, name: e.target.value});
    }
    const handleSubmitForm=e=>{
        e.preventDefault();
        props.addNewTask(newTaskName);

        updateTaskName({
            name:"",
            status: props.status
        })
    }
    return(
        <form onSubmit={handleSubmitForm}>
            <input onChange={inputChangeInput} type='text' name="task" value={newTaskName.name} placeholder="название задачи"></input>
            <button type='submit'>добавить задачу</button>
        </form>
    )

}

export default NewFormTask;