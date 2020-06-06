import * as React from 'react';
import SubListTasksItem from './SubListTasksItem';
import NewFormTask from './NewFormTask';

const SubListTask =props=>{
    return(
        <div className={"list-item"} style={props.styleProperty}>
            <h2>{props.name} ({props.tasks.length})</h2>
            <div className="list-item-box">
                {/**Здесь будут выводится мои карточки */}
                {props.tasks.map(taskItem=><SubListTasksItem comments={props.comments.filter(comment=>comment.taskId===taskItem.id)} likeCommentA={props.likeCommentA}  handleDeletComment={props.handleDeletComment} addNewComment={props.addNewComment}  key={taskItem.id} handleChangeTask={props.handleChangeTask}  {...taskItem} handleDeletTask={props.handleDeletTask} updateStatusTask={props.updateStatusTask}/>)}
                <NewFormTask addNewTask={props.addNewTask} status={props.name}/>
            </div>
        </div>
    )
}

export default SubListTask;