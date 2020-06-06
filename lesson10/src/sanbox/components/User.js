import * as React from 'react';

class User extends React.Component{
    render(){
        return(
            <div>
                <h2>{this.props.name}</h2>
                <hr/>
                <div>Возраст: {this.props.age}</div>
                <div>Профессия: {this.props.skill}</div>
                <hr/>
            </div>
            
        )
    }
}

export default User;