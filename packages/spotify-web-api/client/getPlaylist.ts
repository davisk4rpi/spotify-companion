import axios from "axios";
import { SpotifyPagination } from "./types.js";

// curl --request GET \
//   --url https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n \
//   --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'

export const getPlaylist = async ({
  accessToken,
  playlistId,
}: {
  accessToken: string;
  playlistId: string;
}) => {
  const response = await axios.get(
    `https://api.spotify.com/v1/playlists/${playlistId}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  return response.data as SpotifyPlaylist;
};

export type SpotifyPlaylist = {
  tracks: SpotifyPagination & {
    items: {
      track: {
        type: "track";
        id: string;
        name: string;
        duration_ms: number;
        popularity: number;
        explicit: boolean;
        is_local: boolean;
        href: string;
        is_playable: boolean;
        available_markets: string[];
        disc_number: number;
        external_urls: {
          spotify: string;
        };
        preview_url: string;
        track_number: number;
        uri: string;
        album: {
          type: "album";
          id: string;
          name: string;
          release_date: string;
          release_date_precision: "year" | "month" | "day";
          album_type: "compilation" | "single" | "album";
          total_tracks: number;
          href: string;
          uri: string;
          available_markets: string[];
          external_urls: {
            spotify: string;
          };
          images: {
            url: string;
            height: number;
            width: number;
          }[];
          artists: {
            type: "artist";
            id: string;
            name: string;
            href: string;
            uri: string;
            external_urls: {
              spotify: string;
            };
          }[];
        };
        artists: {
          id: string;
          name: string;
          type: "artist";
          href: string;
          uri: string;
          external_urls: {
            spotify: string;
          };
        }[];
      };
    }[];
  };
};
