export const typeDefs = `#graphql
type Book {
    id: ID!
    title: String
    author: String
}
type Query {
    books: [Book] # return a list of books
    book(id: ID!): Book #query book based on ID ! is used to make sure the ID cannot be empty
}
type Mutation {
    addBook(title: String!, author: String!): Book
    deleteBook(id: ID!): Book
    updateBook(id: ID!, title: String!, author: String!) : Book
}
`;