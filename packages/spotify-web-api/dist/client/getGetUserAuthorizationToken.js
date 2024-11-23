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
export const getUserAuthorizationToken = (_a) => __awaiter(void 0, [_a], void 0, function* ({ authorizationCode, redirectUri, clientId, clientSecret, }) {
    const now = Date.now();
    const response = yield axios.post("https://accounts.spotify.com/api/token", {
        code: authorizationCode,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
    }, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic " +
                Buffer.from(clientId + ":" + clientSecret).toString("base64"),
        },
    });
    const expires_at = now + response.data.expires_in * 1000;
    return Object.assign(Object.assign({}, response.data), { isExpired: () => Date.now() > expires_at });
});
export const refreshTokenUserAuthorizationToken = (_a) => __awaiter(void 0, [_a], void 0, function* ({ refreshToken, clientId, clientSecret, }) {
    const now = Date.now();
    const response = yield axios.post("https://accounts.spotify.com/api/token", {
        refresh_token: refreshToken,
        grant_type: "refresh_token",
    }, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic " +
                Buffer.from(clientId + ":" + clientSecret).toString("base64"),
        },
    });
    const expires_at = now + response.data.expires_in * 1000;
    return Object.assign(Object.assign({}, response.data), { isExpired: () => Date.now() > expires_at });
});
