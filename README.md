# Buenos Vientos Broker - Plataforma Web Corporativa

Plataforma web oficial de **Buenos Vientos Broker**, una firma inmobiliaria enfocada en la venta y arriendo de propiedades en sectores estratégicos. Nuestro enfoque selecciona oportunidades inmobiliarias —residenciales, comerciales e industriales— en sectores que marcan diferencia por ubicación, conectividad, entorno o proyección.

## 🚀 Características Principales

*   **Sitio Web Corporativo:** Presentación de nuestro selecto catálogo de propiedades y servicios inmobiliarios con enfoque comercial.
*   **Filtros de Búsqueda y Categorización:** Exploración intuitiva por tipo de propiedad (Residenciales, Comerciales, Bodegas, Sitios y Terrenos) y sectores destacados (Lo Espejo, Quinta Normal, San Bernardo, entre otros).
*   **Diseño Elegante y Funcional:** Estética sobria y elegante con animaciones optimizadas (Framer Motion) para brindar una experiencia de usuario fluida y confiable en cualquier dispositivo.
*   **Gestión Comercial Integrada:** Accesos rápidos de contacto vía WhatsApp, formularios de agendamiento y llamadas directas integrados estratégicamente para convertir visitas en prospectos calificados.
*   **Desempeño y SEO:** Arquitectura orientada a la máxima velocidad de carga utilizando Vite y React.

## 🛠️ Stack Tecnológico

Este proyecto está construido utilizando tecnologías modernas para garantizar un alto rendimiento y una excelente experiencia de usuario:

*   **Framework:** React 19 con [Vite](https://vitejs.dev/)
*   **Lenguaje:** TypeScript
*   **Estilos:** Tailwind CSS
*   **Animaciones:** Framer Motion
*   **Iconos:** Lucide React
*   **Linter y Formateo:** ESLint + Prettier

## ⚙️ Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:
*   [Node.js](https://nodejs.org/) (versión 20+ recomendada)
*   [npm](https://www.npmjs.com/) (Gestor de paquetes)

## 💻 Instalación y Desarrollo Local

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/Renanakin/corretaje_buenosvientos.git
    cd corretaje_buenosvientos
    ```

2.  **Instalar las dependencias:**
    ```bash
    npm install
    ```

3.  **Iniciar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

4.  Abre [http://localhost:5173](http://localhost:5173) en tu navegador para ver la aplicación corriendo.

## 📁 Estructura del Proyecto

*   `/src/components`: Componentes reutilizables de React (Header, Hero, Cards de Propiedades, etc).
*   `/src/assets`: Recursos estáticos, imágenes e iconos.
*   `/docs`: Documentación interna del proyecto, wireframes y directrices de UI.
*   `/public`: Archivos estáticos accesibles públicamente.

## 🚀 Despliegue (Producción)

El proyecto está optimizado para su despliegue en entornos estáticos de alto rendimiento como **Vercel**, **Netlify** o **Cloudflare Pages**.

**Pasos para un despliegue manual:**

1.  Construir la aplicación para producción:
    ```bash
    npm run build
    ```
2.  Previsualizar la build de producción localmente:
    ```bash
    npm run preview
    ```
3.  Los archivos generados en la carpeta `dist/` pueden ser subidos a cualquier servidor de alojamiento web estático. Para despliegues continuos, conecta el repositorio a Vercel/Netlify y configura el comando de build como `npm run build` y el directorio de publicación como `dist`.
