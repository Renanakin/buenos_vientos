import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, CheckCircle, Users } from 'lucide-react';

export default function ValueProp() {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Track scroll relative to the section for watermark parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Unique parallax speeds for each watermark number
  const watermarkY1 = useTransform(scrollYProgress, [0, 1], [-70, 70]);
  const watermarkY2 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const watermarkY3 = useTransform(scrollYProgress, [0, 1], [-100, 40]);

  const pillars = [
    {
      id: 1,
      number: "01",
      yTransform: watermarkY1,
      icon: <MapPin className="w-8 h-8 text-brand-accent mb-6" />,
      title: "Ubicación estratégica",
      description: "Seleccionamos propiedades en sectores donde la conectividad, el entorno y la proyección agregan valor real."
    },
    {
      id: 2,
      number: "02",
      yTransform: watermarkY2,
      icon: <CheckCircle className="w-8 h-8 text-brand-accent mb-6" />,
      title: "Propiedades seleccionadas",
      description: "Trabajamos una oferta diversa, pero siempre bajo un filtro claro de calidad, oportunidad y potencial."
    },
    {
      id: 3,
      number: "03",
      yTransform: watermarkY3,
      icon: <Users className="w-8 h-8 text-brand-accent mb-6" />,
      title: "Gestión cercana",
      description: "Acompañamos cada consulta con atención directa, coordinación de visitas y enfoque comercial."
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-28 bg-bg-alt px-6 border-b border-white/5 relative overflow-hidden"
    >
      {/* Decorative background element */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-brand-accent/10 blur-[120px]" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[40%] h-[40%] rounded-full bg-brand-primary-soft/10 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="font-serif text-3xl md:text-5xl text-text-primary-dark mb-6">
            Un broker con criterio comercial <br className="hidden md:block"/> y visión de oportunidad.
          </h2>
          <div className="w-24 h-1 bg-brand-accent mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {pillars.map((pillar, index) => (
            <motion.div 
              key={pillar.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.25 }}
              className="group relative p-8 rounded-lg bg-surface-main/30 border border-white/5 hover:border-brand-accent/30 hover:bg-surface-main/60 transition-all duration-500 hover:-translate-y-2 overflow-hidden min-h-[340px] flex flex-col justify-between"
            >
              {/* Parallax Watermark Number */}
              <motion.div
                style={{ y: pillar.yTransform, willChange: 'transform' }}
                className="absolute -right-6 -bottom-10 text-[10rem] md:text-[14rem] font-bold text-white/[0.012] select-none pointer-events-none font-sans group-hover:text-brand-accent/[0.018] transition-colors duration-500"
              >
                {pillar.number}
              </motion.div>

              <div className="relative z-10">
                <div className="transform transition-transform duration-500 group-hover:scale-110 group-hover:text-brand-accent-soft inline-block">
                  {pillar.icon}
                </div>
                
                {/* Horizontal Assembly Text: Title slides from left */}
                <div className="overflow-hidden mb-4">
                  <motion.h3 
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 80, damping: 12, delay: index * 0.2 + 0.1 }}
                    className="text-xl font-semibold text-text-primary-dark uppercase tracking-wide text-sm"
                  >
                    {pillar.title}
                  </motion.h3>
                </div>

                {/* Horizontal Assembly Text: Description slides from right */}
                <div className="overflow-hidden">
                  <motion.p 
                    initial={{ x: 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 80, damping: 12, delay: index * 0.2 + 0.3 }}
                    className="text-text-muted-dark font-light leading-relaxed text-sm md:text-base"
                  >
                    {pillar.description}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

