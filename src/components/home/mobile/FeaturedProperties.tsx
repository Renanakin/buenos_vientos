import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

export default function FeaturedProperties() {
  const properties = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1586528116311-ad8ed7b669c3?auto=format&fit=crop&q=80',
      tag: 'Arriendo',
      type: 'Bodega',
      title: 'Bodega operativa en sector estratégico',
      sector: 'Lo Espejo',
      features: '500 m² · Oficinas · Buena conectividad',
      desc: 'Una alternativa funcional para operación, almacenamiento o desarrollo logístico.'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80',
      tag: 'Venta',
      type: 'Casa',
      title: 'Casa en entorno residencial consolidado',
      sector: 'Chicauma',
      features: '3D · 3B · Condominio',
      desc: 'Propiedad pensada para quienes buscan ubicación, entorno y proyección de valor.'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80',
      tag: 'Venta',
      type: 'Sitio',
      title: 'Terreno con proyección de inversión',
      sector: 'San Bernardo',
      features: '20.000 m² · Excelente acceso · Potencial',
      desc: 'Activo orientado a inversión o expansión en una zona con oportunidad estratégica.'
    }
  ];

  return (
    <section className="py-24 bg-bg-alt px-6 border-b border-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-between items-end mb-16"
        >
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-text-primary-dark mb-4">
              Propiedades destacadas
            </h2>
            <div className="w-16 h-1 bg-brand-accent" />
          </div>
          <a href="#" className="hidden sm:block text-brand-accent hover:text-brand-accent-soft uppercase tracking-widest text-xs font-semibold transition-colors">
            Ver catálogo completo →
          </a>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="group bg-surface-main rounded-sm overflow-hidden border border-white/5 hover:border-brand-accent/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
            >
              <div className="relative h-64 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-slow group-hover:scale-105 premium-image-filter"
                  style={{ backgroundImage: `url('${p.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-transparent to-transparent opacity-80" />
                <div className="absolute top-4 right-4 bg-bg-main/80 backdrop-blur-sm text-brand-accent px-3 py-1 text-xs uppercase tracking-wider font-semibold border border-brand-accent/30 rounded-sm">
                  {p.tag}
                </div>
                <div className="absolute bottom-4 left-4 text-text-primary-dark">
                  <span className="text-xs uppercase tracking-wider text-text-muted-dark mb-1 block">{p.type}</span>
                  <div className="flex items-center text-sm font-medium">
                    <MapPin className="w-4 h-4 mr-1 text-brand-accent" />
                    {p.sector}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-serif text-xl text-text-primary-dark mb-3 line-clamp-2">
                  {p.title}
                </h3>
                <p className="text-brand-accent text-sm font-medium mb-4 pb-4 border-b border-white/5">
                  {p.features}
                </p>
                <p className="text-text-muted-dark text-sm font-light leading-relaxed mb-6 line-clamp-2">
                  {p.desc}
                </p>
                <button className="w-full btn-secondary uppercase tracking-widest text-xs">
                  Ver detalles
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
