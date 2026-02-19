import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SOURCE = path.join(__dirname, 'src', 'asset', 'img', 'App Icon.png');
const RES = path.join(__dirname, 'android', 'app', 'src', 'main', 'res');

async function generate() {
  // ── App Icons (mipmap) ──────────────────────────────────────
  const iconSizes = [
    { dir: 'mipmap-mdpi',    size: 48  },
    { dir: 'mipmap-hdpi',    size: 72  },
    { dir: 'mipmap-xhdpi',   size: 96  },
    { dir: 'mipmap-xxhdpi',  size: 144 },
    { dir: 'mipmap-xxxhdpi', size: 192 },
  ];

  for (const { dir, size } of iconSizes) {
    const outDir = path.join(RES, dir);
    // Standard icon
    await sharp(SOURCE)
      .resize(size, size, { fit: 'cover' })
      .png()
      .toFile(path.join(outDir, 'ic_launcher.png'));
    // Round icon
    await sharp(SOURCE)
      .resize(size, size, { fit: 'cover' })
      .png()
      .toFile(path.join(outDir, 'ic_launcher_round.png'));
    // Foreground (adaptive icon, needs padding — 108dp safe zone with 66dp visible)
    const fgSize = Math.round(size * 108 / 48); // adaptive icon foreground size
    await sharp(SOURCE)
      .resize(fgSize, fgSize, { fit: 'contain', background: { r: 162, g: 210, b: 255, alpha: 1 } })
      .png()
      .toFile(path.join(outDir, 'ic_launcher_foreground.png'));
    console.log(`✓ ${dir}: ${size}px icons`);
  }

  // ── Splash Screens ─────────────────────────────────────────
  // Default splash (square)
  await sharp(SOURCE)
    .resize(480, 480, { fit: 'contain', background: { r: 162, g: 210, b: 255, alpha: 1 } })
    .png()
    .toFile(path.join(RES, 'drawable', 'splash.png'));
  console.log('✓ drawable/splash.png');

  // Portrait splash screens
  const portSizes = [
    { dir: 'drawable-port-mdpi',    w: 320,  h: 480  },
    { dir: 'drawable-port-hdpi',    w: 480,  h: 800  },
    { dir: 'drawable-port-xhdpi',   w: 720,  h: 1280 },
    { dir: 'drawable-port-xxhdpi',  w: 960,  h: 1600 },
    { dir: 'drawable-port-xxxhdpi', w: 1280, h: 1920 },
  ];

  for (const { dir, w, h } of portSizes) {
    // Center the icon on an ocean-blue background
    const iconSize = Math.round(Math.min(w, h) * 0.5);
    const resizedIcon = await sharp(SOURCE)
      .resize(iconSize, iconSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();

    await sharp({
      create: { width: w, height: h, channels: 4, background: { r: 162, g: 210, b: 255, alpha: 255 } }
    })
      .composite([{ input: resizedIcon, gravity: 'centre' }])
      .png()
      .toFile(path.join(RES, dir, 'splash.png'));
    console.log(`✓ ${dir}: ${w}x${h}`);
  }

  // Landscape splash screens
  const landSizes = [
    { dir: 'drawable-land-mdpi',    w: 480,  h: 320  },
    { dir: 'drawable-land-hdpi',    w: 800,  h: 480  },
    { dir: 'drawable-land-xhdpi',   w: 1280, h: 720  },
    { dir: 'drawable-land-xxhdpi',  w: 1600, h: 960  },
    { dir: 'drawable-land-xxxhdpi', w: 1920, h: 1280 },
  ];

  for (const { dir, w, h } of landSizes) {
    const iconSize = Math.round(Math.min(w, h) * 0.5);
    const resizedIcon = await sharp(SOURCE)
      .resize(iconSize, iconSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();

    await sharp({
      create: { width: w, height: h, channels: 4, background: { r: 162, g: 210, b: 255, alpha: 255 } }
    })
      .composite([{ input: resizedIcon, gravity: 'centre' }])
      .png()
      .toFile(path.join(RES, dir, 'splash.png'));
    console.log(`✓ ${dir}: ${w}x${h}`);
  }

  console.log('\n🎉 All icons and splash screens generated!');
}

generate().catch(console.error);
