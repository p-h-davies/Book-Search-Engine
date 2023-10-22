import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`

export const ADD_SAVED_BOOK = gql`
  mutation saveBook($book: BookInput!) {
    saveBook(book: $book) {
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            authors
            title
            description
            image
            link
        }
    }
  }
`

export const REMOVE_SAVED_BOOK = gql`
  mutation removeBook($bookId: ID!) {
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            authors
            title
            description
            image
            link
        }
    }
`