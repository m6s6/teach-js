import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App'; 
import configurationStore from './store';
import {Provider} from 'react-redux'


const store = configurationStore ();

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
document.getElementById('root'));














// import {createStore} from 'redux';

// const add = (state={
//     count:0
// }, action)=>{
//     switch(action.type){
//         case "ADD":
//             return {...state, count:state.count +action.num}
//         case "MINUS":
//             return {...state, count:state.count -action.num}
//         default:
//             return state;
//     }
    
// } 

// let store = createStore(add);
// store.subscribe(()=>console.log(store.getState()));
// store.dispatch({type:'ADD',num:10});
// store.dispatch({type:'ADD',num:20});
// store.dispatch({type:'MINUS', num:10});
// setInterval(()=>{
//     store.dispatch({type:'ADD'}); 
// },1000);
