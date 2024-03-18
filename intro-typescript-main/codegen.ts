import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './src/schema.graphql', // schema location
  generates: {
    // output dir of the types
    './src/types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
    },
  },
};

export default config;
