import * as React from 'react';
import {useState, useEffect} from "react";
import moment from 'moment';
import ListTasks from './components/tasks/ListTasks';
import {connect} from 'react-redux';
import {addTask,editTask,deleteTask} from './store/tasks/actions';
import {addComment,deleteComment,likeComment} from './store/comments/actions';
import {login} from "./store/main/actions";
import Authorize from './components/tasks/Authorize';
/**
 * Статусы могут быть:
 *-todo
 *-progress
 *-complete 
 *
 */

const App = props=>{
    useEffect(()=>{
        if(props.token){
            let isToken;
            fetch('http://localhost:5000/check',
                {
                    headers:{
                        'Token': props.token
                    }
                }
            ).then(res=>res.json()).then(({res})=>{
                if(res){
                    props.login('','',props.token);
                    isToken = res;
                }
            })
            
            fetch('http://localhost:5000/api/tasks',
                {
                    headers:{
                        'Token': props.token
                    }
                }
            ).then(res => res.json())
                .then(res => {
                    res.tasks.map(task => {
                        props.addTask({
                            id: task._id,
                            name: task.name,
                            deadline: task.deadline,
                            description: task.description,
                            status: task.status
                        });
                    });
                    res.comments.map(comment => {
                        props.addComment({
                            id: comment._id,
                            text: comment.text,
                            date: comment.date,
                            taskId: comment.taskId,
                            likes: comment.likes
                        });
                    })
                });
        }

       
    },[]);
    const addNewTask = taskName =>{
       
        
        const newTaskData = {
            // id: Math.floor(Math.random()*9999999),
            name:taskName.name,
            deadline:'',
            description:'',
            status:taskName.status
        }
        fetch(`http://localhost:5000/api/tasks`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({task: newTaskData})
        }).then(res => res.json()).then(res => {
            newTaskData.id = res._id;
            props.addTask(newTaskData);
        });
      
        // updateTasks([...tasks,newTask]);
        // props.addTask(newTaskData)
    };
    const addNewComment = (textComment, taskId)=>  {
        const newCommentData = {
            text:textComment,
            date:Date.now(),
            // id:Math.floor(Math.random()*9999999),
            taskId: taskId,
            likes:0
        }
        fetch(`http://localhost:5000/api/tasks/comments`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({comment: {...newCommentData}})
        }).then(res => res.json()).then(res => {
            newCommentData.id = res._id;
            props.addComment(newCommentData);
        });
        
        // props.addComment(newCommentData)
    }

    const updateTask = (id, newData) => {
        const task = {...props.tasks.find(item => item.id === id), ...newData};
        return fetch(`http://localhost:5000/api/tasks/${id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({task})
        });
    };
    const updateStatusTask=(newStatus, id,name,deadline,description)=>{
        updateTask(id, {status: newStatus}).then(() => {
            props.editTask(newStatus, id,name,deadline,description);
        });

        // props.editTask(newStatus, id,name,deadline,description);

    }
    const handleChangeTask=(status,id,newName,newDeadline, newDescription)=>{
        updateTask(id, {name: newName, deadline:newDeadline,description:newDescription}).then(() => {
            props.editTask(status,id,newName, newDeadline,newDescription);
        });
        // props.editTask(status,id,newName, newDeadline,newDescription)
    } 
    const handleDeletTask = id =>{
            fetch(`http://localhost:5000/api/tasks/${id}`, {
                method: 'delete'
            }).then(() => {
                props.deleteTask(id);
            });
            // props.deleteTask(id);
            
    }
    const likeCommentAction = id => {
        fetch(`http://localhost:5000/api/tasks/comments/${id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            props.likeComment(id);
        });
    };

    const handleDeletComment = id =>{
        fetch(`http://localhost:5000/api/tasks/comments/${id}`, {
            method: 'delete'
        }).then(() => {
            props.deleteComment(id);
        });
        // props.deleteComment(id);
}
   
    return(
        <>
            <header>
                <h1>Список задач</h1>
            </header>
            {/* <NewFormTaskList addNewTask={addNewTask}/> */}
            {
                
               props.isLogin
                ?<ListTasks comments={props.comments} tasks={props.tasks} likeCommentA={likeCommentAction} handleDeletComment={handleDeletComment} addNewComment={addNewComment} handleChangeTask={handleChangeTask} handleDeletTask={handleDeletTask} addNewTask={addNewTask} updateStatusTask={updateStatusTask}/>
                :<Authorize login={props.login}/>

            }
            
        </>
    )
}


const mapStateToProps = state => ({
    tasks: state.tasks,
    comments: state.comments,
    isLogin: state.main.isLogin,
    token: state.main.token
});
export default connect(mapStateToProps, {addTask, editTask,deleteTask,addComment,deleteComment,likeComment,login})(App);