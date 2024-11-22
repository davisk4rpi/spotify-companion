var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import invariant from "tiny-invariant";
import { createSpotifyWebApiClient } from "./client/index.js";
import { getCamelotKey } from "./client/util/pitchMap.js";
invariant(process.env.SPOTIFY_CLIENT_ID, "SPOTIFY_CLIENT_ID is required");
invariant(process.env.SPOTIFY_CLIENT_SECRET, "SPOTIFY_CLIENT_SECRET is required");
const client = createSpotifyWebApiClient({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});
// client.getArtist("4Z8W4fKeB5YxbusRsdQVPb");
// client.getMe();
const test = () => __awaiter(void 0, void 0, void 0, function* () {
    const playlist = yield client.getPlaylist("06tSoCREvLYNypORLhGspB");
    const spotifyTracks = playlist.tracks.items.map((item) => item.track);
    const trackIds = spotifyTracks.map((track) => track.id);
    const audioFeatures = yield client.getTracksAudioFeatures(trackIds);
    console.log(spotifyTracks.map((track) => {
        const audioFeature = audioFeatures.find((af) => af.id === track.id);
        return {
            name: track.name,
            artist: track.artists.map((artist) => artist.name).join(", "),
            album: track.album.name,
            key: audioFeature === null || audioFeature === void 0 ? void 0 : audioFeature.key,
            mode: audioFeature === null || audioFeature === void 0 ? void 0 : audioFeature.mode,
            camelotKey: getCamelotKey(audioFeature === null || audioFeature === void 0 ? void 0 : audioFeature.key, audioFeature === null || audioFeature === void 0 ? void 0 : audioFeature.mode),
            tempo: audioFeature === null || audioFeature === void 0 ? void 0 : audioFeature.tempo,
            duration: (audioFeature === null || audioFeature === void 0 ? void 0 : audioFeature.duration_ms)
                ? audioFeature.duration_ms / 1000
                : null,
        };
    }));
});
test();
