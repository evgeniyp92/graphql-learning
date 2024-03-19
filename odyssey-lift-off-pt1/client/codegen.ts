import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  // Listing the schema as available at the server is an easy way to not have to deal with schema desync across teams
  schema: 'http://localhost:4000',
  documents: ['src/**/*.tsx'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
};

export default config;
