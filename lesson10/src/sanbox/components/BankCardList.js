import * as React from 'react';
import BankCard from './bankCard';
import {useState, useEffect} from "react";
import Preloader from './Preloader';
import CardForm from './CardForm';


const BankCardList = props=>{

    const [bankCards,setBankCards]=useState([]);
    useEffect(()=>{
        console.log("useEffect"),
        setTimeout(() => {
            fetch('/bankCard.json')
                .then(result=>result.json())
                .then(data=>setBankCards([...data]))
                
        },2000);
    },[]);
    const getNewCard=(newCardParam,newNumber)=>{
        const NewCard ={
            number: newNumber,
            balance: 50000,
    
            owner:{
                name:newCardParam.name,
                surname:newCardParam.surname,
                email:newCardParam.email
            },
            bank:{
                name:"Tinkoff",
                beck: 67235769,
                logo:"./image/tinkoff.jpg"
            }
        }
        setBankCards([...bankCards,NewCard])
    }
    return(

        <div>
            <CardForm getNewCard={getNewCard}/> 
            {
                
                bankCards.length===0
                    ?<Preloader/>
                    :bankCards.map(cardItem=><BankCard key={cardItem.number}{...cardItem}/>)
            }
        </div>
    )
}

export default BankCardList;