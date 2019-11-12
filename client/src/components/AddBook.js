// eslint-disable-next-line
import React, {Component, useState} from 'react';
import { getAuthorsQuery } from '../queries/queries';
// help bind apollo to REACT
import { useQuery } from '@apollo/react-hooks';

// query moved to ../queries/queries
/*
const getAuthorsQuery = gql`
    {
        authors{
            name
            id
        }
    }

`;
*/
// function component
const AddBook = () => {

    /*constructor(props){
        super(props);
        this.state = {
            name: '',
            genre: '',
            authorId: ''
        };
    };
    */
    const [bookName, setName] = useState('');
    const [bookGenre, setGenre] = useState('');
    const [bookAuthorId, setAuthorId] = useState('');

    const { loading, error, data } = useQuery(getAuthorsQuery);

    if (loading) return <p>Loading Authors...</p>;
    if (error) return <p>Error</p>;

    const AuthorsList = data;

    const displayAuthors = AuthorsList.authors.map(({ id, name}) => {
        return (
            <option key={id} value={id}> {name} </option>
        );
    });


    const nameChange = event => {
        setName(event.target.value);
    }

    const genreChange = event => {
        setGenre(event.target.value);
    }

    const authorChange = event => {
        setAuthorId(event.target.value);
    }

    return(
        <form id="add-book">

            <div className="field">
                <label>Book name:</label>
                <input value={ bookName } type="text" onChange={ nameChange } />
            </div>

            <div className="field">
                <label>Genre:</label>
                <input value={ bookGenre } type="text" onChange={ genreChange } />
            </div>

            <div className="field">
                <label>Author:</label>
                <select defaultValue={'default'} onChange={ authorChange } >
                <option value="default" hidden disabled >Select author</option>
                    {displayAuthors}
                </select>
            </div>

            <button>+</button>

        </form>
    )
};

export default AddBook;