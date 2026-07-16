import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Database Initializer
import { initializeDatabase } from './utils/dbInitializer.js';

// Route Imports
import clientRoutes from './routes/clientRoutes.js';
import showcaseRoutes from './routes/showcaseRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import workshopRoutes from './routes/workshopRoutes.js';
import igniteRoutes from './routes/igniteRoutes.js';
import shootingHouseRoutes from './routes/shootingHouseRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import artistRoutes from './routes/artistRoutes.js';

// Middleware Imports
import upload from './middlewares/uploadMiddleware.js';
import errorHandler from './middlewares/errorHandler.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Connect and seed database on startup
initializeDatabase();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve uploaded images statically
app.use('/uploads', express.static(uploadsDir));

// Admin Login Endpoint
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  const expectedUsername = process.env.ADMIN_USERNAME || 'admin';
  const expectedPassword = process.env.ADMIN_PASSWORD || 'admin';

  if (username === expectedUsername && password === expectedPassword) {
    res.json({ success: true, token: 'thaara-umesh-admin-session-auth' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid username or password' });
  }
});

// File Upload Endpoints
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }
  // Return the relative URL path containing the subfolder
  const folder = req.query.folder || 'general';
  const fileUrl = `/uploads/${folder}/${req.file.filename}`;
  res.status(201).json({ success: true, url: fileUrl });
});

app.post('/api/upload/multiple', upload.array('images', 20), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ success: false, message: 'No files uploaded' });
  }
  
  const folder = req.query.folder || 'general';
  const urls = req.files.map(file => `/uploads/${folder}/${file.filename}`);
  res.status(201).json({ success: true, urls });
});

// MVC Routes Registration
app.use('/api/clients', clientRoutes);
app.use('/api/showcases', showcaseRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/workshops', workshopRoutes);
app.use('/api/ignite-images', igniteRoutes);
app.use('/api/shooting-house', shootingHouseRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/artists', artistRoutes);

// Root test endpoint
app.get('/api/health', (req, res) => {
  res.json({ success: true, status: 'API is running smoothly' });
});

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
