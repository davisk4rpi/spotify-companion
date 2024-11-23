import axios from "axios";

// curl -X POST "https://accounts.spotify.com/api/token" \
//      -H "Content-Type: application/x-www-form-urlencoded" \
//      -d "grant_type=client_credentials&client_id=your-client-id&client_secret=your-client-secret"

export type AccessToken = {
  access_token: string;
  scope: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  isExpired: () => boolean;
};

export const getUserAuthorizationToken = async ({
  authorizationCode,
  redirectUri,
  clientId,
  clientSecret,
}: {
  authorizationCode: string;
  redirectUri: string;
  clientId: string;
  clientSecret: string;
}): Promise<AccessToken> => {
  const now = Date.now();
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    {
      code: authorizationCode,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(clientId + ":" + clientSecret).toString("base64"),
      },
    }
  );
  const expires_at = now + response.data.expires_in * 1000;
  return {
    ...response.data,
    isExpired: () => Date.now() > expires_at,
  };
};

export const refreshTokenUserAuthorizationToken = async ({
  refreshToken,
  clientId,
  clientSecret,
}: {
  refreshToken: string;
  clientId: string;
  clientSecret: string;
}): Promise<AccessToken> => {
  const now = Date.now();
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    {
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(clientId + ":" + clientSecret).toString("base64"),
      },
    }
  );
  const expires_at = now + response.data.expires_in * 1000;
  return {
    ...response.data,
    isExpired: () => Date.now() > expires_at,
  };
};
