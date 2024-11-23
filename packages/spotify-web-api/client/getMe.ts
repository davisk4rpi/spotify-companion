import axios from "axios";

// curl --request GET \
//   --url https://api.spotify.com/v1/me \
//   --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'

export const getMe = async ({ accessToken }: { accessToken: string }) => {
  const response = await axios.get("https://api.spotify.com/v1/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};
