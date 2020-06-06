
const initalState = [
    {
        id:1,
            name:"Сделать первый проект",
            deadline:'2020-06-15',
            description:'Первый проект по теме React',
            status: 'todo'
    }
]


const taskReducer = (state=initalState, action)=>{
    switch (action.type){
        case 'ADD_TASK':
            return [...state,action.task];

        case 'EDIT_TASK':
            const newTask = [...state];
            for(const task of newTask){
                if(task.id===action.id){
                    task.status=action.newStatus;
                    task.name=action.newName;
                    task.deadline=action.newDeadline;
                    task.description=action.newDescription
                    break
                }
            }
            return newTask;

            
        case 'DELETE_TASK':
            return state.filter(task=>task.id!==action.id);
        // case 'NEW_TASK':
        //     return [...state, action.task]

        default:
            return state;
    }
}

export {taskReducer};