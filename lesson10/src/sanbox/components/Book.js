import * as React from 'react';

// class Book extends React.Component{
//     render(){
//         return(
//             <div>
//                 <h2>{this.props.name}</h2>
//                 <hr/>
//                 <div>Автор книги: {this.props.nameAuthor}</div>
//                 <div>Жанр книги: {this.props.genre}</div>
//                 <div>Цена за книгу: {this.props.price} руб.</div>
//                 <div>Количество страниц: {this.props.pages}</div>
//             </div>
//         )
//     }
// }

const Book = props=>{
    const{name,nameAuthor,genre,price,pages}=props;
    return(
        <div>
            <h2>{name}</h2>
            <hr/>
            <div>Автор книги: {nameAuthor}</div>
            <div>Жанр книги: {genre}</div>
            <div>Цена за книгу: {price} руб.</div>
            <div>Количество страниц: {pages}</div>
        </div>
    )
}

export default Book;