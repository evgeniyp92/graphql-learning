import { RESTDataSource } from '@apollo/datasource-rest'; // Special class for REST APIs
import { Playlist } from '../types';

// Default extensible class to use with RESTful data sources
export class SpotifyAPI extends RESTDataSource {
  readonly baseURL = 'https://spotify-demo-api-fe224840a08c.herokuapp.com/v1/';

  // API endpoint to getFeaturedPlaylists
  async getFeaturedPlaylists(): Promise<Playlist[]> {
    const response = await this.get<{ playlists: { items: Playlist[] } }>('browse/featured-playlists');
    // op-chaining with a nullish coalescing operator to return empty array if any of the props dont exist
    return response?.playlists?.items ?? [];
  }
}
