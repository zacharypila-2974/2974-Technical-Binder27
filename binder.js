let ready = null;
function initViewer() {
  if (ready) return ready;
  ready = new Promise((res, rej) => Autodesk.Viewing.Initializer({
    env: "AutodeskProduction2", api: "streamingV2",
    getAccessToken: cb => fetch(TOKEN_URL).then(r => r.json()).then(t => cb(t.access_token, t.expires_in)).catch(rej)
  }, res));
  return ready;
}
function openModel(host, urn, msg) {
  msg.textContent = "Loading model…";
  initViewer().then(() => {
    const el = document.createElement("div"); el.className = "vh"; host.append(el);
    const viewer = new Autodesk.Viewing.GuiViewer3D(el); viewer.start();
    Autodesk.Viewing.Document.load("urn:" + urn,
      doc => viewer.loadDocumentNode(doc, doc.getRoot().getDefaultGeometry()).then(() => msg.remove()),
      () => { msg.textContent = "Could not load this model. Check the URN and token setup."; });
  }).catch(() => { msg.textContent = "Could not get an access token. Check TOKEN_URL."; });
}
function card(x, big) {
  const c = document.createElement("div"); c.className = "card" + (big ? " big" : "");
  c.innerHTML = `<div class="view"><div class="drop"></div></div><div class="body"><h3>${x.title}</h3><p>${x.desc}</p><div class="spec">${x.tags.map(t => `<span>${t}</span>`).join("")}</div></div>`;
  const v = c.querySelector(".view"), d = c.querySelector(".drop");
  if (!x.urn) { d.textContent = "No model linked yet"; return c; }
  d.innerHTML = `<button type="button">View 3D model</button>`;
  d.querySelector("button").onclick = () => { d.className = "msg"; d.innerHTML = ""; openModel(v, x.urn, d); };
  return c;
}
document.getElementById("g-robot").append(card(MODELS.robot, true));
MODELS.subsystems.forEach(x => document.getElementById("g-sub").append(card(x)));
MODELS.offseason.forEach(x => document.getElementById("g-off").append(card(x)));
document.getElementById("theme").onclick = () => { const r = document.documentElement; r.dataset.theme = r.dataset.theme === "light" ? "dark" : "light"; };
function route() {
  const p = location.hash === "#offseason" ? "offseason" : "robot";
  document.querySelectorAll(".page").forEach(e => e.classList.toggle("on", e.id === p));
  document.querySelectorAll("nav a").forEach(a => a.classList.toggle("on", a.dataset.p === p));
  scrollTo(0, 0);
}
addEventListener("hashchange", route); route();
