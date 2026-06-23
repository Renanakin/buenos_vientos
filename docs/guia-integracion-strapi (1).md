# Guía paso a paso para integrar Strapi como CMS headless

## Visión general

Strapi 5 está pensado para acompañar todo el ciclo de un proyecto, desde la instalación y configuración hasta el manejo del panel admin, la personalización y el consumo de contenido vía API.[cite:18] Para esta implementación, el enfoque recomendado es usarlo como **CMS headless**, dejando a Strapi como capa de gestión de contenido y exposición de datos, mientras el frontend consume ese contenido mediante REST, GraphQL o el cliente oficial.[cite:18][cite:7]

En este modelo, Strapi no renderiza la capa visual final del sitio o aplicación; su rol es centralizar contenido, usuarios, permisos, media y flujos editoriales desde el panel de administración.[cite:18] El frontend, ya sea en Next.js u otro framework, se encarga de consultar la API y renderizar la experiencia final para el usuario.[cite:4][cite:13]

## Qué significa usar Strapi como CMS headless

Usar Strapi como CMS headless implica separar claramente el backoffice del canal de presentación.[cite:18] El contenido se crea y administra dentro del panel admin, pero se entrega por APIs para ser consumido por una web, una app móvil, landing pages, e-commerce o cualquier otro canal digital.[cite:18][cite:7]

La propia documentación oficial organiza el producto alrededor de ese recorrido: **Getting Started**, **Features**, **APIs**, **Configurations**, **Development**, **Plugins** y **Upgrade**.[cite:18] Eso encaja bien con una arquitectura moderna donde el contenido vive en Strapi y la experiencia visual vive en el frontend.[cite:18][cite:4]

## Arquitectura recomendada

Lo más práctico es mantener el frontend y Strapi como aplicaciones separadas, por ejemplo `frontend/` para el proyecto principal y `cms/` o `backend/` para Strapi.[cite:2][cite:4] En desarrollo, Strapi suele correr en `http://localhost:1337/admin`, mientras la API queda expuesta bajo `/api/...`.[cite:2][cite:7]

Si el frontend está hecho con Next.js, Strapi funciona como un CMS headless desde el que se modela el contenido y luego se consulta desde la aplicación con `fetch` o una librería HTTP.[cite:4] En ese flujo, cuando se necesitan relaciones, imágenes, componentes o zonas dinámicas, se debe usar `populate`, ya que la REST API no los devuelve poblados automáticamente.[cite:7][cite:13]

## Implementación paso a paso

### 1. Crear el proyecto de Strapi

La forma recomendada para iniciar un proyecto local es usar el instalador de Strapi con `npx create-strapi@latest my-strapi-project` o una variante equivalente del instalador oficial.[cite:3][cite:2]

```bash
npx create-strapi@latest my-strapi-project
```

### 2. Iniciar el entorno de desarrollo

Una vez creado el proyecto, se puede iniciar con el comando de desarrollo y acceder al panel administrativo para crear el primer usuario administrador.[cite:2][cite:3]

```bash
cd my-strapi-project
npm run develop
```

Panel admin en desarrollo:

```text
http://localhost:1337/admin
```

### 3. Definir Strapi como núcleo de contenido

Si se implementará como CMS headless, conviene pensar Strapi como la fuente única de verdad para contenido estructurado, páginas, relaciones, taxonomías, assets multimedia y estados editoriales.[cite:18] Desde la documentación oficial, las piezas clave para este uso son **Content Manager**, **Content-Type Builder**, **Media Library**, **Draft & Publish**, **Preview**, **Internationalization (i18n)** y **Users & Permissions**.[cite:18]

Esto permite que el equipo gestione contenido sin tocar el código del frontend y que el frontend solo consuma datos listos para renderizar.[cite:18][cite:4]

### 4. Crear los content-types

Desde **Content-Type Builder** se crean las colecciones o single types que usará el proyecto, por ejemplo `posts`, `products`, `categories`, `pages` o `services`.[cite:2][cite:7] Cada vez que se crea un content-type, Strapi genera automáticamente sus endpoints REST asociados.[cite:7]

Campos habituales:

- `title`
- `slug`
- `description`
- `content`
- `cover`
- `gallery`
- `price`
- `category`
- `seo`
- `blocks`

Si se usan relaciones, media, componentes o dynamic zones, esos datos deberán solicitarse luego con `populate` en las consultas al API.[cite:7]

### 5. Modelar contenido pensando en frontend desacoplado

Como CMS headless, conviene diseñar los tipos de contenido según la necesidad real de render del frontend, no según páginas rígidas del admin.[cite:18][cite:4] Una práctica útil es crear colecciones y single types reutilizables para home, páginas internas, blog, productos, categorías, FAQ, banners, SEO y bloques modulares.[cite:18]

Este enfoque reduce acoplamiento y facilita reutilizar contenido en distintos canales, no solo en una única web.[cite:18]

### 6. Crear y publicar contenido

El contenido se administra desde **Content Manager**, donde se crean entradas y se publican para que puedan ser consumidas desde el frontend.[cite:2][cite:18] El flujo básico documentado por Strapi pasa por crear el tipo de contenido, agregar entradas, configurar permisos y luego consultar el API.[cite:2]

Si el proyecto necesita control editorial, conviene aprovechar funciones como **Draft & Publish**, **Review Workflows**, **Releases** y **Preview**, todas presentes dentro del ecosistema funcional documentado por Strapi.[cite:18]

### 7. Configurar acceso a la API

Los content-types son privados por defecto, por lo que antes de consumirlos hay que habilitar permisos para el rol **Public** o usar autenticación, según el nivel de seguridad requerido.[cite:7] Esto es especialmente importante cuando el frontend público necesita leer contenido sin autenticación de usuario final.[cite:7]

Además, la documentación de Strapi incluye secciones específicas para **API Tokens**, **Admin tokens**, **RBAC** y **Users & Permissions**, lo que vuelve más sólido el uso de Strapi como backend de contenido en entornos reales.[cite:18]

### 8. Elegir la API de consumo

Strapi documenta varias opciones para consumir contenido: **REST API**, **GraphQL API**, **Strapi Client** y APIs de más bajo nivel.[cite:18] Para una integración inicial, REST suele ser la opción más directa, pero GraphQL puede ser útil si el frontend necesita consultas más precisas o agregadas.[cite:18][cite:7]

### 9. Probar el endpoint REST

Una vez creado el contenido y otorgados los permisos, se puede probar el endpoint base desde el navegador, Postman o el propio frontend.[cite:7]

Ejemplos:

```text
GET http://localhost:1337/api/posts
GET http://localhost:1337/api/products
GET http://localhost:1337/api/posts?populate=*
```

La documentación REST indica que `populate=*` sirve para incluir relaciones, media, componentes y zonas dinámicas en la respuesta.[cite:7]

### 10. Conectar Strapi con el frontend

En un proyecto Next.js, lo más cómodo es guardar la URL base de Strapi en una variable de entorno y construir las requests desde ahí.[cite:4][cite:13]

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

Luego se puede hacer un `fetch` al endpoint generado por Strapi desde un Server Component o cualquier capa de acceso a datos del proyecto.[cite:4]

```ts
async function getPosts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/posts?populate=*`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("No se pudo obtener contenido desde Strapi");
  }

  const json = await res.json();
  return json.data;
}
```

### 11. Renderizar los datos en la aplicación

Con la respuesta del API ya disponible, el frontend puede iterar sobre `json.data` para mostrar listados, páginas de detalle o bloques dinámicos.[cite:7][cite:4] En Strapi 5, la respuesta REST está aplanada respecto a versiones anteriores y el acceso a documentos individuales utiliza `documentId`.[cite:7]

Ejemplo de render:

```tsx
export default async function Page() {
  const posts = await getPosts();

  return (
    <main>
      <h1>Posts</h1>
      <ul>
        {posts.map((post: any) => (
          <li key={post.documentId}>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
```

### 12. Configurar imágenes remotas en Next.js

Si el proyecto usa `next/image` para renderizar medios servidos por Strapi, se debe permitir el host remoto de Strapi en la configuración de Next.js.[cite:13] La guía oficial de integración muestra esta configuración para desarrollo con `localhost:1337`.[cite:13]

### 13. Incorporar features editoriales según el proyecto

Como CMS headless, Strapi no solo entrega contenido, sino que también puede centralizar capacidades editoriales y operativas como internacionalización, previews, media management, flujos de revisión y control de acceso.[cite:18] Estas funciones son especialmente útiles cuando el proyecto crecerá en volumen de contenido, equipo editorial o canales de publicación.[cite:18]

### 14. Escalar a producción

Una vez validado el flujo local, el paso natural es desplegar Strapi en un servidor o servicio compatible, conectar la base de datos de producción y apuntar el frontend a la URL pública del CMS.[cite:5][cite:9] Desde ese punto, el contenido se administra desde Strapi y el frontend solo consume el API.[cite:9]

## Endpoints REST útiles

| Uso | Ejemplo |
|---|---|
| Listar colección | `GET /api/posts` [cite:7] |
| Obtener un documento | `GET /api/posts/:documentId` [cite:7] |
| Crear documento | `POST /api/posts` [cite:7] |
| Actualizar documento | `PUT /api/posts/:documentId` [cite:7] |
| Eliminar documento | `DELETE /api/posts/:documentId` [cite:7] |
| Poblar relaciones o media | `GET /api/posts?populate=*` [cite:7] |

## Funciones de Strapi útiles para un CMS headless

| Función | Utilidad en implementación headless |
|---|---|
| Content-Type Builder | Modelar estructuras de contenido desacopladas del frontend.[cite:18] |
| Content Manager | Crear, editar y publicar contenido sin tocar código.[cite:18] |
| Media Library | Centralizar imágenes y archivos para consumo desde la app.[cite:18] |
| Draft & Publish | Manejar borradores y publicaciones de forma editorial.[cite:18] |
| Preview | Ver contenido antes de publicarlo en el canal final.[cite:18] |
| Internationalization (i18n) | Gestionar versiones por idioma desde un solo CMS.[cite:18] |
| Users & Permissions / RBAC | Controlar acceso por roles y seguridad del contenido.[cite:18] |
| API Tokens | Integrar el frontend o servicios externos con acceso controlado.[cite:18] |
| Plugins | Extender el CMS según necesidades del proyecto.[cite:18] |

## Recomendaciones prácticas

- Separar claramente frontend y CMS facilita despliegues, mantenimiento y escalabilidad.[cite:4][cite:9]
- Usar `populate` de forma explícita en producción ayuda a controlar el tamaño de las respuestas y evita consultas innecesarias.[cite:7]
- Si un endpoint no responde como se espera, la primera revisión debe ser permisos del rol **Public**, autenticación y publicación del contenido.[cite:2][cite:7]
- En Strapi 5, la estructura de respuesta REST cambió respecto a versiones anteriores, por lo que conviene revisar ejemplos específicos de esta versión al migrar o integrar desde cero.[cite:7]
- Si el proyecto crecerá, conviene considerar desde el inicio i18n, preview, media library, workflow editorial y roles para evitar refactorizaciones posteriores del modelo de contenido.[cite:18]

## Flujo recomendado de trabajo

Un flujo sólido para proyectos modernos usando Strapi como CMS headless es el siguiente:[cite:18][cite:2][cite:4][cite:7]

1. Levantar Strapi localmente.
2. Definir qué entidades y bloques de contenido gestionará el CMS.
3. Modelar content-types y relaciones.
4. Configurar media, publicación, permisos y roles.
5. Crear contenido de prueba.
6. Probar endpoints con REST o GraphQL.
7. Integrar el fetch en el frontend.
8. Ajustar render, SEO, imágenes y bloques dinámicos.
9. Activar funciones editoriales necesarias como preview o i18n.
10. Desplegar backend y frontend con variables de entorno separadas.

## Fuentes base utilizadas

- Introducción oficial de la documentación de Strapi CMS.[cite:18]
- Quick Start de Strapi 5.[cite:2]
- CLI e instalación de Strapi.[cite:3][cite:5]
- Referencia oficial de la REST API.[cite:7]
- Guías oficiales de integración con Next.js.[cite:4][cite:13]
