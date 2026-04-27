import { readFileSync, writeFileSync, readdirSync, existsSync } from "fs";
import { join, extname, basename } from "path";

const VEHICLES_PATH = new URL("../src/lib/vehicles.ts", import.meta.url).pathname;
const PUBLIC_DIR = new URL("../public", import.meta.url).pathname;
const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

// Preferred leading filenames (checked as substrings)
const FRONT_PRIORITY = ["front_left", "front"];

function getImages(dirUrl) {
  // dirUrl is like "/cars/ALFA%20ROMEO%20STELVIO%20azul"
  const decodedDir = decodeURIComponent(dirUrl); // "/cars/ALFA ROMEO STELVIO azul"
  const fsDir = join(PUBLIC_DIR, decodedDir); // absolute FS path

  if (!existsSync(fsDir)) {
    return null;
  }

  const files = readdirSync(fsDir).filter((f) =>
    IMAGE_EXTS.has(extname(f).toLowerCase())
  );

  // Sort: front-priority files first, then alphabetically
  files.sort((a, b) => {
    const aLow = a.toLowerCase();
    const bLow = b.toLowerCase();

    for (const key of FRONT_PRIORITY) {
      const aHas = aLow.includes(key);
      const bHas = bLow.includes(key);
      if (aHas && !bHas) return -1;
      if (!aHas && bHas) return 1;
    }

    return aLow.localeCompare(bLow);
  });

  // Build URL-encoded paths — keep the encoded directory, encode only the filename
  return files.map((f) => `${dirUrl}/${encodeURIComponent(f)}`);
}

let src = readFileSync(VEHICLES_PATH, "utf8");

// Regex to find each vehicle entry's `image` field and its following `detail: {` block
// We'll do a two-pass approach: find all `image:` values, then find and patch the
// immediately following detail block.

// Strategy: find each `detail: {` block, look back for the nearest `image:` field
// to determine the vehicle directory, then replace the five old fields.

// We'll walk through the source with a regex that captures the full detail block content
// up to the closing }. Since detail blocks are nested (specs), we must count braces.

let updatedCount = 0;
const notFound = [];

// Match: image: "/cars/..." (the top-level listing image)
// Then later: detail: { ... }
// We'll extract (image_url, detail_block_start_index) pairs

// Step 1: find all `image:` top-level entries with their positions
const imageRegex = /\bimage:\s*"(\/cars\/[^"]+)"/g;
const imageMatches = [];
let m;
while ((m = imageRegex.exec(src)) !== null) {
  imageMatches.push({ pos: m.index, url: m[1] });
}

// Step 2: find all `detail: {` positions
const detailRegex = /\bdetail:\s*\{/g;
const detailPositions = [];
let dm;
while ((dm = detailRegex.exec(src)) !== null) {
  detailPositions.push(dm.index);
}

if (imageMatches.length !== detailPositions.length) {
  console.warn(
    `Warning: found ${imageMatches.length} image fields but ${detailPositions.length} detail blocks — counts differ.`
  );
}

// Pair each image match with the next detail block that comes after it
const pairs = imageMatches.map((img) => {
  const detailPos = detailPositions.find((p) => p > img.pos);
  return { imageUrl: img.url, detailPos };
});

// Step 3: process in reverse order so positions remain valid as we mutate the string
pairs.reverse();

for (const { imageUrl, detailPos } of pairs) {
  if (detailPos === undefined) {
    console.warn(`No detail block found after image: ${imageUrl}`);
    continue;
  }

  // Extract the directory portion from the image URL
  const lastSlash = imageUrl.lastIndexOf("/");
  const dirUrl = imageUrl.substring(0, lastSlash); // e.g. "/cars/ALFA%20ROMEO%20STELVIO%20azul"

  const images = getImages(dirUrl);

  if (!images) {
    notFound.push(dirUrl);
    console.warn(`  Directory not found: ${dirUrl}`);
    continue;
  }

  // Find the opening brace of the detail block
  const openBrace = src.indexOf("{", detailPos);
  // Now we need to find the content between openBrace+1 and the matching close brace
  // We must count nested braces
  let depth = 1;
  let i = openBrace + 1;
  while (i < src.length && depth > 0) {
    if (src[i] === "{") depth++;
    else if (src[i] === "}") depth--;
    i++;
  }
  // i is now one past the closing brace of detail
  const detailBlockContent = src.slice(openBrace + 1, i - 1); // content inside { }

  // Build the images array string
  const imagesLine =
    "\n      images: [\n" +
    images.map((img) => `        "${img}",`).join("\n") +
    "\n      ],";

  // Remove old fields: mainImage, thumb1, thumb2, thumb1Alt, thumb2Alt
  // Each looks like:   fieldName: "...",
  let patched = detailBlockContent;

  const fieldsToRemove = ["mainImage", "thumb1", "thumb2", "thumb1Alt", "thumb2Alt"];
  for (const field of fieldsToRemove) {
    // Match the field line including leading whitespace and trailing newline
    const fieldRe = new RegExp(`\\n?[ \\t]*${field}:\\s*"[^"]*",?\\n?`, "g");
    patched = patched.replace(fieldRe, "\n");
  }

  // Clean up any double-blank lines left behind
  patched = patched.replace(/\n{3,}/g, "\n\n");

  // Inject `images: [...]` right after the opening of the detail block (first newline inside)
  // Find position of first newline inside the patched content
  const firstNewline = patched.indexOf("\n");
  if (firstNewline === -1) {
    patched = imagesLine + patched;
  } else {
    patched = patched.slice(0, firstNewline) + imagesLine + patched.slice(firstNewline);
  }

  // Reconstruct the source
  src =
    src.slice(0, openBrace + 1) +
    patched +
    src.slice(i - 1);

  updatedCount++;
  console.log(`  Updated: ${dirUrl} (${images.length} images)`);
}

// Write result
writeFileSync(VEHICLES_PATH, src, "utf8");

console.log(`\nDone. Updated ${updatedCount} vehicle(s).`);
if (notFound.length > 0) {
  console.log(`Directories not found (${notFound.length}):`);
  notFound.forEach((d) => console.log(`  - ${d}`));
}
