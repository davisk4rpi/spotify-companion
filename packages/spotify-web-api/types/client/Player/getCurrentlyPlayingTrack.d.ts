import { SpotifyTrack } from "./types.js";
export declare const getCurrentlyPlayingTrack: ({ accessToken, }: {
    accessToken: string;
}) => Promise<CurrentlyPlayingTrack>;
export type CurrentlyPlayingTrack = {
    is_playing: boolean;
    item: SpotifyTrack;
};
