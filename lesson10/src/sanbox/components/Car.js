import * as React from 'react';
import {useState, useEffect} from "react";

const Car=props=>{
    const[speedConfig,setSpeed]=useState({
        currentSpeed: 0,
        limitSpeed:15,
        message:""
    });
    const[mileage,setMileage]=useState(0);
    useEffect(()=>{
        console.log("useEffect"),
        fetch('/carconfig.json')
            .then(result=>result.json())
            .then(data=>setSpeed({...data,message:"данные загружены"}))
    },[]);
    const handleSpeedChange = ()=>{
        speedConfig.currentSpeed!==speedConfig.limitSpeed
            ?setSpeed({...speedConfig,currentSpeed:speedConfig.currentSpeed+1,message:"скорость изменена"})
            :null
    }
    
    return(
        <div>
            Машина скорость {speedConfig.currentSpeed} км/ч, пробег {mileage} км.
            <p>{speedConfig.message}</p>
            <button onClick={handleSpeedChange}>Топим на газ!!!</button>
            <button onClick={()=>setMileage(mileage+10)}>накрутить пробег</button>
            <hr/>
        </div>
    )
}

export default Car;