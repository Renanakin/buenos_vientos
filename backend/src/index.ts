import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import sharp from 'sharp';
import db from './db';
import { Property } from './types/property';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend client calls
app.use(cors({
  origin: '*',
}));

app.use(express.json());

// Create uploads directory if it doesn't exist
const uploadsDir = path.resolve(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve uploaded images statically
app.use('/uploads', express.static(uploadsDir));

// Configure multer for memory storage (process buffers directly with sharp)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept images only
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// GET /api/properties -> Returns all properties
app.get('/api/properties', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM properties ORDER BY id DESC').all() as any[];
    const properties = rows.map((row) => ({
      ...row,
      features: JSON.parse(row.features),
      images: JSON.parse(row.images),
    }));
    res.json(properties);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/properties/:id -> Returns a single property
app.get('/api/properties/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const row = db.prepare('SELECT * FROM properties WHERE id = ?').get(id) as any;
    if (row) {
      res.json({
        ...row,
        features: JSON.parse(row.features),
        images: JSON.parse(row.images),
      });
    } else {
      res.status(404).json({ error: `Property with ID ${id} not found` });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/properties -> Creates a new property
app.post('/api/properties', (req, res) => {
  try {
    const {
      code,
      title,
      description,
      curatorComment,
      tag,
      type,
      sector,
      comuna,
      priceUF,
      priceCLP,
      builtArea,
      terrainArea,
      features,
      images,
    } = req.body;

    if (!code || !title || !description || !tag || !type || !sector || !comuna || !priceUF || !priceCLP || !builtArea) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const insert = db.prepare(`
      INSERT INTO properties (
        code, title, description, curatorComment, tag, type, sector, comuna,
        priceUF, priceCLP, builtArea, terrainArea, features, images
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = insert.run(
      code,
      title,
      description,
      curatorComment || null,
      tag,
      type,
      sector,
      comuna,
      Number(priceUF),
      Number(priceCLP),
      Number(builtArea),
      terrainArea ? Number(terrainArea) : null,
      JSON.stringify(Array.isArray(features) ? features : []),
      JSON.stringify(Array.isArray(images) ? images : [])
    );

    res.status(201).json({
      id: result.lastInsertRowid,
      code,
      title,
      description,
      curatorComment,
      tag,
      type,
      sector,
      comuna,
      priceUF,
      priceCLP,
      builtArea,
      terrainArea,
      features,
      images,
    });
  } catch (error: any) {
    if (error.message.includes('UNIQUE constraint failed')) {
      res.status(400).json({ error: `El código de propiedad ya existe.` });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// PUT /api/properties/:id -> Updates an existing property
app.put('/api/properties/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const {
      code,
      title,
      description,
      curatorComment,
      tag,
      type,
      sector,
      comuna,
      priceUF,
      priceCLP,
      builtArea,
      terrainArea,
      features,
      images,
    } = req.body;

    const exists = db.prepare('SELECT id FROM properties WHERE id = ?').get(id);
    if (!exists) {
      return res.status(404).json({ error: `Property with ID ${id} not found` });
    }

    const update = db.prepare(`
      UPDATE properties SET
        code = ?,
        title = ?,
        description = ?,
        curatorComment = ?,
        tag = ?,
        type = ?,
        sector = ?,
        comuna = ?,
        priceUF = ?,
        priceCLP = ?,
        builtArea = ?,
        terrainArea = ?,
        features = ?,
        images = ?
      WHERE id = ?
    `);

    update.run(
      code,
      title,
      description,
      curatorComment || null,
      tag,
      type,
      sector,
      comuna,
      Number(priceUF),
      Number(priceCLP),
      Number(builtArea),
      terrainArea ? Number(terrainArea) : null,
      JSON.stringify(Array.isArray(features) ? features : []),
      JSON.stringify(Array.isArray(images) ? images : []),
      id
    );

    res.json({
      id,
      code,
      title,
      description,
      curatorComment,
      tag,
      type,
      sector,
      comuna,
      priceUF,
      priceCLP,
      builtArea,
      terrainArea,
      features,
      images,
    });
  } catch (error: any) {
    if (error.message.includes('UNIQUE constraint failed')) {
      res.status(400).json({ error: `El código de propiedad ya existe.` });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// DELETE /api/properties/:id -> Deletes a property
app.delete('/api/properties/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const exists = db.prepare('SELECT id FROM properties WHERE id = ?').get(id);
    if (!exists) {
      return res.status(404).json({ error: `Property with ID ${id} not found` });
    }

    db.prepare('DELETE FROM properties WHERE id = ?').run(id);
    res.json({ success: true, message: `Property with ID ${id} deleted` });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/upload -> Uploads images and converts them to optimized WebP format
app.post('/api/upload', upload.array('images', 10), async (req, res) => {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const fileUrls: string[] = [];

    for (const file of files) {
      // Generate clean filename
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
      const filename = `prop-${uniqueSuffix}.webp`;
      const outputPath = path.join(uploadsDir, filename);

      // Convert to webp with sharp and save
      await sharp(file.buffer)
        .resize({ width: 1600, height: 1200, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(outputPath);

      // Return local server URL
      const host = req.get('host') || `localhost:${PORT}`;
      const protocol = req.protocol;
      fileUrls.push(`${protocol}://${host}/uploads/${filename}`);
    }

    res.json({ urls: fileUrls });
  } catch (error: any) {
    console.error('Error processing upload:', error);
    res.status(500).json({ error: error.message });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Serve frontend static assets if they exist
const frontendDistDir = path.resolve(__dirname, '..', '..', 'frontend', 'dist');
if (fs.existsSync(frontendDistDir)) {
  console.log(`[Buenos Vientos API] Serving static frontend from: ${frontendDistDir}`);
  app.use(express.static(frontendDistDir));
  
  // SPA routing fallback (catch all non-API, non-health and non-uploads paths)
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/uploads') || req.path.startsWith('/health')) {
      return next();
    }
    res.sendFile(path.join(frontendDistDir, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`[Buenos Vientos API] Server running on http://localhost:${PORT}`);
});
