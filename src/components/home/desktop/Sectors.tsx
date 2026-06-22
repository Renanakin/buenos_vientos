import React, { useRef } from 'react';
import { motion, useScroll, useInView } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';

function TimelineNode() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-20% 0px -60% 0px" });

  return (
    <div ref={ref} className="absolute left-[11px] -translate-x-1/2 mt-2 z-20">
      <motion.div
        animate={{
          scale: isInView ? 1.25 : 1,
          backgroundColor: isInView ? '#D4AF37' : '#05070A',
          borderColor: isInView ? '#F1E5AC' : 'rgba(212, 175, 55, 0.3)',
          boxShadow: isInView ? '0 0 12px #D4AF37' : 'none'
        }}
        transition={{ duration: 0.4 }}
        className="w-4 h-4 rounded-full border-2 bg-bg-main flex items-center justify-center"
      >
        <motion.div
          animate={{
            scale: isInView ? 1 : 0
          }}
          className="w-1.5 h-1.5 rounded-full bg-bg-main"
        />
      </motion.div>
    </div>
  );
}

export default function Sectors() {
  const sectionRef = useRef<HTMLElement>(null);

  // Track scroll position of the sectors list container
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"]
  });

  const sectors = [
    { 
      name: 'Lo Espejo', 
      desc: 'Alta conectividad operativa',
      detail: 'Conexión inmediata a Autopista Central y Vespucio Sur. Eje logístico e industrial clave de la Región Metropolitana.'
    },
    { 
      name: 'Quinta Normal', 
      desc: 'Ubicación urbana estratégica',
      detail: 'Excelente conectividad de transporte, consolidación comercial y alto potencial para desarrollo residencial y bodegaje de última milla.'
    },
    { 
      name: 'San Bernardo', 
      desc: 'Escala y proyección logística',
      detail: 'Grandes extensiones industriales, conectividad vial preferente y cercanía a centros logísticos estratégicos.'
    },
    { 
      name: 'Otros sectores', 
      desc: 'Selección según oportunidad',
      detail: 'Filtramos oportunidades a lo largo del país bajo estrictos criterios de plusvalía, accesos y viabilidad operativa.'
    },
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-28 bg-bg-main px-6 relative"
    >
      {/* Decorative subtle background map grids */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-0">
        <svg width="100%" height="100%">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Sticky Left Column with description */}
          <div className="lg:w-1/3 lg:sticky lg:top-36 h-fit">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            >
              <span className="text-[10px] text-brand-gold uppercase tracking-ultra-wide block mb-6">Territorio</span>
              <h2 className="text-display-l text-text-primary mb-8 leading-tight">
                Sectores que <br />
                <span className="font-editorial italic text-brand-gold">concentran valor.</span>
              </h2>
              <div className="w-16 h-[1px] bg-brand-gold/40 mb-10" />
              <p className="text-text-secondary font-light leading-relaxed mb-10 text-base">
                Trabajamos propiedades en comunas y zonas donde la ubicación cumple un rol clave en la decisión: conectividad, entorno, consolidación urbana o proyección futura.
              </p>
              
              <div className="flex items-center gap-4 text-brand-gold text-[10px] uppercase tracking-ultra-wide">
                <MapPin className="w-4 h-4" />
                <span>Enfoque territorial estratégico</span>
              </div>
            </motion.div>
          </div>

          {/* Timeline Right Column */}
          <div className="lg:w-2/3 relative pl-8 md:pl-12">
            
            {/* The Golden Scroll-Driven Line */}
            <div className="absolute left-[10px] top-4 bottom-4 w-[1px] bg-white/5 rounded">
              <motion.div
                style={{ 
                  scaleY: scrollYProgress, 
                  originY: 0,
                  willChange: 'transform'
                }}
                className="absolute top-0 left-0 w-full h-full bg-brand-gold rounded shadow-[0_0_15px_rgba(212,175,55,0.2)]"
              />
            </div>

            {/* Timeline Items */}
            <div className="flex flex-col gap-12">
              {sectors.map((sector, i) => (
                <div key={sector.name} className="relative flex flex-col md:flex-row gap-6">
                  
                  {/* Dynamic Timeline Node */}
                  <TimelineNode />

                  {/* Card content */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
                    className="group relative p-10 bg-surface-main/30 border border-white/5 hover:border-brand-gold/20 transition-all duration-700 rounded-[1px] flex-grow pl-10 backdrop-blur-sm"
                  >
                    {/* Glowing highlight */}
                    <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-brand-gold/0 group-hover:bg-brand-gold transition-all duration-700" />
                    
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[9px] text-brand-gold font-mono tracking-[0.3em] uppercase">Sector 0{i+1}</span>
                        <h3 className="text-2xl font-serif text-text-primary mt-2 mb-4 group-hover:text-brand-gold transition-colors duration-500">
                          {sector.name}
                        </h3>
                        <p className="text-xs uppercase tracking-widest text-text-muted mb-4">
                          {sector.desc}
                        </p>
                        <p className="text-sm text-text-secondary font-light leading-relaxed">
                          {sector.detail}
                        </p>
                      </div>
                      
                      <div className="text-brand-gold/0 group-hover:text-brand-gold -translate-x-4 group-hover:translate-x-0 transition-all duration-700 self-center hidden sm:block">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

