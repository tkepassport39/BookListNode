// eslint-disable-next-line
import React, {Component} from 'react';
// help bind apollo to REACT
import { useQuery } from '@apollo/react-hooks';
import {getBookQuery} from '../queries/queries';

const BookDetails = ({bookId}) => {
    // if no bookId (which happens first time app runs) then ignore the useQuery function
    const { loading, error, data } = useQuery(getBookQuery, {
        variables: {
            id: bookId
        },
        skip: !bookId,
    });

    let bookContent;
  
    if (loading) {
        bookContent = <p>Loading Book Details...</p>;
    }
    else if (error) {
        bookContent = <p>** Error **</p>;
    }
    else if (!bookId){
        bookContent = <p>There is no book selected...</p>
    }
    else {
        // extract below keys from data so that we can call them by the key name 
        const {
            book: {name, genre, author}
        } = data

        // look through the books array and output each value 
        const books = author.books.map(({id, name}) => {
            return <li key={id}>{name}</li>
        })

        // short hand fragments when no parent element
        bookContent = (
            <>
            <h2>{name}</h2>
            <p><b>Genre: </b> {genre}</p>
            <p><b>Author: </b>{author.name}</p>
            <p><b>Book List: </b></p>
            <ul className="other-books"> {books} </ul>
            </> 
        );
    }

    // peak at how the data looks
    //console.log(data)

    return(
        
        <div id="book-details">
            {bookContent}

        </div>
    );
    
};

export default BookDetails;