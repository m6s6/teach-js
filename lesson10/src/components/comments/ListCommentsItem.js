import * as React from 'react';
import {useState} from 'react';

const ListCommentsItem = props=>{

    return(
        

        <li>
                {
                    props.activity
                        ?<span>{props.text}-{props.nameTask}-{props.date}</span>
                        :<span>{props.text}-{props.date}</span>
                }
                
                { 
                    props.likes===0
                        ?<></>
                        :<span>({props.likes})</span>
                }
            <button onClick={e=>props.likeCommentA(props.id)}>👍🏻</button>
            <button onClick={e=>props.handleDeletComment(props.id)}>Х</button>
        </li>
    )
}

export default ListCommentsItem;