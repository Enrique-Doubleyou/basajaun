// update_bilder.js
const fs = require('fs');
const path = require('path');

const imageDir = path.join(__dirname, 'images');
const outputFile = path.join(__dirname, 'data', 'bilder.json');

fs.readdir(imageDir, (err, files) => {
  if (err) throw err;

  const bilder = files
    .filter(file => /^basajaun.*\.(jpe?g|png|gif)$/i.test(file))
    .sort();

  const jsonData = {
    bilder,
    updated: new Date().toISOString()
  };

  fs.writeFileSync(outputFile, JSON.stringify(jsonData, null, 2), 'utf-8');
  console.log(`✅ ${bilder.length} Bilder gespeichert in ${outputFile}`);
});
