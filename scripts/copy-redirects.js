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
// Also ensure there is a 200.html fallback for SPA routing
const indexSrc = path.join(destDir, 'index.html');
const indexDest200 = path.join(destDir, '200.html');
try {
  if (fs.existsSync(indexSrc)) {
    fs.copyFileSync(indexSrc, indexDest200);
    console.log('Copied index.html to dist/200.html for SPA fallback');
  }
} catch (err) {
  console.warn('Could not create 200.html fallback', err.message)
}

// Copy images folder into dist so static images are available on Netlify
const imagesSrc = path.resolve(__dirname, '..', 'images')
const imagesDest = path.join(destDir, 'images')
try {
  if (fs.existsSync(imagesSrc)) {
    // Use recursive copy
    if (fs.cpSync) {
      fs.cpSync(imagesSrc, imagesDest, { recursive: true })
    } else {
      // fallback: copy files one by one
      const copyRecursive = (src, dest) => {
        if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true })
        for (const name of fs.readdirSync(src)) {
          const s = path.join(src, name)
          const d = path.join(dest, name)
          if (fs.lstatSync(s).isDirectory()) copyRecursive(s, d)
          else fs.copyFileSync(s, d)
        }
      }
      copyRecursive(imagesSrc, imagesDest)
    }
    console.log('Copied images/ to dist/images/')
  }
} catch (err) {
  console.warn('Could not copy images folder', err.message)
}
