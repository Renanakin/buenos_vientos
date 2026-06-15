import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, MessageCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#' },
    { name: 'Propiedades', href: '#' },
    { name: 'Servicios', href: '#' },
    { name: 'Nosotros', href: '#' },
    { name: 'Contacto', href: '#' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 flex flex-col">
      {/* Top Bar (hides on scroll) */}
      <div 
        className={cn(
          "bg-bg-main border-b border-white/5 px-6 hidden lg:block transition-all duration-300 origin-top",
          isScrolled ? "h-0 py-0 opacity-0 overflow-hidden border-transparent" : "h-auto py-3 opacity-100"
        )}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs text-text-muted-dark">
          <div className="flex items-center space-x-10">
            <a href="tel:+56912345678" className="flex items-center hover:text-brand-accent transition-colors">
              <Phone className="w-3 h-3 mr-2" />
              +56 9 1234 5678
            </a>
            <a href="mailto:contacto@buenosvientos.cl" className="flex items-center hover:text-brand-accent transition-colors">
              <Mail className="w-3 h-3 mr-2" />
              contacto@buenosvientos.cl
            </a>
          </div>
          <div>
            <a href="#" className="flex items-center text-brand-accent hover:text-brand-accent-soft transition-colors font-medium">
              <MessageCircle className="w-4 h-4 mr-2" />
              Hablar por WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div 
        className={cn(
          "w-full transition-all duration-300 border-b",
          isScrolled 
            ? "bg-bg-alt/95 backdrop-blur-md border-white/10 py-3 shadow-lg" 
            : "bg-gradient-to-b from-bg-alt/80 to-transparent border-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex-shrink-0">
            <img 
              src="/images/logo_transparent.png" 
              alt="Buenos Vientos Propiedades" 
              className="h-10 md:h-14 object-contain rounded logo-gold-filter"
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-[13px] uppercase tracking-widest text-text-primary-dark hover:text-brand-accent transition-colors font-medium drop-shadow-md"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-text-primary-dark hover:text-brand-accent transition-colors drop-shadow-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-bg-main border-b border-white/10 p-6 flex flex-col space-y-6 shadow-2xl">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-base uppercase tracking-widest text-text-primary-dark hover:text-brand-accent transition-colors block border-b border-white/5 pb-4"
            >
              {link.name}
            </a>
          ))}
          <button className="mt-4 w-full btn-primary uppercase tracking-wider text-sm">
            Hablar por WhatsApp
          </button>
        </div>
      )}
    </header>
  );
}
