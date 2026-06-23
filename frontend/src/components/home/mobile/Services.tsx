import React from 'react';
import { motion } from 'framer-motion';

export default function Services() {
  const services = [
    { title: 'Corretaje de propiedades', desc: 'Gestión comercial para venta o arriendo de activos residenciales, comerciales e industriales.' },
    { title: 'Difusión y promoción', desc: 'Exposición de propiedades con apoyo visual, redes y contacto directo.' },
    { title: 'Captación de clientes', desc: 'Enfoque en consultas con intención real y seguimiento comercial.' },
    { title: 'Coordinación de visitas', desc: 'Agenda, filtro de interesados y acompañamiento en terreno.' },
    { title: 'Asesoría inmobiliaria', desc: 'Orientación según objetivo: vivir, invertir, rentabilizar o expandir.' },
  ];

  return (
    <section className="py-24 bg-bg-alt px-6 border-b border-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-text-primary-dark mb-6">
            Servicios inmobiliarios con enfoque directo.
          </h2>
          <div className="w-16 h-1 bg-brand-accent mx-auto mb-8" />
          <p className="text-text-muted-dark font-light leading-relaxed max-w-2xl mx-auto">
            Acompañamos procesos de venta y arriendo con una gestión cercana, comercial y orientada a concretar oportunidades.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 mt-16">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative pl-6 border-l border-brand-accent/30 hover:border-brand-accent transition-colors duration-300"
            >
              <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-brand-accent" />
              <h3 className="text-lg font-medium text-text-primary-dark mb-3">{service.title}</h3>
              <p className="text-sm text-text-muted-dark font-light leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
