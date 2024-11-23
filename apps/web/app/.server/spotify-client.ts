import invariant from "tiny-invariant";
import { createSpotifyWebApiClient } from "@sc/spotify-web-api";

invariant(process.env.SPOTIFY_CLIENT_ID, "SPOTIFY_CLIENT_ID is required");
invariant(
  process.env.SPOTIFY_CLIENT_SECRET,
  "SPOTIFY_CLIENT_SECRET is required"
);

const client = createSpotifyWebApiClient({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: "http://localhost:3000/spotify/auth/callback",
});

export default client;
