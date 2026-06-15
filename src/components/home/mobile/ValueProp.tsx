import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, CheckCircle, Users } from 'lucide-react';

export default function ValueProp() {
  const pillars = [
    {
      id: 1,
      icon: <MapPin className="w-8 h-8 text-brand-accent mb-6" />,
      title: "Ubicación estratégica",
      description: "Seleccionamos propiedades en sectores donde la conectividad, el entorno y la proyección agregan valor real."
    },
    {
      id: 2,
      icon: <CheckCircle className="w-8 h-8 text-brand-accent mb-6" />,
      title: "Propiedades seleccionadas",
      description: "Trabajamos una oferta diversa, pero siempre bajo un filtro claro de calidad, oportunidad y potencial."
    },
    {
      id: 3,
      icon: <Users className="w-8 h-8 text-brand-accent mb-6" />,
      title: "Gestión cercana",
      description: "Acompañamos cada consulta con atención directa, coordinación de visitas y enfoque comercial."
    }
  ];

  return (
    <section className="py-24 bg-bg-alt px-6 border-b border-white/5 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-brand-accent/10 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
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
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group p-8 rounded-lg bg-surface-main/30 border border-white/5 hover:border-brand-accent/30 hover:bg-surface-main/60 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="transform transition-transform duration-500 group-hover:scale-110 group-hover:text-brand-accent-soft">
                {pillar.icon}
              </div>
              <h3 className="text-xl font-semibold text-text-primary-dark mb-4 uppercase tracking-wide text-sm">{pillar.title}</h3>
              <p className="text-text-muted-dark font-light leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
