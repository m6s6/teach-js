const addComment = (commentData)=>{
    return{
        type:'ADD_COMMENT',
        comment:{...commentData}
    }
    
}

const deleteComment = id =>{
    return{
        type:'DELETE_COMMENT',
        id:id
    }
}

const likeComment = id =>{
    return{
        type:'LIKE_COMMENT',
        id:id
    }
}

export {addComment,deleteComment,likeComment};