import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import MagneticButton from './MagneticButton';

export default function Hero() {
  const { scrollY } = useScroll();
  
  // AAA Parallax Orchestration
  const yImage = useTransform(scrollY, [0, 800], [0, -120]);
  const scaleImage = useTransform(scrollY, [0, 800], [1, 1.15]);
  const opacityElements = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative min-h-[110vh] flex items-center pt-24 pb-20 overflow-hidden bg-bg-main selection:bg-brand-gold/30">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-20 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
        
        {/* Left Column: Asymmetric Typography & Narrative */}
        <div className="lg:col-span-7 relative z-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-start"
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
              className="flex items-center gap-4 mb-10"
            >
              <div className="w-8 h-[1px] bg-brand-gold/50" />
              <span className="text-[10px] sm:text-xs uppercase tracking-ultra-wide text-brand-gold font-light">
                Venta y Arriendo / Sectores Estratégicos
              </span>
            </motion.div>
            
            <h1 className="text-hero text-text-primary mb-10 leading-[0.9] flex flex-col items-start">
              <span className="overflow-hidden inline-block pb-2">
                <motion.span
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.4, delay: 0.5, ease: [0.19, 1, 0.22, 1] }}
                  className="block"
                >
                  Propiedades
                </motion.span>
              </span>
              <span className="overflow-hidden inline-block italic font-serif text-brand-gold">
                <motion.span
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.4, delay: 0.7, ease: [0.19, 1, 0.22, 1] }}
                  className="block font-serif"
                >
                  Seleccionadas.
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
              className="text-text-secondary max-w-lg text-lg sm:text-xl font-light leading-relaxed mb-14 border-l border-brand-gold/10 pl-8"
            >
              Curamos oportunidades inmobiliarias en sectores que marcan diferencia por su entorno, conectividad y potencial de plusvalía real.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 1, ease: [0.19, 1, 0.22, 1] }}
              className="flex flex-wrap gap-8"
            >
              <MagneticButton className="btn-editorial group">
                <span className="relative z-10 transition-colors group-hover:text-brand-gold">Ver la selección</span>
                <div className="btn-line" />
              </MagneticButton>
              
              <MagneticButton className="text-[10px] uppercase tracking-ultra-wide text-text-muted hover:text-white transition-colors py-2">
                Agenda tu visita
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Column: Architectural Vertical Showcase */}
        <div className="lg:col-span-5 relative lg:mt-0 mt-12">
          <motion.div
            style={{ y: yImage }}
            className="relative w-full aspect-[4/5] lg:aspect-auto lg:h-[85vh] overflow-hidden rounded-[1px] surface-portfolio"
          >
            <motion.img
              style={{ scale: scaleImage }}
              initial={{ scale: 1.2, filter: 'grayscale(1) brightness(0.5)' }}
              animate={{ scale: 1, filter: 'grayscale(0) brightness(0.9)' }}
              transition={{ duration: 2.5, ease: [0.19, 1, 0.22, 1] }}
              src="https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=90&w=1200"
              alt="Criterio Arquitectónico"
              className="w-full h-full object-cover img-luxury"
            />
            
            <div className="absolute inset-0 bg-gradient-to-tr from-bg-main/40 via-transparent to-white/5" />
            
            <motion.div
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: -90 }}
              transition={{ delay: 2, duration: 1.5 }}
              className="absolute -right-32 bottom-48 origin-center hidden xl:block"
            >
              <span className="text-[9px] uppercase tracking-[0.6em] text-brand-gold/50 whitespace-nowrap">
                [ 01 — CRITERIO DE SELECCIÓN ]
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.2, duration: 2 }}
            className="absolute -top-10 -left-10 w-32 h-32 border-l border-t border-brand-gold/20 -z-10"
          />
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-main/50 to-bg-main pointer-events-none" />
      <div className="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-l from-brand-gold/[0.03] to-transparent pointer-events-none" />

      <motion.div 
        style={{ opacity: opacityElements }}
        className="absolute left-[-5%] top-[20%] text-[15vw] font-serif text-white/[0.01] pointer-events-none select-none"
      >
        BOUTIQUE
      </motion.div>
      
      <motion.div
        style={{ opacity: opacityElements }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6"
      >
        <span className="text-[10px] uppercase tracking-[0.5em] text-text-muted font-light">Explorar</span>
        <div className="relative w-[1px] h-20 bg-white/10 overflow-hidden">
          <motion.div
            animate={{ y: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-brand-gold to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}
