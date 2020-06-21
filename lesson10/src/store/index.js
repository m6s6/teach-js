import {combineReducers, createStore} from 'redux';
import {taskReducer} from './tasks/reducers';
import {commentsReducer} from './comments/reducers';
import mainReducer from './main/reducers';

const rootReducer = combineReducers({
    tasks:taskReducer,
    comments:commentsReducer,
    main: mainReducer
});

const configurationStore = ()=>createStore(rootReducer);
// {
//     const store = createStore(rootReducer);

//     return store;
// }

export default configurationStore;