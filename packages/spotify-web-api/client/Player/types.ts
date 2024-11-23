export type SpotifyTrack = {
  id: string;
  name: string;
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: "track";
  uri: string;
  is_local: boolean;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
};
export type SpotifyArtist = {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: "artist";
  uri: string;
};
export type SpotifyAlbum = {
  album_type: "single";
  total_tracks: number;
  available_markets: string[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  release_date: string;
  release_date_precision: "day" | "month" | "year";
  type: "album";
  uri: string;
  artists: SpotifyArtist[];
};
