# DSV Tourism Center — Option A viewer

Standalone three.js viewer for Option A (extracted from `DSV_OFFLINE_VIEWER.html`).

- `index.html` — viewer (orbit, wireframe, toggle common site)
- `models/Option_A.glb` — Option A model (metres, Y-up)
- `models/Module2_Common_Site_UNCHANGED.glb` — shared site, unchanged
- `vendor/three/` — three.js r170 (offline, no CDN)
- `DSV_OFFLINE_VIEWER.html` — original viewer with Options A/B/C

Run: double-click `serve.bat` (needs Python), or `python -m http.server 8080` then open http://localhost:8080/.
Models must be loaded via http, not `file://`.
