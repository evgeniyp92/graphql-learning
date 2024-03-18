import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import fs from 'fs';
import path from 'path';
import gql from 'graphql-tag'; // tagged template literal for wrapping GraphQL strings
import { resolvers } from './resolvers';
import { SpotifyAPI } from './datasources/spotify-api';

const typeDefs = gql(
  fs.readFileSync(path.resolve(__dirname, './schema.graphql'), {
    encoding: 'utf-8',
  })
);

console.log(typeDefs);

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs: typeDefs, resolvers: resolvers });
  const { url } = await startStandaloneServer(server, {
    // returns the contextValue shared by all resolvers
    context: async () => {
      return {
        dataSources: {
          // create a class instance and make it available at the key
          spotifyAPI: new SpotifyAPI({
            // set up this dataSource to use the cache
            cache: server.cache,
          }),
        },
      };
    },
  });
  console.log(`🚀 Server ready at ${url}`);
}

startApolloServer();
