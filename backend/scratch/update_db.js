import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

async function run() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'thaara_umesh'
  });

  console.log('Running database updates...');
  
  // 1. Update shooting house images to JPG
  const [shRes] = await conn.query("UPDATE shooting_house_images SET image_url = REPLACE(image_url, '.svg', '.jpg')");
  console.log('Updated shooting house image records:', shRes.affectedRows);

  // 2. Update ignite graduation images to JPG
  const [igniteRes] = await conn.query("UPDATE ignite_images SET image_url = REPLACE(image_url, '.svg', '.jpg')");
  console.log('Updated ignite graduation image records:', igniteRes.affectedRows);

  await conn.end();
  console.log('Database update completed successfully!');
}

run().catch(console.error);
