import { motion } from 'framer-motion';
import { Mail, Shield, Award, Landmark } from 'lucide-react';

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

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 bg-bg-main min-h-screen text-text-secondary">
      {/* Banner / Hero Section */}
      <section className="relative py-20 px-6 border-b border-border-subtle overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-gold/5 via-transparent to-transparent opacity-70 pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-brand-gold font-editorial text-sm tracking-editorial uppercase block mb-3">
              Buenos Vientos Broker Boutique
            </span>
            <h1 className="font-serif text-5xl md:text-7xl text-text-primary mb-6 tracking-tight-hero">
              Nuestra Historia & Compromiso
            </h1>
            <p className="text-lg text-brand-gold-soft font-editorial italic max-w-2xl mx-auto leading-relaxed">
              "Curaduría de activos estratégicos y asesoría inmobiliaria de alta gama"
            </p>
          </motion.div>
        </div>
      </section>

      {/* Storytelling & Mission */}
      <section className="py-24 px-6 border-b border-border-subtle">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="font-serif text-3xl md:text-4xl text-text-primary mb-6">
                  La Excelencia Inmobiliaria como Estándar
                </h2>
                <div className="w-16 h-[1px] bg-brand-gold mb-8" />
                
                <p className="text-base leading-relaxed mb-6 font-light">
                  Buenos Vientos nació de la necesidad de redefinir el corretaje de propiedades comerciales e industriales en Chile. Lejos de la automatización masiva de portafolios infinitos, decidimos enfocarnos en la **exclusividad, la profundidad del análisis técnico y la confianza a largo plazo**.
                </p>
                <p className="text-base leading-relaxed mb-6 font-light">
                  Como broker boutique, operamos con un catálogo sumamente selecto. Cada oficina, bodega y terreno que representamos pasa por un exigente filtro comercial, regulatorio y operativo. Esto nos permite garantizar a nuestros clientes activos que no solo satisfacen metros cuadrados, sino que potencian la productividad y rentabilidad de sus negocios.
                </p>
                <p className="text-base leading-relaxed font-light">
                  Entendemos que detrás de cada transacción inmobiliaria de alta gama se teje una decisión corporativa trascendental. Por eso, nuestra respuesta nunca es genérica: entregamos una consultoría personalizada basada en datos duros, discreción absoluta y soluciones llave en mano.
                </p>
              </motion.div>
            </div>

            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative aspect-video lg:aspect-[4/5] rounded overflow-hidden shadow-2xl border border-white/5"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center img-luxury"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-main to-transparent opacity-60" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values / Pillars */}
      <section className="py-24 bg-bg-alt px-6 border-b border-border-subtle">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-text-primary mb-4">Nuestros Pilares</h2>
            <p className="text-text-muted font-light max-w-xl mx-auto">
              Los principios inquebrantables bajo los cuales estructuramos cada asesoría y corretaje comercial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="surface-portfolio p-8 rounded-lg border border-white/5 hover:border-brand-gold/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif text-text-primary mb-4">Confidencialidad Absoluta</h3>
              <p className="text-sm leading-relaxed text-text-secondary font-light">
                Sabemos lo sensible que es el movimiento corporativo e inmobiliario. Manejamos la información con el más estricto sigilo, protegiendo las intenciones comerciales de nuestros clientes en todo momento.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="surface-portfolio p-8 rounded-lg border border-white/5 hover:border-brand-gold/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-6">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif text-text-primary mb-4">Curaduría Editorial</h3>
              <p className="text-sm leading-relaxed text-text-secondary font-light">
                No coleccionamos propiedades genéricas. Seleccionamos rigurosamente activos comerciales e industriales de alta gama que posean ventajas estructurales, logísticas y de diseño indiscutibles.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="surface-portfolio p-8 rounded-lg border border-white/5 hover:border-brand-gold/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-6">
                <Landmark className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif text-text-primary mb-4">Rigor Técnico y Legal</h3>
              <p className="text-sm leading-relaxed text-text-secondary font-light">
                Auditamos cada propiedad. Analizamos la factibilidad técnica (energía trifásica, portones, resistencia de losas) y la regularización municipal para evitar demoras operativas o problemas legales.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meet the Advisors */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-text-primary mb-4">Nuestros Asesores</h2>
            <p className="text-text-muted font-editorial italic text-lg max-w-xl mx-auto">
              Profesionales especializados comprometidos con el éxito de tu portafolio patrimonial e industrial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {agents.map((agent, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
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
                  
                  <h3 className="text-xl font-serif text-text-primary mb-3">
                    {agent.name}
                  </h3>
                  
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
                    Contactar <Mail className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
