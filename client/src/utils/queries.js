import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      id
      username
      email
      savedBooks {
        bookId
        title
        authors
        description
      }
    }
  }
`;
