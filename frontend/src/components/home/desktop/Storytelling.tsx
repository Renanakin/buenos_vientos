import { motion } from 'framer-motion';

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
    name: 'Hector Teck',
    role: 'Fundador & Director General',
    specialty: 'Oficinas Corporativas & Activos Premium',
    description: 'Especialista en asesoría patrimonial y oficinas corporativas de alto nivel en distritos financieros clave. Su enfoque fusiona la precisión de la consultoría financiera con una rigurosa curaduría arquitectónica y de diseño.',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600',
    email: 'hector@buenosvientos.cl'
  },
  {
    name: 'María José Alessandri',
    role: 'Directora de Activos Industriales & Logística',
    specialty: 'Centros Logísticos & Bodegaje de Última Milla',
    description: 'Con amplia trayectoria en el sector logístico chileno, asesora a firmas logísticas y fondos de inversión en la compra y arriendo de bodegas de alta capacidad, evaluando requerimientos técnicos complejos como KVA de energía, accesos viales y alturas útiles.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
    email: 'mariajose@buenosvientos.cl'
  },
  {
    name: 'Andrés Silva',
    role: 'Consultor Senior de Inversiones',
    specialty: 'Terrenos Comerciales & Build-to-Suit',
    description: 'Experto en adquisición de suelos a gran escala, loteamientos industriales y negociaciones de contratos build-to-suit. Colabora de cerca con family offices y constructoras en el desarrollo y consolidación de proyectos inmobiliarios.',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600',
    email: 'andres@buenosvientos.cl'
  }
];

export default function Storytelling() {
  return (
    <section className="py-28 bg-bg-main px-6 border-b border-border-subtle relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Storytelling block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-24">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            >
              <span className="text-brand-gold font-editorial text-sm tracking-editorial uppercase block mb-3">
                Curaduría Inmobiliaria
              </span>
              <h2 className="font-serif text-display-l text-text-primary mb-8 leading-tight">
                No acumulamos volumen. <br />
                <span className="text-brand-gold-soft font-editorial italic">Seleccionamos activos estratégicos.</span>
              </h2>
              <div className="w-20 h-[1px] bg-brand-gold/40 mb-10" />

              <p className="text-body text-text-secondary mb-6 font-light leading-relaxed">
                En Buenos Vientos Broker operamos bajo una filosofía boutique clara: la excelencia reside en la precisión, no en la cantidad. Creemos firmemente que una propiedad corporativa o industrial no es solo un conjunto de medidas, sino el núcleo operativo, logístico y patrimonial de una compañía.
              </p>
              
              <p className="text-body text-text-secondary mb-6 font-light leading-relaxed">
                Por ello, descartamos el catálogo masivo tradicional en favor de un portafolio rigurosamente seleccionado. Cada activo —ya sea una oficina en planta libre en el corazón corporativo de la ciudad o un centro logístico con conectividad preferente a autopistas clave— ha sido evaluado bajo estrictos criterios de plusvalía, infraestructura y proyección de negocios.
              </p>

              <p className="text-body text-text-secondary font-light leading-relaxed">
                Ofrecemos un puente de confianza absoluto, discreción y soporte técnico de primer nivel en cada negociación, guiando a nuestros clientes institucionales y patrimoniales hacia decisiones inteligentes y estables en el tiempo.
              </p>
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
              className="relative aspect-[4/5] rounded overflow-hidden shadow-2xl border border-white/5 group"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center img-luxury"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-bg-main/10 to-transparent opacity-80" />
              <div className="absolute bottom-8 left-8 right-8">
                <span className="text-xs uppercase tracking-ultra-wide text-brand-gold block mb-1">Buenos Vientos Broker</span>
                <span className="text-text-primary text-lg font-serif">Asesoría boutique con visión de futuro</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Agents block */}
        <div className="mt-24">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-serif text-3xl md:text-4xl text-text-primary mb-4">Nuestros Asesores</h3>
              <p className="text-text-secondary font-editorial italic text-lg max-w-xl mx-auto">
                Especialistas dedicados a guiar negociaciones complejas con discreción, rigor técnico y cercanía comercial.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {agents.map((agent, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.19, 1, 0.22, 1] }}
                className="surface-portfolio p-8 rounded-lg border border-white/5 flex flex-col justify-between group hover:border-brand-gold/20 transition-all duration-500 hover:translate-y-[-4px]"
              >
                <div>
                  <div className="relative aspect-square rounded-md overflow-hidden mb-6 border border-white/5">
                    <img 
                      src={agent.imageUrl} 
                      alt={agent.name} 
                      className="w-full h-full object-cover img-luxury group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-main/50 to-transparent opacity-60" />
                  </div>
                  
                  <span className="text-[10px] uppercase tracking-ultra-wide text-brand-gold block mb-1">
                    {agent.role}
                  </span>
                  
                  <h4 className="text-xl font-serif text-text-primary mb-3">
                    {agent.name}
                  </h4>
                  
                  <p className="text-xs font-editorial text-brand-gold-soft tracking-editorial mb-4 italic">
                    Especialidad: {agent.specialty}
                  </p>
                  
                  <p className="text-sm text-text-secondary font-light leading-relaxed">
                    {agent.description}
                  </p>
                </div>
                
                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-mono text-text-muted">{agent.email}</span>
                  <a 
                    href={`mailto:${agent.email}`} 
                    className="text-xs uppercase tracking-ultra-wide text-brand-gold hover:text-brand-gold-soft transition-colors font-medium flex items-center gap-2"
                  >
                    Contactar <span>→</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
