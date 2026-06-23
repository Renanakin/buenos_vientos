import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowUpRight } from 'lucide-react';

interface FeaturedPropertiesProps {
  onViewAll: () => void;
  onSelectProperty: (id: number) => void;
}

export default function FeaturedProperties({ onViewAll, onSelectProperty }: FeaturedPropertiesProps) {
  const properties = [
    {
      id: 1,
      serial: 'BV-01',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=90&w=1000',
      tag: 'Arriendo',
      type: 'LOGÍSTICO / INDUSTRIAL',
      title: 'Bodega Estratégica Lo Espejo',
      sector: 'Santiago Sur',
      metrics: '500 m² / Oficinas Habilitadas',
      desc: 'Optimización de flujo y conectividad inmediata con las principales arterias de la Región Metropolitana.'
    },
    {
      id: 6, // Map to existing id 6 (Casa in Chicauma)
      serial: 'BV-06',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=90&w=1000',
      tag: 'Venta',
      type: 'RESIDENCIAL / EXCLUSIVO',
      title: 'Residencia Moderna Chicauma',
      sector: 'Sector Consolidado',
      metrics: '3D · 3B / Condominio Privado',
      desc: 'Una propuesta arquitectónica que equilibra la sobriedad del diseño con la seguridad del entorno.'
    },
    {
      id: 3,
      serial: 'BV-03',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=90&w=1000',
      tag: 'Venta',
      type: 'TERRENO / PROYECCIÓN',
      title: 'Macrolote Industrial San Bernardo',
      sector: 'Zona de Expansión',
      metrics: '20.000 m² / Uso Industrial',
      desc: 'Activo patrimonial de alta escala, ideal para desarrollos logísticos o centros de distribución.'
    }
  ];

  return (
    <section id="properties" className="py-section bg-bg-main relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-8 md:px-20">
        
        {/* Editorial Header - Asymmetric */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between mb-28 gap-12"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[10px] text-brand-gold uppercase tracking-[0.4em] font-light">Portafolio</span>
              <div className="w-12 h-[1px] bg-brand-gold/20" />
            </div>
            <h2 className="text-display-l text-text-primary leading-[1] mb-6">
              Selección de activos <br className="hidden sm:block" />
              <span className="font-editorial italic font-normal text-brand-gold text-glow-gold">que trascienden.</span>
            </h2>
          </div>
          
          <div className="flex flex-col items-start lg:items-end gap-6">
            <p className="text-text-muted text-sm max-w-xs lg:text-right font-light leading-relaxed">
              Curaduría rigurosa basada en ubicación, conectividad y potencial de plusvalía real.
            </p>
            <button onClick={onViewAll} className="btn-editorial group">
              <span>Catálogo completo</span>
              <div className="btn-line" />
            </button>
          </div>
        </motion.div>

        {/* The AAA Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-24">
          {properties.map((p, i) => (
            <PropertyCard key={p.id} property={p} index={i} onSelect={onSelectProperty} />
          ))}
        </div>
      </div>

      {/* Background Atmosphere */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-bg-alt/50 to-bg-main pointer-events-none -z-10" />
    </section>
  );
}

function PropertyCard({ property, index, onSelect }: { property: any; index: number; onSelect: (id: number) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, delay: index * 0.2, ease: [0.19, 1, 0.22, 1] }}
      className="group cursor-pointer"
      onClick={() => onSelect(property.id)}
    >
      {/* Portfolio Card Structure */}
      <div className="relative mb-10 overflow-hidden surface-portfolio aspect-[3/4.2]">
        {/* Parallax Image Effect */}
        <motion.img
          whileHover={{ scale: 1.12 }}
          transition={{ duration: 1.8, ease: [0.19, 1, 0.22, 1] }}
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover img-luxury"
        />
        
        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-main/90 via-bg-main/10 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-1000" />
        
        {/* Floating Serial & Label */}
        <div className="absolute top-8 left-8 right-8 flex justify-between items-start">
          <span className="text-[10px] font-mono tracking-widest text-white/30">{property.serial}</span>
          <div className="flex flex-col items-end gap-2">
            <span className="text-[9px] uppercase tracking-ultra-wide px-3 py-1 bg-brand-gold/10 text-brand-gold border border-brand-gold/20 backdrop-blur-md">
              {property.tag}
            </span>
          </div>
        </div>

        {/* Content Reveal on Hover */}
        <div className="absolute inset-x-8 bottom-8 z-20 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-1000 ease-premium-out">
          <div className="space-y-4">
            <p className="text-[10px] text-brand-gold uppercase tracking-[0.3em] font-semibold">{property.type}</p>
            <p className="text-xs text-text-secondary leading-relaxed font-light">
              {property.desc}
            </p>
            <div className="h-[1px] w-full bg-white/10" />
            <div className="text-[10px] uppercase tracking-widest text-text-muted italic">
              {property.metrics}
            </div>
          </div>
        </div>
      </div>

      {/* Persistent Info Layer */}
      <div className="space-y-4 px-2">
        <div className="flex items-center gap-3">
          <MapPin className="w-3 h-3 text-brand-gold/60" />
          <span className="text-[10px] uppercase tracking-ultra-wide text-text-muted font-light">{property.sector}</span>
        </div>
        
        <h3 className="text-2xl font-serif text-text-primary leading-[1.2] group-hover:text-brand-gold transition-colors duration-700">
          {property.title}
        </h3>
        
        <div className="flex items-center justify-between pt-6 group-hover:pt-8 transition-all duration-700">
          <span className="text-[9px] uppercase tracking-[0.4em] text-text-muted group-hover:text-brand-gold transition-colors">Ver Detalles</span>
          <motion.div
            whileHover={{ rotate: 45, x: 5, y: -5 }}
            className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center group-hover:border-brand-gold/40 transition-colors"
          >
            <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-brand-gold transition-colors" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
