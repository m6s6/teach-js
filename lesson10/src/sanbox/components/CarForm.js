import * as React from 'react';
import {useState} from "react";


const CarForm = props=>{
    const [formData,changeForm]=useState({
        carMark:'',
        carName:'',
        limitSpeed:""

    })
    const [cars,changeCars]=useState([])
    const inputChange = e=>{
        if(e.target.name==='carMark'){
            changeForm({...formData,carMark:e.target.value.length<=9?e.target.value:formData.carMark})
        }else if(e.target.name==='carName'){
            changeForm({...formData,carName:e.target.value.length<=8?e.target.value:formData.carName})
        }else if(e.target.name==='limitSpeed'){
            changeForm({...formData,limitSpeed:e.target.value})
        }
        // changeForm({...formData,...{[e.target.name]:e.target.value}})
    }
    const formSubmit = e => {
        e.preventDefault();
        changeCars([...cars,{...formData, key:Date.now()}]);
        changeForm({
            carMark:'',
            carName:'',
            limitSpeed:""
        })
        console.log('попытка отправить форму')
    }
    return(
        <>
            <form onSubmit={formSubmit}>
                <input onChange={inputChange} type="text" name = "carMark" value={formData.carMark} placeholder='Марка машины'/>
                <input onChange={inputChange} type="text" name = "carName" value={formData.carName} placeholder='Модель машины'/>
                <input onChange={inputChange} type= 'number' name="limitSpeed" value={formData.limitSpeed} placeholder="макс. скорость"/>
                <button type="submit">Добавить машину</button>

            </form>
            <ul>
                {cars.map(carItem=><li key={carItem.key}>Марка автомобиля: {carItem.carMark}, модель автомобиля: {carItem.carName}, максимальная скорость: {carItem.limitSpeed} км/ч</li>)}
            </ul>
            <hr/>
        </>
    )
}


export default CarForm;