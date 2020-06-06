import * as React from 'react';
import { useState, useEffect } from 'react';
import moment from 'moment';
import ListTasks from './components/ListTasks';
import NewFormTask from './components/NewFormTask';
import { connect } from 'react-redux';
import { editTask, deleteTask, newTask, editTaskName } from './store/tasks/actions';
import { addComment, deleteComment, likeComment } from './store/comments/actions';
import ListComments from "./components/comments/ListComments";
import './styles/App.scss';
/*
    Статус может быть одним из:
        - todo
        - progress
        - complete
*/

const styles = {
    comments: {
       margin: '15px 0 0'
    }
};

const App = props => {

    const [sort, setSort] = useState('date');
    const [order, setOrder] = useState('asc');

    let comments = props.comments.map(item =>
        ({
            ...item, text: `${item.text} - ` +
                (props.tasks.find(task => task.id === item.taskID)?.name || '') + ` - ` +
                moment(item.date).format('DD.MM.yyyy HH:mm')
        })
    );

    comments.sort(( a, b ) =>
        (parseInt(a[sort]) > parseInt(b[sort]) ? 1 :
            parseInt(a[sort]) < parseInt(b[sort]) ? -1 :
                0) * (order === 'asc' ? 1 : -1)
    );
    //     if(order === 'asc'){
    //        if(parseInt(a[sort]) > parseInt(b[sort])){
    //            return 1;
    //        }
    //        else if(parseInt(a[sort]) < parseInt(b[sort])) {
    //            return -1;
    //        }
    //        else {
    //            return 0;
    //        }
    //     }
    //     else {
    //         if(parseInt(a[sort]) < parseInt(b[sort])){
    //             return 1;
    //         }
    //         else if(parseInt(a[sort]) > parseInt(b[sort])) {
    //             return -1;
    //         }
    //         else {
    //             return 0;
    //         }
    //     }
    // });

    const addNewTask = taskName => {
        const newTaskData = {
            id: Math.floor(Math.random() * 9999999999),
            name: taskName,
            deadline: null,
            description: null,
            status: 'todo'
        }

        props.newTask(newTaskData);
    }

    const handleDeleteTask = id => {
        props.deleteTask(id);
    }

    const updateStatusTask = ( newStatus, id ) => {
        props.editTask(newStatus, id);
    }
    const handleChangeTask = ( id, taskData ) => {
        props.editTaskName(taskData, id);
    }

    const changeSort = sortName => {
        if (sortName === sort) {
            setOrder(order === 'asc' ? 'desc' : 'asc');
        } else {
            setSort(sortName);
            setOrder('asc');
        }
    };

    return (
        <>
            <header>
                <h1>Аналог Trello</h1>
            </header>
            {/* 
                - Нужно организовать управляемый компонент NewFormTask
                - По кнопке "Добавить задачу" она должна стать частью состояния tasks
                - По-умолчанию todo
                - Дедлайн - пустой, Описание пустое, ID-ик - случайный (100000000)
            */}
            <NewFormTask addNewTask={addNewTask}/>
            <ListTasks comments={props.comments}
                       likeCommentAction={props.likeComment}
                       deleteCommentAction={props.deleteComment}
                       addCommentAction={props.addComment}
                       tasks={props.tasks}
                       handleDeleteTask={handleDeleteTask}
                       updateStatusTask={updateStatusTask}
                       handleChangeTask={handleChangeTask}/>
            <div className={'Comment'}>
                <h3>Комментарии</h3>
                <div onClick={() => changeSort('date')} className={`filter ${order}`}>по дате</div>
                <div onClick={() => changeSort('likes')} className={`filter ${order}`}>по лайкам</div>
                <ListComments comments={comments}
                              likeCommentAction={props.likeComment}
                              deleteCommentAction={props.deleteComment}/>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    tasks: state.tasks,
    comments: state.comments
});
export default connect(mapStateToProps, {
    editTask,
    deleteTask,
    newTask,
    editTaskName,
    addComment,
    deleteComment,
    likeComment
})(App);

/**
 *
 * {
 *  tasks:[]
 * }
 */