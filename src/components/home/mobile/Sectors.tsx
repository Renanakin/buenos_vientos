import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Sectors() {
  const sectors = [
    { name: 'Lo Espejo', desc: 'Alta conectividad operativa' },
    { name: 'Quinta Normal', desc: 'Ubicación urbana estratégica' },
    { name: 'San Bernardo', desc: 'Escala y proyección logística' },
    { name: 'Otros sectores', desc: 'Selección según oportunidad' },
  ];

  return (
    <section className="py-24 bg-bg-main px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:w-1/3"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-text-primary-dark mb-6">
              Sectores que concentran oportunidad.
            </h2>
            <div className="w-16 h-1 bg-brand-accent mb-8" />
            <p className="text-text-muted-dark font-light leading-relaxed mb-8">
              Trabajamos propiedades en comunas y zonas donde la ubicación cumple un rol clave en la decisión: conectividad, entorno, consolidación urbana o proyección futura.
            </p>
          </motion.div>

          <div className="md:w-2/3 grid sm:grid-cols-2 gap-6">
            {sectors.map((sector, i) => (
              <motion.div
                key={sector.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative p-8 bg-surface-main border border-white/5 hover:border-brand-accent/40 transition-colors duration-500 rounded-sm overflow-hidden"
              >
                <div className="relative z-10">
                  <h3 className="font-serif text-2xl text-text-primary-dark mb-2 group-hover:text-brand-accent transition-colors duration-300">
                    {sector.name}
                  </h3>
                  <p className="text-sm text-text-muted-dark font-light">
                    {sector.desc}
                  </p>
                </div>
                <div className="absolute right-6 bottom-8 text-brand-accent/0 group-hover:text-brand-accent -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                  <ArrowRight className="w-6 h-6" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
