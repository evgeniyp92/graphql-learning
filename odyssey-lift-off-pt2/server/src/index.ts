import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { TrackAPI } from "./track-api";

async function startApolloServer() {
  const server = new ApolloServer({
    // provide the type definitions and resolvers here
    typeDefs,
    resolvers,
  });
  const { url } = await startStandaloneServer(server, {
    context: async () => {
      // Mount things here to make them available in contextValue
      return {
        dataSources: {
          // can this maybe be replaced with a Singleton?
          trackAPI: new TrackAPI({
            // injecting the instance with RESTDataSource's cache manager
            cache: server.cache,
          }),
        },
      };
    },
  });
  console.log(`
    🚀  Server is running!
    📭  Query at ${url}
  `);
}

startApolloServer();
