import type { SpotifyPlaylist } from "./getCurrentUserPlaylists.js";
import type { SpotifyAudioFeatures } from "./getTracksAudioFeatures.js";
import type { AccessToken } from "./getUserAuthorizationToken.js";
import type { CurrentlyPlayingTrack } from "./Player/getCurrentlyPlayingTrack.js";
import type { GetRecentlyPlayedTracksResponse } from "./Player/getRecentlyPlayedTracks.js";
import type { SpotifyCurrentUserPlaylists } from "./Playlists/getCurrentUserPlaylists.js";
export type SpotifyPagination = {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
};
export interface SpotifyWebApiClient {
    getArtist: (artistId: string) => Promise<unknown>;
    getMe: () => Promise<unknown>;
    getPlaylist: (playlistId: string) => Promise<SpotifyPlaylist>;
    getCurrentUserPlaylists: () => Promise<SpotifyCurrentUserPlaylists>;
    getTracksAudioFeatures: (trackIds: string[]) => Promise<(SpotifyAudioFeatures & {
        camelotKey: string;
    })[]>;
    getLoginUrl: () => string;
    getUserAuthorizationToken: (authorizationCode: string) => Promise<AccessToken>;
    refreshTokenUserAuthorizationToken: (refreshToken: string) => Promise<AccessToken>;
    isLoggedIn: () => boolean;
    getRecentlyPlayedTracks: (options: {
        limit?: number;
        after?: number;
        before?: number;
    }) => Promise<GetRecentlyPlayedTracksResponse>;
    getCurrentlyPlayingTrack: () => Promise<CurrentlyPlayingTrack>;
}
