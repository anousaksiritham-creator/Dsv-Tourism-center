# Dansavanh Tourism Center

[Open the interactive 3D preview](https://anousaksiritham-creator.github.io/Dsv-Tourism-center/)

Choose Option A, B, or C, change the lighting, or select a camera preset.
Use `#A`, `#B`, or `#C` on the preview URL to open a specific option.

## Open locally

Download the repository ZIP, extract it, and open `index.html` in a modern browser.
The original `DSV_OFFLINE_VIEWER.html` includes its models, textures, fonts, and
scripts, so it also opens directly without an internet connection.

## Hosting

GitHub Pages publishes the root folder of `main`. `index.html` is a preview copy of
the viewer with a relative project-home link that also works under the repository
URL. The project-home link returns to the preview. `.nojekyll` keeps the
package available as plain static files.

The uploaded `DSV_OFFLINE_VIEWER.html` is preserved byte-for-byte.

This is a concept design package for management review, not for construction.

## Option A development viewer

`option-a.html` is a standalone three.js viewer for Option A only, for further development.

- `models/Option_A.glb` — Option A (metres, Y-up)
- `models/Module2_Common_Site_UNCHANGED.glb` — shared site, unchanged
- `models/Option_A_lights.json` — Option A lighting schedule (8 lights; 3 step lights are in code)
- `models/realism/` — timber/stone textures and detailed tree canopy, ported from `DSV_OFFLINE_VIEWER.html`
- `vendor/three/` — three.js r170 (offline, no CDN)

Run `serve.bat` (needs Python) or `python -m http.server 8080`, then open
http://localhost:8080/option-a.html. Models must load over http, not `file://`.
