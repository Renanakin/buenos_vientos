import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Briefcase, Warehouse, Map } from 'lucide-react';

interface CategoriesProps {
  onSelectCategory: (type: string) => void;
}

export default function Categories({ onSelectCategory }: CategoriesProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const categories = [
    {
      id: 1,
      title: 'Residenciales',
      type: 'Casa',
      desc: 'Casas y departamentos seleccionados en sectores consolidados o exclusivos.',
      icon: <Home className="w-7 h-7" />,
      bgImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80'
    },
    {
      id: 2,
      title: 'Comerciales',
      type: 'Oficina',
      desc: 'Espacios con potencial para atención, renta o desarrollo de negocio.',
      icon: <Briefcase className="w-7 h-7" />,
      bgImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80'
    },
    {
      id: 3,
      title: 'Bodegas',
      type: 'Bodega',
      desc: 'Propiedades funcionales para operación, almacenamiento o logística.',
      icon: <Warehouse className="w-7 h-7" />,
      bgImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80'
    },
    {
      id: 4,
      title: 'Sitios y terrenos',
      type: 'Terreno',
      desc: 'Oportunidades para inversión, expansión o desarrollo futuro.',
      icon: <Map className="w-7 h-7" />,
      bgImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80'
    }
  ];

  // Container motion variants for staggered child animation
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring' as const, stiffness: 100, damping: 14 }
    }
  };

  return (
    <section className="py-28 bg-bg-main px-6 relative overflow-hidden transition-all duration-700">
      
      {/* Expanded Hover Background Images with Cross-fade */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Default subtle vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg-main via-transparent to-bg-main z-10" />
        <div className="absolute inset-0 bg-bg-main/60 z-10 transition-opacity duration-700" />
        
        <AnimatePresence>
          {categories.map((cat) => (
            hoveredId === cat.id && (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 0.18, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                className="absolute inset-0 bg-cover bg-center bg-no-repeat premium-image-filter"
                style={{ backgroundImage: `url('${cat.bgImage}')` }}
              />
            )
          ))}
        </AnimatePresence>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          className="mb-20"
        >
          <span className="text-[10px] text-brand-gold uppercase tracking-ultra-wide block mb-6">Categorías</span>
          <h2 className="text-display-l text-text-primary mb-4 leading-tight">
            Explora por tipo <br />
            <span className="font-editorial italic text-brand-gold">de oportunidad.</span>
          </h2>
          <div className="w-16 h-[1px] bg-brand-gold/40" />
        </motion.div>

        {/* Categories Grid with Staggered Entrance */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              variants={itemVariants}
              onMouseEnter={() => setHoveredId(cat.id)}
              onMouseLeave={() => setHoveredId(null)}
              whileHover={{ y: -10 }}
              onClick={() => onSelectCategory(cat.type)}
              className="group block text-left p-10 rounded-[1px] bg-surface-main/30 hover:bg-brand-gold transition-all duration-1000 ease-premium-out border border-white/5 hover:border-brand-gold relative overflow-hidden backdrop-blur-md cursor-pointer w-full"
            >
              {/* Inner glassmorphism glow */}
              <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

              {/* Icon with scale effect */}
              <motion.div 
                className="text-brand-gold group-hover:text-bg-main mb-10 transition-colors duration-1000 inline-block"
                whileHover={{ scale: 1.15 }}
                transition={{ type: 'spring', stiffness: 200, damping: 10 }}
              >
                {cat.icon}
              </motion.div>

              {/* Title with slightly delayed reveal */}
              <h3 className="text-xl font-serif text-text-primary group-hover:text-bg-main mb-6 uppercase tracking-widest transition-colors duration-1000">
                {cat.title}
              </h3>

              {/* Description text staggered */}
              <p className="text-sm text-text-secondary group-hover:text-bg-main/80 font-light leading-relaxed transition-colors duration-1000 font-sans">
                {cat.desc}
              </p>

              {/* Arrow Reveal */}
              <div className="mt-8 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-2 group-hover:translate-y-0">
                <div className="w-8 h-[1px] bg-bg-main/40" />
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
