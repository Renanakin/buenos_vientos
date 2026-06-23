import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-bg-main pt-20 pb-10 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex flex-col mb-4">
              <span className="font-serif text-2xl font-bold text-text-primary-dark tracking-wide leading-none">Buenos Vientos</span>
              <span className="font-sans text-[0.75rem] text-brand-accent uppercase tracking-[0.2em] mt-1">Broker</span>
            </div>
            <p className="text-text-muted-dark text-sm font-light max-w-sm mt-6">
              Propiedades seleccionadas en sectores que marcan diferencia.
            </p>
          </div>
          
          <div>
            <h4 className="text-text-primary-dark font-semibold uppercase tracking-wider text-xs mb-6">Navegación</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-text-muted-dark hover:text-brand-accent text-sm transition-colors">Inicio</a></li>
              <li><a href="#" className="text-text-muted-dark hover:text-brand-accent text-sm transition-colors">Propiedades</a></li>
              <li><a href="#" className="text-text-muted-dark hover:text-brand-accent text-sm transition-colors">Venta</a></li>
              <li><a href="#" className="text-text-muted-dark hover:text-brand-accent text-sm transition-colors">Arriendo</a></li>
              <li><a href="#" className="text-text-muted-dark hover:text-brand-accent text-sm transition-colors">Nosotros</a></li>
              <li><a href="#" className="text-text-muted-dark hover:text-brand-accent text-sm transition-colors">Contacto</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-text-primary-dark font-semibold uppercase tracking-wider text-xs mb-6">Contacto</h4>
            <ul className="space-y-3 text-sm text-text-muted-dark font-light">
              <li>+56 9 1234 5678</li>
              <li>contacto@buenosvientos.cl</li>
              <li>
                <a href="#" className="text-brand-accent hover:text-brand-accent-soft transition-colors font-medium">
                  WhatsApp Directo
                </a>
              </li>
              <li className="pt-4 flex gap-4">
                <a href="#" className="hover:text-brand-accent transition-colors">Facebook</a>
                <a href="#" className="hover:text-brand-accent transition-colors">Instagram</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-muted-dark/60">
          <p>© {new Date().getFullYear()} Buenos Vientos Broker. Todos los derechos reservados.</p>
          <p>Diseño AAA+</p>
        </div>
      </div>
    </footer>
  );
}
