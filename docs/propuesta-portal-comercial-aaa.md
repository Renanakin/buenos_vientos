# Propuesta de Desarrollo: Portal Comercial Buenos Vientos (Inspiración nmrk.cl + Ideología AAA)

Este documento detalla la propuesta técnica y visual para implementar el **Portal de Propiedades Comerciales y Buscador con Filtros** en Buenos Vientos Broker. La propuesta combina la robustez y lógica de negocios de **Newmark Chile (nmrk.cl)** con los principios estéticos y tipográficos definidos en nuestra **Ideología de Diseño AAA (The Portfolio Curator)**.

---

## 1. Principios de Diseño del Portal (Anti-AI Slop)

Para evitar un portal inmobiliario genérico o plano, la interfaz seguirá reglas editoriales estrictas:
*   **Grid Asimétrica:** No usaremos una grilla uniforme de 3 columnas fijas. La visualización de propiedades alternará entre tarjetas de tamaño estándar y "Featured Spans" (tarjetas horizontales de doble ancho) con márgenes desiguales para guiar la vista de manera orgánica.
*   **Filtros con Textura y Profundidad:** El panel de filtros no será un formulario gris estándar. Se diseñará como una barra flotante o lateral usando la clase `.surface-portfolio` (fondo traslúcido con `backdrop-blur-2xl` y reflejo de vidrio sutil).
*   **Imágenes Curadas:** Cada imagen de propiedad en los resultados de búsqueda implementará la clase `.img-luxury` para mantener una tonalidad homogénea de alto contraste y desaturación elegante, la cual recupera brillo total únicamente al posar el cursor (`hover`).

---

## 2. Lógica Comercial y Motor de Filtros (Inspirado en nmrk.cl)

Implementaremos un estado de búsqueda reactivo y robusto capaz de manejar criterios comerciales críticos para la toma de decisiones corporativas:

### A. Criterios de Selección
*   **Tipo de Operación:** Arriendo / Venta / Rentas de Inversión.
*   **Categoría de Activo:** Oficinas Select / Bodegas Logísticas / Sitios e Industriales / Residencial Consolidado.
*   **Ubicación (Comuna/Sector):** Selector minimalista con autocompletado enfocado en zonas estratégicas (Lo Espejo, Quinta Normal, San Bernardo, Providencia, etc.).

### B. Filtros Técnicos y de Escala
*   **Rango de Superficie Utilizable (m²):** Slider doble para establecer límites mínimos y máximos de metros cuadrados construidos.
*   **Rango de Precios Dinámico (UF / CLP):**
    *   Un control deslizante (*slider*) inteligente de rango de precios.
    *   Un interruptor (*switcher*) para cambiar la unidad monetaria. Al activar **CLP**, la aplicación convertirá dinámicamente los valores usando un factor de conversión de UF actualizado, adaptándose a las necesidades de análisis de clientes residenciales o corporativos.

---

## 3. Comportamiento y Cinematic Motion

El movimiento en el portal debe sentirse fluido e integrado:
*   **Transición de Resultados:** Al aplicar o cambiar filtros, las tarjetas de propiedades no desaparecerán de golpe. Utilizaremos `<AnimatePresence>` de `framer-motion` para desvanecer y encoger suavemente las propiedades descartadas (`opacity: 0, scale: 0.95`) y revelar las nuevas con efectos de deslizamiento vertical elásticos.
*   **Inercia de Scroll:** Al paginar o re-filtrar, Lenis reacomodará el scroll hacia la cabecera de los resultados con un deslizamiento suave, evitando saltos bruscos en pantalla.
*   **Interacciones en Filtros:** Los sliders de rango y los selectores dropdown tendrán micro-animaciones en hover que iluminarán sutilmente sus bordes con el tono `brand-gold` (#D4AF37).

---

## 4. Ficha de Detalle Editorial y Captura de Lead Directo

Cuando el usuario hace clic en **"Explorar Activo"**, la navegación fluirá hacia la página del activo detallado, diseñada con la misma estética de una ficha técnica institucional de alto nivel:

### A. Estructura de la Ficha
*   **Visual a Sangre:** Galería fotográfica amplia en formato apaisado con zoom lento continuo para simular un paneo cinematográfico de cámara.
*   **Especificaciones Técnicas:** Tabla asimétrica usando tipografía `Inter` en pesos ultralivianos (200/300) detallando:
    *   Altura al hombro (en bodegas).
    *   Tipo de energía (Trifásica, KVA disponibles).
    *   Accesibilidad de camiones y zonas de maniobra.
    *   Seguridad (Control perimetral, guardias).
*   **Criterio del Curador:** Un extracto destacado escrito en tipografía `Cormorant Garamond` (Italic) que describe brevemente por qué este activo específico representa una oportunidad real en su sector.

### B. Lead Capture con WhatsApp Directo
El formulario de contacto estará anclado en un panel lateral flotante con efecto vidrio. Al enviar el formulario, abrirá una ventana de WhatsApp pre-redactando la consulta de forma inteligente usando las variables del activo:
> *"Hola Buenos Vientos, me interesa coordinar una visita / recibir información técnica del activo **[Código BV-XXX]** (en **[Comuna]**). Mi nombre es [Nombre] y represento a [Empresa]."*

---

## 5. Arquitectura del Código Propuesta

*   `src/types/property.ts`: Contrato de interfaz de tipado TypeScript para la estructura del activo.
*   `src/data/properties.ts`: Base de datos local mockeada con propiedades que reflejen el nuevo esquema técnico.
*   `src/components/home/desktop/PropertiesPortal.tsx`: Vista del buscador completo y control de filtros.
*   `src/components/home/desktop/FilterSidebar.tsx`: Componente del panel lateral de filtros con la clase `.surface-portfolio`.
*   `src/components/home/desktop/PropertyDetailPage.tsx`: Vista editorial del detalle del activo seleccionado.
*   `src/App.tsx` y `Header.tsx`: Integración del ruteador o sincronizador de estado de navegación para transicionar entre la Home y el Portal de manera transparente.
