import axios from "axios";

import { SpotifyPagination } from "../types.js";
// curl --request GET \
//   --url https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n \
//   --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'

export const getCurrentUserPlaylists = async ({
  accessToken,
  limit = 20,
  offset = 0,
}: {
  accessToken: string;
  limit?: number;
  offset?: number;
}) => {
  const response = await axios.get(
    `https://api.spotify.com/v1/me/playlists?limit=${limit}&offset=${offset}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  return response.data as SpotifyCurrentUserPlaylists;
};

export type SpotifyCurrentUserPlaylists = SpotifyPagination & {
  items: {
    collaborative: boolean;
    description: string;
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
    name: string;
    owner: {
      external_urls: {
        spotify: string;
      };
      followers: {
        href: string;
        total: number;
      };
      href: string;
      id: string;
      type: "user";
      uri: string;
      display_name: string;
    };
    public: boolean;
    snapshot_id: string;
    tracks: {
      href: string;
      total: number;
    };
    type: string;
    uri: string;
  }[];
};
