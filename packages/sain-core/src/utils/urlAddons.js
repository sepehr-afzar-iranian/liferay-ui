const doAsUserId = typeof themeDisplay !== "undefined" ? themeDisplay.getDoAsUserIdEncoded() : "";

// axios ( !dev )
export default function (url) {
  let URL = url;
  if (!url.includes("p_auth")) URL = `${url}${url.includes("?") ? "&" : "?"}p_auth=${Liferay.authToken}`;
  if (doAsUserId) URL += `&doAsUserId=${encodeURIComponent(doAsUserId)}`;
  return URL;
}

// filepond
export function uploadUrlAddons(url, dev, siteId) {
  let URL = url.replace("{siteId}", siteId);
  if (dev) return URL;

  URL = `${URL}${URL.includes("?") ? "&" : "?"}p_auth=${Liferay.authToken}`.replace("{siteId}", siteId);
  if (doAsUserId) URL += `&doAsUserId=${doAsUserId}`;
  return URL;
}
