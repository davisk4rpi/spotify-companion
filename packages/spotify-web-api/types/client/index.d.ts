import type { SpotifyWebApiClient } from "./types.js";
type SpotifyWebApiClientOptions = {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
};
export declare const createSpotifyWebApiClient: ({ clientId, clientSecret, redirectUri, }: SpotifyWebApiClientOptions) => SpotifyWebApiClient;
export {};
