import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

async function generate() {
  const uploadsDir = path.join(__dirname, '../uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'thaara_umesh'
  });

  // 1. Generate Local Showcase Thumbnails
  console.log('Fetching showcases...');
  const [showcases] = await connection.query('SELECT * FROM showcases');
  console.log(`Generating local thumbnails for ${showcases.length} showcases...`);
  
  for (const s of showcases) {
    const safeName = s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40);
    const filename = `showcase-thumb-${s.id}-${safeName}.svg`;
    const filePath = path.join(uploadsDir, filename);

    // Limit title length in SVG text to fit
    const displayTitle = s.title.length > 35 ? s.title.slice(0, 35) + '...' : s.title;

    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225" width="400" height="225">
  <rect width="100%" height="100%" fill="#0F172A"/>
  <!-- Decorative grid -->
  <line x1="0" y1="56" x2="400" y2="56" stroke="#1E293B" stroke-width="1"/>
  <line x1="0" y1="112" x2="400" y2="112" stroke="#1E293B" stroke-width="1"/>
  <line x1="0" y1="168" x2="400" y2="168" stroke="#1E293B" stroke-width="1"/>
  <line x1="100" y1="0" x2="100" y2="225" stroke="#1E293B" stroke-width="1"/>
  <line x1="200" y1="0" x2="200" y2="225" stroke="#1E293B" stroke-width="1"/>
  <line x1="300" y1="0" x2="300" y2="225" stroke="#1E293B" stroke-width="1"/>
  
  <!-- Outer glowing accent border -->
  <rect x="8" y="8" width="384" height="209" fill="none" stroke="#9B0B16" stroke-width="1.5" rx="6" opacity="0.8"/>
  
  <!-- Centered Play Icon Button -->
  <circle cx="200" cy="100" r="28" fill="#9B0B16" />
  <polygon points="192,86 192,114 216,100" fill="#FFFFFF"/>
  
  <!-- Title text strip at bottom -->
  <rect x="8" y="160" width="384" height="57" fill="#000000" opacity="0.8" rx="4"/>
  <text x="200" y="193" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#F8FAFC" text-anchor="middle">${displayTitle}</text>
</svg>`;

    fs.writeFileSync(filePath, svgContent);

    const relativeUrl = `/uploads/${filename}`;
    await connection.query('UPDATE showcases SET thumbnail = ? WHERE id = ?', [relativeUrl, s.id]);
  }
  console.log('Finished seeding local showcase thumbnails.');

  // 2. Generate Local Workshop Video Testimonial Thumbnails
  console.log('Fetching workshops...');
  const [workshops] = await connection.query('SELECT * FROM workshops');
  console.log(`Generating local thumbnails for ${workshops.length} workshops...`);

  for (const w of workshops) {
    const filename = `workshop-thumb-${w.id}.svg`;
    const filePath = path.join(uploadsDir, filename);

    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225" width="400" height="225">
  <rect width="100%" height="100%" fill="#180B0D"/>
  
  <!-- Outer accent border -->
  <rect x="8" y="8" width="384" height="209" fill="none" stroke="#E2B235" stroke-width="1.5" rx="6" opacity="0.8"/>
  
  <!-- Centered Play Icon Button -->
  <circle cx="200" cy="112" r="28" fill="#9B0B16" />
  <polygon points="192,98 192,126 216,112" fill="#FFFFFF"/>
  
  <!-- Monologue label -->
  <text x="200" y="55" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="800" fill="#E2B235" letter-spacing="3" text-anchor="middle" transform="uppercase">STUDENT TESTIMONIAL</text>
  <text x="200" y="175" font-family="system-ui, -apple-system, sans-serif" font-size="10" font-weight="600" fill="#F8FAFC" text-anchor="middle">Ignite Talents Grooming Academy</text>
</svg>`;

    fs.writeFileSync(filePath, svgContent);

    const relativeUrl = `/uploads/${filename}`;
    await connection.query('UPDATE workshops SET thumbnail = ? WHERE id = ?', [relativeUrl, w.id]);
  }
  console.log('Finished seeding local workshop thumbnails.');

  await connection.end();
  console.log('All local thumbnails successfully generated and database updated!');
}

generate().catch(console.error);
