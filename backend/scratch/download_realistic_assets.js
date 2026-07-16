import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const uploadsPath = path.join(__dirname, '../uploads');

// Helper to download a file from a URL to a local destination
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
      }
    };
    https.get(url, options, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Follow redirects
        downloadFile(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download file, status code: ${response.statusCode} for URL: ${url}`));
        return;
      }
      const fileStream = fs.createWriteStream(dest);
      response.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

// 1. Testimonial profile photo Unsplash IDs (realistic portraits)
const testimonialFaces = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
];

// 2. Graduation ceremony Unsplash photo links
const graduationPhotos = [
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1498243691581-b145c3f54a5c?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1492534513006-37715f336a39?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&auto=format&fit=crop&q=80'
];

// 3. Shooting house studio interior photo links (Wix Static CDN)
const studioPhotos = [
  'https://static.wixstatic.com/media/e67e91_6810b8cc855742f2a161bf7af70b8c7b~mv2.jpeg',
  'https://static.wixstatic.com/media/e67e91_321abb18e663495aa19394b58250068e~mv2.jpeg',
  'https://static.wixstatic.com/media/e67e91_d47c869c116c48efb111b9c55a00b3ff~mv2.jpeg',
  'https://static.wixstatic.com/media/e67e91_218a9b66e63546d6b608a21f7114d78d~mv2.jpeg',
  'https://static.wixstatic.com/media/e67e91_8dab172717744e789248cd0f12454255~mv2.jpeg',
  'https://static.wixstatic.com/media/e67e91_436ceeda4d044b73b042842081e9a137~mv2.jpeg',
  'https://static.wixstatic.com/media/e67e91_67d73becfac143fe9d4886ef4d7fe3cd~mv2.jpeg'
];

// 4. Video ad production related thumbnails (Unsplash)
const adVideoThumbs = [
  'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1503095396549-807759245b35?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=500&auto=format&fit=crop&q=80'
];

async function start() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'thaara_umesh'
  });

  // A. Download realistic profile photos for Testimonials
  console.log('Downloading realistic testimonial profile photos...');
  const [testimonials] = await connection.query('SELECT * FROM testimonials');
  for (let i = 0; i < testimonials.length; i++) {
    const t = testimonials[i];
    const filename = `profile-${t.id}.jpg`;
    const dest = path.join(uploadsPath, 'testimonials', filename);
    const url = testimonialFaces[i % testimonialFaces.length];

    try {
      await downloadFile(url, dest);
      const relativeUrl = `/uploads/testimonials/${filename}`;
      await connection.query('UPDATE testimonials SET profile_image = ? WHERE id = ?', [relativeUrl, t.id]);
      console.log(`Downloaded photo for testimonial: ${t.person_name}`);
    } catch (e) {
      console.error(`Failed to download photo for ${t.person_name}:`, e.message);
    }
  }

  // B. Download realistic graduation photos
  console.log('\nDownloading realistic graduation event photos...');
  const [ignite] = await connection.query('SELECT * FROM ignite_images');
  for (let i = 0; i < ignite.length; i++) {
    const img = ignite[i];
    const filename = `ignite-photo-${img.id}.jpg`;
    const dest = path.join(uploadsPath, 'ignite', filename);
    const url = graduationPhotos[i % graduationPhotos.length];

    try {
      await downloadFile(url, dest);
      const relativeUrl = `/uploads/ignite/${filename}`;
      await connection.query('UPDATE ignite_images SET image_url = ? WHERE id = ?', [relativeUrl, img.id]);
      console.log(`Downloaded photo for graduation: ${img.id}`);
    } catch (e) {
      console.error(`Failed to download graduation photo ${img.id}:`, e.message);
    }
  }

  // C. Download realistic shooting house room photos
  console.log('\nDownloading realistic studio interior photos...');
  const [rooms] = await connection.query('SELECT * FROM shooting_house_images');
  for (let i = 0; i < rooms.length; i++) {
    const img = rooms[i];
    const filename = `room-${img.id}.jpg`;
    const dest = path.join(uploadsPath, 'shooting-house', filename);
    const url = studioPhotos[i % studioPhotos.length];

    try {
      await downloadFile(url, dest);
      const relativeUrl = `/uploads/shooting-house/${filename}`;
      await connection.query('UPDATE shooting_house_images SET image_url = ? WHERE id = ?', [relativeUrl, img.id]);
      console.log(`Downloaded photo for studio room: ${img.id}`);
    } catch (e) {
      console.error(`Failed to download studio photo ${img.id}:`, e.message);
    }
  }

  // D. Download realistic showcase & workshop video thumbnails
  console.log('\nDownloading realistic video thumbnails...');
  const [showcases] = await connection.query('SELECT * FROM showcases');
  for (let i = 0; i < showcases.length; i++) {
    const s = showcases[i];
    const filename = `showcase-thumb-${s.id}.jpg`;
    const dest = path.join(uploadsPath, 'showcases', filename);
    const url = adVideoThumbs[i % adVideoThumbs.length];

    try {
      await downloadFile(url, dest);
      const relativeUrl = `/uploads/showcases/${filename}`;
      await connection.query('UPDATE showcases SET thumbnail = ? WHERE id = ?', [relativeUrl, s.id]);
    } catch (e) {
      console.error(`Failed to download showcase thumb ${s.id}:`, e.message);
    }
  }
  console.log('Finished downloading showcase thumbnails.');

  const [workshops] = await connection.query('SELECT * FROM workshops');
  for (let i = 0; i < workshops.length; i++) {
    const w = workshops[i];
    const filename = `workshop-thumb-${w.id}.jpg`;
    const dest = path.join(uploadsPath, 'workshops', filename);
    const url = adVideoThumbs[(i + 3) % adVideoThumbs.length];

    try {
      await downloadFile(url, dest);
      const relativeUrl = `/uploads/workshops/${filename}`;
      await connection.query('UPDATE workshops SET thumbnail = ? WHERE id = ?', [relativeUrl, w.id]);
    } catch (e) {
      console.error(`Failed to download workshop thumb ${w.id}:`, e.message);
    }
  }
  console.log('Finished downloading workshop thumbnails.');

  await connection.end();
  console.log('\nAll realistic photos successfully downloaded and database updated!');
}

start().catch(console.error);
