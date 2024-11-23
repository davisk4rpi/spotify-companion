import { SpotifyTrack } from "./types.js";
export declare const getRecentlyPlayedTracks: ({ accessToken, limit, after, before, }: {
    accessToken: string;
    limit?: number;
    after?: number;
    before?: number;
}) => Promise<any>;
export type GetRecentlyPlayedTracksResponse = {
    href: string;
    limit: number;
    next: string;
    cursors: {
        after: string;
        before: string;
    };
    items: {
        played_at: string;
        track: SpotifyTrack;
    }[];
};
