const graphql = require('graphql');
const _ = require('lodash');
// import the mongo schema models so we can interact with them
const Book = require('../models/book');
const Author = require('../models/author');

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
    GraphQLList, // used in Author, because each author has many book relation
    GraphQLNonNull // to not accept null values for certain fields
} = graphql;

// dummy data
/*
var books = [
    {name: 'name of the wind', genre: 'fantasy', id: '1', authorId: '1'},
    {name: 'the final empire', genre: 'fantasy', id: '2', authorId: '2'},
    {name: 'the long earth', genre: 'sci-fi', id: '3', authorId: '3'},
    {name: 'the hero of ages', genre: 'fantasy', id: '4', authorId: '2'},
    {name: 'the colour of magic', genre: 'fantasy', id: '5', authorId: '3'},
    {name: 'the light fantastic', genre: 'sci-fi', id: '6', authorId: '3'},
];

var authors = [
    {name: 'patrick rothfuss', age: 44, id: '1'},
    {name: 'brandon sanderson', age: 23, id: '2'},
    {name: 'terry pratchett', age: 89, id: '3'},
];
*/

// define our Book object type
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        // define the fields with graphQL string not regular string
        id: {type: GraphQLID}, 
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        // type relations : which author belongs to which book
        author: {
            type: AuthorType,
            // when nested data it will use the parent object
            resolve(parent, args){
                //console.log(parent);
                //look up parent (book) authorId and then call type author 
                // **** used with dummy data -> return _.find(authors, {id: parent.authorId});
                // below is returning the authorId from Book collection
                //console.log(parent.authorId)
                // we are sending the authorID from book collection to Author schema, to return the author properties with same ID from its collection.
                return Author.findById(parent.authorId);
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
        age: {type: GraphQLInt},
        // type relations : which book belongs to which author
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                // filter through books array for the specific authorId
                // **** used with dummy data -> return _.filter(books, {authorId: parent.id})
                // return from mongoDB where author id matches
                // find method, look for all records with certain criteria
                // look for books with authorid that matches the parent author ID 
                return Book.find({
                    authorId: parent.id
                });
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
                
                // using lodash to search dummy data
                // used with dummy data -> return _.find(books, {id: args.id});
                
                // grab data from MongoDB
                return Book.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            // allow to request book with id as arguement ex: book(id:'123'){name}
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                // code to get data from DB and other source
                
                // using lodash to search dummy data
                // used with dummy data -> return _.find(authors, {id: args.id});
                return Author.findById(args.id);
            }
        },
        // now when we want to return an entire list of books
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                // return entire list of dummy books data
                // used with dummy data -> return books

                // return all books with the help of empty object {}
                return Book.find({});
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(present, args){
                // return entire list of dummy authors data 
                // used with dummy data -> return authors

                // return all authors with the help of empty object {}
                return Author.find({});
            }
        }
    }
});

// In graphQL we need to explicitly define our mutations what data can be updated (changed, added, deleted).
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // add author to db
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args){
                // calling the model/collection author
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                // connect to db and save
                // we use return to get the data back when testing in graphiQL
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                authorId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                //calling the model/collection book
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                // connect to db and save
                // we use return to get the data back when testing in graphiQL
                return book.save();
            }
        }
    }
})

// which query user can call from app.js
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});