import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface HeaderProps {
  currentView: 'home' | 'portal' | 'detail';
  onNavigate: (view: 'home' | 'portal' | 'detail', preFilters?: any) => void;
}

export default function Header({ currentView, onNavigate }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', type: 'home' as const },
    { name: 'Propiedades', type: 'portal' as const, filters: {} },
    { name: 'Venta', type: 'portal' as const, filters: { tag: 'Venta' } },
    { name: 'Arriendo', type: 'portal' as const, filters: { tag: 'Arriendo' } },
    { name: 'Servicios', href: '#services' },
    { name: 'Nosotros', href: '#about' },
  ];

  const handleNavLinkClick = (link: typeof navLinks[number]) => {
    if ('type' in link && link.type === 'portal') {
      onNavigate('portal', link.filters);
    } else if ('type' in link && link.type === 'home') {
      onNavigate('home');
    } else if ('href' in link && link.href) {
      if (currentView !== 'home') {
        onNavigate('home');
        // Let state change and layout render first before attempting scroll
        setTimeout(() => {
          const el = document.querySelector(link.href!);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300);
      } else {
        const el = document.querySelector(link.href);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

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
        <a 
          href="/" 
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home');
          }}
          className="group flex flex-col items-start space-y-0.5"
        >
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
          <div className="flex items-center space-x-10 mr-10">
            {navLinks.map((link, i) => (
              <button
                key={link.name}
                onClick={() => handleNavLinkClick(link)}
                className="relative text-[10px] uppercase tracking-ultra-wide text-text-primary/80 hover:text-brand-gold hover:tracking-[0.45em] transition-all duration-700 group bg-transparent border-none py-2 cursor-pointer font-semibold overflow-hidden"
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-brand-gold transition-all duration-700 ease-premium-out group-hover:w-full" />
              </button>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex items-center gap-8 pl-10 border-l border-white/10"
          >
            <a 
              href="https://wa.me/56912345678" 
              className="flex items-center gap-3 text-[10px] uppercase tracking-ultra-wide text-brand-gold hover:text-white transition-all duration-500 group font-semibold"
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
            className="lg:hidden fixed inset-0 bg-bg-main/90 z-40 flex flex-col items-center justify-center space-y-8 px-8"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ delay: i * 0.05 + 0.1, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleNavLinkClick(link);
                }}
                className="text-2xl font-serif tracking-[0.2em] text-text-primary hover:text-brand-gold transition-colors bg-transparent border-none cursor-pointer"
              >
                {link.name}
              </motion.button>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.5 }}
              className="pt-8 flex flex-col items-center gap-8 w-full"
            >
              <div className="h-[1px] w-12 bg-brand-gold/40" />
              <a 
                href="https://wa.me/56912345678"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-editorial flex items-center justify-center"
              >
                <span>Conversar</span>
                <div className="btn-line" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
