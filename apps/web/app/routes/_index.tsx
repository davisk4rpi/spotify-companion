import type { MetaFunction } from "@remix-run/node";
import { NavLink, redirect, useLoaderData } from "@remix-run/react";
import spotifyClient from "~/.server/spotify-client";

export const meta: MetaFunction = () => {
  return [
    { title: "DJ Companion" },
    { name: "description", content: "DJ Companion" },
  ];
};

export const loader = async () => {
  const isLoggedIn = spotifyClient.isLoggedIn();
  if (!isLoggedIn) {
    return redirect("/login");
  }
  const [me, playlists, recentlyPlayedTracks, currentlyPlayingTrack] =
    await Promise.all([
      spotifyClient.getMe(),
      spotifyClient.getCurrentUserPlaylists(),
      spotifyClient.getRecentlyPlayedTracks({
        limit: 5,
      }),
      spotifyClient.getCurrentlyPlayingTrack(),
    ]);
  const trackIds = recentlyPlayedTracks.items.map((item) => item.track.id);
  const audioFeatures = await spotifyClient.getTracksAudioFeatures(trackIds);

  console.log(
    JSON.stringify(
      {
        me,
        playlists,
        recentlyPlayedTracks,
        audioFeatures,
        currentlyPlayingTrack,
      },
      null,
      2
    )
  );
  return {
    isLoggedIn,
    me,
    playlists,
    currentlyPlayingTrack,
    recentTracks: recentlyPlayedTracks.items.map((track) => {
      return {
        playedAt: track.played_at,
        track: track.track,
        audioFeatures: audioFeatures.find(
          (feature) => feature.id === track.track.id
        ),
      };
    }),
  };
};

export default function Index() {
  const { isLoggedIn, me, playlists, recentTracks, currentlyPlayingTrack } =
    useLoaderData<typeof loader>();
  return (
    <div className="flex flex-col h-screen overflow-auto items-center max-w-screen-sm mx-auto">
      {!isLoggedIn ? (
        <NavLink to="/login">Login</NavLink>
      ) : (
        <div className="flex flex-col w-full">
          <p>{currentlyPlayingTrack.is_playing ? "Playing" : "Not playing"}</p>
          <p>
            {currentlyPlayingTrack.item.name} -{" "}
            {currentlyPlayingTrack.item.artists
              .map((artist) => artist.name)
              .join(", ")}
          </p>
          <div className="flex flex-col gap-4 border-b-2 border-gray-200 pb-4">
            {recentTracks.map((item) => (
              <div key={item.track.id}>
                <p>{item.playedAt}</p>
                <p>{item.track.name}</p>
                <p>
                  {item.track.artists.map((artist) => artist.name).join(", ")}
                </p>
                <p>{item.audioFeatures?.tempo}BPM</p>
                <p>{item.audioFeatures?.camelotKey}</p>
                <ul>
                  <li>Danceability: {item.audioFeatures?.danceability}</li>
                  <li>Energy: {item.audioFeatures?.energy}</li>
                  <li>Acousticness: {item.audioFeatures?.acousticness}</li>
                  <li>
                    Instrumentalness: {item.audioFeatures?.instrumentalness}
                  </li>
                  <li>Liveness: {item.audioFeatures?.liveness}</li>
                  <li>Loudness: {item.audioFeatures?.loudness}</li>
                  <li>Speechiness: {item.audioFeatures?.speechiness}</li>
                  <li>Valence: {item.audioFeatures?.valence}</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
