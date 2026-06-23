import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { propertiesData } from './data/propertiesData';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend client calls
app.use(cors({
  origin: '*', // Allow all origins for dev/sandbox review simplicity
}));

app.use(express.json());

// GET /api/properties -> Returns all properties
app.get('/api/properties', (req, res) => {
  res.json(propertiesData);
});

// GET /api/properties/:id -> Returns a single property's specs
app.get('/api/properties/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const property = propertiesData.find((p) => p.id === id);
  if (property) {
    res.json(property);
  } else {
    res.status(404).json({ error: `Property with ID ${id} not found` });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`[Buenos Vientos API] Server running on http://localhost:${PORT}`);
});
