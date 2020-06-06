import * as React from 'react';
import { taskReducer } from '../../store/tasks/reducers';
import {useState} from 'react';


const EditTask=props=>{
    const [inputValue,changeInputValue]=useState({
        name:props.valueText,
        deadline:props.valueDeadline,
        description:props.valueDescription
    })
    const handleChangeInputValue=e=>{
        if (e.target.name ==='name'){
            changeInputValue({...inputValue, name: e.target.value})
        } else if (e.target.name ==='deadline'){
            changeInputValue({...inputValue, deadline: e.target.value})
        } else if (e.target.name ==='description'){
            changeInputValue({...inputValue, description: e.target.value})
        } 
        
    }
    const handleSubmitForm=e=>{
        e.preventDefault();
        props.changeTask(inputValue.name, inputValue.deadline, inputValue.description)
    }
 
    return(
        <form onSubmit={handleSubmitForm}>
            <p><input onChange={handleChangeInputValue} type="text" name="name" value={inputValue.name} placeholder='введите задачу'></input></p>
            <p><input onChange={handleChangeInputValue} type='date' name="deadline" value={inputValue.deadline}></input></p>
            <p><textarea onChange={handleChangeInputValue} type='text' name="description" value={inputValue.description} placeholder="описание задачи"></textarea></p>
            <button type='submit'>редактировать</button>
        </form>
    )
}

export default EditTask;