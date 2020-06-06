import * as React from 'react';
import ListCommentsItem from './ListCommentsItem';
import {useState} from 'react';

const ActivityList = props=>{
    const listComments = props.comments;
    const [sort, setSort] = useState('date');
    const [order, setOrder] = useState('asc');
    // const sortCommentsDate =(Val)=>{
    //     listComments.sort((a,b)=>b.Val - a.Val);
    //     console.log(listComments)
        
    // }
    // const sortCommentsLike =()=>{
    //     listComments.sort((a,b)=>b.likes - a.likes);
    //     console.log(listComments)
    // }
    listComments.sort(( a, b ) =>
    (parseInt(a[sort]) > parseInt(b[sort]) ? 1 :
        parseInt(a[sort]) < parseInt(b[sort]) ? -1 :
            0) * (order === 'asc' ? 1 : -1)
    );
    const changeSort = sortName => {
        if (sortName === sort) {
            setOrder(order === 'asc' ? 'desc' : 'asc');
        } else {
            setSort(sortName);
            setOrder('asc');
        }
    };
    return (
        <div>
            <h3>Коментарии</h3>
            <div>
                <button onClick={()=>changeSort('date')}>по дате</button> 
                <button onClick={()=>changeSort('likes')}>по лайкам</button>
            </div>
            <ul>
                 {listComments.map(comment=><ListCommentsItem activity={true} likeCommentA={props.likeCommentA} handleDeletComment={props.handleDeletComment} key={comment.id} {...comment}/>)}
            </ul>
        </div>
    )
}

export default ActivityList;