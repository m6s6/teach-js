import * as React from 'react';
import {useState, useEffect} from "react";

// class Bank extends React.Component{
//     render(){
//         return(
//             <div className="bank">
//                 <img src={this.props.logo} alt={this.props.name}></img>
//                 <div>Наименование банка: {this.props.name}</div>
//                 <div>БИК банка: {this.props.beck}</div>
//             </div>
//         )
//     }

// }

const Bank=props=>{
    return(
        <div className="bank">
            <img src={props.logo} alt={props.name}></img>
            <div>Наименование банка: {props.name}</div>
            <div>БИК банка: {props.beck}</div>
        </div>
    )
}

export default Bank;