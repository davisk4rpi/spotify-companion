import axios from "axios";

export const getTracksAudioFeatures = async ({
  accessToken,
  trackIds,
}: {
  accessToken: string;
  trackIds: string[];
}) => {
  const response = await axios.get(
    `https://api.spotify.com/v1/audio-features?ids=${trackIds.join(",")}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  return response.data.audio_features as SpotifyAudioFeatures[];
};

export type SpotifyAudioFeatures = {
  type: "audio_features";
  id: string;
  track_href: string;
  analysis_url: string;
  tempo: number;
  duration_ms: number;
  time_signature: number;
  danceability: number;
  energy: number;
  key: number;
  loudness: number;
  mode: number;
  speechiness: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  valence: number;
  uri: string;
};