import { motion } from 'framer-motion';
import { Landmark, TrendingUp, Users, Building, Activity } from 'lucide-react';

interface ServiceItem {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
}

const servicesList: ServiceItem[] = [
  {
    number: '01',
    title: 'Corretaje de Propiedades Corporativas & Industriales',
    description: 'Gestión integral para la venta y arriendo de oficinas de alta gama, centros de distribución, naves logísticas y terrenos de gran escala. Implementamos campañas exclusivas de marketing con fotografía aérea, videos técnicos y segmentación de clientes con intención de compra real.',
    icon: <Landmark className="w-8 h-8" />,
    benefits: [
      'Segmentación de compradores calificados',
      'Producción multimedia corporativa premium',
      'Coordinación técnica de visitas presenciales',
      'Asesoría legal y contractual en firmas de escrituras'
    ]
  },
  {
    number: '02',
    title: 'Consultoría & Valorización de Portafolios',
    description: 'Ayudamos a family offices, inversionistas privados y empresas a entender el valor real de sus activos comerciales. Analizamos tasas de capitalización (Cap Rates), flujos de caja descontados (DCF), plusvalías comunales y comparables de mercado precisos.',
    icon: <TrendingUp className="w-8 h-8" />,
    benefits: [
      'Estudios de máxima y mejor utilización de suelos',
      'Informes detallados de valoración patrimonial',
      'Análisis de tasas de retorno e ingresos proyectados',
      'Re-negociaciones estratégicas de arriendos vigentes'
    ]
  },
  {
    number: '03',
    title: 'Representación de Inquilinos (Tenant Rep)',
    description: 'Búsqueda a medida y representación exclusiva para empresas que necesitan expandir, reubicar o consolidar sus oficinas corporativas o centros operativos. Evaluamos las opciones disponibles del mercado y negociamos concesiones favorables (periodos de gracia, aportes para habilitación).',
    icon: <Users className="w-8 h-8" />,
    benefits: [
      'Mapeo exhaustivo de ubicaciones idóneas',
      'Estudios comparativos de costos totales de arriendo',
      'Negociación de cláusulas críticas en contratos comerciales',
      'Acompañamiento en la entrega física del activo'
    ]
  },
  {
    number: '04',
    title: 'Proyectos Especiales & Build-to-Suit',
    description: 'Asesoramos en el desarrollo de bodegas o naves industriales diseñadas a la medida de la operación logística de la empresa (Build-to-Suit). Sincronizamos las exigencias del mandante con los desarrolladores inmobiliarios y propietarios de terrenos.',
    icon: <Building className="w-8 h-8" />,
    benefits: [
      'Búsqueda de suelos con zonificación industrial molesta/inofensiva',
      'Redacción de contratos de arriendo a largo plazo',
      'Supervisión técnica de especificaciones de edificación',
      'Coordinación legal de contratos llave en mano'
    ]
  },
  {
    number: '05',
    title: 'Auditoría Técnica Inmobiliaria',
    description: 'Evaluamos las condiciones físicas, técnicas y de infraestructura de las propiedades comerciales e industriales antes de su adquisición o arriendo. Evitamos sorpresas operativas analizando planos, empalmes eléctricos y zonificaciones.',
    icon: <Activity className="w-8 h-8" />,
    benefits: [
      'Revisión de empalmes eléctricos y capacidad trifásica (KVA)',
      'Medición de altura útil, resistencia de losas y radios de giro',
      'Análisis de permisos municipales y recepciones finales',
      'Verificación de sistemas contra incendios y seguridad perimetral'
    ]
  }
];

export default function ServicesPage() {
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
              Servicios Estratégicos Inmobiliarios
            </h1>
            <p className="text-lg text-brand-gold-soft font-editorial italic max-w-2xl mx-auto leading-relaxed">
              "Soluciones complejas ejecutadas con precisión técnica y valor de negocio"
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-16">
            {servicesList.map((service, index) => (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                className="surface-portfolio p-8 lg:p-12 rounded-lg border border-white/5 flex flex-col lg:flex-row gap-8 lg:gap-12 hover:border-brand-gold/20 transition-all duration-500 group"
              >
                {/* Left block: Number & Icon */}
                <div className="flex lg:flex-col justify-between items-start lg:w-1/6">
                  <span className="text-4xl lg:text-6xl font-serif text-brand-gold/20 font-bold group-hover:text-brand-gold/40 transition-colors">
                    {service.number}
                  </span>
                  <div className="text-brand-gold bg-brand-gold/5 p-4 rounded-md border border-brand-gold/10 group-hover:bg-brand-gold/10 group-hover:border-brand-gold/20 transition-all duration-500">
                    {service.icon}
                  </div>
                </div>

                {/* Center block: Description */}
                <div className="lg:w-1/2 flex flex-col justify-center">
                  <h2 className="text-2xl lg:text-3xl font-serif text-text-primary mb-4 leading-snug group-hover:text-brand-gold transition-colors">
                    {service.title}
                  </h2>
                  <p className="text-base text-text-secondary leading-relaxed font-light">
                    {service.description}
                  </p>
                </div>

                {/* Right block: Benefits Checklist */}
                <div className="lg:w-1/3 pt-6 lg:pt-0 lg:pl-8 lg:border-l border-white/5 flex flex-col justify-center">
                  <span className="text-xs uppercase tracking-ultra-wide text-brand-gold-soft font-semibold block mb-4">
                    ¿Qué incluye?
                  </span>
                  <ul className="space-y-3">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="text-sm text-text-secondary font-light flex items-start gap-3">
                        <span className="text-brand-gold mt-1">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="py-20 bg-bg-alt border-t border-b border-border-subtle px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-text-primary mb-6">
            ¿Necesitas una asesoría especializada?
          </h2>
          <p className="text-text-muted font-light mb-8 max-w-lg mx-auto">
            Cuéntanos las especificaciones de tu búsqueda o el activo que deseas comercializar. Nuestro equipo técnico responderá de manera inmediata.
          </p>
          <a 
            href="https://wa.me/56912345678"
            className="btn-editorial"
          >
            <span>Conversar con un especialista</span>
            <div className="btn-line" />
          </a>
        </div>
      </section>
    </div>
  );
}
