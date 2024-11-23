import { redirect } from "@remix-run/react";
import spotifyClient from "~/.server/spotify-client";

export const action = () => {
  const loginUrl = spotifyClient.getLoginUrl();
  return redirect(loginUrl);
};

export const loader = () => {
  const loginUrl = spotifyClient.getLoginUrl();
  return redirect(loginUrl);
};
