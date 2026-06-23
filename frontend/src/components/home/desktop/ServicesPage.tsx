import { motion, useScroll, useTransform } from 'framer-motion';
import { Landmark, TrendingUp, Users, Building, Activity, Check } from 'lucide-react';
import React, { useRef } from 'react';

interface ServiceItem {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
  image: string;
  ghostText: string;
}

const servicesList: ServiceItem[] = [
  {
    number: '01',
    title: 'Corretaje de Propiedades Corporativas & Industriales',
    description: 'Gestión integral para la venta y arriendo de oficinas de alta gama, centros de distribución y naves logísticas. Implementamos campañas exclusivas de marketing con segmentación técnica de inversionistas con intención de compra real.',
    icon: <Landmark className="w-6 h-6" />,
    benefits: [
      'Segmentación de compradores calificados',
      'Producción multimedia corporativa premium',
      'Coordinación técnica de visitas presenciales',
      'Asesoría legal y contractual experta'
    ],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80',
    ghostText: 'CORRETAJE'
  },
  {
    number: '02',
    title: 'Consultoría & Valorización de Portafolios',
    description: 'Ayudamos a family offices e inversionistas privados a entender el valor real de sus activos comerciales. Analizamos tasas de capitalización (Cap Rates), flujos de caja y comparables de mercado precisos para optimizar su patrimonio.',
    icon: <TrendingUp className="w-6 h-6" />,
    benefits: [
      'Estudios de mejor utilización de suelos',
      'Informes detallados de valoración patrimonial',
      'Análisis de tasas de retorno proyectadas',
      'Re-negociaciones estratégicas de arriendos'
    ],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80',
    ghostText: 'VALORIZACIÓN'
  },
  {
    number: '03',
    title: 'Representación de Inquilinos (Tenant Rep)',
    description: 'Búsqueda a medida y representación exclusiva para empresas que necesitan expandir o reubicar sus centros operativos. Evaluamos opciones y negociamos concesiones favorables para la estabilidad de su operación.',
    icon: <Users className="w-6 h-6" />,
    benefits: [
      'Mapeo exhaustivo de ubicaciones idóneas',
      'Estudios comparativos de costos totales',
      'Negociación de cláusulas críticas en contratos',
      'Acompañamiento en la entrega del activo'
    ],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80',
    ghostText: 'ESTRATEGIA'
  },
  {
    number: '04',
    title: 'Proyectos Especiales & Build-to-Suit',
    description: 'Asesoramos en el desarrollo de activos diseñados a la medida de la operación logística de su compañía. Sincronizamos las exigencias del mandante con desarrolladores inmobiliarios y propietarios de suelo.',
    icon: <Building className="w-6 h-6" />,
    benefits: [
      'Búsqueda de suelos con zonificación técnica',
      'Redacción de contratos a largo plazo',
      'Supervisión de especificaciones de edificación',
      'Coordinación de contratos llave en mano'
    ],
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80',
    ghostText: 'DESARROLLO'
  },
  {
    number: '05',
    title: 'Auditoría Técnica Inmobiliaria',
    description: 'Evaluamos las condiciones físicas e infraestructura de propiedades industriales antes de su adquisición. Evitamos sorpresas operativas analizando planos, empalmes eléctricos y zonificaciones municipales.',
    icon: <Activity className="w-6 h-6" />,
    benefits: [
      'Revisión de empalmes y capacidad trifásica',
      'Medición de altura útil y radios de giro',
      'Análisis de permisos y recepciones finales',
      'Verificación de seguridad y sistemas contra incendio'
    ],
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80',
    ghostText: 'AUDITORÍA'
  }
];

export default function ServicesPage() {
  return (
    <div className="bg-bg-main min-h-screen text-text-secondary selection:bg-brand-gold/30 selection:text-white antialiased overflow-x-hidden">
      
      {/* Banner / Hero Section - Cinematic Entrance */}
      <section className="relative pt-48 pb-32 px-8 md:px-20 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-gold/5 via-transparent to-transparent opacity-70 pointer-events-none" />
        
        <div className="max-w-[1440px] mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-12 h-[1px] bg-brand-gold/30" />
              <span className="text-brand-gold font-editorial text-[10px] sm:text-xs tracking-ultra-wide uppercase">
                Servicios Estratégicos
              </span>
              <div className="w-12 h-[1px] bg-brand-gold/30" />
            </div>
            
            <h1 className="text-display-l md:text-hero text-text-primary mb-10 leading-[0.95] max-w-5xl mx-auto">
              Operaciones de <br />
              <span className="font-editorial italic text-brand-gold text-glow-gold">Alta Gama.</span>
            </h1>

            <p className="text-lg md:text-xl text-text-muted font-light max-w-2xl mx-auto leading-relaxed italic">
              "Soluciones complejas ejecutadas con precisión técnica y visión de negocio."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Alternating Services List - Manifesto Style */}
      <section className="py-12">
        {servicesList.map((service, index) => (
          <ServiceRow key={service.number} service={service} index={index} />
        ))}
      </section>

      {/* CTA Bottom Banner */}
      <section className="py-32 bg-bg-alt border-t border-b border-white/5 px-8 md:px-20 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-serif text-white/[0.01] pointer-events-none select-none whitespace-nowrap">
          CONVERSEMOS
        </div>
        
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-display-l text-text-primary mb-8 leading-tight">
              ¿Requiere una asesoría <br /> <span className="font-editorial italic text-brand-gold">especializada?</span>
            </h2>
            <p className="text-text-secondary text-lg font-light mb-12 max-w-xl mx-auto leading-relaxed">
              Nuestro equipo técnico responderá de manera inmediata a las especificaciones de su búsqueda o activo.
            </p>
            <a 
              href="https://wa.me/56912345678"
              className="btn-editorial group"
            >
              <span className="relative z-10 transition-colors group-hover:text-brand-gold">Conversar con un Especialista</span>
              <div className="btn-line" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function ServiceRow({ service, index }: { service: ServiceItem; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 !== 0;

  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"]
  });

  const ghostX = useTransform(scrollYProgress, [0, 1], isEven ? [100, -100] : [-100, 100]);

  return (
    <div ref={rowRef} className="relative py-24 md:py-40 border-b border-white/5 overflow-hidden group">
      {/* Ghost Background Typography */}
      <motion.div 
        style={{ x: ghostX }}
        className={`absolute top-1/2 -translate-y-1/2 text-[18vw] font-serif text-white/[0.01] pointer-events-none select-none whitespace-nowrap z-0 ${isEven ? 'right-0' : 'left-0'}`}
      >
        {service.ghostText}
      </motion.div>

      <div className="max-w-[1440px] mx-auto px-8 md:px-20 relative z-10">
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}>
          
          {/* Visual Side */}
          <div className={`lg:col-span-6 relative ${isEven ? 'lg:order-2' : ''}`}>
            <motion.div
              initial={{ opacity: 0, scale: 1.05 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
              className="relative aspect-[4/3] rounded-[1px] overflow-hidden surface-portfolio"
            >
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-full object-cover img-luxury group-hover:scale-110 transition-transform duration-[2s]" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-main/60 via-transparent to-transparent opacity-80" />
              
              {/* Number Badge */}
              <div className="absolute top-8 left-8">
                <span className="text-4xl md:text-6xl font-serif text-brand-gold opacity-20 font-bold">
                  {service.number}
                </span>
              </div>
            </motion.div>
            
            {/* Structural accent */}
            <div className={`absolute -bottom-6 -right-6 w-24 h-24 border-brand-gold/10 -z-10 ${isEven ? 'border-l border-t' : 'border-r border-b'}`} />
          </div>

          {/* Content Side */}
          <div className="lg:col-span-6 flex flex-col gap-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            >
              <div className="flex items-center gap-4 mb-6 text-brand-gold">
                {service.icon}
                <div className="h-[1px] w-8 bg-brand-gold/30" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-serif text-text-primary mb-8 leading-snug group-hover:text-brand-gold transition-colors duration-700">
                {service.title}
              </h2>
              
              <p className="text-lg text-text-secondary font-light leading-relaxed mb-12">
                {service.description}
              </p>

              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-ultra-wide text-brand-gold-soft font-semibold block mb-6">
                  Dimensiones del Servicio
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                  {service.benefits.map((benefit, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + (i * 0.1) }}
                      className="flex items-start gap-4 group/item"
                    >
                      <div className="mt-1 w-4 h-4 rounded-full border border-brand-gold/20 flex items-center justify-center flex-shrink-0 group-hover/item:border-brand-gold transition-colors">
                        <Check className="w-2.5 h-2.5 text-brand-gold opacity-0 group-hover/item:opacity-100 transition-opacity" />
                      </div>
                      <span className="text-sm text-text-secondary font-light group-hover/item:text-text-primary transition-colors">
                        {benefit}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
