import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Shield, Award, Landmark, Check } from 'lucide-react';
import React, { useRef } from 'react';

interface Agent {
  name: string;
  role: string;
  specialty: string;
  description: string;
  imageUrl: string;
  email: string;
}

const agents: Agent[] = [
  {
    name: 'Beatriz Cornejo',
    role: 'Fundadora & Agente Premium',
    specialty: 'Activos Industriales & Logística de Alta Gama',
    description: 'Una profesional en el rubro inmobiliario industrial con vasta experiencia en el sector, destacada por su capacidad para entender y atender las necesidades tanto de empresas como de clientes con altos estándares de servicio. Su enfoque está orientado a brindar soluciones eficientes y personalizadas, combinando un profundo conocimiento del mercado inmobiliario con una atención detallada en cada transacción. Su habilidad para negociar y gestionar propiedades industriales asegura resultados óptimos para sus clientes, mientras mantiene una ética de trabajo impecable y una gran capacidad para adaptarse a las demandas cambiantes del mercado.',
    imageUrl: '/agente-premium.png',
    email: 'beatriz@buenosvientos.cl'
  }
];

const principles = [
  {
    title: 'Confidencialidad Absoluta',
    desc: 'Sabemos lo sensible que es el movimiento corporativo e inmobiliario. Manejamos la información con el más estricto sigilo, protegiendo las intenciones comerciales de nuestros clientes en todo momento.',
    icon: <Shield className="w-5 h-5" />
  },
  {
    title: 'Curaduría Editorial',
    desc: 'No coleccionamos propiedades genéricas. Seleccionamos rigurosamente activos comerciales e industriales de alta gama que posean ventajas estructurales, logísticas y de diseño indiscutibles.',
    icon: <Award className="w-5 h-5" />
  },
  {
    title: 'Rigor Técnico y Legal',
    desc: 'Auditamos cada propiedad. Analizamos la factibilidad técnica (energía trifásica, portones, resistencia de losas) y la regularización municipal para evitar demoras operativas o problemas legales.',
    icon: <Landmark className="w-5 h-5" />
  }
];

export default function AboutPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  return (
    <div className="bg-bg-main min-h-screen text-text-secondary selection:bg-brand-gold/30 selection:text-white antialiased overflow-x-hidden">
      
      {/* Banner / Hero Section - Cinematic Entrance */}
      <section className="relative pt-48 pb-32 px-8 md:px-20 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-gold/5 via-transparent to-transparent opacity-70 pointer-events-none" />
        
        <div className="max-w-[1440px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            className="flex flex-col items-center text-center"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[1px] bg-brand-gold/30" />
              <span className="text-brand-gold font-editorial text-[10px] sm:text-xs tracking-ultra-wide uppercase">
                Buenos Vientos Broker Boutique
              </span>
              <div className="w-12 h-[1px] bg-brand-gold/30" />
            </div>
            
            <h1 className="text-display-l md:text-hero text-text-primary mb-10 leading-[0.95] max-w-5xl">
              Nuestra Visión <br />
              <span className="font-editorial italic text-brand-gold">Inmobiliaria.</span>
            </h1>

            <p className="text-lg md:text-xl text-text-muted font-light max-w-2xl mx-auto leading-relaxed border-l border-brand-gold/10 pl-8 md:pl-0 md:border-none">
              "Curaduría de activos estratégicos donde el valor trasciende el metraje."
            </p>
          </motion.div>
        </div>

        {/* Floating background typography */}
        <div className="absolute top-[60%] left-[-5%] text-[15vw] font-serif text-white/[0.01] pointer-events-none select-none">
          ESTRATEGIA
        </div>
      </section>

      {/* Narrative Section - Asymmetric Layout */}
      <section className="py-32 px-8 md:px-20 relative border-b border-white/5">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-32 items-center">
          
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 1.05 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
              className="relative aspect-[4/5] rounded-[1px] overflow-hidden surface-portfolio"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center img-luxury"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-main/60 via-transparent to-transparent opacity-80" />
            </motion.div>
            
            {/* Decorative frame accent */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 border-r border-b border-brand-gold/20 -z-10" />
          </div>

          <div className="lg:col-span-6 flex flex-col gap-10">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            >
              <h2 className="text-display-l text-text-primary mb-8 leading-tight">
                La Excelencia como <br />
                <span className="font-editorial italic text-brand-gold">Estándar.</span>
              </h2>
              <div className="w-16 h-[1px] bg-brand-gold/40 mb-10" />
              
              <div className="space-y-8 text-text-secondary font-light leading-relaxed text-base md:text-lg">
                <p>
                  Buenos Vientos nació de la necesidad de redefinir el corretaje de propiedades comerciales e industriales en Chile. Lejos de la automatización masiva, decidimos enfocarnos en la <strong className="text-text-primary font-medium">exclusividad y la profundidad técnica</strong>.
                </p>
                <p>
                  Como broker boutique, cada activo —oficina, bodega o terreno— pasa por un exigente filtro. Garantizamos activos que no solo satisfacen metros cuadrados, sino que potencian la rentabilidad de su negocio.
                </p>
                <p>
                  Detrás de cada transacción de alta gama hay una decisión trascendental. Nuestra respuesta es una consultoría personalizada basada en datos duros y discreción absoluta.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Principles Section - Vertical Timeline Narrative */}
      <section ref={sectionRef} className="py-32 bg-bg-alt px-8 md:px-20 border-b border-white/5 relative">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          <div className="lg:col-span-4 lg:sticky lg:top-48 h-fit">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <span className="text-[10px] text-brand-gold uppercase tracking-ultra-wide block mb-6">Metodología</span>
              <h2 className="text-display-l text-text-primary mb-8 leading-tight">Nuestros <br /> Pilares.</h2>
              <p className="text-text-muted font-light leading-relaxed">
                Los principios inquebrantables bajo los cuales estructuramos cada asesoría estratégica.
              </p>
            </motion.div>
          </div>

          <div className="lg:col-span-8 relative pl-12 md:pl-16">
            {/* The Golden Progress Line */}
            <div className="absolute left-[10px] top-4 bottom-4 w-[1px] bg-white/5">
              <motion.div
                style={{ 
                  scaleY: scrollYProgress, 
                  originY: 0
                }}
                className="absolute top-0 left-0 w-full h-full bg-brand-gold shadow-[0_0_15px_rgba(212,175,55,0.2)]"
              />
            </div>

            <div className="flex flex-col gap-24">
              {principles.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.2, delay: i * 0.1, ease: [0.19, 1, 0.22, 1] }}
                  className="relative group"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-[54px] md:-left-[60px] top-2">
                    <div className="w-5 h-5 rounded-full border border-brand-gold/30 bg-bg-main flex items-center justify-center transition-all duration-700 group-hover:border-brand-gold group-hover:scale-125">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-gold/20 group-hover:bg-brand-gold transition-colors" />
                    </div>
                  </div>

                  <div className="max-w-2xl">
                    <div className="flex items-center gap-4 mb-4 text-brand-gold">
                      {p.icon}
                      <span className="text-[10px] font-mono tracking-widest uppercase">Pilar 0{i+1}</span>
                    </div>
                    <h3 className="text-2xl font-serif text-text-primary mb-6 group-hover:text-brand-gold transition-colors duration-500">
                      {p.title}
                    </h3>
                    <p className="text-lg text-text-secondary font-light leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section - Elite Overlap Layout */}
      <section className="py-32 px-8 md:px-20 relative">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-display-l text-text-primary mb-6">La Mente <span className="font-editorial italic text-brand-gold">Curadora.</span></h2>
              <div className="w-16 h-[1px] bg-brand-gold/40 mx-auto" />
            </motion.div>
          </div>

          <div className="flex justify-center">
            {agents.map((agent, index) => (
              <div key={index} className="grid grid-cols-1 lg:grid-cols-12 items-center gap-0 relative group max-w-6xl w-full">
                
                {/* Image Background Layer */}
                <div className="lg:col-span-7 relative z-0">
                  <motion.div
                    initial={{ opacity: 0, scale: 1.05 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5 }}
                    className="relative aspect-[16/10] overflow-hidden surface-portfolio"
                  >
                    <img 
                      src={agent.imageUrl} 
                      alt={agent.name} 
                      className="w-full h-full object-cover img-luxury" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-bg-main/90" />
                  </motion.div>
                </div>

                {/* Text Content - Floating Glass Overlap */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
                  className="lg:col-span-6 lg:col-start-7 lg:-ml-24 z-10 surface-portfolio p-10 md:p-14 border border-white/5 backdrop-blur-3xl shadow-[0_48px_100px_-24px_rgba(0,0,0,0.8)] relative"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none rotate-12">
                    <Landmark className="w-32 h-32 text-white" />
                  </div>

                  <span className="text-[10px] uppercase tracking-[0.4em] text-brand-gold block mb-2">
                    {agent.role}
                  </span>
                  
                  <h3 className="text-3xl font-serif text-text-primary mb-6">
                    {agent.name}
                  </h3>
                  
                  <p className="text-sm font-editorial text-brand-gold-soft tracking-editorial mb-8 italic text-glow-gold">
                    Especialidad: {agent.specialty}
                  </p>
                  
                  <p className="text-base text-text-secondary font-light leading-relaxed mb-10">
                    {agent.description}
                  </p>
                  
                  <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <span className="text-xs font-mono text-text-muted">{agent.email}</span>
                    <a 
                      href={`mailto:${agent.email}`} 
                      className="btn-editorial group"
                    >
                      <span className="flex items-center gap-3">
                        Contactar Directamente <Mail className="w-3.5 h-3.5" />
                      </span>
                      <div className="btn-line" />
                    </a>
                  </div>

                  {/* Rotating Authority Seal Overlay */}
                  <div className="absolute -top-12 -right-12 hidden xl:block">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                      className="w-28 h-28 relative flex items-center justify-center opacity-40"
                    >
                      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                        <defs>
                          <path id="sealPath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
                        </defs>
                        <text className="text-[8px] uppercase tracking-[0.2em] fill-brand-gold font-light">
                          <textPath xlinkHref="#sealPath">
                            Buenos Vientos Broker • Criterio • Confianza •
                          </textPath>
                        </text>
                      </svg>
                      <span className="text-[10px] font-serif text-brand-gold">BVB</span>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
