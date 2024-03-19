import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './src/schema.graphql', // schema location
  generates: {
    // output dir of the types
    './src/types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        contextType: './context#DataSourceContext', // path is relative to the types.ts file, not this file
        mappers: {
          Playlist: './models#PlaylistModel',
          Track: './models#TrackModel',
        },
      },
    },
  },
};

export default config;
