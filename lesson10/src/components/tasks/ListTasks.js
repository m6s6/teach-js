import * as React from 'react';
import {useState, useEffect} from "react";
import SubListTask from './SubListTask';
import ActivityList from '../comments/ ActivityList';

const ListTaskStyle ={
    listStyle:{
        display: 'flex',
        justifyContent:'start',
        alignItems:'flex-start',
        flexWrap:'wrap'
    },
    subListTaskStyle:{
        width:'30%',
        border:'2px solid black' ,
        padding: '5px',
        boxSizing: "border-box",
        margin:'10px'
    }
}

const ListTasks =props=>{
    const todoList = props.tasks.filter(task=>task.status==='todo');
    const progressList = props.tasks.filter(task=>task.status==='progress');
    const completeList = props.tasks.filter(task=>task.status==='complete');

    const todoListComments = props.comments.filter(comment=>todoList.map(task=>task.id).includes(comment.taskId));
    const progressListComments = props.comments.filter(comment=>progressList.map(task=>task.id).includes(comment.taskId));
    const completeListComments = props.comments.filter(comment=>completeList.map(task=>task.id).includes(comment.taskId));

    const listComments = props.comments.map(comment=>{
            for (const task of props.tasks){
                if(comment.taskId === task.id){
                    const nameTask = task.name;
                    const listComment = {...comment, nameTask};
                    return listComment
                }
            }
            
        });

    return( 
        <>
            <div className="lists" style={ListTaskStyle.listStyle}>
                <SubListTask styleProperty={ListTaskStyle.subListTaskStyle} name="todo" likeCommentA={props.likeCommentA} addNewComment={props.addNewComment} handleDeletComment={props.handleDeletComment} comments={todoListComments} tasks={todoList} handleChangeTask={props.handleChangeTask}  handleDeletTask={props.handleDeletTask} addNewTask={props.addNewTask} updateStatusTask={props.updateStatusTask}/>
                <SubListTask styleProperty={ListTaskStyle.subListTaskStyle} name="progress" likeCommentA={props.likeCommentA} addNewComment={props.addNewComment} handleDeletComment={props.handleDeletComment} comments={progressListComments} tasks={progressList} handleChangeTask={props.handleChangeTask} handleDeletTask={props.handleDeletTask} addNewTask={props.addNewTask} updateStatusTask={props.updateStatusTask}/>
                <SubListTask styleProperty={ListTaskStyle.subListTaskStyle} name="complete" likeCommentA={props.likeCommentA} addNewComment={props.addNewComment} handleDeletComment={props.handleDeletComment} comments={completeListComments} tasks={completeList} handleChangeTask={props.handleChangeTask} handleDeletTask={props.handleDeletTask} addNewTask={props.addNewTask} updateStatusTask={props.updateStatusTask}/>

            </div>
            <ActivityList  likeCommentA={props.likeCommentA} handleDeletComment={props.handleDeletComment} comments={listComments}/>
        </>
    )
}


export default ListTasks;