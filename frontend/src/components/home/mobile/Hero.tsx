import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-[85vh] flex items-center justify-center bg-bg-main overflow-hidden">
      {/* Background with slight parallax/scale effect */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat premium-image-filter"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80')" }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-bg-alt/80 via-bg-alt/60 to-bg-alt" />

      <div className="relative z-10 w-full max-w-5xl px-6 text-center">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-brand-accent uppercase tracking-[0.2em] text-sm md:text-sm font-semibold mb-6"
        >
          Venta y arriendo en sectores estratégicos
        </motion.p>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-serif text-4xl md:text-6xl lg:text-7xl font-semibold mb-8 text-text-primary-dark leading-tight drop-shadow-lg"
        >
          Propiedades seleccionadas en sectores que marcan diferencia
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-lg md:text-xl text-text-muted-dark max-w-3xl mx-auto mb-12 font-light tracking-wide"
        >
          Casas, bodegas, espacios comerciales y terrenos con ubicación, conectividad y potencial real.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="btn-primary">
              Explorar Propiedades
            </button>
            <button className="btn-secondary">
              Nuestros Servicios
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted-dark"
      >
        <span className="text-xs uppercase tracking-widest">Explorar</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </motion.div>
    </section>
  );
}
