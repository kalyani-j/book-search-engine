const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
  }

  type Auth {
    user: User!
    token: String!
    message: String
  }

  type Book {
    _id: ID!
    bookId: String!
    title: String!
    authors: [String!]
    description: String!
    image: String!
    link: String!
  }

  type Query {
    user(_id: ID, username: String): [User]
    book(_id: ID): [Book]
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(username: String, email: String, password: String!): Auth
    saveBook(token: String!, bookId: String!, title: String!, authors: [String!], description: String!,
      image: String!,
      link: String!): User
    getSingleUser(token: String, id: ID, username: String): User
    deleteBook(token: String!, bookId: String!): User
  }
`;

module.exports = typeDefs;
