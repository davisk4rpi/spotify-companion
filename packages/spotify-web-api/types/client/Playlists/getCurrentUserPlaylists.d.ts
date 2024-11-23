import { SpotifyPagination } from "../types.js";
export declare const getCurrentUserPlaylists: ({ accessToken, limit, offset, }: {
    accessToken: string;
    limit?: number;
    offset?: number;
}) => Promise<SpotifyCurrentUserPlaylists>;
export type SpotifyCurrentUserPlaylists = SpotifyPagination & {
    items: {
        collaborative: boolean;
        description: string;
        external_urls: {
            spotify: string;
        };
        href: string;
        id: string;
        images: {
            url: string;
            height: number;
            width: number;
        }[];
        name: string;
        owner: {
            external_urls: {
                spotify: string;
            };
            followers: {
                href: string;
                total: number;
            };
            href: string;
            id: string;
            type: "user";
            uri: string;
            display_name: string;
        };
        public: boolean;
        snapshot_id: string;
        tracks: {
            href: string;
            total: number;
        };
        type: string;
        uri: string;
    }[];
};
