import invariant from "tiny-invariant";
import { createSpotifyWebApiClient } from "./client/index.js";
import { getCamelotKey } from "./client/util/pitchMap.js";

invariant(process.env.SPOTIFY_CLIENT_ID, "SPOTIFY_CLIENT_ID is required");
invariant(
  process.env.SPOTIFY_CLIENT_SECRET,
  "SPOTIFY_CLIENT_SECRET is required"
);

const client = createSpotifyWebApiClient({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

// client.getArtist("4Z8W4fKeB5YxbusRsdQVPb");
// client.getMe();
const test = async () => {
  const playlist = await client.getPlaylist("06tSoCREvLYNypORLhGspB");
  const spotifyTracks = playlist.tracks.items.map((item) => item.track);
  const trackIds = spotifyTracks.map((track) => track.id);
  const audioFeatures = await client.getTracksAudioFeatures(trackIds);
  console.log(
    spotifyTracks.map((track) => {
      const audioFeature = audioFeatures.find((af) => af.id === track.id);
      return {
        name: track.name,
        artist: track.artists.map((artist) => artist.name).join(", "),
        album: track.album.name,
        key: audioFeature?.key,
        mode: audioFeature?.mode,
        camelotKey: getCamelotKey(audioFeature?.key, audioFeature?.mode),
        tempo: audioFeature?.tempo,
        duration: audioFeature?.duration_ms
          ? audioFeature.duration_ms / 1000
          : null,
      };
    })
  );
};

test();
