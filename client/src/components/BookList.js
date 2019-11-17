// eslint-disable-next-line
import React, {Component, useState, useCallback, useEffect} from 'react';
// help bind apollo to REACT
import { useQuery } from '@apollo/react-hooks';
import {getBooksQuery} from '../queries/queries';

// components
import BookDetails from './BookDetails';

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
    // setup for item user selects
    const [bookSelect, setBookSelect] = useState('');
    
    if (loading) {
        return <p>Loading Books...</p>;
    }
    if (error) return (<p>** Error **</p>);

 
    //const { books } = data;
    //console.log({books})
    const handleClick = (prop) => e => {
        // grab the props id
        //console.log(prop.id)
        setBookSelect(prop.id)
    }

    
   const bookListItems = data.books.map(({ id, name}) => {
        return (
            <li key= {id} name="bookId" onClick={ handleClick({id}) }> {name}  </li>
        ) 
    });
    

    return(
        <div>
            <ul id="book-list">
                {bookListItems} 
            </ul>

            <BookDetails bookId={bookSelect} />
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
