/**
 * Image Optimization Script
 * Compresses all JPG/PNG/JPEG images in the public folder using sharp
 * Run: node scripts/optimize-images.mjs
 */

import sharp from "sharp";
import { readdir, stat, rename } from "fs/promises";
import { join, extname, basename, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, "../public");

// Skip already-optimized files
const SKIP_EXTENSIONS = [".webp", ".svg", ".pdf", ".gif"];

// Quality settings
const JPEG_QUALITY = 82;
const PNG_QUALITY = 85;
const WEBP_QUALITY = 82;

async function getAllFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await getAllFiles(fullPath)));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

function formatSize(bytes) {
  return (bytes / 1024).toFixed(1) + " KB";
}

async function optimizeImage(filePath) {
  const ext = extname(filePath).toLowerCase();
  if (SKIP_EXTENSIONS.includes(ext)) return null;
  if (![".jpg", ".jpeg", ".png"].includes(ext)) return null;

  const before = (await stat(filePath)).size;
  const tempPath = filePath + ".tmp";

  try {
    const img = sharp(filePath);
    const meta = await img.metadata();

    // Max width 1920px for large images
    const resized = meta.width > 1920 ? img.resize(1920, null, { withoutEnlargement: true }) : img;

    if (ext === ".png") {
      await resized
        .png({ quality: PNG_QUALITY, compressionLevel: 9, palette: true })
        .toFile(tempPath);
    } else {
      await resized
        .jpeg({ quality: JPEG_QUALITY, mozjpeg: true, progressive: true })
        .toFile(tempPath);
    }

    const after = (await stat(tempPath)).size;

    // Only replace if smaller
    if (after < before) {
      await rename(tempPath, filePath);
      const saving = (((before - after) / before) * 100).toFixed(1);
      console.log(`✅ ${basename(filePath)}: ${formatSize(before)} → ${formatSize(after)} (${saving}% saved)`);
      return { before, after };
    } else {
      // Remove temp, keep original
      const { unlink } = await import("fs/promises");
      await unlink(tempPath);
      console.log(`⏭️  ${basename(filePath)}: already optimal (${formatSize(before)})`);
      return null;
    }
  } catch (err) {
    console.error(`❌ Error processing ${basename(filePath)}: ${err.message}`);
    try {
      const { unlink } = await import("fs/promises");
      await unlink(tempPath).catch(() => {});
    } catch {}
    return null;
  }
}

async function main() {
  console.log("🔍 Scanning public folder for images...\n");
  const files = await getAllFiles(PUBLIC_DIR);
  const imageFiles = files.filter((f) => {
    const ext = extname(f).toLowerCase();
    return [".jpg", ".jpeg", ".png"].includes(ext);
  });

  console.log(`Found ${imageFiles.length} images to process.\n`);

  let totalBefore = 0;
  let totalAfter = 0;
  let count = 0;

  for (const file of imageFiles) {
    const result = await optimizeImage(file);
    if (result) {
      totalBefore += result.before;
      totalAfter += result.after;
      count++;
    }
  }

  console.log("\n📊 Summary:");
  console.log(`   Optimized: ${count} files`);
  if (count > 0) {
    const totalSaving = (((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1);
    console.log(`   Before:    ${formatSize(totalBefore)}`);
    console.log(`   After:     ${formatSize(totalAfter)}`);
    console.log(`   Total saved: ${formatSize(totalBefore - totalAfter)} (${totalSaving}%)`);
  }
  console.log("\n✨ Done!");
}

main().catch(console.error);
