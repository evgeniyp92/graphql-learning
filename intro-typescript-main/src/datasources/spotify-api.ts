import { RESTDataSource } from "@apollo/datasource-rest"; // Special class for REST APIs
import { PlaylistModel, SnapshotOrError } from "../models";
import { Playlist } from "../types";

// Default extensible class to use with RESTful data sources
export class SpotifyAPI extends RESTDataSource {
  readonly baseURL = "https://spotify-demo-api-fe224840a08c.herokuapp.com/v1/";

  // API endpoint to getFeaturedPlaylists
  async getFeaturedPlaylists(): Promise<PlaylistModel[]> {
    const response = await this.get<{ playlists: { items: PlaylistModel[] } }>(
      "browse/featured-playlists",
    );
    // op-chaining with a nullish coalescing operator to return empty array if any of the props dont exist
    return response?.playlists?.items ?? [];
  }

  getPlaylist(playlistId: string): Promise<PlaylistModel> {
    return this.get(`playlists/${playlistId}`);
  }

  addItemsToPlaylist(input: {
    playlistId: string;
    uris: string[];
  }): Promise<SnapshotOrError> {
    const { playlistId, uris } = input;
    return this.post(`playlists/${playlistId}/tracks`, {
      params: {
        // setting the params for the post request to make the receiving api happy
        uris: uris.join(","),
      },
    });
  }
}
