// eslint-disable-next-line
import React, {Component} from 'react';
// help bind apollo to REACT
import { useQuery } from '@apollo/react-hooks';
import {getBooksQuery} from '../queries/queries';

// query moved to ../queries/queries
/*const getBooksQuery = gql`
    {
        books{
            name
            id
        }
    }

`;
*/
// create a function Component
const BookList = () => {

    const { loading, error, data } = useQuery(getBooksQuery);
  
    if (loading) {
        return <p>Loading Books...</p>;
    }
    if (error) return (<p>** Error **</p>);

    const { books } = data;

    const bookListItems = books.map(({ id, name}) => {
        return <li key= {id}> {name} </li> 
    });

    return(
        <div>
            <ul id="book-list">
                {bookListItems} 
            </ul>
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

export default BookList;
