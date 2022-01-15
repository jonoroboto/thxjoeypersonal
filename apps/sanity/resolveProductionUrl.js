// Any random string, must match SANITY_PREVIEW_SECRET in the Next.js .env.local file
const previewSecret = "0dbb6bb00f75be092965890e1ff7ec506867eea3";

// Replace with your deployed studio when you go live
const remoteUrl = `https://rbto-personthxjoey-3794ff626e.vercel.app`;
const localUrl = `http://localhost:3000`;

export default function resolveProductionUrl(doc) {
  const baseUrl =
    window.location.hostname === "localhost" ? localUrl : remoteUrl;

  const previewUrl = new URL(baseUrl);

  previewUrl.pathname = `/api/preview`;
  previewUrl.searchParams.append(`secret`, previewSecret);

  let slug = doc?.slug?.current;
  if (!slug || slug === "") {
    slug = '/';
  }

  previewUrl.searchParams.append(`slug`, slug);

  const isHomePage = doc?.slug?.current?.length === 1;
  const stringyUrl = previewUrl.toString();

  // We need to remove the initial slash from the slug in the generation otherwise the preview breaks
  // If it's the homepage, we can just use the slash
  return isHomePage ? stringyUrl : stringyUrl.replace("%2F", "");
}
