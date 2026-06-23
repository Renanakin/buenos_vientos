import React from 'react';
import { motion } from 'framer-motion';

export default function CTAFinal() {
  return (
    <section className="py-24 bg-bg-alt px-6 relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-[300px] bg-brand-accent/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl md:text-5xl text-text-primary-dark mb-6">
            ¿Buscas una propiedad o quieres publicar la tuya?
          </h2>
          <p className="text-xl text-text-muted-dark font-light mb-12">
            Conversemos y encontremos la mejor oportunidad según tu objetivo.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">
              Agenda tu visita
            </button>
            <button className="btn-secondary">
              Contáctanos
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
