import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      user {
        _id
        username
        password
        email
      }
      token
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook(
    $token: String!
    $bookId: String!
    $title: String!
    $authors: [String]
    $description: String!
    $image: String
    $link: String
  ) {
    saveBook(
      token: $token
      bookId: $bookId
      title: $title
      authors: $authors
      description: $description
      image: $image
      link: $link
    ) {
      _id
      username
      email
      savedBooks {
        _id
        bookId
        title
        description
        authors
        image
        link
      }
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation deleteBook($token: String!, $bookId: String!) {
    deleteBook(token: $token, bookId: $bookId) {
      _id
      username
      email
      savedBooks {
        _id
        title
        description
        authors
        image
        link
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($username: String, $password: String!, $email: String) {
    login(username: $username, password: $password, email: $email) {
      user {
        _id
        username
        password
        email
      }
      token
    }
  }
`;

export const SINGLE_USER = gql`
  mutation getSingleUser($token: String!, $id: String, $username: String) {
    getSingleUser(token: $token, id: $id, username: $username) {
      _id
      email
      username
      savedBooks {
        _id
        bookId
        title
        authors
        description
        image
        link
      }
    }
  }
`;
