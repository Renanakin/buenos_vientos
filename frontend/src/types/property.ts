export interface Property {
  id: number;
  code: string; // e.g. "BV-01"
  title: string;
  description: string;
  curatorComment?: string; // High-end Garamond italic annotation
  tag: 'Venta' | 'Arriendo';
  type: 'Oficina' | 'Bodega' | 'Terreno' | 'Casa';
  sector: string;
  comuna: string;
  priceUF: number;
  priceCLP: number; // For dynamic conversion filter calculations
  builtArea: number; // m²
  terrainArea?: number; // m²
  features: string[]; // Specs like ["Energía Trifásica", "Altura al hombro 8m"]
  images: string[]; // Gallery array
}
