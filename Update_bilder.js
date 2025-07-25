const fs = require("fs");
const path = require("path");

// Ordner mit den Bildern
const imagesDir = path.join(__dirname, "images");
const outputFile = path.join(__dirname, "data", "bilder.json");

if (!fs.existsSync(imagesDir)) {
  console.error("Ordner 'images/' wurde nicht gefunden.");
  process.exit(1);
}

// Nur Dateien, die mit "basajaun" beginnen
const files = fs.readdirSync(imagesDir)
  .filter(file => /^basajaun/i.test(file));

if (!fs.existsSync(path.dirname(outputFile))) {
  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
}

const data = {
  bilder: files.sort(),
  updated: new Date().toISOString()
};

fs.writeFileSync(outputFile, JSON.stringify(data, null, 2), "utf8");

console.log(`✅ ${files.length} Bilder gefunden. Datei 'data/bilder.json' wurde aktualisiert.`);
