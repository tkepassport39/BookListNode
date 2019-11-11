import React from 'react';
//import logo from './logo.svg';
//import './App.css';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';

// components
import BookList from './components/BookList';
import AddBook from './components/AddBook';

// apollo client setup
// add the endpoint for our GraphQL server to the uri property 
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        
        <h1>My Reading List</h1>
        
        <BookList />

        <AddBook />
      
      </div>
    </ApolloProvider>

  );
}

export default App;
