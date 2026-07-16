import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const brands = [
  { name: 'Amazon', color: '#FF9900', domain: 'amazon.com' },
  { name: 'Flipkart', color: '#2874F0', domain: 'flipkart.com' },
  { name: 'Shopify', color: '#96bf48', domain: 'shopify.com' },
  { name: 'Uber', color: '#000000', domain: 'uber.com' },
  { name: 'Zomato', color: '#CB202D', domain: 'zomato.com' },
  { name: 'Swiggy', color: '#FC8019', domain: 'swiggy.com' },
  { name: 'Netflix', color: '#E50914', domain: 'netflix.com' },
  { name: 'Spotify', color: '#1DB954', domain: 'spotify.com' },
  { name: 'Google', color: '#4285F4', domain: 'google.com' },
  { name: 'Airbnb', color: '#FF5A5F', domain: 'airbnb.com' },
  { name: 'PayPal', color: '#003087', domain: 'paypal.com' },
  { name: 'Stripe', color: '#008CD1', domain: 'stripe.com' },
  { name: 'eBay', color: '#E53238', domain: 'ebay.com' },
  { name: 'Etsy', color: '#F1641E', domain: 'etsy.com' },
  { name: 'Walmart', color: '#0071CE', domain: 'walmart.com' },
  { name: 'Target', color: '#CC0000', domain: 'target.com' },
  { name: 'Wayfair', color: '#7F187F', domain: 'wayfair.com' },
  { name: 'Best Buy', color: '#FFF200', domain: 'bestbuy.com' },
  { name: 'Zalando', color: '#FF6900', domain: 'zalando.com' },
  { name: 'Asos', color: '#000000', domain: 'asos.com' },
  { name: 'AliExpress', color: '#E62E04', domain: 'aliexpress.com' },
  { name: 'Alibaba', color: '#FF6A00', domain: 'alibaba.com' },
  { name: 'Rakuten', color: '#BF0000', domain: 'rakuten.com' },
  { name: 'Jumia', color: '#F68B1E', domain: 'jumia.com' },
  { name: 'Myntra', color: '#E71F7E', domain: 'myntra.com' },
  { name: 'Ajio', color: '#000000', domain: 'ajio.com' },
  { name: 'Nykaa', color: '#FC2779', domain: 'nykaa.com' },
  { name: 'Lyft', color: '#FF00BF', domain: 'lyft.com' },
  { name: 'Grab', color: '#00B14F', domain: 'grab.com' },
  { name: 'Gojek', color: '#00AA13', domain: 'gojek.com' },
  { name: 'Bolt', color: '#34D399', domain: 'bolt.eu' },
  { name: 'Deliveroo', color: '#00CDBC', domain: 'deliveroo.co.uk' },
  { name: 'DoorDash', color: '#FF3008', domain: 'doordash.com' },
  { name: 'Instacart', color: '#43B02A', domain: 'instacart.com' },
  { name: 'Booking.com', color: '#003580', domain: 'booking.com' },
  { name: 'Expedia', color: '#00355F', domain: 'expedia.com' },
  { name: 'Tripadvisor', color: '#00AF87', domain: 'tripadvisor.com' },
  { name: 'Trivago', color: '#C9302C', domain: 'trivago.com' },
  { name: 'Agoda', color: '#1171BA', domain: 'agoda.com' },
  { name: 'Skyscanner', color: '#0073C2', domain: 'skyscanner.net' },
  { name: 'Hulu', color: '#1CE783', domain: 'hulu.com' },
  { name: 'Disney+', color: '#113CCF', domain: 'disneyplus.com' },
  { name: 'YouTube', color: '#FF0000', domain: 'youtube.com' },
  { name: 'Twitch', color: '#9146FF', domain: 'twitch.tv' },
  { name: 'TikTok', color: '#000000', domain: 'tiktok.com' },
  { name: 'Instagram', color: '#E1306C', domain: 'instagram.com' },
  { name: 'Facebook', color: '#1877F2', domain: 'facebook.com' },
  { name: 'Twitter', color: '#1DA1F2', domain: 'twitter.com' },
  { name: 'LinkedIn', color: '#0A66C2', domain: 'linkedin.com' },
  { name: 'Pinterest', color: '#BD081C', domain: 'pinterest.com' },
  { name: 'Snapchat', color: '#FFFC00', domain: 'snapchat.com' },
  { name: 'Telegram', color: '#24A1DE', domain: 'telegram.org' },
  { name: 'Discord', color: '#5865F2', domain: 'discord.com' },
  { name: 'Zoom', color: '#2D8CFF', domain: 'zoom.us' },
  { name: 'Slack', color: '#4A154B', domain: 'slack.com' },
  { name: 'Microsoft', color: '#F25022', domain: 'microsoft.com' },
  { name: 'Dropbox', color: '#0061FE', domain: 'dropbox.com' },
  { name: 'Notion', color: '#000000', domain: 'notion.so' },
  { name: 'Trello', color: '#0079BF', domain: 'trello.com' },
  { name: 'Asana', color: '#F06A6A', domain: 'asana.com' },
  { name: 'Monday.com', color: '#FF3D57', domain: 'monday.com' },
  { name: 'Jira', color: '#0052CC', domain: 'atlassian.com' },
  { name: 'GitHub', color: '#181717', domain: 'github.com' },
  { name: 'Figma', color: '#F24E1E', domain: 'figma.com' },
  { name: 'Canva', color: '#00C4CC', domain: 'canva.com' },
  { name: 'Webflow', color: '#4353FF', domain: 'webflow.com' },
  { name: 'Squarespace', color: '#000000', domain: 'squarespace.com' },
  { name: 'Wix', color: '#000000', domain: 'wix.com' },
  { name: 'WordPress', color: '#21759B', domain: 'wordpress.org' },
  { name: 'Apple', color: '#000000', domain: 'apple.com' },
  { name: 'Samsung', color: '#1428A0', domain: 'samsung.com' },
  { name: 'Sony', color: '#000000', domain: 'sony.com' },
  { name: 'LG', color: '#A50034', domain: 'lg.com' },
  { name: 'Intel', color: '#0071C5', domain: 'intel.com' },
  { name: 'AMD', color: '#ED1C24', domain: 'amd.com' },
  { name: 'Nvidia', color: '#76B900', domain: 'nvidia.com' },
  { name: 'Dell', color: '#007DB8', domain: 'dell.com' },
  { name: 'HP', color: '#0096D6', domain: 'hp.com' },
  { name: 'Lenovo', color: '#E22B2B', domain: 'lenovo.com' },
  { name: 'Asus', color: '#00539B', domain: 'asus.com' },
  { name: 'Nike', color: '#000000', domain: 'nike.com' },
  { name: 'Adidas', color: '#000000', domain: 'adidas.com' },
  { name: 'Puma', color: '#000000', domain: 'puma.com' },
  { name: 'Reebok', color: '#E00000', domain: 'reebok.com' },
  { name: 'Zara', color: '#000000', domain: 'zara.com' },
  { name: 'H&M', color: '#CC0000', domain: 'hm.com' },
  { name: 'Uniqlo', color: '#FF0000', domain: 'uniqlo.com' },
  { name: 'Tesla', color: '#CC0000', domain: 'tesla.com' },
  { name: 'SpaceX', color: '#005288', domain: 'spacex.com' },
  { name: 'Toyota', color: '#EB0A1E', domain: 'toyota.com' }
];

async function run() {
  const uploadsPath = path.join(__dirname, '../uploads');
  const subfolders = ['clients', 'showcases', 'testimonials', 'workshops', 'ignite', 'shooting-house'];

  console.log('Creating subfolders under uploads/');
  for (const f of subfolders) {
    const dir = path.join(uploadsPath, f);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'thaara_umesh'
  });

  // 1. Clients
  console.log('1. Generating local clients...');
  await connection.query('TRUNCATE TABLE clients');
  for (let i = 0; i < brands.length; i++) {
    const b = brands[i];
    const safeName = b.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const filename = `client-${safeName}.svg`;
    const filePath = path.join(uploadsPath, 'clients', filename);

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80" width="200" height="80">
  <text x="50%" y="58%" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="900" fill="${b.color}" text-anchor="middle">${b.name}</text>
</svg>`;
    fs.writeFileSync(filePath, svg);

    const dbPath = `/uploads/clients/${filename}`;
    await connection.query('INSERT INTO clients (logo, display_order) VALUES (?, ?)', [dbPath, i + 1]);
  }

  // 2. Showcases
  console.log('2. Generating local showcase thumbnails...');
  const [showcases] = await connection.query('SELECT * FROM showcases');
  for (const s of showcases) {
    const safeName = s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40);
    const filename = `showcase-${s.id}-${safeName}.svg`;
    const filePath = path.join(uploadsPath, 'showcases', filename);
    const displayTitle = s.title.length > 35 ? s.title.slice(0, 35) + '...' : s.title;

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225" width="400" height="225">
  <rect width="100%" height="100%" fill="#0F172A"/>
  <line x1="0" y1="56" x2="400" y2="56" stroke="#1E293B" stroke-width="1"/>
  <line x1="0" y1="112" x2="400" y2="112" stroke="#1E293B" stroke-width="1"/>
  <line x1="0" y1="168" x2="400" y2="168" stroke="#1E293B" stroke-width="1"/>
  <line x1="100" y1="0" x2="100" y2="225" stroke="#1E293B" stroke-width="1"/>
  <line x1="200" y1="0" x2="200" y2="225" stroke="#1E293B" stroke-width="1"/>
  <line x1="300" y1="0" x2="300" y2="225" stroke="#1E293B" stroke-width="1"/>
  <rect x="8" y="8" width="384" height="209" fill="none" stroke="#9B0B16" stroke-width="1.5" rx="6" opacity="0.8"/>
  <circle cx="200" cy="100" r="28" fill="#9B0B16" />
  <polygon points="192,86 192,114 216,100" fill="#FFFFFF"/>
  <rect x="8" y="160" width="384" height="57" fill="#000000" opacity="0.8" rx="4"/>
  <text x="200" y="193" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#F8FAFC" text-anchor="middle">${displayTitle}</text>
</svg>`;
    fs.writeFileSync(filePath, svg);

    const dbPath = `/uploads/showcases/${filename}`;
    await connection.query('UPDATE showcases SET thumbnail = ? WHERE id = ?', [dbPath, s.id]);
  }

  // 3. Testimonials
  console.log('3. Generating local testimonial profile photos...');
  const [testimonials] = await connection.query('SELECT * FROM testimonials');
  const avatarColors = ['#9B0B16', '#1E3A8A', '#065F46', '#701A75', '#B45309', '#111827'];
  for (const t of testimonials) {
    const filename = `profile-${t.id}.svg`;
    const filePath = path.join(uploadsPath, 'testimonials', filename);
    const initials = t.person_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
    const color = avatarColors[t.id % avatarColors.length];

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <circle cx="50" cy="50" r="48" fill="${color}"/>
  <text x="50" y="58" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="800" fill="#FFFFFF" text-anchor="middle">${initials}</text>
</svg>`;
    fs.writeFileSync(filePath, svg);

    const dbPath = `/uploads/testimonials/${filename}`;
    await connection.query('UPDATE testimonials SET profile_image = ? WHERE id = ?', [dbPath, t.id]);
  }

  // 4. Workshops
  console.log('4. Generating local workshop video thumbnails...');
  const [workshops] = await connection.query('SELECT * FROM workshops');
  for (const w of workshops) {
    const filename = `workshop-thumb-${w.id}.svg`;
    const filePath = path.join(uploadsPath, 'workshops', filename);

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225" width="400" height="225">
  <rect width="100%" height="100%" fill="#180B0D"/>
  <rect x="8" y="8" width="384" height="209" fill="none" stroke="#E2B235" stroke-width="1.5" rx="6" opacity="0.8"/>
  <circle cx="200" cy="112" r="28" fill="#9B0B16" />
  <polygon points="192,98 192,126 216,112" fill="#FFFFFF"/>
  <text x="200" y="55" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="800" fill="#E2B235" letter-spacing="3" text-anchor="middle">STUDENT TESTIMONIAL</text>
  <text x="200" y="175" font-family="system-ui, -apple-system, sans-serif" font-size="10" font-weight="600" fill="#F8FAFC" text-anchor="middle">Ignite Talents Grooming Academy</text>
</svg>`;
    fs.writeFileSync(filePath, svg);

    const dbPath = `/uploads/workshops/${filename}`;
    await connection.query('UPDATE workshops SET thumbnail = ? WHERE id = ?', [dbPath, w.id]);
  }

  // 5. Ignite Graduation
  console.log('5. Generating local ignite graduation photo placeholders...');
  const [igniteImages] = await connection.query('SELECT * FROM ignite_images');
  for (const img of igniteImages) {
    const filename = `ignite-photo-${img.id}.svg`;
    const filePath = path.join(uploadsPath, 'ignite', filename);

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <rect width="100%" height="100%" fill="#0F172A"/>
  <rect x="10" y="10" width="380" height="280" fill="none" stroke="#9B0B16" stroke-width="1" opacity="0.5"/>
  <path d="M200 70 L280 120 L200 170 L120 120 Z" fill="#9B0B16"/>
  <path d="M120 120 L120 180 Q120 190 130 190 L140 190" fill="none" stroke="#9B0B16" stroke-width="3"/>
  <circle cx="140" cy="190" r="4" fill="#E2B235"/>
  <text x="200" y="220" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="800" fill="#E2B235" text-anchor="middle">IGNITE SPOTLIGHT MOMENT</text>
  <text x="200" y="245" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#94A3B8" text-anchor="middle">Batch Graduation Ceremony</text>
</svg>`;
    fs.writeFileSync(filePath, svg);

    const dbPath = `/uploads/ignite/${filename}`;
    await connection.query('UPDATE ignite_images SET image_url = ? WHERE id = ?', [dbPath, img.id]);
  }

  // 6. Shooting House Images
  console.log('6. Generating local shooting house room photos...');
  const [shImages] = await connection.query('SELECT * FROM shooting_house_images');
  for (const img of shImages) {
    const filename = `room-${img.id}.svg`;
    const filePath = path.join(uploadsPath, 'shooting-house', filename);

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 350" width="500" height="350">
  <rect width="100%" height="100%" fill="#18181B"/>
  <rect x="15" y="15" width="470" height="320" fill="none" stroke="#E2B235" stroke-width="1.5" opacity="0.3"/>
  <text x="50%" y="45%" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="900" fill="#9B0B16" letter-spacing="2" text-anchor="middle">STUDIO INTERIOR ROOM ${img.id}</text>
  <text x="50%" y="55%" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#E2B235" text-anchor="middle">AKSHAYA SHOOTING HOUSE</text>
  <text x="50%" y="70%" font-family="system-ui, -apple-system, sans-serif" font-size="10" font-weight="500" fill="#71717A" text-anchor="middle">Built for Movie Sets, Ad shoots &amp; Auditions</text>
</svg>`;
    fs.writeFileSync(filePath, svg);

    const dbPath = `/uploads/shooting-house/${filename}`;
    await connection.query('UPDATE shooting_house_images SET image_url = ? WHERE id = ?', [dbPath, img.id]);
  }

  // 7. Shooting House Videos
  console.log('7. Generating local shooting house video thumbnails...');
  const [shVideos] = await connection.query('SELECT * FROM shooting_house_videos');
  for (const v of shVideos) {
    const filename = `video-thumb-${v.id}.svg`;
    const filePath = path.join(uploadsPath, 'shooting-house', filename);

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225" width="400" height="225">
  <rect width="100%" height="100%" fill="#18181B"/>
  <rect x="8" y="8" width="384" height="209" fill="none" stroke="#9B0B16" stroke-width="1.5" rx="6" opacity="0.8"/>
  <circle cx="200" cy="112" r="28" fill="#9B0B16" />
  <polygon points="192,98 192,126 216,112" fill="#FFFFFF"/>
  <text x="200" y="55" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="800" fill="#E2B235" letter-spacing="3" text-anchor="middle">VIRTUAL WALKTHROUGH</text>
  <text x="200" y="175" font-family="system-ui, -apple-system, sans-serif" font-size="10" font-weight="600" fill="#F8FAFC" text-anchor="middle">Akshaya Studio Virtual Tour</text>
</svg>`;
    fs.writeFileSync(filePath, svg);

    const dbPath = `/uploads/shooting-house/${filename}`;
    await connection.query('UPDATE shooting_house_videos SET thumbnail = ? WHERE id = ?', [dbPath, v.id]);
  }

  await connection.end();
  console.log('All local assets organized into dynamic subfolders successfully!');
}

run().catch(console.error);
