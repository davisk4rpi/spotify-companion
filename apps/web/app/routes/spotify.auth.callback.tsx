import { LoaderFunctionArgs } from "@remix-run/node";
import { redirect, useLoaderData } from "@remix-run/react";
import spotifyClient from "~/.server/spotify-client";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const error = url.searchParams.get("error");
  if (code) {
    const accessToken = await spotifyClient.getUserAuthorizationToken(code);
    if (!accessToken?.isExpired()) {
      return redirect("/");
    }
  }

  console.log({ code, state, error });
  return { error };
};


export default function AuthReturnPage() {
  const { error } = useLoaderData<typeof loader>();
  return <div>{error}</div>;
}
