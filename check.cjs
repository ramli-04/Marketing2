const fs=require('fs');
const html=fs.readFileSync('dist/index.html','utf8');
const ids=[...html.matchAll(/id="([^"]+)"/g)].map(m=>m[1]);
if(new Set(ids).size!==ids.length)throw Error('Duplicate IDs');
for(const [,id] of html.matchAll(/href="#([^"]+)"/g))if(!ids.includes(id))throw Error('Missing anchor '+id);
for(const file of ['style.css','app.js','research.html'])if(!fs.existsSync('dist/'+file))throw Error('Missing '+file);
const research=fs.readFileSync('dist/research.html','utf8');
if((research.match(/<details open>/g)||[]).length!==10)throw Error('Expected ten research entries');
console.log('Passed: internal anchors, unique IDs, local assets, ten research entries.');
