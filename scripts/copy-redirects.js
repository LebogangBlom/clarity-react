const fs = require('fs');
const path = require('path');
const src = path.resolve(__dirname, '..', '_redirects');
const destDir = path.resolve(__dirname, '..', 'dist');
const dest = path.join(destDir, '_redirects');

if (!fs.existsSync(src)) {
  console.log('_redirects file not found, skipping copy');
  process.exit(0);
}

if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
fs.copyFileSync(src, dest);
console.log('Copied _redirects to dist/');
