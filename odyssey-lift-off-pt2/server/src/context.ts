// Typescript is still unaware of what's in the context object, so we
// need to write it out here to make it clear

import type { TrackAPI } from "./track-api";

export type DataSourceContext = {
  dataSources: {
    trackAPI: TrackAPI;
  };
};
