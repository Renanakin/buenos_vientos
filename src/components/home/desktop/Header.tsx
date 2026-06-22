import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Selección', href: '#properties' },
    { name: 'Criterio', href: '#statement' },
    { name: 'Servicios', href: '#services' },
    { name: 'Nosotros', href: '#about' },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-1000 ease-premium-out",
        isScrolled 
          ? "bg-bg-main/70 backdrop-blur-2xl border-b border-white/5 py-5" 
          : "bg-transparent py-10"
      )}
    >
      <div className="max-w-[1440px] mx-auto px-8 md:px-16 flex justify-between items-center">
        {/* Brand Identity - Minimalist Vertical Layout */}
        <a href="/" className="group flex flex-col items-start space-y-0.5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <span className="text-sm sm:text-lg font-serif tracking-[0.25em] text-brand-gold uppercase transition-all duration-700 group-hover:tracking-[0.3em] group-hover:text-white">
              Buenos Vientos
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
          >
            <span className="text-[7px] sm:text-[8px] tracking-[0.5em] text-text-muted uppercase font-light">
              Broker Boutique
            </span>
          </motion.div>
        </a>

        {/* Desktop Navigation - Staggered Reveal */}
        <nav className="hidden lg:flex items-center">
          <div className="flex items-center space-x-14 mr-14">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + (i * 0.1), duration: 0.8 }}
                className="relative text-[10px] uppercase tracking-ultra-wide text-text-primary/80 hover:text-brand-gold transition-colors duration-500 group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-gold/60 transition-all duration-700 ease-premium-out group-hover:w-full" />
              </motion.a>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex items-center gap-8 pl-14 border-l border-white/10"
          >
            <a 
              href="https://wa.me/56912345678" 
              className="flex items-center gap-3 text-[10px] uppercase tracking-ultra-wide text-brand-gold hover:text-white transition-all duration-500 group"
            >
              <MessageCircle className="w-3.5 h-3.5 transition-transform duration-500 group-hover:scale-125" />
              <span className="hidden xl:inline">Conversar</span>
            </a>
          </motion.div>
        </nav>

        {/* Mobile Toggle - AAA Style */}
        <button
          className="lg:hidden relative z-50 w-8 h-8 flex items-center justify-center text-text-primary hover:text-brand-gold transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu - Immersive Blur */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(40px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="lg:hidden fixed inset-0 bg-bg-main/90 z-40 flex flex-col items-center justify-center space-y-12 px-8"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ delay: i * 0.1 + 0.2, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                onClick={() => setMobileMenuOpen(false)}
                className="text-3xl font-serif tracking-[0.2em] text-text-primary hover:text-brand-gold transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.7 }}
              className="pt-16 flex flex-col items-center gap-8 w-full"
            >
              <div className="h-[1px] w-12 bg-brand-gold/40" />
              <button className="btn-editorial">
                <span>Contactar</span>
                <div className="btn-line" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
