import * as React from 'react';
import ListCommentsItem from './ListCommentsItem';


const ListComments = props=>{

    return(
        <div className='comments '>
            <ul>
                {props.comments.map(comment=><ListCommentsItem likeCommentA={props.likeCommentA} handleDeletComment={props.handleDeletComment} key={comment.id} {...comment}/>)}
            </ul>
            
        </div>
    )
}

export default ListComments;