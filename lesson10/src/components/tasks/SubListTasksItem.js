import * as React from 'react';
import {useState} from 'react';
import EditTask from './EditTask';
import ListComments from '../comments/ListComments';
import EditComment from '../comments/EditComment';

const SubListTasksItem =props=>{
    const handleChangeStatus=newStatus=>{
        console.log(newStatus, props.id);
        props.updateStatusTask(newStatus,props.id,props.name, props.deadline, props.description)
    }
    const [variable, changeVariable]= useState(false)

    const handleClickName= ()=>{
        changeVariable(!variable);
    }

    const changeTask=(taskName,taskDeadline,taskDescription)=>{
        props.handleChangeTask(props.status, props.id, taskName,taskDeadline,taskDescription)
        changeVariable(!variable);
    }

    const  addTextNewComment = newText=>{
        props.addNewComment(newText, props.id) 
    }

    return(
        <div className="list=item-box-item ">
             
                {
                    !variable
                        ?<div onClick={handleClickName} className="list=item-box-item-name">{props.name}</div>
                        :
                        <>
                            <EditTask changeTask={changeTask} valueText={props.name} valueDeadline={props.deadline} valueDescription={props.description}/>
                            <ListComments addTextNewComment={addTextNewComment} likeCommentA={props.likeCommentA} handleDeletComment={props.handleDeletComment} comments={props.comments}/>
                            <EditComment addTextNewComment={addTextNewComment} />
                        </> 
                }
            
          
            <button onClick={(e)=>handleChangeStatus("todo")} >todo</button>
            <button onClick={(e)=>handleChangeStatus("progress")}>progress</button>
            <button onClick={(e)=>handleChangeStatus("complete")}>complete</button>
            <button onClick={(e)=>props.handleDeletTask(props.id)}>удалить</button>
            
        </div>
    )
}

export default SubListTasksItem;