// Builds option-a-offline.html: option-a.html with three.js, GLBs and textures embedded as data: URLs.
// Usage: node build-option-a-offline.mjs
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const read = p => fs.readFileSync(path.join(root, p));
const MIME = {'.js':'text/javascript', '.glb':'model/gltf-binary', '.jpg':'image/jpeg', '.png':'image/png'};
const dataUrl = p => {
  let buf = read(p);
  // data: modules have no base URL, so relative imports must become bare (import-mapped) ones
  if (p.endsWith('GLTFLoader.js')) buf = Buffer.from(buf.toString('utf8').replace(`'../utils/BufferGeometryUtils.js'`, `'three/addons/utils/BufferGeometryUtils.js'`));
  return `data:${MIME[path.extname(p)]};base64,${buf.toString('base64')}`;
};

let html = read('option-a.html').toString('utf8');

// import map -> data: modules
const importMap = {imports: {
  'three': dataUrl('vendor/three/three.module.js'),
  'three/addons/controls/OrbitControls.js': dataUrl('vendor/three/addons/controls/OrbitControls.js'),
  'three/addons/loaders/GLTFLoader.js': dataUrl('vendor/three/addons/loaders/GLTFLoader.js'),
  'three/addons/utils/BufferGeometryUtils.js': dataUrl('vendor/three/addons/utils/BufferGeometryUtils.js'),
}};
html = html.replace(/<script type="importmap">[\s\S]*?<\/script>/, () => `<script type="importmap">${JSON.stringify(importMap)}</script>`);

// asset URLs -> data: URLs, loaded once into a table
const assets = {};
for (const m of html.matchAll(/'\.\/(models\/[^']+\.glb)'/g)) assets[m[1]] = dataUrl(m[1]);
for (const f of fs.readdirSync(path.join(root, 'models/realism'))) assets['models/realism/' + f] = dataUrl('models/realism/' + f);
html = html.replace(/'\.\/(models\/[^']+\.glb)'/g, (_, p) => `ASSETS['${p}']`);
html = html.replace(`'./models/realism/' + f`, `ASSETS['models/realism/' + f]`);
html = html.replace(`<script type="module">`, () => `<script type="module">\nconst ASSETS = ${JSON.stringify(assets)};`);
html = html.replace('Open via a local server (run serve.bat), not file://. ', '');

fs.writeFileSync(path.join(root, 'option-a-offline.html'), html);
console.log('option-a-offline.html', (html.length / 1048576).toFixed(1), 'MB');
