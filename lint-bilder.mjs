import fs from 'node:fs';
import path from 'node:path';
const candidates = [
  'bilder.json','Bilder.json','data/bilder.json','assets/bilder.json','public/bilder.json'
];
let found = null;
for (const p of candidates) {
  if (fs.existsSync(p)) { found = p; break; }
}
if (!found) {
  console.error(`❌ Keine bilder.json gefunden. Gesucht: ${candidates.join(', ')}`);
  process.exit(1);
}
const txt = fs.readFileSync(found, 'utf8');
let data;
try {
  data = JSON.parse(txt);
} catch (e) {
  console.error(`❌ JSON-Fehler in ${found}: ${e.message}`);
  process.exit(1);
}
if (!Array.isArray(data)) {
  console.error(`❌ Erwartet: Array in ${found}.`);
  process.exit(1);
}
let errors = 0;
data.forEach((item, idx) => {
  if (typeof item !== 'object' || item === null) {
    console.error(`❌ Eintrag #${idx}: kein Objekt.`); errors++;
    return;
  }
  if (typeof item.src !== 'string' || item.src.trim() === '') {
    console.error(`❌ Eintrag #${idx}: fehlendes/leer src.`); errors++;
  }
  if ('alt' in item && typeof item.alt !== 'string') {
    console.warn(`⚠️ Eintrag #${idx}: alt ist nicht String (optional, empfohlen).`);
  }
  if ('w' in item && typeof item.w !== 'number') {
    console.warn(`⚠️ Eintrag #${idx}: w sollte Number sein (optional).`);
  }
  if ('h' in item && typeof item.h !== 'number') {
    console.warn(`⚠️ Eintrag #${idx}: h sollte Number sein (optional).`);
  }
});
if (data.length > 1000) {
  console.warn(`⚠️ Viele Einträge (${data.length}). Prüfe Build-Zeit/Netzlast.`);
}
if (errors > 0) {
  console.error(`❌ Abbruch. Fehler: ${errors}`);
  process.exit(1);
}
console.log(`✅ ${found}: ${data.length} Einträge OK.`);