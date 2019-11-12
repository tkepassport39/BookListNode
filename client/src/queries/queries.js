import {gql} from 'apollo-boost';

/*
    place for all my queries to call from components
*/

const getBooksQuery = gql`
    {
        books{
            name
            id
        }
    }

`;

const getAuthorsQuery = gql`
    {
        authors{
            name
            id
        }
    }

`;

export {getAuthorsQuery, getBooksQuery};