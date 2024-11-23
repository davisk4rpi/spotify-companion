export declare const getTracksAudioFeatures: ({ accessToken, trackIds, }: {
    accessToken: string;
    trackIds: string[];
}) => Promise<(SpotifyAudioFeatures & {
    camelotKey: string;
})[]>;
export type SpotifyAudioFeatures = {
    type: "audio_features";
    id: string;
    track_href: string;
    analysis_url: string;
    tempo: number;
    duration_ms: number;
    time_signature: number;
    danceability: number;
    energy: number;
    key: number;
    loudness: number;
    mode: number;
    speechiness: number;
    acousticness: number;
    instrumentalness: number;
    liveness: number;
    valence: number;
    uri: string;
};
