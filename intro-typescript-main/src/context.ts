// Context files to help TypeScript understand whats going on in our project

import { SpotifyAPI } from './datasources/spotify-api';

export type DataSourceContext = {
  dataSources: {
    spotifyAPI: SpotifyAPI;
  };
};
