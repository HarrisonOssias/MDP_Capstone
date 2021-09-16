const express = require('express');
const env = require('dotenv').config();
const app = express();
const PORT = 3001 || process.env.SERVER_PORT;
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLFloat, GraphQLList, GraphQLNonNull, GraphQLInterfaceType, getIntrospectionQuery } = require('graphql');
const cors = require('cors');

// app.use(cors());

const authors = [
	{ id: 1, name: 'J. K. Rowling' },
	{ id: 2, name: 'J. R. R. Tolkien' },
	{ id: 3, name: 'Brent Weeks' },
];
const books = [
	{ id: 1, name: 'Harry Potter and the Chamber of Secrets', authorId: 1, genreId: 1 },
	{ id: 2, name: 'Harry Potter and the Prisoner of Azkaban', authorId: 1, genreId: 1 },
	{ id: 3, name: 'Harry Potter and the Goblet of Fire', authorId: 1, genreId: 1 },
	{ id: 4, name: 'The Fellowship of the Ring', authorId: 2, genreId: 1 },
	{ id: 5, name: 'The Two Towers', authorId: 2, genreId: 1 },
	{ id: 6, name: 'The Return of the King', authorId: 2, genreId: 1 },
	{ id: 7, name: 'The Way of Shadows', authorId: 3, genreId: 2 },
	{ id: 8, name: 'Beyond the Shadows', authorId: 3, genreId: 2 },
];
const genres = [
	{ id: 1, name: 'Fantasy' },
	{ id: 2, name: 'Thriller' },
];

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	description: 'This represents an author',
	fields: () => ({
		id: { type: GraphQLNonNull(GraphQLInt) },
		name: { type: GraphQLNonNull(GraphQLString) },
	}),
});

const GenreType = new GraphQLObjectType({
	name: 'Genre',
	description: 'This represents an genre',
	fields: () => ({
		id: { type: GraphQLNonNull(GraphQLInt) },
		name: { type: GraphQLNonNull(GraphQLString) },
	}),
});

const BookType = new GraphQLObjectType({
	name: 'Book',
	description: 'This represents a book',
	fields: () => ({
		id: { type: GraphQLNonNull(GraphQLInt) },
		name: { type: GraphQLNonNull(GraphQLString) },
		authorId: { type: GraphQLNonNull(GraphQLInt) },
		genreId: { type: GraphQLNonNull(GraphQLInt) },
		author: {
			type: AuthorType,
			resolve: (book) => {
				return authors.find((author) => author.id === book.authorId);
			},
		},
		genre: {
			type: GenreType,
			resolve: (book) => {
				return genres.find((genre) => genre.id === book.genreId);
			},
		},
	}),
});

const RootQueryType = new GraphQLObjectType({
	name: 'Query',
	description: 'Root Query',
	fields: () => ({
		books: { type: new GraphQLList(BookType), description: 'List of Books', resolve: () => books },
		authors: { type: new GraphQLList(AuthorType), description: 'List of Authors', resolve: () => authors },
		genres: { type: new GraphQLList(GenreType), description: 'List of Genres', resolve: () => genres },
	}),
});

const RootMutationType = new GraphQLObjectType({
	name: 'Mutation',
	description: 'Root Mutation',
	fields: () => ({
		addBook: {
			type: BookType,
			description: 'Add a book',
			args: {
				name: { type: GraphQLNonNull(GraphQLString) },
				authorId: { type: GraphQLNonNull(GraphQLInt) },
				genreId: { type: GraphQLNonNull(GraphQLInt) },
			},
			resolve: (parent, args) => {
				const book = { id: books.length + 1, name: args.name, authorId: args.authorId, genre: args.genreId };
				books.push(book);
				return book;
			},
		},
	}),
});

const schema = new GraphQLSchema({
	query: RootQueryType,
	mutation: RootMutationType,
});

app.use(
	'/graphql',
	graphqlHTTP({
		schema: schema,
		graphiql: true,
	})
);

app.listen(PORT, () => {
	console.log(`Server running on ${PORT}`);
});
