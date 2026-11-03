# 2974 Tech Binder (GitHub Pages)

Files: `index.html`, `config.js` (your URNs + token URL), `binder.js`, `worker.js` (token helper).

## Setup (not yet tested against your accounts)
1. **Autodesk app:** at aps.autodesk.com create an app, enable *Model Derivative API* and *Data Management API*. Copy the Client ID and Secret.
2. **Translate your models:** upload each Fusion/STEP model to an APS bucket and run a Model Derivative job (SVF2 output). Follow Autodesk's "Model Derivative" tutorial on aps.autodesk.com. Each model gives a base64 **URN**.
3. **Token helper:** create a free Cloudflare Worker, paste `worker.js`, set the secrets `APS_CLIENT_ID` and `APS_CLIENT_SECRET`, and set `ALLOWED` to your GitHub Pages origin. Never put the secret in the site files.
4. **Config:** put the Worker URL in `TOKEN_URL` and each URN in `config.js`.
5. **Publish:** push these files to a GitHub repo and turn on Pages (Settings > Pages > main branch).
