import React from 'react';
import { motion } from 'framer-motion';

export default function Storytelling() {
  return (
    <section className="py-24 bg-bg-main px-6 border-b border-white/5 relative overflow-hidden">
      {/* Background visual element */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 hidden lg:block">
        <div 
          className="absolute inset-0 bg-cover bg-center premium-image-filter"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-main to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="lg:w-1/2">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="pr-8"
          >
            <h2 className="font-serif text-3xl md:text-5xl text-text-primary-dark mb-8 leading-tight">
              Selección, estrategia <br/> y cercanía comercial.
            </h2>
            <div className="w-16 h-1 bg-brand-accent mb-10" />
            
            <p className="text-lg text-text-muted-dark font-light leading-relaxed mb-6">
              En Buenos Vientos Broker entendemos que una propiedad no se elige solo por metros cuadrados, sino por lo que representa su ubicación, su proyección y su capacidad de generar valor.
            </p>
            
            <p className="text-lg text-text-muted-dark font-light leading-relaxed">
              Por eso trabajamos con propiedades en venta y arriendo que destacan por su entorno, conectividad o potencial, acompañando cada proceso con atención directa y una mirada comercial clara.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
