var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getArtist } from "./getArtist.js";
import { getMe } from "./getMe.js";
import { getPlaylist } from "./Playlists/getPlaylist.js";
import { getCurrentUserPlaylists } from "./Playlists/getCurrentUserPlaylists.js";
import { getTracksAudioFeatures } from "./getTracksAudioFeatures.js";
import { getUserAuthorizationToken, refreshTokenUserAuthorizationToken, } from "./getUserAuthorizationToken.js";
import { getRecentlyPlayedTracks } from "./Player/getRecentlyPlayedTracks.js";
import { getCurrentlyPlayingTrack } from "./Player/getCurrentlyPlayingTrack.js";
export const createSpotifyWebApiClient = ({ clientId, clientSecret, redirectUri, }) => {
    let accessToken = null;
    const _getAccessToken = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!accessToken) {
            throw new Error("Not Logged In");
        }
        if (accessToken.isExpired()) {
            accessToken = yield refreshTokenUserAuthorizationToken({
                refreshToken: accessToken.refresh_token,
                clientId,
                clientSecret,
            });
        }
        return accessToken.access_token;
    });
    const isLoggedIn = () => {
        return !!accessToken;
    };
    return {
        getArtist: (artistId) => __awaiter(void 0, void 0, void 0, function* () {
            const accessToken = yield _getAccessToken();
            return getArtist({ accessToken, artistId });
        }),
        getMe: () => __awaiter(void 0, void 0, void 0, function* () {
            if (!isLoggedIn()) {
                return null;
            }
            const accessToken = yield _getAccessToken();
            return getMe({ accessToken });
        }),
        getPlaylist: (playlistId) => __awaiter(void 0, void 0, void 0, function* () {
            const accessToken = yield _getAccessToken();
            return getPlaylist({ accessToken, playlistId });
        }),
        getCurrentUserPlaylists: () => __awaiter(void 0, void 0, void 0, function* () {
            const accessToken = yield _getAccessToken();
            return getCurrentUserPlaylists({ accessToken });
        }),
        getTracksAudioFeatures: (trackIds) => __awaiter(void 0, void 0, void 0, function* () {
            const accessToken = yield _getAccessToken();
            return getTracksAudioFeatures({ accessToken, trackIds });
        }),
        getLoginUrl: () => {
            const scopes = [
                "user-read-private",
                "user-read-email",
                "user-read-playback-state",
                "user-read-currently-playing",
                "user-read-recently-played",
                "playlist-read-private",
            ];
            return `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scopes.join("%20")}&redirect_uri=${redirectUri}`;
        },
        getUserAuthorizationToken: (authorizationCode) => __awaiter(void 0, void 0, void 0, function* () {
            accessToken = yield getUserAuthorizationToken({
                authorizationCode,
                clientId,
                clientSecret,
                redirectUri,
            });
            return accessToken;
        }),
        refreshTokenUserAuthorizationToken: (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
            return refreshTokenUserAuthorizationToken({
                refreshToken,
                clientId,
                clientSecret,
            });
        }),
        isLoggedIn,
        getRecentlyPlayedTracks: (_a) => __awaiter(void 0, [_a], void 0, function* ({ limit = 20, after, before }) {
            const accessToken = yield _getAccessToken();
            return getRecentlyPlayedTracks({ accessToken, limit, after, before });
        }),
        getCurrentlyPlayingTrack: () => __awaiter(void 0, void 0, void 0, function* () {
            const accessToken = yield _getAccessToken();
            return getCurrentlyPlayingTrack({ accessToken });
        }),
    };
};
