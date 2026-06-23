import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function CuratorStatement() {
  const { scrollYProgress } = useScroll();
  const watermarkX = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section id="statement" className="py-section bg-bg-main relative overflow-hidden flex items-center justify-center min-h-[60vh]">
      <div className="max-w-[1440px] mx-auto px-8 md:px-16 flex flex-col items-center text-center z-10">
        
        {/* Authority Seal - Refined SVG Rotating Label */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          className="relative mb-20 group"
        >
          <div className="w-28 h-28 relative flex items-center justify-center">
            {/* Rotating SVG Text */}
            <motion.svg
              viewBox="0 0 100 100"
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-full h-full"
            >
              <defs>
                <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
              </defs>
              <text className="text-[7px] uppercase tracking-[0.2em] fill-brand-gold/40 font-light">
                <textPath xlinkHref="#circlePath">
                  Buenos Vientos Broker • Criterio de Selección •
                </textPath>
              </text>
            </motion.svg>
            
            {/* Center Logo/Icon */}
            <div className="w-12 h-12 rounded-full border border-brand-gold/20 flex items-center justify-center bg-bg-main shadow-[0_0_30px_rgba(212,175,55,0.05)] transition-transform duration-700 group-hover:scale-110">
              <span className="text-[10px] tracking-[0.3em] text-brand-gold uppercase font-serif">
                BVB
              </span>
            </div>
          </div>
        </motion.div>

        {/* The Statement - High Contrast Italic Typography */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          className="max-w-5xl"
        >
          <h2 className="text-quote md:text-display-l italic text-text-primary leading-[1.1] font-editorial mb-10 text-glow-gold">
            "No gestionamos simplemente propiedades; seleccionamos activos donde la ubicación estratégica trasciende el valor del metro cuadrado."
          </h2>
          
          <div className="flex flex-col items-center gap-8">
            <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-ultra-wide text-brand-gold mb-1">Criterio Institucional</span>
              <span className="text-[9px] uppercase tracking-[0.4em] text-text-muted">Buenos Vientos Broker Boutique</span>
            </div>
          </div>
        </motion.div>

        {/* Dynamic Watermark Background */}
        <motion.div 
          style={{ x: watermarkX }}
          className="absolute top-1/2 left-1/2 -translate-y-1/2 text-[25vw] font-serif text-white/[0.005] pointer-events-none select-none -z-0 whitespace-nowrap"
        >
          CRITERIO COMERCIAL
        </motion.div>
      </div>

      {/* Atmospheric Accents */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </section>
  );
}
