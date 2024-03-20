/*
  This file defines the GraphQL resolvers for our API.
  Resolvers provide the instructions for turning a GraphQL operation
  (a Query, Mutation, or Subscription) into data. They resolve the
  request to the functions which fetch the relevant data, thereby
  "resolving" the query.

  For example, the resolvers here define how the 'tracksForHome' query
  and 'author' field are handled. They delegate to the trackAPI data source,
  which is responsible for fetching the appropriate data from a remote API.
*/
import { Resolvers } from "./types";

export const resolvers: Resolvers = {
  Query: {
    // returns an array of Tracks to populate the homepage grid
    tracksForHome: (parent, args, context, info) => {
      return context.dataSources.trackAPI.getTracksForHome();
    },
  },
  Track: {
    author: (parent, _, context) => {
      return context.dataSources.trackAPI.getAuthor(parent.authorId);
    },
  },
};
