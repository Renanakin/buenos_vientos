import React from 'react';
import { Phone, Mail, MessageCircle } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="bg-bg-main border-b border-white/5 py-4 px-6 hidden lg:block">
      <div className="max-w-7xl mx-auto flex justify-between items-center text-sm text-text-muted-dark">
        <div className="flex items-center space-x-10">
          <a href="tel:+56912345678" className="flex items-center hover:text-brand-accent transition-colors">
            <Phone className="w-4 h-4 mr-3" />
            +56 9 1234 5678
          </a>
          <a href="mailto:contacto@buenosvientos.cl" className="flex items-center hover:text-brand-accent transition-colors">
            <Mail className="w-4 h-4 mr-3" />
            contacto@buenosvientos.cl
          </a>
        </div>
        <div>
          <a href="#" className="flex items-center text-brand-accent hover:text-brand-accent-soft transition-colors font-medium">
            <MessageCircle className="w-5 h-5 mr-3" />
            Hablar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
