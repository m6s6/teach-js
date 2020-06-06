import * as React from 'react';


class Teacher extends React.Component{
 render(){
     return(
        <div className="teacher"> Курс будет вести: {this.props.name} {this.props.surname}</div>
     )
 }
}

export default Teacher;