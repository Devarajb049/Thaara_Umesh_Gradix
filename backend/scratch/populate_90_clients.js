import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const brands = [
  { name: 'Amazon', domain: 'amazon.com' },
  { name: 'Flipkart', domain: 'flipkart.com' },
  { name: 'Shopify', domain: 'shopify.com' },
  { name: 'Uber', domain: 'uber.com' },
  { name: 'Zomato', domain: 'zomato.com' },
  { name: 'Swiggy', domain: 'swiggy.com' },
  { name: 'Netflix', domain: 'netflix.com' },
  { name: 'Spotify', domain: 'spotify.com' },
  { name: 'Google', domain: 'google.com' },
  { name: 'Airbnb', domain: 'airbnb.com' },
  { name: 'PayPal', domain: 'paypal.com' },
  { name: 'Stripe', domain: 'stripe.com' },
  { name: 'eBay', domain: 'ebay.com' },
  { name: 'Etsy', domain: 'etsy.com' },
  { name: 'Walmart', domain: 'walmart.com' },
  { name: 'Target', domain: 'target.com' },
  { name: 'Wayfair', domain: 'wayfair.com' },
  { name: 'Best Buy', domain: 'bestbuy.com' },
  { name: 'Zalando', domain: 'zalando.com' },
  { name: 'Asos', domain: 'asos.com' },
  { name: 'AliExpress', domain: 'aliexpress.com' },
  { name: 'Alibaba', domain: 'alibaba.com' },
  { name: 'Rakuten', domain: 'rakuten.com' },
  { name: 'Jumia', domain: 'jumia.com' },
  { name: 'Myntra', domain: 'myntra.com' },
  { name: 'Ajio', domain: 'ajio.com' },
  { name: 'Nykaa', domain: 'nykaa.com' },
  { name: 'Lyft', domain: 'lyft.com' },
  { name: 'Grab', domain: 'grab.com' },
  { name: 'Gojek', domain: 'gojek.com' },
  { name: 'Bolt', domain: 'bolt.eu' },
  { name: 'Deliveroo', domain: 'deliveroo.co.uk' },
  { name: 'DoorDash', domain: 'doordash.com' },
  { name: 'Instacart', domain: 'instacart.com' },
  { name: 'Booking.com', domain: 'booking.com' },
  { name: 'Expedia', domain: 'expedia.com' },
  { name: 'Tripadvisor', domain: 'tripadvisor.com' },
  { name: 'Trivago', domain: 'trivago.com' },
  { name: 'Agoda', domain: 'agoda.com' },
  { name: 'Skyscanner', domain: 'skyscanner.net' },
  { name: 'Hulu', domain: 'hulu.com' },
  { name: 'Disney+', domain: 'disneyplus.com' },
  { name: 'YouTube', domain: 'youtube.com' },
  { name: 'Twitch', domain: 'twitch.tv' },
  { name: 'TikTok', domain: 'tiktok.com' },
  { name: 'Instagram', domain: 'instagram.com' },
  { name: 'Facebook', domain: 'facebook.com' },
  { name: 'Twitter', domain: 'twitter.com' },
  { name: 'LinkedIn', domain: 'linkedin.com' },
  { name: 'Pinterest', domain: 'pinterest.com' },
  { name: 'Snapchat', domain: 'snapchat.com' },
  { name: 'Telegram', domain: 'telegram.org' },
  { name: 'Discord', domain: 'discord.com' },
  { name: 'Zoom', domain: 'zoom.us' },
  { name: 'Slack', domain: 'slack.com' },
  { name: 'Microsoft', domain: 'microsoft.com' },
  { name: 'Dropbox', domain: 'dropbox.com' },
  { name: 'Notion', domain: 'notion.so' },
  { name: 'Trello', domain: 'trello.com' },
  { name: 'Asana', domain: 'asana.com' },
  { name: 'Monday.com', domain: 'monday.com' },
  { name: 'Jira', domain: 'atlassian.com' },
  { name: 'GitHub', domain: 'github.com' },
  { name: 'Figma', domain: 'figma.com' },
  { name: 'Canva', domain: 'canva.com' },
  { name: 'Webflow', domain: 'webflow.com' },
  { name: 'Squarespace', domain: 'squarespace.com' },
  { name: 'Wix', domain: 'wix.com' },
  { name: 'WordPress', domain: 'wordpress.org' },
  { name: 'Apple', domain: 'apple.com' },
  { name: 'Samsung', domain: 'samsung.com' },
  { name: 'Sony', domain: 'sony.com' },
  { name: 'LG', domain: 'lg.com' },
  { name: 'Intel', domain: 'intel.com' },
  { name: 'AMD', domain: 'amd.com' },
  { name: 'Nvidia', domain: 'nvidia.com' },
  { name: 'Dell', domain: 'dell.com' },
  { name: 'HP', domain: 'hp.com' },
  { name: 'Lenovo', domain: 'lenovo.com' },
  { name: 'Asus', domain: 'asus.com' },
  { name: 'Nike', domain: 'nike.com' },
  { name: 'Adidas', domain: 'adidas.com' },
  { name: 'Puma', domain: 'puma.com' },
  { name: 'Reebok', domain: 'reebok.com' },
  { name: 'Zara', domain: 'zara.com' },
  { name: 'H&M', domain: 'hm.com' },
  { name: 'Uniqlo', domain: 'uniqlo.com' },
  { name: 'Tesla', domain: 'tesla.com' },
  { name: 'SpaceX', domain: 'spacex.com' },
  { name: 'Toyota', domain: 'toyota.com' }
];

const ytVideos = [
  { id: "_CZAM4GRc_I", title: "Student Testimonial 1" },
  { id: "JdVxbx70vf0", title: "Student Testimonial 2" },
  { id: "xZcq_8JICY8", title: "Student Testimonial 3" },
  { id: "GOxcDKppy4U", title: "Student Testimonial 4" },
  { id: "fJiBFc4IEUQ", title: "Student Testimonial 5" },
  { id: "_CZAM4GRc_I", title: "Student Testimonial 6" },
  { id: "JdVxbx70vf0", title: "Student Testimonial 7" },
  { id: "xZcq_8JICY8", title: "Student Testimonial 8" },
  { id: "GOxcDKppy4U", title: "Student Testimonial 9" },
  { id: "fJiBFc4IEUQ", title: "Student Testimonial 10" },
  { id: "BQ_d2rMpLwk", title: "Student Testimonial 11" },
  { id: "JdVxbx70vf0", title: "Student Testimonial 12" },
  { id: "xZcq_8JICY8", title: "Student Testimonial 13" },
  { id: "GOxcDKppy4U", title: "Student Testimonial 14" },
  { id: "fJiBFc4IEUQ", title: "Student Testimonial 15" }
];

async function fill() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'thaara_umesh'
  });

  // 1. Clear & Seed 90 Clients
  console.log('Truncating clients table...');
  await connection.query('TRUNCATE TABLE clients');

  console.log('Inserting 90 premium client logos...');
  for (let i = 0; i < brands.length; i++) {
    const b = brands[i];
    const logoUrl = `https://logo.clearbit.com/${b.domain}`;
    await connection.query(
      'INSERT INTO clients (logo, display_order) VALUES (?, ?)',
      [logoUrl, i + 1]
    );
  }
  console.log(`Successfully seeded ${brands.length} clients.`);

  // 2. Clear & Seed Workshops (Student video testimonials)
  console.log('Truncating workshops table...');
  await connection.query('TRUNCATE TABLE workshops');

  console.log('Inserting 15 student YouTube video testimonials...');
  for (let i = 0; i < ytVideos.length; i++) {
    const v = ytVideos[i];
    const youtubeUrl = `https://www.youtube.com/watch?v=${v.id}`;
    const thumbnail = `https://i.ytimg.com/vi/${v.id}/mqdefault.jpg`;
    await connection.query(
      'INSERT INTO workshops (thumbnail, youtube_url, display_order) VALUES (?, ?, ?)',
      [thumbnail, youtubeUrl, i + 1]
    );
  }
  console.log(`Successfully seeded ${ytVideos.length} video testimonials.`);

  await connection.end();
  console.log('All updates complete and stored in database!');
}

fill().catch(console.error);
