const graphql = require('graphql');
const _ = require('lodash');

/*
    define: types, relationships, route queries

*/

// grab the below properties from graphql
const {
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList // used in Author, because each author has many book relation
} = graphql;

// dummy data
var books = [
    {name: 'name of the wind', genre: 'fantasy', id: '1', authorid: '1'},
    {name: 'the final empire', genre: 'fantasy', id: '2', authorid: '2'},
    {name: 'the long earth', genre: 'sci-fi', id: '3', authorid: '3'},
    {name: 'the hero of ages', genre: 'fantasy', id: '4', authorid: '2'},
    {name: 'the colour of magic', genre: 'fantasy', id: '5', authorid: '3'},
    {name: 'the light fantastic', genre: 'sci-fi', id: '6', authorid: '3'},
];

var authors = [
    {name: 'patrick rothfuss', age: 44, id: '1'},
    {name: 'brandon sanderson', age: 23, id: '2'},
    {name: 'terry pratchett', age: 89, id: '3'},
];

// define our Book object type
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        // define the fields with graphQL string not regular string
        id: {type: GraphQLID}, //before we used {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        // type relations : which author belongs to which book
        author: {
            type: AuthorType,
            // when nested data it will use the parent object
            resolve(parent, args){
                //console.log(parent);
                // look up parent (book) authorid and then call type author 
                return _.find(authors, {id: parent.authorid});
            }
        }
    })
});

// define our Author object type
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLID},
        // type relations : which book belongs to which author
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                // filter through books array for the specific authorid
                return _.filter(books, {authorid: parent.id})
            }
        }
    })
})

// type relations

// how to initial jump into our graph query 
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    // a type of root query
    fields: {
        book: {
            type: BookType,
            // allow to request book with id as arguement ex: book(id:'123'){name}
            args: {id: {type: GraphQLID}}, // before we used {type: GraphQLString}},
            resolve(parent, args){
                // code to get data from DB and other source
                
                //using lodash to search dummy data
                return _.find(books, {id: args.id});
            }
        },
        author: {
            type: AuthorType,
            // allow to request book with id as arguement ex: book(id:'123'){name}
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                // code to get data from DB and other source
                
                //using lodash to search dummy data
                return _.find(authors, {id: args.id});
            }
        },
        // now when we want to return an entire list of books
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                // return entire list of dummy books data
                return books
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(present, args){
                // return entire list of dummy authors data 
                return authors
            }
        }
    }
});

// which query user can call from app.js
module.exports = new GraphQLSchema({
    query: RootQuery
});