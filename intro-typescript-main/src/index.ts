import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import fs from 'fs';
import path from 'path';
import gql from 'graphql-tag'; // tagged template literal for wrapping GraphQL strings
import { start } from 'repl';

const typeDefs = gql(
  fs.readFileSync(path.resolve(__dirname, './schema.graphql'), {
    encoding: 'utf-8',
  })
);

console.log(typeDefs);

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs: typeDefs });
  const { url } = await startStandaloneServer(server);
  console.log(`🚀 Server ready at ${url}`);
}

startApolloServer();
