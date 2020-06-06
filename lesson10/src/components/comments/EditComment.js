import * as React from 'react';
import {useState} from 'react';


const EditComment = props =>{
    const [newTextComment,getNewTextComment]= useState('');

    const hundleChangeComment=e=>{
        getNewTextComment(e.target.value)
    }

    const hundleSubminComment=e=>{
        e.preventDefault();
        props.addTextNewComment(newTextComment)
        getNewTextComment('')
    }


    return(
        <div className='edit-comment'>
            <form onSubmit={hundleSubminComment}>
                <input  onChange={hundleChangeComment} type='text' value={newTextComment} placeholder='новый коментарий'></input>
                {/* <button type='submit'>оставить комментарий</button> */}
            </form>
            <hr/>
        </div>
    )
}

export default EditComment;