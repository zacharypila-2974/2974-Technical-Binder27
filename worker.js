// Cloudflare Worker: hands the page a short-lived, read-only Autodesk token.
// Set secrets APS_CLIENT_ID and APS_CLIENT_SECRET in the Worker settings.
const ALLOWED = "https://YOUR-GITHUB-NAME.github.io"; // your Pages site's origin
export default {
  async fetch(req, env) {
    const cors = { "Access-Control-Allow-Origin": ALLOWED, "Content-Type": "application/json" };
    if (req.method === "OPTIONS") return new Response(null, { headers: cors });
    const r = await fetch("https://developer.api.autodesk.com/authentication/v2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded",
                 Authorization: "Basic " + btoa(env.APS_CLIENT_ID + ":" + env.APS_CLIENT_SECRET) },
      body: "grant_type=client_credentials&scope=viewables:read"
    });
    const t = await r.json();
    return new Response(JSON.stringify({ access_token: t.access_token, expires_in: t.expires_in }), { headers: cors });
  }
};
