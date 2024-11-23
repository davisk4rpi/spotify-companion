import spotifyClient from "~/.server/spotify-client";

export const loader = async () => {
  const me = await spotifyClient.getMe();
  console.log({ me });
  return { me };
};

export default function TestPage() {
  return <div>Test</div>;
}
