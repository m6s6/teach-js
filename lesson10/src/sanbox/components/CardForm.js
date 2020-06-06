import * as React from 'react';
import BankCard from './bankCard';
import Owner from './Owner';
import {useState, useEffect} from "react";


const CardForm = props=>{
    const [cardForm,setCardForm] = useState({
        name:"",
        surname:'',
        email:''
    })
    const [randomNumber,setRandom]=useState('')
    const numberCard = ()=>{
        let sumNumber=''
        for(let i=0;i<4; i++){
            let part = String(Math.floor(9*Math.random()));
            sumNumber = sumNumber+part
        }
        setRandom(sumNumber);
       
    }
    
    const inputChange = e =>{
        
        numberCard();

        if(e.target.name ==='name'){
            setCardForm({...cardForm,name:e.target.value})
        }else if(e.target.name ==='surname'){
            setCardForm({...cardForm,surname:e.target.value})
        }else if(e.target.name ==='email'){
            setCardForm({...cardForm,email:e.target.value})
            
        }
        
        
    }
    const formSubmit = e => {
        
        e.preventDefault();
        console.log(cardForm,randomNumber);
        props.getNewCard(cardForm,randomNumber);
        setCardForm({
            name:"",
            surname:'',
            email:''
        });
        setRandom('');
    }
    return(
        <div>
            <h3>Открыть карту в банке Тинькофф</h3>
            <form onSubmit={formSubmit}>
          
                
                <input onChange={inputChange} type='text'  name='name' value={cardForm.name} placeholder='введите ваше имя'></input>
                <input onChange={inputChange} type='text' name='surname' value={cardForm.surname} placeholder='введите фамилию'></input>
                <input onChange={inputChange} type='text' name='email' value={cardForm.email} placeholder='введите емаил'></input>
              
                <button type='submit'>создать карту</button>
            </form>
            
            <hr/>

        </div>
    )
}

export default CardForm;