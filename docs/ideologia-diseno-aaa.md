# Ideología de Diseño AAA — "The Portfolio Curator"

Este documento contiene los principios rectores para mantener la consistencia visual y narrativa de la marca **Buenos Vientos Broker**. Cualquier agente o desarrollador que trabaje en este proyecto debe adherirse a estas reglas para evitar el "AI Slop" y mantener un estándar de lujo editorial.

---

## 1. Principios Fundamentales (Anti-AI Slop)

*   **Prohibido lo Genérico:** Evitar grids de 3 columnas estándar, bordes redondeados excesivos (Material UI/Bootstrap) y sombras planas.
*   **Narrativa de Descubrimiento:** El contenido no se "muestra", se **revela**. El usuario debe sentir que está explorando una revista de arquitectura, no un portal inmobiliario.
*   **Espacio Negativo Estratégico:** El "aire" es un elemento de diseño. No temas dejar grandes áreas vacías para centrar la atención en un solo mensaje potente.

## 2. Jerarquía Tipográfica (Voz Editorial)

*   **Titulares (Display):** Usar `Playfair Display` (Serif) con pesos altos y `letter-spacing` negativo para un look compacto y premium.
*   **Énfasis (Editorial):** Usar `Cormorant Garamond` (Italic) para frases que definan el criterio o la visión. Debe sentirse como una anotación personal del curador.
*   **Cuerpo y UI:** Usar `Inter` (Sans-Serif) en pesos livianos (200-400) y con `letter-spacing` abierto (`tracking-widest`) para mantener la legibilidad técnica.
*   **Responsive:** Siempre usar `clamp()` para que la tipografía escale de forma fluida entre dispositivos sin perder el impacto visual.

## 3. Composición y Layout (Asimetría)

*   **Balance Asimétrico:** Evitar el centrado perfecto en secciones principales. Colocar titulares masivos a la izquierda y activos visuales verticales a la derecha para generar tensión visual sofisticada.
*   **Capas (Layering):** Superponer elementos (texto sobre imagen, imágenes que se solapan) utilizando `backdrop-blur` (Glassmorphism) para crear profundidad de campo.
*   **Grids Editoriales:** En listados, romper la uniformidad. Alternar tamaños de tarjetas o usar márgenes variables para que la grid se sienta dinámica.

## 4. Paleta de Colores y Texturas (Deep Architectural)

*   **Base:** `Slate 950` (#05070A) para fondos profundos que eliminen la distracción.
*   **Acento:** `Gold 400` (#D4AF37) para elementos de autoridad, líneas de tiempo y CTAs críticos. Usar con moderación (máximo 10% de la interfaz).
*   **Superficies:** Negro con opacidad baja (3-5%) y desenfoque de fondo (`blur-2xl`) para crear el efecto de vidrio premium.
*   **Imágenes:** Aplicar filtros CSS de desaturación sutil y contraste alto (`img-luxury`) para unificar fotos de diferentes fuentes en un solo tono "sobrio y elegante".

## 5. Movimiento e Interacción (Cinematic Motion)

*   **Scroll-Driven:** Usar `framer-motion` con `useScroll` para que los elementos reaccionen a la posición del usuario.
*   **Reveals:** Priorizar el `Mask Reveal` (texto que aparece desde una máscara invisible) y el `Parallax` multi-capa.
*   **Smooth Scroll:** Mantener Lenis (o similar) configurado para un scroll inercial que suavice la experiencia.
*   **Magnetic Buttons:** Los botones principales deben tener un sutil efecto magnético que atraiga el cursor, reforzando la interactividad de alta gama.

---

## 6. Referencia Técnica (Tokens)

*   **Configuración Global:** `tailwind.config.js` contiene la paleta `brand-gold`, `bg-main` y las escalas de `fontSize: hero`.
*   **Utilidades Custom:** `src/index.css` define las clases `.btn-editorial`, `.surface-portfolio`, `.mask-reveal` y `.img-luxury`.
*   **Scroll:** La inicialización de **Lenis** se encuentra en `src/components/home/desktop/HomeDesktop.tsx`.

## 7. Check de Calidad para Agentes

Antes de entregar cualquier código de UI, pregunta:
1. ¿Esto parece una web corporativa estándar? (Si sí, **rechazar**).
2. ¿Hay suficiente espacio negativo para que el titular respire?
3. ¿La tipografía Serif tiene el protagonismo que merece?
4. ¿La animación de entrada es fluida o es un "fade-in" básico?

**Buenos Vientos no vende casas; selecciona activos estratégicos.** La interfaz debe ser el reflejo de esa promesa.
