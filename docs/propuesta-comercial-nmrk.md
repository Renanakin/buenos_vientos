# Proposal & Implementation Plan - Commercial Business Logic (Inspired by nmrk.cl)

This plan details the implementation of a full-scale commercial real estate portal for Buenos Vientos. It outlines the integration of URL-driven searches, advanced range filters (Price in UF/CLP & Built Surface), dynamic grid rendering, and detailed single-property lead capture flows inspired by **Newmark Chile (nmrk.cl)**.

## User Review Required

> [!IMPORTANT]
> **URL-Driven State (SEO First):** Like Newmark, we propose tying all filter states (Property Type, Operation, Comuna) directly to URL parameters (e.g., `/propiedades/oficina/arriendo/providencia`). This will allow shareable filter links and optimal indexing by search engines.
> 
> **Daily UF Converter:** Since prices in Chile are handled in UF but clients often need CLP equivalency, we will implement a mockable currency conversion module in the client code to render both values dynamically.
> 
> **Data Layer:** We will structure a modular data contract `src/types/property.ts` and a local mock database `src/data/properties.ts` that can be easily plugged into a future REST API or Headless CMS (such as Sanity, Strapi, or Firebase).

## Open Questions

> [!NOTE]
> **No open questions.** The proposal details cover the frontend requirements, filter criteria, and interaction transitions.

## Proposed Architecture & Changes

---

### Data Models & Mock Database

#### [NEW] [property.ts](file:///c:/Users/HackBook/Documents/proyectos/corretaje/src/types/property.ts)
- Define TypeScript interfaces for properties, including specifications:
  - Code (`BV-XXX`), title, description, address, sector, comuna, transaction type (`venta` | `arriendo`), category (`residencial` | `comercial` | `bodega` | `terreno`), price (in UF/CLP), built surface area (m²), land surface area (m²), bedrooms, bathrooms, highlights (e.g., `["Oficinas", "Estacionamiento", "Excelente accesibilidad"]`), and image gallery array.

#### [NEW] [properties.ts](file:///c:/Users/HackBook/Documents/proyectos/corretaje/src/data/properties.ts)
- A local data mock representing 10+ select commercial and industrial properties (offices in Providencia, warehouses in Lo Espejo, land in San Bernardo) matching our curated strategic sector listings.

---

### Search Page & Advanced Filters

#### [NEW] [PropertiesPortal.tsx](file:///c:/Users/HackBook/Documents/proyectos/corretaje/src/components/home/desktop/PropertiesPortal.tsx)
- The main search engine page. Layout:
  - **Left/Center Column:** A dynamic properties grid that updates in real-time according to filters, showing loading states and "No properties found" empty states.
  - **Right Sidebar (Filters):**
    - Dropdowns for operation type and category.
    - Searchable select box for Comunas.
    - Dual range inputs for Built Surface area (m²) and Price.
    - Switcher to toggle price filter ranges between **UF** and **CLP**.

#### [NEW] [FilterSidebar.tsx](file:///c:/Users/HackBook/Documents/proyectos/corretaje/src/components/home/desktop/FilterSidebar.tsx)
- Refined luxury filter panel matching our AAA theme (glassmorphic borders, gold accents).
- Collapsible filter sections utilizing Framer Motion slide-downs.
- "Limpiar Filtros" quick reset button.

---

### Visual Transitions & Smooth Motion

- **State Transitions:** Use Framer Motion's `<AnimatePresence>` on the listings grid so cards animate out (`opacity: 0, scale: 0.95`) and fade-in/slide-up smoothly when filters are changed.
- **Scroll Memory:** Ensure that applying filters triggers a smooth scroll reset to the top of the grid (handled via Lenis) to avoid disorienting the user.
- **Micro-interactions:** Hovering over filters highlights them with a subtle gold glow, matching the branding aesthetic.

---

### Detailed Lead Capture View

#### [NEW] [PropertyDetailPage.tsx](file:///c:/Users/HackBook/Documents/proyectos/corretaje/src/components/home/desktop/PropertyDetailPage.tsx)
- A dedicated view for individual property sheets:
  - **Visuals:** Full-bleed image carousel with zoom effects.
  - **Technical Specs:** Clean editorial table displaying built surfaces, terrain surfaces, loading capacities, electricity specifications, and security attributes.
  - **Lead Form:** A sticky sidebar contact form that directly links to WhatsApp, pre-filling a request message:
    - `"Hola Buenos Vientos, me interesa recibir más información sobre el activo [Código BV-XXX] ubicado en [Sector/Comuna]."`

---

### Routing & Navigation Integration

#### [MODIFY] [App.tsx](file:///c:/Users/HackBook/Documents/proyectos/corretaje/src/App.tsx)
- Integrate a router structure (or conditional rendering state linked to `window.location.hash`/`window.location.pathname`) to allow smooth transitions between the Landing Homepage (`ClientHome`), the search Portal (`PropertiesPortal`), the detailed view (`PropertyDetailPage`), and the `AdminDashboard`.

#### [MODIFY] [Header.tsx](file:///c:/Users/HackBook/Documents/proyectos/corretaje/src/components/home/desktop/Header.tsx)
- Update navigation links (e.g., clicking "Propiedades", "Venta", or "Arriendo") to trigger the search Portal with pre-filled category/operation filters.

---

## Verification Plan

### Automated Tests
- Build verification: `npm run build`
- Lint checks: `npm run lint`

### Manual Verification
- Test filtering by transaction type (Venta/Arriendo) and category, checking the listings update dynamically.
- Verify range sliders filter prices in UF and CLP correctly.
- Test responsive layout of search portal (ensuring layout is clean on smaller browser window viewports).
- Select a listing card and click "Explorar Activo" to verify the detail page loads with specs sheet.
- Test contact form WhatsApp redirect message content matches the chosen property specs.
