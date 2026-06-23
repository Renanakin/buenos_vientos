import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight, RotateCcw } from 'lucide-react';
import { fetchProperties } from '../../../services/api';
import FilterSidebar from './FilterSidebar';
import type { Property } from '../../../types/property';

interface FilterState {
  tag: string;
  type: string;
  comuna: string;
  priceUnit: 'UF' | 'CLP';
  minPrice: number;
  maxPrice: number;
  minArea: number;
  maxArea: number;
}

interface PropertiesPortalProps {
  onSelectProperty: (id: number) => void;
  preFilters?: Partial<FilterState>;
}

export default function PropertiesPortal({ onSelectProperty, preFilters }: PropertiesPortalProps) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Safe default filter limits
  const defaultFilters = (): FilterState => ({
    tag: 'Todos',
    type: 'Todos',
    comuna: 'Todos',
    priceUnit: 'UF',
    minPrice: 0,
    maxPrice: 50000,
    minArea: 0,
    maxArea: 25000,
    ...preFilters
  });

  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  // Fetch properties from backend API on mount
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    fetchProperties()
      .then((data) => {
        if (isMounted) {
          setProperties(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Error al cargar propiedades del catálogo');
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Sync pre-filters when they change from parent (e.g. menu link clicks)
  useEffect(() => {
    if (preFilters) {
      setFilters((prev) => ({
        ...prev,
        ...preFilters
      }));
    }
  }, [preFilters]);

  // Extract unique comunas list from database for the sidebar select dropdown
  const comunasList = useMemo(() => {
    const list = properties.map((p) => p.comuna);
    return Array.from(new Set(list));
  }, [properties]);

  // Filter listings based on active parameters
  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      // 1. Transaction Type filter
      if (filters.tag !== 'Todos' && p.tag !== filters.tag) return false;
      
      // 2. Category Type filter
      if (filters.type !== 'Todos' && p.type.toLowerCase() !== filters.type.toLowerCase()) return false;
      
      // 3. Comuna Location filter
      if (filters.comuna !== 'Todos' && p.comuna !== filters.comuna) return false;
      
      // 4. Area filtering (Check either builtArea or terrainArea for lands)
      const area = p.builtArea > 0 ? p.builtArea : (p.terrainArea || 0);
      if (filters.minArea > 0 && area < filters.minArea) return false;
      if (filters.maxArea > 0 && area > filters.maxArea) return false;
      
      // 5. Price filtering according to priceUnit
      if (filters.priceUnit === 'UF') {
        if (filters.minPrice > 0 && p.priceUF < filters.minPrice) return false;
        if (filters.maxPrice > 0 && p.priceUF > filters.maxPrice) return false;
      } else {
        if (filters.minPrice > 0 && p.priceCLP < filters.minPrice) return false;
        if (filters.maxPrice > 0 && p.priceCLP > filters.maxPrice) return false;
      }
      
      return true;
    });
  }, [properties, filters]);

  const handleReset = () => {
    setFilters({
      tag: 'Todos',
      type: 'Todos',
      comuna: 'Todos',
      priceUnit: 'UF',
      minPrice: 0,
      maxPrice: 50000,
      minArea: 0,
      maxArea: 25000
    });
  };

  // Helper formatter for prices
  const formatPrice = (price: number, unit: 'UF' | 'CLP') => {
    if (unit === 'UF') {
      return `${price.toLocaleString('es-CL')} UF`;
    } else {
      return `$${price.toLocaleString('es-CL')} CLP`;
    }
  };

  return (
    <div className="min-h-screen bg-bg-main pt-36 pb-28 px-8 md:px-16 relative">
      {/* Decorative background grid and blurs */}
      <div className="absolute inset-0 opacity-[0.01] pointer-events-none z-0">
        <svg width="100%" height="100%">
          <pattern id="portal-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#portal-grid)" />
        </svg>
      </div>
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-brand-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-brand-primary-soft/10 blur-[100px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="mb-16 border-b border-white/5 pb-10">
          <span className="text-[10px] text-brand-gold uppercase tracking-[0.35em] font-mono font-medium block mb-3">
            Exploración Territorial
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-text-primary mb-4 leading-tight tracking-tight">
            Catálogo de Activos <span className="font-editorial italic text-brand-gold">Curados.</span>
          </h1>
          <p className="text-sm md:text-base text-text-secondary max-w-3xl font-light leading-relaxed">
            Filtre y analice las propiedades disponibles bajo criterios de conectividad comercial, superficie y viabilidad operativa estratégica.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Filter Sidebar */}
          <aside className="w-full lg:w-1/4 lg:sticky lg:top-36">
            <FilterSidebar 
              filters={filters} 
              onChange={setFilters} 
              onReset={handleReset} 
              comunasList={comunasList} 
            />
          </aside>

          {/* Right Column: Listings Grid (Asymmetric) */}
          <main className="w-full lg:w-3/4">
            
            {loading ? (
              <div className="flex flex-col items-center justify-center py-32 border border-white/5 bg-surface-main/5">
                <div className="w-10 h-10 border-2 border-brand-gold/20 border-t-brand-gold animate-spin rounded-full mb-4" />
                <span className="text-[10px] uppercase tracking-ultra-wide text-text-muted font-mono font-medium animate-pulse">
                  Conectando con la base de datos de activos...
                </span>
              </div>
            ) : error ? (
              <div className="text-center py-20 border border-dashed border-brand-gold/20 p-8 flex flex-col items-center gap-4">
                <p className="text-sm text-brand-gold font-mono uppercase tracking-widest">Error de carga</p>
                <p className="text-sm text-text-muted max-w-md font-light leading-relaxed">
                  No se pudo sincronizar el portafolio de activos: {error}
                </p>
                <button
                  onClick={() => {
                    setError(null);
                    setLoading(true);
                    fetchProperties()
                      .then((data) => {
                        setProperties(data);
                        setLoading(false);
                      })
                      .catch((err) => {
                        setError(err.message);
                        setLoading(false);
                      });
                  }}
                  className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-brand-gold border border-brand-gold/20 px-4 py-2 hover:bg-brand-gold/5 transition-colors font-mono"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reintentar Sincronización</span>
                </button>
              </div>
            ) : (
              <>
                {/* Results counter */}
                <div className="flex justify-between items-center mb-10 pb-4 border-b border-white/5">
                  <span className="text-xs text-text-muted uppercase tracking-widest font-mono">
                    {filteredProperties.length} activos encontrados
                  </span>
                </div>

                {filteredProperties.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-24 border border-dashed border-white/5 p-8"
                  >
                    <p className="text-lg text-text-muted font-light mb-4">
                      No se encontraron activos bajo los criterios seleccionados.
                    </p>
                    <button
                      onClick={handleReset}
                      className="text-xs uppercase tracking-widest text-brand-gold border-b border-brand-gold/30 pb-0.5 hover:text-brand-gold-soft transition-colors"
                    >
                      Restablecer todos los filtros
                    </button>
                  </motion.div>
                ) : (
              <motion.div 
                layout 
                className="grid md:grid-cols-2 gap-x-12 gap-y-16"
              >
                <AnimatePresence mode="popLayout">
                  {filteredProperties.map((p, i) => {
                    // Make every third card (index i % 3 === 2) horizontal and span 2 columns
                    const isHorizontal = i % 3 === 2;

                    return (
                      <motion.div
                        layout
                        key={p.id}
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                        onClick={() => onSelectProperty(p.id)}
                        className={`group cursor-pointer ${
                          isHorizontal 
                            ? 'md:col-span-2 flex flex-col md:flex-row gap-8 border-t border-white/5 pt-12 first:border-0 first:pt-0' 
                            : 'flex flex-col gap-4 border-t border-white/5 pt-12 first:border-0 first:pt-0 md:border-t-0 md:pt-0'
                        }`}
                      >
                        {/* Image block */}
                        <div className={`relative overflow-hidden bg-surface-main shadow-lg overflow-hidden ${
                          isHorizontal 
                            ? 'w-full md:w-1/2 aspect-[4/3]' 
                            : 'w-full aspect-[4/3]'
                        }`}>
                          <div 
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.2s] ease-out group-hover:scale-105 img-luxury"
                            style={{ backgroundImage: `url('${p.images[0]}')` }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-bg-main/70 via-transparent to-transparent opacity-80" />
                          
                          {/* Top tags */}
                          <div className="absolute top-4 right-4 bg-bg-main/90 backdrop-blur-sm text-brand-gold px-3.5 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold border border-brand-gold/20">
                            {p.tag}
                          </div>
                          
                          <div className="absolute bottom-4 left-6">
                            <span className="text-[9px] uppercase tracking-[0.25em] text-brand-gold-soft font-mono font-semibold">
                              {p.type}
                            </span>
                          </div>
                        </div>

                        {/* Text Block */}
                        <div className={`flex flex-col justify-between ${
                          isHorizontal ? 'w-full md:w-1/2 py-2' : 'w-full'
                        }`}>
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-brand-gold font-serif italic text-base font-medium">{p.code}</span>
                              <span className="w-1.5 h-[1px] bg-white/20" />
                              <div className="flex items-center text-[10px] text-text-muted uppercase tracking-widest font-light">
                                <MapPin className="w-3.5 h-3.5 mr-1 text-brand-gold/75" />
                                {p.sector}, {p.comuna}
                              </div>
                            </div>

                            <h3 className="font-serif text-2xl text-text-primary mb-3 leading-snug group-hover:text-brand-gold transition-colors duration-300">
                              {p.title}
                            </h3>
                            
                            <p className="text-xs uppercase tracking-[0.1em] text-brand-gold-soft mb-4 font-mono font-semibold">
                              {p.builtArea > 0 ? `${p.builtArea} m² Útiles` : `${p.terrainArea} m² Terreno`} · {formatPrice(filters.priceUnit === 'UF' ? p.priceUF : p.priceCLP, filters.priceUnit)}
                            </p>
                            
                            <p className="text-text-muted text-sm font-light leading-relaxed mb-6 line-clamp-2">
                              {p.description}
                            </p>
                          </div>

                          {/* Inline link decoration */}
                          <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                            <span className="text-[10px] uppercase tracking-[0.25em] text-text-muted group-hover:text-brand-gold transition-colors duration-300 font-semibold">
                              Explorar Activo
                            </span>
                            <div className="w-10 h-[1px] bg-white/10 group-hover:bg-brand-gold group-hover:w-20 transition-all duration-500" />
                          </div>
                        </div>

                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            )}
          </>
        )}
      </main>
        </div>
      </div>
    </div>
  );
}
