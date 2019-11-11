// eslint-disable-next-line
import React, {Component} from 'react';
import {gql} from 'apollo-boost';
// help bind apollo to REACT
// eslint-disable-next-line
import { useQuery, RenderPromises } from '@apollo/react-hooks';

// queries
const getAuthorsQuery = gql`
    {
        authors{
            name
            id
        }
    }

`;

// class component
const AddBook = () => {

    const { loading, error, data } = useQuery(getAuthorsQuery);

    if (loading) return <p>Loading Authors...</p>;
    if (error) return <p>Error</p>;

    const AuthorsList = data;

    const displayAuthors = AuthorsList.authors.map(({ id, name}) => {
        return (
            <option key={id} value={id}> {name} </option>
        );
    });

    return(
        <form id="add-book">

            <div className="field">
                <label>Book name:</label>
                <input type="text" />
            </div>

            <div className="field">
                <label>Genre:</label>
                <input type="text" />
            </div>

            <div className="field">
                <label>Author:</label>
                <select>
                    <option value="" selected disabled hidden>Select author</option>
                    {displayAuthors}
                </select>
            </div>

            <button>+</button>

        </form>
    )
};

export default AddBook;