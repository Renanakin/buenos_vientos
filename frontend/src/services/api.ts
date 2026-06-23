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

export async function createProperty(property: Omit<Property, 'id'>): Promise<Property> {
  const res = await fetch(`${API_URL}/properties`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(property),
  });
  if (!res.ok) {
    const errorJson = await res.json().catch(() => ({}));
    throw new Error(errorJson.error || 'Failed to create property');
  }
  return res.json();
}

export async function updateProperty(id: number, property: Property): Promise<Property> {
  const res = await fetch(`${API_URL}/properties/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(property),
  });
  if (!res.ok) {
    const errorJson = await res.json().catch(() => ({}));
    throw new Error(errorJson.error || `Failed to update property with ID ${id}`);
  }
  return res.json();
}

export async function deleteProperty(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/properties/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    const errorJson = await res.json().catch(() => ({}));
    throw new Error(errorJson.error || `Failed to delete property with ID ${id}`);
  }
}

export async function uploadImages(files: File[]): Promise<string[]> {
  const formData = new FormData();
  for (const file of files) {
    formData.append('images', file);
  }
  const baseUrl = API_URL.replace('/api', '');
  const res = await fetch(`${baseUrl}/api/upload`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) {
    const errorJson = await res.json().catch(() => ({}));
    throw new Error(errorJson.error || 'Failed to upload images');
  }
  const json = await res.json();
  return json.urls;
}
