import * as React from 'react';

class School extends React.Component{
    render(){
        return(
            <div className="school">
                <ul>
        <li>Школа {this.props.name}</li>
        <li>Наш адрес: {this.props.address}</li>
        <li>Наш сайт: {this.props.site}</li>
                </ul>
            </div>
        )
    }
}

export default School;