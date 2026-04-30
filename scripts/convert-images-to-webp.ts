import sharp from "sharp";
import { readdirSync, existsSync } from "fs";
import { join, extname, basename } from "path";

const IMAGES_DIR = join(process.cwd(), "public/images/categories");
const SUPPORTED = [".jpg", ".jpeg", ".png"];

async function convertAll() {
  if (!existsSync(IMAGES_DIR)) {
    console.log("No images directory found at", IMAGES_DIR);
    return;
  }

  const files = readdirSync(IMAGES_DIR).filter((f) =>
    SUPPORTED.includes(extname(f).toLowerCase())
  );

  if (files.length === 0) {
    console.log("No convertible images found.");
    return;
  }

  for (const file of files) {
    const inputPath = join(IMAGES_DIR, file);
    const outputName = basename(file, extname(file)) + ".webp";
    const outputPath = join(IMAGES_DIR, outputName);

    if (existsSync(outputPath)) {
      console.log(`Skipping ${file} — ${outputName} already exists`);
      continue;
    }

    await sharp(inputPath).webp({ quality: 85 }).toFile(outputPath);
    console.log(`Converted: ${file} → ${outputName}`);
  }

  console.log("Done.");
}

convertAll().catch((err) => {
  console.error("Conversion failed:", err);
  process.exit(1);
});
