import moment from "moment";

const initialState = [
    {
        text:"Важная задача",
        date:1591391997359,
        taskId:1,
        id:1,
        likes:0
    }
]; 

const commentsReducer = (state = initialState, action)=>{
    switch (action.type){
        case 'ADD_COMMENT':
            return [...state,action.comment];
        case 'DELETE_COMMENT':
            return state.filter(comment=>comment.id!==action.id);
        case 'LIKE_COMMENT':
            return state.map(comment=>{ 
                if(comment.id!=action.id){
                    return comment
                } else{
                    comment.likes++
                    return comment;
                }
            });
            
        default:
            return state;
    }
}

export {commentsReducer};