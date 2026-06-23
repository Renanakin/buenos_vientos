import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Compass, Activity } from 'lucide-react';

export default function AuthorityMetrics() {
  const metrics = [
    {
      id: 1,
      value: '+120.000 m²',
      label: 'Superficie Operativa',
      desc: 'Área total gestionada en activos industriales, bodegas y proyectos comerciales.',
      icon: <Activity className="w-5 h-5 text-brand-accent/80" />
    },
    {
      id: 2,
      value: '94%',
      label: 'Coincidencia Territorial',
      desc: 'Precisión en la selección de sectores de alta conectividad y proyección real.',
      icon: <Compass className="w-5 h-5 text-brand-accent/80" />
    },
    {
      id: 3,
      value: 'Boutique',
      label: 'Enfoque Curado',
      desc: 'Filtro riguroso de selección. Trabajamos oportunidad de valor, no volumen.',
      icon: <Award className="w-5 h-5 text-brand-accent/80" />
    },
    {
      id: 4,
      value: 'Directo',
      label: 'Gestión Consultiva',
      desc: 'Coordinación directa de visitas y asesoramiento comercial sin intermediarios.',
      icon: <ShieldCheck className="w-5 h-5 text-brand-accent/80" />
    }
  ];

  const partners = [
    'Logística Metropolitana',
    'RM Desarrollos',
    'Maule Inversiones',
    'Capital Logístico',
    'Eje Central Desarrolladora'
  ];

  return (
    <section className="py-28 bg-bg-main px-6 border-b border-white/5 relative overflow-hidden">
      {/* Subtle geometric circles decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full border border-white -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] rounded-full border border-white -translate-y-1/2 translate-x-1/2" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Statement */}
        <div className="text-center mb-20">
          <span className="text-[10px] text-brand-gold uppercase tracking-ultra-wide block mb-3">
            Autoridad & Respaldo
          </span>
          <h2 className="text-display-l text-text-primary mb-6 max-w-2xl mx-auto leading-tight">
            Criterio comercial validado en cifras y alianzas
          </h2>
          <div className="w-16 h-[1px] bg-brand-gold/40 mx-auto" />
        </div>

        {/* Metrics Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: i * 0.15, ease: [0.19, 1, 0.22, 1] }}
              className="p-8 border border-white/5 bg-surface-main/20 backdrop-blur-sm relative group hover:border-brand-gold/20 transition-all duration-500"
            >
              {/* Border decoration */}
              <div className="absolute top-0 left-0 w-8 h-[1px] bg-brand-gold/20 group-hover:bg-brand-gold transition-colors duration-500" />
              <div className="absolute top-0 left-0 w-[1px] h-8 bg-brand-gold/20 group-hover:bg-brand-gold transition-colors duration-500" />

              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] uppercase tracking-ultra-wide text-text-muted font-mono">
                  MÉTRICA 0{metric.id}
                </span>
                <div className="text-brand-gold/80">
                  {metric.icon}
                </div>
              </div>

              <h3 className="text-3xl md:text-4xl font-serif text-text-primary mb-2 tracking-tight group-hover:text-brand-gold transition-colors duration-300">
                {metric.value}
              </h3>
              
              <h4 className="text-[10px] uppercase tracking-ultra-wide text-brand-gold font-semibold mb-3">
                {metric.label}
              </h4>
              
              <p className="text-xs text-text-secondary font-light leading-relaxed">
                {metric.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Monochrome Partners Row */}
        <div className="pt-12 border-t border-white/5 text-center">
          <span className="text-[10px] text-text-muted-dark uppercase tracking-[0.25em] block mb-8 font-mono">
            Operamos con el respaldo de desarrolladoras e inversionistas líderes
          </span>
          
          <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8 opacity-40">
            {partners.map((partner, index) => (
              <motion.span
                key={partner}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ opacity: 1, scale: 1.05 }}
                className="text-xs md:text-sm text-text-primary-dark font-serif italic tracking-widest select-none cursor-default hover:text-brand-accent transition-all duration-300"
              >
                {partner}
              </motion.span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
