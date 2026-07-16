import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const brands = [
  { name: 'Amazon', color: '#FF9900' },
  { name: 'Flipkart', color: '#2874F0' },
  { name: 'Shopify', color: '#96bf48' },
  { name: 'Uber', color: '#000000' },
  { name: 'Zomato', color: '#CB202D' },
  { name: 'Swiggy', color: '#FC8019' },
  { name: 'Netflix', color: '#E50914' },
  { name: 'Spotify', color: '#1DB954' },
  { name: 'Google', color: '#4285F4' },
  { name: 'Airbnb', color: '#FF5A5F' },
  { name: 'PayPal', color: '#003087' },
  { name: 'Stripe', color: '#008CD1' },
  { name: 'eBay', color: '#E53238' },
  { name: 'Etsy', color: '#F1641E' },
  { name: 'Walmart', color: '#0071CE' },
  { name: 'Target', color: '#CC0000' },
  { name: 'Wayfair', color: '#7F187F' },
  { name: 'Best Buy', color: '#FFF200' },
  { name: 'Zalando', color: '#FF6900' },
  { name: 'Asos', color: '#000000' },
  { name: 'AliExpress', color: '#E62E04' },
  { name: 'Alibaba', color: '#FF6A00' },
  { name: 'Rakuten', color: '#BF0000' },
  { name: 'Jumia', color: '#F68B1E' },
  { name: 'Myntra', color: '#E71F7E' },
  { name: 'Ajio', color: '#000000' },
  { name: 'Nykaa', color: '#FC2779' },
  { name: 'Lyft', color: '#FF00BF' },
  { name: 'Grab', color: '#00B14F' },
  { name: 'Gojek', color: '#00AA13' },
  { name: 'Bolt', color: '#34D399' },
  { name: 'Deliveroo', color: '#00CDBC' },
  { name: 'DoorDash', color: '#FF3008' },
  { name: 'Instacart', color: '#43B02A' },
  { name: 'Booking.com', color: '#003580' },
  { name: 'Expedia', color: '#00355F' },
  { name: 'Tripadvisor', color: '#00AF87' },
  { name: 'Trivago', color: '#C9302C' },
  { name: 'Agoda', color: '#1171BA' },
  { name: 'Skyscanner', color: '#0073C2' },
  { name: 'Hulu', color: '#1CE783' },
  { name: 'Disney+', color: '#113CCF' },
  { name: 'YouTube', color: '#FF0000' },
  { name: 'Twitch', color: '#9146FF' },
  { name: 'TikTok', color: '#000000' },
  { name: 'Instagram', color: '#E1306C' },
  { name: 'Facebook', color: '#1877F2' },
  { name: 'Twitter', color: '#1DA1F2' },
  { name: 'LinkedIn', color: '#0A66C2' },
  { name: 'Pinterest', color: '#BD081C' },
  { name: 'Snapchat', color: '#FFFC00' },
  { name: 'Telegram', color: '#24A1DE' },
  { name: 'Discord', color: '#5865F2' },
  { name: 'Zoom', color: '#2D8CFF' },
  { name: 'Slack', color: '#4A154B' },
  { name: 'Microsoft', color: '#F25022' },
  { name: 'Dropbox', color: '#0061FE' },
  { name: 'Notion', color: '#000000' },
  { name: 'Trello', color: '#0079BF' },
  { name: 'Asana', color: '#F06A6A' },
  { name: 'Monday.com', color: '#FF3D57' },
  { name: 'Jira', color: '#0052CC' },
  { name: 'GitHub', color: '#181717' },
  { name: 'Figma', color: '#F24E1E' },
  { name: 'Canva', color: '#00C4CC' },
  { name: 'Webflow', color: '#4353FF' },
  { name: 'Squarespace', color: '#000000' },
  { name: 'Wix', color: '#000000' },
  { name: 'WordPress', color: '#21759B' },
  { name: 'Apple', color: '#000000' },
  { name: 'Samsung', color: '#1428A0' },
  { name: 'Sony', color: '#000000' },
  { name: 'LG', color: '#A50034' },
  { name: 'Intel', color: '#0071C5' },
  { name: 'AMD', color: '#ED1C24' },
  { name: 'Nvidia', color: '#76B900' },
  { name: 'Dell', color: '#007DB8' },
  { name: 'HP', color: '#0096D6' },
  { name: 'Lenovo', color: '#E22B2B' },
  { name: 'Asus', color: '#00539B' },
  { name: 'Nike', color: '#000000' },
  { name: 'Adidas', color: '#000000' },
  { name: 'Puma', color: '#000000' },
  { name: 'Reebok', color: '#E00000' },
  { name: 'Zara', color: '#000000' },
  { name: 'H&M', color: '#CC0000' },
  { name: 'Uniqlo', color: '#FF0000' },
  { name: 'Tesla', color: '#CC0000' },
  { name: 'SpaceX', color: '#005288' },
  { name: 'Toyota', color: '#EB0A1E' }
];

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

  console.log('Truncating clients table...');
  await connection.query('TRUNCATE TABLE clients');

  console.log('Generating 90 vector SVG files and inserting to DB...');
  for (let i = 0; i < brands.length; i++) {
    const b = brands[i];
    const safeName = b.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const filename = `${safeName}.svg`;
    const filePath = path.join(uploadsDir, filename);

    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80" width="200" height="80">
  <rect width="100%" height="100%" fill="#F8FAFC" rx="12" stroke="#E2E8F0" stroke-width="1.5"/>
  <text x="50%" y="55%" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="800" fill="${b.color}" text-anchor="middle">${b.name}</text>
</svg>`;

    fs.writeFileSync(filePath, svgContent);

    // Store relative path in DB
    const relativeUrl = `/uploads/${filename}`;
    await connection.query(
      'INSERT INTO clients (logo, display_order) VALUES (?, ?)',
      [relativeUrl, i + 1]
    );
  }

  await connection.end();
  console.log('Successfully generated 90 local client logo files and updated database!');
}

generate().catch(console.error);
