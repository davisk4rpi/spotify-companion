import { getAccessToken, AccessToken } from "./getAccessToken.js";
import { getArtist } from "./getArtist.js";
import { getMe } from "./getMe.js";
import { getPlaylist, type SpotifyPlaylist } from "./getPlaylist.js";
import {
  getTracksAudioFeatures,
  type SpotifyAudioFeatures,
} from "./getTracksAudioFeatures.js";

interface SpotifyWebApiClient {
  getArtist: (artistId: string) => Promise<unknown>;
  getMe: () => Promise<unknown>;
  getPlaylist: (playlistId: string) => Promise<SpotifyPlaylist>;
  getTracksAudioFeatures: (
    trackIds: string[]
  ) => Promise<SpotifyAudioFeatures[]>;
}

type SpotifyWebApiClientOptions = {
  clientId: string;
  clientSecret: string;
};

export const createSpotifyWebApiClient = ({
  clientId,
  clientSecret,
}: SpotifyWebApiClientOptions): SpotifyWebApiClient => {
  let accessToken: AccessToken | null = null;

  const _getAccessToken = async () => {
    if (accessToken && !accessToken.isExpired()) {
      return accessToken.access_token;
    }
    try {
      accessToken = await getAccessToken({ clientId, clientSecret });
      return accessToken.access_token;
    } catch (e) {
      console.error(e);
      throw new Error("Failed to get access token");
    }
  };

  return {
    getArtist: async (artistId: string) => {
      const accessToken = await _getAccessToken();
      return getArtist({ accessToken, artistId });
    },
    getMe: async () => {
      const accessToken = await _getAccessToken();
      return getMe({ accessToken });
    },
    getPlaylist: async (playlistId: string) => {
      const accessToken = await _getAccessToken();
      return getPlaylist({ accessToken, playlistId });
    },
    getTracksAudioFeatures: async (trackIds: string[]) => {
      const accessToken = await _getAccessToken();
      return getTracksAudioFeatures({ accessToken, trackIds });
    },
  };
};
