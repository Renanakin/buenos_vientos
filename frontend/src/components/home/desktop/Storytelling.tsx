import { motion } from 'framer-motion';
import { Mail, Landmark } from 'lucide-react';

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

export default function Storytelling() {
  return (
    <section className="py-32 bg-bg-main px-8 md:px-20 border-b border-white/5 relative overflow-hidden">
      {/* Cinematic Background Atmosphere */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* Narrative Section - Asymmetric Layering */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-center mb-40">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            >
              <div className="flex items-center gap-4 mb-10">
                <span className="text-brand-gold font-editorial text-xs tracking-ultra-wide uppercase">
                  Filosofía de Selección
                </span>
                <div className="w-12 h-[1px] bg-brand-gold/30" />
              </div>
              
              <h2 className="text-display-l md:text-[4.5rem] text-text-primary mb-10 leading-[0.95] tracking-tight-hero">
                No acumulamos volumen. <br />
                <span className="text-brand-gold font-editorial italic text-glow-gold">Seleccionamos activos.</span>
              </h2>
              
              <div className="space-y-8 max-w-2xl">
                <p className="text-lg md:text-xl text-text-secondary font-light leading-relaxed">
                  En Buenos Vientos Broker operamos bajo una premisa: la excelencia reside en la precisión, no en la cantidad. Descartamos el catálogo masivo tradicional en favor de un portafolio rigurosamente curado.
                </p>
                
                <p className="text-base text-text-muted font-light leading-relaxed border-l border-brand-gold/20 pl-8">
                  Cada activo —desde plantas industriales estratégicas hasta oficinas corporativas de alto estándar— ha sido evaluado bajo criterios de plusvalía, infraestructura y proyección de negocios real.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 1.05 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
              className="relative aspect-[4/5] rounded-[1px] overflow-hidden surface-portfolio group"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center img-luxury group-hover:scale-110 transition-transform duration-[3s]"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-main/80 via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-10 left-10 right-10">
                <span className="text-[10px] uppercase tracking-ultra-wide text-brand-gold block mb-2 font-mono">BVB • Portfolio Curator</span>
                <span className="text-text-primary text-xl font-serif leading-tight block">Asesoría de precisión para decisiones trascendentales.</span>
              </div>
            </motion.div>
            
            {/* Rotating Authority Seal */}
            <div className="absolute -top-12 -right-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="w-32 h-32 relative flex items-center justify-center opacity-30"
              >
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                  <defs>
                    <path id="storySealPath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
                  </defs>
                  <text className="text-[7px] uppercase tracking-[0.2em] fill-brand-gold font-light">
                    <textPath xlinkHref="#storySealPath">
                      Buenos Vientos Broker • Criterio • Confianza •
                    </textPath>
                  </text>
                </svg>
                <span className="text-[10px] font-serif text-brand-gold">BVB</span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Founder Section - Integrated Layout */}
        <div className="mt-32">
          <div className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h3 className="text-display-l text-text-primary mb-6">Nuestra <span className="font-editorial italic text-brand-gold">Fundación.</span></h3>
              <div className="w-16 h-[1px] bg-brand-gold/40 mx-auto" />
            </motion.div>
          </div>

          <div className="flex justify-center">
            {agents.map((agent, index) => (
              <div key={index} className="grid grid-cols-1 lg:grid-cols-12 items-center gap-0 relative group max-w-5xl w-full">
                
                {/* Image Side */}
                <div className="lg:col-span-6 relative z-0">
                  <motion.div
                    initial={{ opacity: 0, scale: 1.05 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5 }}
                    className="relative aspect-[4/5] lg:aspect-auto lg:h-[600px] overflow-hidden surface-portfolio"
                  >
                    <img 
                      src={agent.imageUrl} 
                      alt={agent.name} 
                      className="w-full h-full object-cover img-luxury group-hover:scale-105 transition-transform duration-[2s]" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-bg-main/90" />
                  </motion.div>
                </div>

                {/* Text Side - Floating Overlap */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
                  className="lg:col-span-7 lg:col-start-6 lg:-ml-20 z-10 surface-portfolio p-10 md:p-14 border border-white/5 backdrop-blur-3xl shadow-2xl relative"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none rotate-12">
                    <Landmark className="w-32 h-32 text-white" />
                  </div>

                  <span className="text-[10px] uppercase tracking-ultra-wide text-brand-gold block mb-2 font-mono">
                    {agent.role}
                  </span>
                  
                  <h4 className="text-3xl font-serif text-text-primary mb-6">
                    {agent.name}
                  </h4>
                  
                  <p className="text-sm font-editorial text-brand-gold-soft tracking-editorial mb-8 italic text-glow-gold">
                    {agent.specialty}
                  </p>
                  
                  <p className="text-base text-text-secondary font-light leading-relaxed mb-10">
                    {agent.description}
                  </p>
                  
                  <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-widest text-text-muted mb-1">Contacto Directo</span>
                      <span className="text-xs font-mono text-text-primary">{agent.email}</span>
                    </div>
                    <a 
                      href={`mailto:${agent.email}`} 
                      className="btn-editorial group"
                    >
                      <span className="flex items-center gap-3">
                        Agendar Reunión <Mail className="w-4 h-4" />
                      </span>
                      <div className="btn-line" />
                    </a>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
