import * as React from 'react';
import {useState, useEffect} from "react";

const NewFormTaskList =props=>{
    const [newTaskName, updateTaskName]=useState('');
    const inputChangeInput=e=>{
        updateTaskName(e.target.value);
    }
    const handleSubmitForm=e=>{
        e.preventDefault();
        props.addNewTask(newTaskName);
        updateTaskName('')
    }
    return(
        <form onSubmit={handleSubmitForm}>
            <input onChange={inputChangeInput} type='text' name="task" placeholder="название задачи"></input>
            <button type='submit'>добавить задачу</button>
        </form>
    )

}

export default NewFormTaskList;