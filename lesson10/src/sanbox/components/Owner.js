import * as React from 'react';
import {useState, useEffect} from "react";

// class Owner extends React.Component{
//     render(){
//         return(
//             <div className="owner">
//                 <div><b>Владелец карты: </b>{this.props.name} {this.props.surname}</div>
//                 <div>Адрес электронной почты: {this.props.email}</div>
//             </div>
//         )
//     }

// }

const Owner = props=>{
    return(
        <div className="owner">
            <div><b>Владелец карты: </b>{props.name} {props.surname}</div>
            <div>Адрес электронной почты: {props.email}</div>
        </div>
    )
}


export default Owner;