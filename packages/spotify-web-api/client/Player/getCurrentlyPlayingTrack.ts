import axios from "axios";
import { SpotifyTrack } from "./types.js";

export const getCurrentlyPlayingTrack = async ({
  accessToken,
}: {
  accessToken: string;
}) => {
  const response = await axios.get(
    `https://api.spotify.com/v1/me/player/currently-playing`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  return response.data as CurrentlyPlayingTrack;
};

export type CurrentlyPlayingTrack = {
  is_playing: boolean;
  item: SpotifyTrack;
};
