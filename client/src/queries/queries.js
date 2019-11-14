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

export const addBookMutation = gql`
    mutation($name: String!, $genre: String!, $authorId: ID!){
        addBook(name: $name, genre: $genre, authorId: $authorId){
            name
            id
        }
    }

`

export const getBookQuery = gql`
    query($id: String!){
        book(id: $id){
            id
            name
            genre
            author{
                id
                name
                age
                books{
                    name
                    id
                }
            }
        }
    }

`;

export {getAuthorsQuery, getBooksQuery};