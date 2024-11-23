export type AccessToken = {
    access_token: string;
    token_type: string;
    expires_in: number;
    isExpired: () => boolean;
};
export declare const getAccessToken: ({ clientId, clientSecret, }: {
    clientId: string;
    clientSecret: string;
}) => Promise<AccessToken>;
