// Resolvers are functions that can be defined for each field in our schema. They accept four optional parameters,
// parent, args, contextValue, and info, and they're responsible for returning the data for a particular field when it's
// queried.

export const resolvers = {
  // Object keys must correspond to schema types and fields
  Query: {
    // @ts-expect-error
    featuredPlaylists: (_parent, __args, contextValue, ___info) => {
      /**
       * parent is the returned value of the resolver for this field's parent. This will be useful when dealing with
       * resolver chains.
       *
       * args is an object that contains all GraphQL arguments that were provided for the field by the GraphQL
       * operation. When querying for a specific item (such as a specific track instead of all tracks), in client-land
       * we'll make a query with an id argument that will be accessible via this args parameter in server-land.
       *
       * contextValue is an object shared across all resolvers that are executing for a particular operation. The
       * resolver needs this argument to share state, like authentication information, a database connection, or in our
       * case the RESTDataSource.
       *
       * info contains information about the operation's execution state, including the field name, the path to the
       * field from the root, and more. It's not used as frequently as the others, but it can be useful for more
       * advanced actions like setting cache policies at the resolver level.
       */

      return contextValue.dataSources.spotifyAPI.getFeaturedPlaylists();
    },
  },
};
