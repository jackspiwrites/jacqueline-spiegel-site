// scripts/generate-thumbs.js
const fs = require('fs');
const path = require('path');
const pdfThumbnail = require('pdf-thumbnail');

const pdfDir   = path.join(__dirname, '../assets/pdfs');
const thumbDir = path.join(__dirname, '../assets/thumbs');

console.log('Scanning for PDFs in:', pdfDir);

(async () => {
  if (!fs.existsSync(thumbDir)) fs.mkdirSync(thumbDir);

  const files = fs
    .readdirSync(pdfDir)
    .filter(fn => fn.toLowerCase().endsWith('.pdf'));

  for (const fn of files) {
    const pdfPath = path.join(pdfDir, fn);
    const pngName = fn.replace(/\.pdf$/i, '.png');
    const outPath = path.join(thumbDir, pngName);

    if (fs.existsSync(outPath)) continue;

    const data = fs.readFileSync(pdfPath);
    try {
      // default is PNG output
      const stream = await pdfThumbnail(data);
      const chunks = [];
      for await (const chunk of stream) chunks.push(chunk);
      fs.writeFileSync(outPath, Buffer.concat(chunks));
      console.log(`✅  ${pngName}`);
    } catch (err) {
      console.error(`❌  Failed for ${fn}:`, err);
    }
  }
})();
