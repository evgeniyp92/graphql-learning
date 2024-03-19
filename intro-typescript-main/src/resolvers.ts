// Resolvers are functions that can be defined for each field in our schema. They accept four optional parameters,
// parent, args, contextValue, and info, and they're responsible for returning the data for a particular field when it's
// queried.

import { Resolvers } from "./types";

export const resolvers: Resolvers = {
  // Object keys must correspond to schema types and fields
  Query: {
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

    playlist: (parent, args, contextValue, info) => {
      return contextValue.dataSources.spotifyAPI.getPlaylist(args.id);
    },
  },

  Mutation: {
    addItemsToPlaylist: async (parent, args, contextValue, info) => {
      try {
        const res =
          await contextValue.dataSources.spotifyAPI.addItemsToPlaylist(
            args.input,
          );
        if (res.snapshot_id) {
          return {
            code: 200,
            success: true,
            message: "Successfully added tracks to playlist",
            playlistId: res.snapshot_id,
          };
        } else {
          throw Error("snapshot_id property not found");
        }
      } catch (error) {
        return {
          code: 500,
          success: false,
          message: "Something went wrong: " + error,
          playlistId: null,
        };
      }
    },
  },

  // the Playlist knows to call tracks() because it has a tracks key in the schema that is associated with this func, it
  // will call it and expects the resolver to respond with the data that it wants, if it is included in the request.
  // tracks in turn can call its own resolvers. each resolver gets its parent value as the first arg. the point of this
  // is to keep resolver functions atomic
  Playlist: {
    tracks: (parent, args, contextValue, info) => {
      const { items = [] } = parent.tracks;
      console.log(items);
      return items.map(({ track }) => track);
    },
  },

  Track: {
    // since in our model we have durationMs and the api has a key of duration_ms, this is a helper function to set
    // durationMs to be whatever gets returned by duration_ms
    durationMs: (parent) => parent.duration_ms,
  },

  // New resolver function to get the playlist from the payload
  /**
   *
   * We'll first define a new resolver function, specific to the AddItemsToPlaylistPayload.playlist field.
   *
   * We'll ensure that the Mutation.addItemsToPlaylist resolver passes the updated playlistId to the next resolver in
   * the chain, rather than a null playlist property.
   *
   * Following the resolver chain, the AddItemsToPlaylistPayload.playlist resolver will receive this playlistId on its
   * parent argument.
   *
   * Using the playlistId, the AddItemsToPlaylistPayload.playlist resolver can handle all the special logic needed to
   * reach out to the REST API and retrieve additional playlist details.
   *
   * */
  AddItemsToPlaylistPayload: {
    playlist: (parent, args, contextValue, info) => {
      return contextValue.dataSources.spotifyAPI.getPlaylist(parent.playlistId);
    },
  },
};
