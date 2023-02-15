export function buildRoutesUrl(url) {
  const routeParametersRegex = /:([a-zA-Z0-9\-\_]+)/gm;
  const urlWithParameters = url.replaceAll(routeParametersRegex, "(?<$1>[a-z0-9\-_]+)")
  const urlRegex = new RegExp(`^${urlWithParameters}`);
  return urlRegex;
}
