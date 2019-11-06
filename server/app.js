const express = require('express');
// allow express to understand graphql
const graphqlHTTP = require('express-graphql');
// import schema
const schema = require('./schema/schema');
// import mongoose
const mongoose = require('mongoose');
// there is a env file at root of this project
require('dotenv').config();


const {
    mongo_username,
    mongo_password,
    mongo_db_url,
} = process.env;

const app = express();

// connect to mongodb atlas cluster
mongoose.connect(`mongodb+srv://${mongo_username}:${mongo_password}@${mongo_db_url}?retryWrites=true&w=majority`, 
    { 
        // received deprecationWarning therefore needed to add the below code.
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    });
mongoose.connection.once('open', () => {
    console.log('Connected to database');
});


// to run nodemon = npx nodemon server/app.js
app.listen(4000, () => {
    console.log("listening to request on port: 4000")
});

// middleware : handle off the control of this request to graphqlHTTP()
app.use('/graphql', graphqlHTTP({
    // pass options : defining our graph 
    schema,
    // we want to use the graphiql tool when we go to /graphql
    graphiql: true
}));