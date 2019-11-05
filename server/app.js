const express = require('express');
// allow express to understand graphql
const graphqlHTTP = require('express-graphql');
//
const schema = require('./schema/schema');

const app = express();

// to run nodemon = npx nodemon server/app.js
app.listen(4000, () => {
    console.log("listening to request on port: 4000")
})

// middleware : handle off the control of this request to graphqlHTTP()
app.use('/graphql', graphqlHTTP({
    // pass options
    schema,
    // we want to use the graphiql tool when we go to /graphql
    graphiql: true
}));