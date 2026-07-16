import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const adVideos = [
  { id: "_CZAM4GRc_I", title: "Z Perfume EDP | Television Commercial Ad" },
  { id: "JdVxbx70vf0", title: "Too Hot Outside? RAMRAJ White Shirts Ad" },
  { id: "xZcq_8JICY8", title: "Asian Paints Damp Proof - Superstar of Waterproofing" },
  { id: "vXNyCvkq7SY", title: "Asian Paints SmartCare Damp Proof 30s Ad" },
  { id: "GOxcDKppy4U", title: "The Chennai Silks - Summer Wardrobe Collection" },
  { id: "fJiBFc4IEUQ", title: "Ananya's Nana Nani Homes - Story 5 Commercial" },
  { id: "SxliuLpxr8I", title: "Ananya's Nana Nani Homes - Story 4 Commercial" },
  { id: "FvF4nETPKJk", title: "Ananya's Nana Nani Homes - Story 3 Commercial" },
  { id: "7_96PaxlUN4", title: "Ananya's Nana Nani Homes - Story 2 Commercial" },
  { id: "C3j9cx3oz44", title: "Ananya's Nana Nani Homes - Story 1 Commercial" },
  { id: "p_GBpnsb5CE", title: "Retirement-il Vaazha Ungal Vaazhvai Vaazha | Cheers Living" },
  { id: "POesws0Zu1E", title: "Exclusively For People Who Never Stop Dreaming | Cheers" },
  { id: "WrG4MwfmWkI", title: "Live Your Paused Dreams | Cheers Senior Living Ad" },
  { id: "K88Tzw0uh-8", title: "Cheers Retirement Living - The Best Version of Yourself" },
  { id: "4vyKS71Ap3I", title: "Don’t Waste Water | Hard Worker Eco Plaster | Ramco Cements" },
  { id: "GGDUzgl-h0A", title: "Solladha Sol | Malabar Gold & Diamonds Commercial" },
  { id: "ebuU3D-spgQ", title: "Ramraj Grand Wedding Collections presented by Rishab Shetty" },
  { id: "Q5kl2roCgJA", title: "Ramco Hard Worker | Television Commercial Ad" },
  { id: "hshjqlY1Hgc", title: "Priya Pickles - Unforgettable Taste Commercial Ad" },
  { id: "6EXjGIQjCEc", title: "Celebrate Diwali with Majestic Maharaja Styles" },
  { id: "_lDWIiqRgTs", title: "CLINIC PLUS INVINCIBLE - Strong Hair 25s Ad" },
  { id: "tyx-tv3z7zQ", title: "Shaadi.com | Aadi Sale Special Commercial" },
  { id: "Qz5lEgTYP_4", title: "Grand Opening | Thangamayil Jewellery Showroom" },
  { id: "YIH5HOukIos", title: "Thanjavur Silk Traditional Handloom Weaves Ad" },
  { id: "iythe8WGNis", title: "Discover the Acharya Collection Jewellers" },
  { id: "64J6YnWTB4c", title: "Introducing Srinivasa Kalyanam | Pothys Swarna Mahal" },
  { id: "YmYmZsJUksw", title: "Ultimate Table Tennis Season 6 Official Promo" },
  { id: "VX4VwIXv6VU", title: "Tour the Paradise with Actor Y. G. Mahendran | Nana Nani" },
  { id: "oyYmSxYe_Qs", title: "The Untold Secret of Silk | Minister White Dhotis" },
  { id: "Aj9n4js_w_M", title: "Way2News - Tamil No.1 Short News Application Ad" },
  { id: "__xvQUEdgF4", title: "Way2News Gaming Grandmothers - Digital App Campaign" },
  { id: "iIoHTDHy7WI", title: "GRT Brides – The Elegant Bridal Collection (Tamil)" },
  { id: "dOhXzePuf7Q", title: "GRT Brides – The Elegant Bridal Collection (Telugu)" },
  { id: "qI1tR694eJk", title: "Hero Pleasure+ XTEC Connect - My License to Ride Ad" },
  { id: "mbPZzqylPaY", title: "Tour the Paradise | Ananya’s Nana Nani Retirement Homes" },
  { id: "BQ_d2rMpLwk", title: "Ignite Actor Training Monologues Showcase" }
];

async function fill() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'thaara_umesh'
  });

  console.log('Truncating showcases table...');
  await connection.query('TRUNCATE TABLE showcases');

  console.log('Inserting 36 high-quality commercial ad YouTube video links...');
  for (let i = 0; i < adVideos.length; i++) {
    const v = adVideos[i];
    const youtubeUrl = `https://www.youtube.com/watch?v=${v.id}`;
    const thumbnail = `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`;
    await connection.query(
      'INSERT INTO showcases (title, thumbnail, youtube_url, display_order) VALUES (?, ?, ?, ?)',
      [v.title, thumbnail, youtubeUrl, i + 1]
    );
  }

  await connection.end();
  console.log('Successfully populated showcases database!');
}

fill().catch(console.error);
