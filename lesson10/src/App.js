import * as React from 'react';
import {useState, useEffect} from "react";
import ListTasks from './components/tasks/ListTasks';
import {connect} from 'react-redux';
import {addTask,editTask,deleteTask} from './store/tasks/actions';
import {addComment,deleteComment,likeComment} from './store/comments/actions';
/**
 * Статусы могут быть:
 *-todo
 *-progress
 *-complete 
 *
 */

const App = props=>{

    const addNewTask = taskName =>{
       
        
        const newTaskData = {
            id: Math.floor(Math.random()*9999999),
            name:taskName.name,
            deadline:'',
            description:'',
            status:taskName.status
        }
      
        // updateTasks([...tasks,newTask]);
        props.addTask(newTaskData)
    }
    const addNewComment = (textComment, taskId)=>  {
        const newCommentData = {
            text:textComment,
            date:Date.now(),
            id:Math.floor(Math.random()*9999999),
            taskId: taskId,
            likes:0
        }
        
        
        props.addComment(newCommentData)
    }
    const updateStatusTask=(newStatus, id,name,deadline,description)=>{
        props.editTask(newStatus, id,name,deadline,description);

    }
    const handleChangeTask=(status,id,newName,newDeadline, newDescription)=>{
       
        props.editTask(status,id,newName, newDeadline,newDescription)
    } 
    const handleDeletTask = id =>{
            props.deleteTask(id);
            
    }
    const handleDeletComment = id =>{
        props.deleteComment(id);
}
   
    return(
        <>
            <header>
                <h1>Список задач</h1>
            </header>
            {/* <NewFormTaskList addNewTask={addNewTask}/> */}
            <ListTasks comments={props.comments} tasks={props.tasks} likeCommentA={props.likeComment} handleDeletComment={handleDeletComment} addNewComment={addNewComment} handleChangeTask={handleChangeTask} handleDeletTask={handleDeletTask} addNewTask={addNewTask} updateStatusTask={updateStatusTask}/>
        </>
    )
}

const mapStateToProps = state => ({
    tasks: state.tasks,
    comments: state.comments
});
export default connect(mapStateToProps, {addTask, editTask,deleteTask,addComment,deleteComment,likeComment})(App);