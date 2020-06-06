const addTask = newTask =>{
    return{
        type:'ADD_TASK',
        task: {...newTask}
    }
}

const editTask = (newStatus, id,newName, newDeadline, newDescription) =>{
    return{
        type: 'EDIT_TASK',
        newStatus: newStatus,
        newName: newName,
        id:id,
        newDeadline: newDeadline,
        newDescription: newDescription
    }
}


const deleteTask = id =>{
    return{
        type:"DELETE_TASK",
        id: id
    }
}


export {addTask, editTask, deleteTask};