import * as React from 'react';
import User from './components/User';
import Book from './components/Book';
import Course from './components/Course';
import BankCard from './components/bankCard';
import Preloader from './components/Preloader';
import UserList from './components/UserList';
import BankCardList from './components/BankCardList';
import Car from './components/Car';
import Wallet from './components/Wallet';
import CarForm from './components/CarForm';
import CardForm from './components/CardForm';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            // message:"Привет, Мир! ",
            // count: 0,
            book:null,
            course: null,
            users:null,
            courseShow: true,
            hideShowButtonName:'скрыть курс',
            bankCard:null,
            

        }
        this.handleClick=this.handleClick.bind(this);
        this.hideCourse=this.hideCourse.bind(this);
        this.handleClickShuffle=this.handleClickShuffle.bind(this);
        // setInterval(() => {
        //     this.setState({count:this.state.count+1});
        //     this.setState({book:{...this.state.book,price:this.state.book.price+1}})
        // }, 1000);
    }
    // componentDidMount(){
    //     setTimeout(() => {
    //         fetch('/bankCard.json')
    //             .then(result=>result.json())
    //             .then(data=>{
    //                 this.setState({bankCard:[...data]})
    //             });
    //         // fetch('/data.json')
    //         //     .then(result=>result.json())
    //         //     .then(data=>{
    //         //         this.setState({book:{...data.book}})
                    
    //         // });
    //         // fetch('/course.json')
    //         //     .then(result=>result.json())
    //         //     .then(data=>{
    //         //         this.setState({course:{...data,show:true}})
    //         //     });
    //         // fetch('/users.json')
    //         //     .then(result=>result.json())
    //         //     .then(data=>{
    //         //         this.setState({users:[...data]})
    //         //     })
    //     }, 2000);
       
    // }
    componentDidUpdate(){
        console.log('компонент изменился DidUpdate');
    }
    handleClick(e){
        console.log('произошел клик');
        this.setState({book:{...this.state.book, name:"История библии"}});
    }
    hideCourse(e){
        
        this.setState({
            course:{...this.state.course, show: !this.state.course.show },
            hideShowButtonName:this.state.course.show?'показать курс':'скрыть курс'
        });
    }
    handleClickShuffle(){
        const newUsers = [...this.state.users];
        newUsers.sort((a,b)=>0.5-Math.random());
        this.setState({users: newUsers})
    }

    render(){
        console.log('загрузка рендера...');
        
        return(
            <>
                {/* <Car/>
                <CarForm/> */}
                {/* <Wallet/> */}
                
                {/*                 
                <div>{this.state.message}</div>
             <div>Счетчик: {this.state.count}</div>  */}
                 {/* {
                    this.state.users===null
                        ?<Preloader/>
                        :<UserList users={this.state.users}/>
                        
                    }
                <button onClick={this.handleClick}>Кликни на меня</button>
                <button onClick={this.hideCourse}>{this.state.hideShowButtonName}</button>
                <button onClick={this.handleClickShuffle}>перемешать пользователей</button>
                {
                    this.state.book===null
                    ?<Preloader/>
                    :<Book {...this.state.book}/>
                } */}
                
                 {/* <Course name={this.state.course.name} longTime={this.state.course.longTime} price={this.state.course.price} nameTeacher={this.state.course.teacher.name+" "+this.state.course.teacher.surname}/> */}
                {/* {
                    this.state.course===null
                        ?<Preloader/>
                        :this.state.course.show
                            ?<Course {...this.state.course}/>
                            :null
                } */}

                    
                    <BankCardList/>
                    

            </>
        )
    }
}


export default App;