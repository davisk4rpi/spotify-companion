import axios from "axios";

// curl -X POST "https://accounts.spotify.com/api/token" \
//      -H "Content-Type: application/x-www-form-urlencoded" \
//      -d "grant_type=client_credentials&client_id=your-client-id&client_secret=your-client-secret"

export type AccessToken = {
  access_token: string;
  token_type: string;
  expires_in: number;
  isExpired: () => boolean;
};

export const getAccessToken = async ({
  clientId,
  clientSecret,
}: {
  clientId: string;
  clientSecret: string;
}): Promise<AccessToken> => {
  const now = Date.now();
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    {
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  const expires_at = now + response.data.expires_in * 1000;
  return {
    ...response.data,
    isExpired: () => Date.now() > expires_at,
  };
};
