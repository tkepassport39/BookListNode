// eslint-disable-next-line
import React, {Component} from 'react';
// help bind apollo to REACT
import { useQuery } from '@apollo/react-hooks';
import {getBookQuery} from '../queries/queries';

const BookDetails = () => {

    const { loading, error, data } = useQuery(getBookQuery);
  
    if (loading) {
        return <p>Loading Book Details...</p>;
    }
    if (error) return (<p>** Error **</p>);

    //const { books } = data;
    /*
    const bookListItems = books.map(({ id, name}) => {
        return <li key= {id}> {name} </li> 
    });
    */
    return(
        <div id="book-details">
            <p> output book details here</p>
        </div>
    )
    
    // below would cause a error on console saying keys need to be unique. Fixed with code up top.
    /*return data.books.map(({ id, name}) => (
        <div>
            <ul id="book-list">
                <li key= {id}> {name} </li>
            </ul>
        </div>
    ));
    */

};

export default BookDetails;