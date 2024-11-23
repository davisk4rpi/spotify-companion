var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
// curl --request GET \
//   --url https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n \
//   --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
export const getPlaylist = (_a) => __awaiter(void 0, [_a], void 0, function* ({ accessToken, playlistId, }) {
    const response = yield axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
});
