const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
  }

  type Book {
    _id: ID!
    title: String!
    authors: [String!]
    description: String!
    image: String!
    link: String!
  }

  type Query {
    user(_id: ID): [User]
    book(_id: ID): [Book]
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
  }
`;

module.exports = typeDefs;
