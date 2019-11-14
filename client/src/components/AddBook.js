// eslint-disable-next-line
import React, { useMemo, useCallback, useState } from 'react';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';
// help bind apollo to REACT
import { useQuery, useMutation } from '@apollo/react-hooks';

const getOptions = (loading, error, data) => {
    if(loading){
        return <option>Loading Authors...</option>;
    }
    else if (error){
        return <option>Error...</option>;
    }
    else{
        return data.authors.map(({ id, name}) => {
            return (
                <option key={id} value={id || ''}> { name } </option> 
            );
        });
    };
}

// function component
const AddBook = () => {

    const { loading, error, data } = useQuery(getAuthorsQuery);
    const [addBook] = useMutation(addBookMutation);
    /*
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [author, setAuthor] = useState('');
    */
    const [inputs, setInputs] = useState({});

    // 
    const displayAuthors = useMemo(() => getOptions(loading, error, data),[
        loading,
        error,
        data
    ]);

    // in order to use callback i can't use a return before so i had to create a function above addBook()
    // ***** OPTION B ********
    /*const nameCB = useCallback(e => setName(e.target.value), []);
    const genreCB = useCallback(e => setGenre(e.target.value), []);
    const authorCB = useCallback(e => setAuthor(e.target.value), []);
    const addCB = useCallback(
        e => {
            e.preventDefault();
            addBook().then(res => console.log(res));
            console.log(`name: ${name}, genre: ${genre}, author: ${author}`);
        },
        [name, genre, author]
    );*/
    const handleInputChange = useCallback((event) => {
        event.persist();
        setInputs(inputs => ({...inputs,
            [event.target.name]: event.target.value,
        }));
    }, []);
    
    // use refetchQueries to update getBooksQuery section on the web app 
    const handleSubmit = useCallback((event) => {
        if(event){
            event.preventDefault();
            addBook({
                variables:{
                    name: inputs.name,
                    genre: inputs.genre,
                    authorId: inputs.authorId
                },
                refetchQueries: [{ query: getBooksQuery }]
            });
            //console.log("name: "+[inputs.name] +", genre: "+ [inputs.genre]+", author: "+[inputs.authorId])
        }
    }, [inputs]);

   return (
    <form id="add-book" onSubmit={ handleSubmit }>
        <div className="field">
            <label>Book name:</label>
            <input value={ inputs.name || ''} name="name" type="text" onChange={ handleInputChange } />
        </div>

        <div className="field">
            <label>Genre:</label>
            <input value={ inputs.genre || ''} name="genre" type="text" onChange={ handleInputChange } />
        </div>

        <div className="field">
            <label>Author:</label>
            <select defaultValue={'default'} name="authorId" onChange={ handleInputChange } >
            <option value="default" hidden disabled >Select author</option>
                {displayAuthors}
            </select>
        </div>

        <button>+</button>
    </form>
   );
};


export default AddBook;