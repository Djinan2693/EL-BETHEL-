import sharp from "sharp";
import { readdirSync, statSync } from "fs";
import { join, extname, basename } from "path";

const INPUT_DIR  = "./public/images";
const OUTPUT_DIR = "./public/images";

const files = readdirSync(INPUT_DIR);
let saved = 0;

for (const file of files) {
  const ext  = extname(file).toLowerCase();
  const src  = join(INPUT_DIR, file);
  const dest = join(OUTPUT_DIR, file);
  const before = statSync(src).size;

  if (ext === ".jpg" || ext === ".jpeg") {
    await sharp(src)
      .jpeg({ quality: 75, mozjpeg: true })
      .toFile(dest + ".tmp");
  } else if (ext === ".png") {
    await sharp(src)
      .png({ compressionLevel: 9, effort: 10 })
      .toFile(dest + ".tmp");
  } else {
    continue;
  }

  const after = statSync(dest + ".tmp").size;

  if (after < before) {
    const { renameSync } = await import("fs");
    renameSync(dest + ".tmp", dest);
    const pct = Math.round((1 - after / before) * 100);
    console.log(`✓ ${file}: ${(before/1024).toFixed(0)}KB → ${(after/1024).toFixed(0)}KB  (-${pct}%)`);
    saved += before - after;
  } else {
    const { unlinkSync } = await import("fs");
    unlinkSync(dest + ".tmp");
    console.log(`  ${file}: already optimal`);
  }
}

console.log(`\nTotal saved: ${(saved / 1024 / 1024).toFixed(1)} MB`);
