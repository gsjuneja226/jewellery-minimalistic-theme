import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function run() {
  let sharp;
  try {
    sharp = (await import('sharp')).default;
  } catch (err) {
    console.error('Sharp is not installed yet. Please wait for npm install to finish.');
    process.exit(1);
  }

  const refDir = path.join(rootDir, 'reference');
  const outDir = path.join(rootDir, 'public', 'brand');
  fs.mkdirSync(outDir, { recursive: true });

  // Locate source logo
  let srcPath = path.join(refDir, 'logo-transparent.png');
  if (!fs.existsSync(srcPath)) {
    srcPath = path.join(refDir, 'logo.png');
    if (!fs.existsSync(srcPath)) {
      srcPath = path.join(refDir, 'logo.jpeg');
    }
  }

  if (!fs.existsSync(srcPath)) {
    console.error('No source logo found in reference/');
    process.exit(1);
  }

  console.log(`Using source logo: ${srcPath}`);

  // Load image with sharp
  const image = sharp(srcPath);
  const metadata = await image.metadata();
  const width = metadata.width || 1200;
  const height = metadata.height || 1200;

  // 1. Create logo-transparent.png if it does not exist yet by removing the light beige/paper background
  const transparentPath = path.join(refDir, 'logo-transparent.png');
  let transparentBuffer;

  if (fs.existsSync(transparentPath)) {
    transparentBuffer = await fs.promises.readFile(transparentPath);
  } else {
    // Process pixels to remove paper background:
    // Any pixel where R > 230, G > 220, B > 200 with low saturation gets turned to transparent alpha
    const { data, info } = await image
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      // Paper background is warm off-white / light beige (around #fdfbf7 to #f5efe6)
      if (r > 225 && g > 215 && b > 200) {
        // Linear fade out for smooth antialiased edges
        const brightness = (r + g + b) / 3;
        if (brightness > 240) {
          data[i + 3] = 0;
        } else {
          data[i + 3] = Math.max(0, Math.min(255, Math.floor((240 - brightness) * 15)));
        }
      }
    }

    transparentBuffer = await sharp(data, {
      raw: { width: info.width, height: info.height, channels: 4 }
    })
      .png()
      .toBuffer();

    await fs.promises.writeFile(transparentPath, transparentBuffer);
    console.log(`Generated ${transparentPath}`);
  }

  const baseTransparent = sharp(transparentBuffer);

  // 2. Full logo
  await baseTransparent
    .clone()
    .png({ quality: 100 })
    .toFile(path.join(outDir, 'logo-full.png'));
  console.log('Created logo-full.png');

  // 3. Wordmark crop: centered horizontal text area (PHABULOUS, Gurmukhi, by Mitthat)
  // Usually around center-to-middle-bottom or middle band
  const wmTop = Math.floor(height * 0.38);
  const wmHeight = Math.floor(height * 0.35);
  const wmLeft = Math.floor(width * 0.08);
  const wmWidth = Math.floor(width * 0.84);

  await baseTransparent
    .clone()
    .extract({ left: wmLeft, top: wmTop, width: wmWidth, height: wmHeight })
    .trim()
    .png()
    .toFile(path.join(outDir, 'logo-wordmark.png'));
  console.log('Created logo-wordmark.png');

  // 4. Earring crop: tight crop around the gold jhumka
  // Positioned at the ear of the profile silhouette (upper-middle area)
  const earringLeft = Math.floor(width * 0.42);
  const earringTop = Math.floor(height * 0.18);
  const earringSize = Math.floor(width * 0.22);

  await baseTransparent
    .clone()
    .extract({
      left: Math.max(0, earringLeft),
      top: Math.max(0, earringTop),
      width: Math.min(width - earringLeft, earringSize),
      height: Math.min(height - earringTop, earringSize)
    })
    .resize(256, 256, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(outDir, 'mark-earring.png'));
  console.log('Created mark-earring.png');

  // Also write favicon and apple-touch-icon
  await sharp(path.join(outDir, 'mark-earring.png'))
    .resize(32, 32)
    .toFile(path.join(rootDir, 'public', 'favicon.ico'));
  await sharp(path.join(outDir, 'mark-earring.png'))
    .resize(180, 180)
    .toFile(path.join(rootDir, 'public', 'apple-touch-icon.png'));
  console.log('Created favicon.ico and apple-touch-icon.png');

  // 5. Mono logo (one-colour espresso #2A1408 for invoices & packing slips)
  const { data: monoData, info: monoInfo } = await baseTransparent
    .clone()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < monoData.length; i += 4) {
    if (monoData[i + 3] > 10) {
      // Set to espresso: #2A1408 -> (42, 20, 8)
      monoData[i] = 42;
      monoData[i + 1] = 20;
      monoData[i + 2] = 8;
    }
  }

  await sharp(monoData, {
    raw: { width: monoInfo.width, height: monoInfo.height, channels: 4 }
  })
    .png()
    .toFile(path.join(outDir, 'logo-mono.png'));
  console.log('Created logo-mono.png');

  // 6. Open Graph Image: 1200 x 630 on warm white (#FFFDF9)
  const ogWidth = 1200;
  const ogHeight = 630;
  const resizedLogo = await baseTransparent
    .clone()
    .resize(Math.floor(ogWidth * 0.7), Math.floor(ogHeight * 0.7), {
      fit: 'inside',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .toBuffer();

  await sharp({
    create: {
      width: ogWidth,
      height: ogHeight,
      channels: 4,
      background: { r: 255, g: 253, b: 249, alpha: 1 } // #FFFDF9 Warm White
    }
  })
    .composite([
      {
        input: resizedLogo,
        gravity: 'center'
      }
    ])
    .png()
    .toFile(path.join(outDir, 'og-image.png'));
  console.log('Created og-image.png (1200x630)');

  console.log('✅ Brand assets generated successfully!');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
