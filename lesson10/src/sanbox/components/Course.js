import * as React from 'react';
import Teacher from './Teacher';
import School from './School';

class Course extends React.Component{
    render(){
        return(
            <div>
                <h2>{this.props.name}</h2>
                <hr/>
        <div>Курс будет проходить {this.props.longTime} месяцев</div>
        <div>Стоимость курса: {this.props.price} руб.</div>
        <Teacher {...this.props.teacher}/>
        <School{...this.props.school}/>
            </div>
        )
    }
}

export default Course;