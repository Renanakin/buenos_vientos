import type { Property } from '../types/property';

const API_URL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:5000/api';

export async function fetchProperties(): Promise<Property[]> {
  const res = await fetch(`${API_URL}/properties`);
  if (!res.ok) {
    throw new Error('Failed to fetch properties from API');
  }
  return res.json();
}

export async function fetchPropertyById(id: number): Promise<Property> {
  const res = await fetch(`${API_URL}/properties/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch property details for ID ${id}`);
  }
  return res.json();
}
