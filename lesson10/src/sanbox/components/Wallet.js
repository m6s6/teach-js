import * as React from 'react';
import {useState, useEffect} from "react";

const Wallet=props=>{
    const[walletConfig,setWallet]=useState({
        money:4500,
        onePayLimit: 1000,
        messageWallet: "Рады Вас видет"
    })
    const spentMoney=()=>{
        const randomPurchase = Math.round(3000*Math.random());
        console.log(randomPurchase);
        if(walletConfig.onePayLimit>=randomPurchase&&walletConfig.money>=randomPurchase){
            setWallet({...walletConfig,messageWallet:walletConfig.messageWallet="Покупка совершена удачно",money:walletConfig.money=walletConfig.money-randomPurchase})
        }else if(walletConfig.onePayLimit<randomPurchase){
            setWallet({...walletConfig,messageWallet:walletConfig.messageWallet="Слишком дорого! Ты не можешь позволить это!"});
        } if(walletConfig.money<randomPurchase){
            setWallet({...walletConfig,messageWallet:walletConfig.messageWallet="Не достаточно средств на карте!"});
        }
    }
    return(
        <div>
            <div>Баланс карты: {walletConfig.money} руб.</div>
            <p>{walletConfig.messageWallet}</p>
            <div><button onClick={spentMoney}>совершить покупку</button></div>
            <hr/>
        </div>
    )

}

export default Wallet;