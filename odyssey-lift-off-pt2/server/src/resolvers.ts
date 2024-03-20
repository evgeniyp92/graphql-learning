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
