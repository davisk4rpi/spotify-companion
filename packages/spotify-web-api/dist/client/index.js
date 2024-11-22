var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getAccessToken } from "./getAccessToken.js";
import { getArtist } from "./getArtist.js";
import { getMe } from "./getMe.js";
import { getPlaylist } from "./getPlaylist.js";
import { getTracksAudioFeatures, } from "./getTracksAudioFeatures.js";
export const createSpotifyWebApiClient = ({ clientId, clientSecret, }) => {
    let accessToken = null;
    const _getAccessToken = () => __awaiter(void 0, void 0, void 0, function* () {
        if (accessToken && !accessToken.isExpired()) {
            return accessToken.access_token;
        }
        try {
            accessToken = yield getAccessToken({ clientId, clientSecret });
            return accessToken.access_token;
        }
        catch (e) {
            console.error(e);
            throw new Error("Failed to get access token");
        }
    });
    return {
        getArtist: (artistId) => __awaiter(void 0, void 0, void 0, function* () {
            const accessToken = yield _getAccessToken();
            return getArtist({ accessToken, artistId });
        }),
        getMe: () => __awaiter(void 0, void 0, void 0, function* () {
            const accessToken = yield _getAccessToken();
            return getMe({ accessToken });
        }),
        getPlaylist: (playlistId) => __awaiter(void 0, void 0, void 0, function* () {
            const accessToken = yield _getAccessToken();
            return getPlaylist({ accessToken, playlistId });
        }),
        getTracksAudioFeatures: (trackIds) => __awaiter(void 0, void 0, void 0, function* () {
            const accessToken = yield _getAccessToken();
            return getTracksAudioFeatures({ accessToken, trackIds });
        }),
    };
};
