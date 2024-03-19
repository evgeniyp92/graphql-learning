import gql from 'graphql-tag';

export const typeDefs = gql`
  type Query {
    "Get tracks array for homepage grid"
    tracksForHome: [Track!]!
  }

  "A track is a 'learning track' that teaches about a specific topic"
  type Track {
    "Track uid"
    id: ID!
    "Track title"
    title: String!
    author: Author!
    thumbnail: String
    "Track length in minutes"
    length: Int
    modulesCount: Int
  }

  "Author of a complete Track or a Module"
  type Author {
    id: ID!
    name: String!
    photo: String
  }
`;
