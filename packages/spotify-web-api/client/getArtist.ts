import axios from "axios";

// curl "https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb" \
//      -H "Authorization: Bearer  BQDBKJ5eo5jxbtpWjVOj7ryS84khybFpP_lTqzV7uV-T_m0cTfwvdn5BnBSKPxKgEb11"

export const getArtist = async ({
  accessToken,
  artistId,
}: {
  accessToken: string;
  artistId: string;
}) => {
  const response = await axios.get(
    `https://api.spotify.com/v1/artists/${artistId}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  console.log(response.data);
};
