# Guía de Integración: Strapi CMS en Buenos Vientos Broker

Esta guía detalla los pasos requeridos para reemplazar nuestra actual API mockeada en Express por **Strapi 5** como CMS headless de contenido, integrándolo en nuestra arquitectura actual basada en **pnpm workspaces**.

---

## 1. Estructura de Arquitectura Propuesta

Alinearemos el CMS como un nuevo espacio de trabajo (`cms/`) en paralelo a nuestra aplicación cliente (`frontend/`).

```text
corretaje/
├── package.json (Scripts orquestadores de pnpm)
├── pnpm-workspace.yaml (Espacios de trabajo declarados)
├── frontend/ (Nuestra aplicación Vite + React)
│   ├── src/
│   │   └── services/api.ts (Cliente API modificado para Strapi)
│   └── ...
└── cms/ (Nuevo proyecto Strapi 5)
    ├── config/
    ├── src/ (Modelado de contenido y extensiones)
    └── package.json
```

Modifica el archivo [pnpm-workspace.yaml](file:///c:/Users/HackBook/Documents/proyectos/corretaje/pnpm-workspace.yaml) para reflejar esta estructura:

```yaml
packages:
  - 'frontend'
  - 'cms'
```

Y actualiza el orquestador principal de scripts en el [package.json (Root)](file:///c:/Users/HackBook/Documents/proyectos/corretaje/package.json):

```json
{
  "name": "buenos-vientos-monorepo",
  "private": true,
  "scripts": {
    "dev": "pnpm --parallel -r dev",
    "build": "pnpm -r build"
  }
}
```

---

## 2. Inicialización de Strapi CMS

Ejecuta el instalador de Strapi en una nueva carpeta `/cms` dentro del directorio del monorepo:

```bash
# Crear proyecto Strapi en la carpeta cms
npx create-strapi@latest cms --quickstart
```

*Nota: La bandera `--quickstart` inicializa Strapi con una base de datos local SQLite, que es ideal para desarrollo y fácil de portar en un VPS.*

Una vez creado, Strapi se ejecutará en `http://localhost:1337`. Crea tu cuenta de Administrador inicial en:
👉 `http://localhost:1337/admin`

---

## 3. Modelado de Datos (Content-Type "Property")

En la barra lateral del panel administrativo de Strapi, ve a **Content-Type Builder** y crea una nueva **Collection Type**:

*   **Display Name:** `Property`
*   **API ID (Singular):** `property`
*   **API ID (Plural):** `properties`

### Campos a Configurar:

| Nombre del Campo | Tipo en Strapi | Configuración Extra / Detalles |
| :--- | :--- | :--- |
| **code** | Text (Short Text) | Código identificador (ej. `BV-01`). Requerido y único. |
| **title** | Text (Short Text) | Título editorial de la propiedad. |
| **description** | Rich Text (Blocks) o Text (Long Text) | Resumen comercial detallado. |
| **curatorComment** | Text (Long Text) | Anotación de diseño AAA del curador. |
| **tag** | Enumeration | Valores: `Venta`, `Arriendo`. |
| **type** | Enumeration | Valores: `Oficina`, `Bodega`, `Terreno`, `Casa`. |
| **sector** | Text (Short Text) | Nombre del sector (ej. `Nueva Las Condes`). |
| **comuna** | Text (Short Text) | Nombre de la comuna (ej. `Las Condes`). |
| **priceUF** | Number (Decimal) | Valor comercial en UF. |
| **priceCLP** | Number (Big Integer) | Valor referencial en Pesos Chilenos (CLP). |
| **builtArea** | Number (Integer) | Metros cuadrados útiles construidos. |
| **terrainArea** | Number (Integer) | Metros cuadrados de terreno (opcional). |
| **features** | JSON o Component | Atributos/Equipamiento (puedes usar un campo JSON simple para guardar un array de textos, o crear un Componente repetible de Strapi). |
| **images** | Media (Multiple media) | Galería fotográfica (permite solo imágenes). |

---

## 4. Configuración de Permisos Públicos

Por defecto, los endpoints generados por Strapi son privados. Para permitir que el frontend cargue propiedades sin necesidad de iniciar sesión:

1.  Ve a **Settings** (Configuración) > **Users & Permissions Plugin** > **Roles**.
2.  Haz clic en el rol **Public**.
3.  Busca la sección **Property** y marca los permisos:
    *   `find` (Listar propiedades)
    *   `findOne` (Obtener detalle de una propiedad por ID)
4.  Haz clic en **Save** (Guardar).

---

## 5. Integración del Cliente API en el Frontend

La estructura de respuesta JSON de la API REST de Strapi 5 viene encapsulada dentro de un objeto `data`. Además, las imágenes multimedia contienen metadatos adicionales de URL.

Debemos adaptar el cliente de API de frontend para mapear esta respuesta a nuestro contrato de TypeScript `Property`.

Reemplaza el archivo [frontend/src/services/api.ts](file:///c:/Users/HackBook/Documents/proyectos/corretaje/frontend/src/services/api.ts) con el siguiente código integrador:

```typescript
import type { Property } from '../types/property';

// URL de desarrollo de Strapi CMS
const STRAPI_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337';

/**
 * Función auxiliar para formatear la respuesta individual de Strapi 5
 * y adecuarla a la interfaz Property del Frontend.
 */
function mapStrapiProperty(item: any): Property {
  // Strapi 5 entrega los datos planos dentro del objeto
  const attributes = item;

  // Mapeo de urls de imágenes (Strapi expone urls relativas en local)
  const imgUrls = attributes.images?.map((img: any) => {
    const url = img.url;
    return url.startsWith('/') ? `${STRAPI_URL}${url}` : url;
  }) || [];

  return {
    id: item.id, // ID numérico de Strapi
    code: attributes.code || '',
    title: attributes.title || '',
    description: attributes.description || '',
    curatorComment: attributes.curatorComment,
    tag: attributes.tag as 'Venta' | 'Arriendo',
    type: attributes.type as 'Oficina' | 'Bodega' | 'Terreno' | 'Casa',
    sector: attributes.sector || '',
    comuna: attributes.comuna || '',
    priceUF: Number(attributes.priceUF) || 0,
    priceCLP: Number(attributes.priceCLP) || 0,
    builtArea: Number(attributes.builtArea) || 0,
    terrainArea: attributes.terrainArea ? Number(attributes.terrainArea) : undefined,
    // Soporta tanto un campo JSON directo (array de strings) como un componente repeatable
    features: Array.isArray(attributes.features) 
      ? attributes.features.map((f: any) => typeof f === 'string' ? f : (f.name || f.value || '')) 
      : [],
    images: imgUrls
  };
}

/**
 * Obtener todos los activos del portafolio.
 * Se utiliza '?populate=*' para indicarle a Strapi que incluya las imágenes de la galería.
 */
export async function fetchProperties(): Promise<Property[]> {
  const res = await fetch(`${STRAPI_URL}/api/properties?populate=*`);
  if (!res.ok) {
    throw new Error('Error al conectar con Strapi CMS');
  }
  const json = await res.json();
  
  // Strapi 5 retorna una lista de elementos en json.data
  return json.data.map((item: any) => mapStrapiProperty(item));
}

/**
 * Obtener la ficha técnica de un activo específico por su ID.
 */
export async function fetchPropertyById(id: number): Promise<Property> {
  const res = await fetch(`${STRAPI_URL}/api/properties/${id}?populate=*`);
  if (!res.ok) {
    throw new Error(`No se pudo obtener el activo con ID ${id} desde el CMS`);
  }
  const json = await res.json();
  
  // Strapi 5 retorna el elemento único directamente o dentro de json.data
  return mapStrapiProperty(json.data);
}
```

---

## 6. Comprobación y Despliegue en VPS

1.  **Ejecución Local:** Ejecuta `pnpm dev` en el directorio raíz.
    *   El frontend correrá en `http://localhost:5173/`.
    *   Strapi CMS correrá en `http://localhost:1337/`.
2.  **Carga Inicial:** Ingresa al panel de Strapi, crea 3 propiedades de prueba en el Content Manager y cárgales fotos. Guarda y haz clic en **Publish** (Publicar) en cada una.
3.  **Despliegue en VPS:** 
    *   Puedes usar un administrador de procesos como `pm2` para mantener a Strapi activo en segundo plano en tu VPS:
        `pm2 start npm --name "buenos-vientos-cms" -- run start` (después de ejecutar `pnpm build` en la carpeta `/cms`).
    *   Conecta Strapi a una base de datos PostgreSQL de producción configurando las variables de entorno en `/cms/.env`.
