import { RESTDataSource } from "@apollo/datasource-rest";
import { TrackModel, AuthorModel } from "./models";

export class TrackAPI extends RESTDataSource {
  readonly baseURL: string = "https://odyssey-lift-off-rest-api.herokuapp.com/";

  getTracksForHome() {
    return this.get<TrackModel[]>("tracks");
  }

  getAuthor(authorId: string) {
    return this.get<AuthorModel>(`author/${authorId}`);
  }

  getTrack(trackId: string) {
    return this.get<TrackModel>(`tracks/${trackId}`);
  }
}
