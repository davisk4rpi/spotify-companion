export type AccessToken = {
    access_token: string;
    scope: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
    isExpired: () => boolean;
};
export declare const getUserAuthorizationToken: ({ authorizationCode, redirectUri, clientId, clientSecret, }: {
    authorizationCode: string;
    redirectUri: string;
    clientId: string;
    clientSecret: string;
}) => Promise<AccessToken>;
export declare const refreshTokenUserAuthorizationToken: ({ refreshToken, clientId, clientSecret, }: {
    refreshToken: string;
    clientId: string;
    clientSecret: string;
}) => Promise<AccessToken>;
