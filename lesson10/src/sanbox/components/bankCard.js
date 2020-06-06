import * as React from 'react';
import Bank from './Bank';
import Owner from '../components/Owner';
import {useState, useEffect} from "react";

// class BankCard extends React.Component{
//     constructor(props){
//         super(props);
//         this.state={
//             nameButton:'показать',
//             show: true
//         };
//         this.showBalance= this.showBalance.bind(this)

//     }
//     showBalance(){
//         this.setState({
//             show:!this.state.show,
//             nameButton:this.state.show?"скрыть":'показать'
//         })
//     }
//     render(){
//         return(

//             <div className = "bankCard">
//                 <Bank {...this.props.bank}/>
//                 <div>
//                     Номер карты: **** **** **** {this.props.number}
                    
//                 </div>
//                 <div>
//                     Баланс: {this.state.show?"*******":this.props.balance} руб. 
//                     <button onClick={this.showBalance}>{this.state.nameButton}</button>
//                 </div>
//                 <Owner {...this.props.owner}/>
//             </div>
//         )
//     }
// }
const BankCard = props=>{
    const [card, setCard] = useState({
        balance:props.balance,
        number:props.number
    })
    const [showBal, setShowBal]=useState({
        nameButton:'показать',
        show: true
    })
    const showBalance=()=>{
        setShowBal({...showBal,show:!showBal.show,nameButton:showBal.show?"скрыть":'показать' })
       
    }
    const cashBack=()=>{
        const cash = Math.round(3000*Math.random());
        setCard({...card,balance:card.balance+cash})
    }
   
    return(
        
        <div className = 'bankCard'>
            <Bank {...props.bank}/>
            <div>
                Номер карты: **** **** **** {card.number}
                
            </div>
            <div>
                Баланс: {showBal.show?"*******":card.balance} руб. 
                <button onClick={showBalance}>{showBal.nameButton}</button>
            </div>
            <div><button onClick={cashBack}>Начислить кешбэк</button></div>
            {
               props.owner==='null'?<></>: <Owner {...props.owner}/>
            } 
        </div>
    )
    
}
export default BankCard;