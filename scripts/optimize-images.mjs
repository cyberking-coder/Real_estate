// One-off: downscale + recompress the uploaded renders in /public so the
// static site loads fast. Writes optimized .jpg files into /public/media.
import sharp from 'sharp';
import { mkdir, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const SRC = 'public';
const OUT = 'public/media';
const MAX_W = 2000;
const QUALITY = 80;

await mkdir(OUT, { recursive: true });

const files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png)$/i.test(f));

for (const file of files) {
  const out = join(OUT, file.replace(/\.(jpe?g|png)$/i, '.jpg'));
  const info = await sharp(join(SRC, file))
    .rotate()
    .resize({ width: MAX_W, withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toFile(out);
  console.log(`${file} -> media/${file.replace(/\.(jpe?g|png)$/i, '.jpg')}  ${(info.size / 1024).toFixed(0)}KB ${info.width}x${info.height}`);
}
