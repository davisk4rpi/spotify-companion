import axios from "axios";
import { SpotifyTrack } from "./types.js";

export const getRecentlyPlayedTracks = async ({
  accessToken,
  limit = 20,
  after,
  before,
}: {
  accessToken: string;
  limit?: number;
  after?: number;
  before?: number;
}) => {
  const response = await axios.get(
    `https://api.spotify.com/v1/me/player/recently-played`,
    {
      params: {
        after,
        before,
        limit,
      },
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  return response.data;
};

export type GetRecentlyPlayedTracksResponse = {
  href: string;
  limit: number;
  next: string;
  cursors: {
    after: string;
    before: string;
  };
  items: {
    played_at: string;
    track: SpotifyTrack;
  }[];
};
