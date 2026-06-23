import React from 'react';
import { motion } from 'framer-motion';
import { Home, Briefcase, Warehouse, Map } from 'lucide-react';

export default function Categories() {
  const categories = [
    {
      id: 1,
      title: 'Residenciales',
      desc: 'Casas y departamentos seleccionados en sectores consolidados o exclusivos.',
      icon: <Home className="w-6 h-6" />
    },
    {
      id: 2,
      title: 'Comerciales',
      desc: 'Espacios con potencial para atención, renta o desarrollo de negocio.',
      icon: <Briefcase className="w-6 h-6" />
    },
    {
      id: 3,
      title: 'Bodegas',
      desc: 'Propiedades funcionales para operación, almacenamiento o logística.',
      icon: <Warehouse className="w-6 h-6" />
    },
    {
      id: 4,
      title: 'Sitios y terrenos',
      desc: 'Oportunidades para inversión, expansión o desarrollo futuro.',
      icon: <Map className="w-6 h-6" />
    }
  ];

  return (
    <section className="py-24 bg-bg-main px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-text-primary-dark mb-4">
            Explora por tipo de propiedad
          </h2>
          <div className="w-16 h-1 bg-brand-accent" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.a
              href="#"
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group block p-8 rounded bg-surface-main hover:bg-brand-accent transition-colors duration-500 border border-white/5 hover:border-brand-accent"
            >
              <div className="text-brand-accent group-hover:text-bg-alt mb-6 transition-colors duration-500">
                {cat.icon}
              </div>
              <h3 className="text-lg font-semibold text-text-primary-dark group-hover:text-bg-alt mb-3 uppercase tracking-wide transition-colors duration-500">
                {cat.title}
              </h3>
              <p className="text-sm text-text-muted-dark group-hover:text-bg-alt/80 font-light leading-relaxed transition-colors duration-500">
                {cat.desc}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
