export interface Property {
  id: number;
  code: string;
  title: string;
  description: string;
  curatorComment?: string;
  tag: 'Venta' | 'Arriendo';
  type: 'Oficina' | 'Bodega' | 'Terreno' | 'Casa';
  sector: string;
  comuna: string;
  priceUF: number;
  priceCLP: number;
  builtArea: number;
  terrainArea?: number;
  features: string[];
  images: string[];
}
