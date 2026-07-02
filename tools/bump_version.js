const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const indexPath = path.join(root, 'index.html');
const versionPath = path.join(root, 'version.json');

function nextVersion(version) {
  const parts = String(version).replace(/^v/, '').split('.');
  const major = parts[0] || '0';
  const patch = String(Number(parts[1] || '0') + 1).padStart(4, '0');
  return major + '.' + patch;
}

const meta = JSON.parse(fs.readFileSync(versionPath, 'utf8'));
const version = nextVersion(meta.version);
let html = fs.readFileSync(indexPath, 'utf8');
html = html.replace(/<p id="appVersion">v[^<]+<\/p>/, '<p id="appVersion">v' + version + '</p>');
html = html.replace(/(style\.css|data\.js|core\.js|app\.js)\?v=[0-9.]+/g, '$1?v=' + version);
fs.writeFileSync(indexPath, html, 'utf8');
fs.writeFileSync(versionPath, JSON.stringify({
  ...meta,
  version,
  display: 'v' + version,
  updatedAt: new Date().toISOString()
}, null, 2) + '\n', 'utf8');
console.log('Bumped to v' + version);
