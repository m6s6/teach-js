import * as React from 'react';


// class Preloader extends React.Component{
//  render(){
//      return(
//         <div className="preloader"> 
//             <img src="./image/loading.gif" alt="Загрузка данных......"></img>
//         </div>
//      )
//  }
// }

const Preloader = (props)=>{
    return(
        <div className="preloader"> 
            <img src="./image/loading.gif" alt="Загрузка данных......"></img>
        </div>
    )
}

export default Preloader ;