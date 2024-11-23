import { getArtist } from "./getArtist.js";
import { getMe } from "./getMe.js";
import { getPlaylist } from "./Playlists/getPlaylist.js";
import { getCurrentUserPlaylists } from "./Playlists/getCurrentUserPlaylists.js";
import { getTracksAudioFeatures } from "./getTracksAudioFeatures.js";
import {
  getUserAuthorizationToken,
  refreshTokenUserAuthorizationToken,
  type AccessToken,
} from "./getUserAuthorizationToken.js";
import { getRecentlyPlayedTracks } from "./Player/getRecentlyPlayedTracks.js";
import type { SpotifyWebApiClient } from "./types.js";
import { getCurrentlyPlayingTrack } from "./Player/getCurrentlyPlayingTrack.js";

type SpotifyWebApiClientOptions = {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
};

export const createSpotifyWebApiClient = ({
  clientId,
  clientSecret,
  redirectUri,
}: SpotifyWebApiClientOptions): SpotifyWebApiClient => {
  let accessToken: AccessToken | null = null;

  const _getAccessToken = async () => {
    if (!accessToken) {
      throw new Error("Not Logged In");
    }
    if (accessToken.isExpired()) {
      accessToken = await refreshTokenUserAuthorizationToken({
        refreshToken: accessToken.refresh_token,
        clientId,
        clientSecret,
      });
    }
    return accessToken.access_token;
  };
  const isLoggedIn = () => {
    return !!accessToken;
  };

  return {
    getArtist: async (artistId: string) => {
      const accessToken = await _getAccessToken();
      return getArtist({ accessToken, artistId });
    },
    getMe: async () => {
      if (!isLoggedIn()) {
        return null;
      }
      const accessToken = await _getAccessToken();
      return getMe({ accessToken });
    },
    getPlaylist: async (playlistId: string) => {
      const accessToken = await _getAccessToken();
      return getPlaylist({ accessToken, playlistId });
    },
    getCurrentUserPlaylists: async () => {
      const accessToken = await _getAccessToken();
      return getCurrentUserPlaylists({ accessToken });
    },
    getTracksAudioFeatures: async (trackIds: string[]) => {
      const accessToken = await _getAccessToken();
      return getTracksAudioFeatures({ accessToken, trackIds });
    },
    getLoginUrl: () => {
      const scopes = [
        "user-read-private",
        "user-read-email",
        "user-read-playback-state",
        "user-read-currently-playing",
        "user-read-recently-played",
        "playlist-read-private",
      ];
      return `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scopes.join(
        "%20"
      )}&redirect_uri=${redirectUri}`;
    },
    getUserAuthorizationToken: async (authorizationCode: string) => {
      accessToken = await getUserAuthorizationToken({
        authorizationCode,
        clientId,
        clientSecret,
        redirectUri,
      });
      return accessToken;
    },
    refreshTokenUserAuthorizationToken: async (refreshToken: string) => {
      return refreshTokenUserAuthorizationToken({
        refreshToken,
        clientId,
        clientSecret,
      });
    },
    isLoggedIn,
    getRecentlyPlayedTracks: async ({ limit = 20, after, before }) => {
      const accessToken = await _getAccessToken();
      return getRecentlyPlayedTracks({ accessToken, limit, after, before });
    },
    getCurrentlyPlayingTrack: async () => {
      const accessToken = await _getAccessToken();
      return getCurrentlyPlayingTrack({ accessToken });
    },
  };
};
