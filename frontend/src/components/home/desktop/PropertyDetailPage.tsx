import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, MessageSquare, Shield, Check, Activity, Compass, Award, Tag } from 'lucide-react';
import type { Property } from '../../../types/property';
import MagneticButton from './MagneticButton';
import { fetchPropertyById } from '../../../services/api';

interface PropertyDetailPageProps {
  propertyId: number;
  onBack: () => void;
}

export default function PropertyDetailPage({ propertyId, onBack }: PropertyDetailPageProps) {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    fetchPropertyById(propertyId)
      .then((data) => {
        if (isMounted) {
          setProperty(data);
          setActiveImageIndex(0);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Error al cargar la propiedad');
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [propertyId]);
  
  // WhatsApp redirect link builder
  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!property) return;
    const brokerPhone = '56912345678'; // Target broker phone number
    const baseText = `Hola Buenos Vientos, me interesa recibir más información sobre el activo ${property.code} (${property.title}) ubicado en ${property.comuna}.`;
    const detailsText = name 
      ? ` Mi nombre es ${name}${company ? ` y represento a la empresa ${company}` : ''}.` 
      : '';
    const contactText = email ? ` Mi correo de contacto es ${email}.` : '';
    
    const message = encodeURIComponent(`${baseText}${detailsText}${contactText}`);
    window.open(`https://wa.me/${brokerPhone}?text=${message}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-main flex flex-col items-center justify-center pt-36 pb-28">
        <div className="w-12 h-12 border-2 border-brand-gold/20 border-t-brand-gold animate-spin rounded-full mb-6" />
        <span className="text-[10px] uppercase tracking-ultra-wide text-text-muted font-mono font-medium animate-pulse">
          Solicitando especificaciones del activo...
        </span>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-bg-main flex flex-col items-center justify-center pt-36 pb-28 px-8">
        <p className="text-sm text-brand-gold font-mono uppercase tracking-widest mb-4">Error de enlace</p>
        <p className="text-lg text-text-secondary font-light mb-8 max-w-md text-center">
          {error || 'No se pudo recuperar la información del activo.'}
        </p>
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-3 text-text-muted hover:text-brand-gold transition-colors duration-300 uppercase tracking-widest text-[10px] font-mono group"
        >
          <span>[ Volver al Catálogo ]</span>
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-main pt-36 pb-28 px-8 md:px-16 relative">
      <div className="absolute inset-0 pointer-events-none opacity-[0.01] -z-10">
        <div className="absolute top-[30%] left-[20%] w-[300px] h-[300px] rounded-full bg-brand-gold/10 blur-[90px]" />
      </div>

      <div className="max-w-[1280px] mx-auto relative z-10">
        
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-3 text-text-muted hover:text-brand-gold transition-colors duration-300 uppercase tracking-widest text-[10px] font-mono mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>[ Volver al Catálogo ]</span>
        </button>

        {/* Heading */}
        <div className="mb-12">
          <div className="flex items-center gap-3 text-xs text-brand-gold uppercase tracking-[0.25em] font-mono font-semibold mb-3">
            <span>{property.type}</span>
            <span className="w-1.5 h-[1px] bg-brand-gold/40" />
            <span className="font-serif italic text-sm normal-case font-medium">{property.code}</span>
          </div>
          
          <h1 className="font-serif text-3xl md:text-5xl text-text-primary leading-tight max-w-4xl tracking-tight mb-4">
            {property.title}
          </h1>

          <div className="flex items-center text-xs text-text-muted uppercase tracking-widest font-mono">
            <MapPin className="w-4 h-4 mr-1.5 text-brand-gold" />
            <span>{property.sector}, {property.comuna} · Chile</span>
          </div>
        </div>

        {/* Grid Split: Visuals & Specs vs Form */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Left Column: Visuals, Commentary and Tech Specs */}
          <div className="w-full lg:w-2/3 flex flex-col gap-12">
            
            {/* Gallery Pager */}
            <div className="flex flex-col gap-4">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-main shadow-2xl">
                <motion.div
                  key={activeImageIndex}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 bg-cover bg-center img-luxury"
                  style={{ backgroundImage: `url('${property.images[activeImageIndex]}')` }}
                />
                
                {/* Visual gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-main/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 right-6 bg-bg-main/80 backdrop-blur-sm text-text-muted text-[10px] tracking-widest font-mono px-3.5 py-1.5 border border-white/5">
                  FOTO {activeImageIndex + 1} / {property.images.length}
                </div>
              </div>

              {/* Thumbnails */}
              {property.images.length > 1 && (
                <div className="flex gap-4">
                  {property.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-28 aspect-[16/9] overflow-hidden border transition-all duration-300 ${
                        activeImageIndex === idx 
                          ? 'border-brand-gold bg-brand-gold/10' 
                          : 'border-white/5 opacity-50 hover:opacity-80'
                      }`}
                    >
                      <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('${img}')` }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* High-end Editorial Curator Comment block */}
            {property.curatorComment && (
              <div className="py-10 border-t border-b border-white/5 my-4 relative">
                <div className="absolute top-4 left-6 text-brand-gold/10 text-7xl font-serif font-semibold pointer-events-none select-none">
                  “
                </div>
                <blockquote className="font-editorial italic text-2xl md:text-3xl text-brand-gold leading-relaxed max-w-3xl pl-12 text-glow-gold">
                  {property.curatorComment}
                </blockquote>
                <div className="text-right mt-6 pr-6">
                  <span className="text-[9px] uppercase tracking-ultra-wide text-text-muted font-mono font-medium block">Anotación del Curador</span>
                  <span className="text-[8px] uppercase tracking-[0.3em] text-white/40 block">Buenos Vientos Portfolio</span>
                </div>
              </div>
            )}

            {/* Description Text */}
            <div className="flex flex-col gap-6">
              <h3 className="font-serif text-xl text-text-primary uppercase tracking-widest">Resumen General</h3>
              <p className="text-text-secondary text-sm md:text-base font-light leading-relaxed whitespace-pre-line pr-4">
                {property.description}
              </p>
            </div>

            {/* Specifications Grid - High Density AAA */}
            <div className="flex flex-col gap-8 pt-8">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-[10px] text-brand-gold uppercase tracking-[0.4em] font-light">Especificaciones Técnicas</span>
                <div className="w-12 h-[1px] bg-brand-gold/20" />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Metric: Price */}
                <div className="p-6 border border-white/5 bg-surface-main/20 backdrop-blur-sm group hover:border-brand-gold/20 transition-all duration-500">
                  <div className="flex items-center justify-between mb-4">
                    <Tag className="w-3.5 h-3.5 text-brand-gold/60" />
                    <span className="text-[8px] uppercase tracking-widest text-text-muted font-mono">VALOR</span>
                  </div>
                  <h4 className="text-xl font-serif text-text-primary group-hover:text-brand-gold transition-colors">{property.priceUF.toLocaleString('es-CL')} UF</h4>
                  <p className="text-[9px] text-text-muted mt-1 font-mono">${property.priceCLP.toLocaleString('es-CL')} CLP</p>
                </div>

                {/* Metric: Area */}
                <div className="p-6 border border-white/5 bg-surface-main/20 backdrop-blur-sm group hover:border-brand-gold/20 transition-all duration-500">
                  <div className="flex items-center justify-between mb-4">
                    <Activity className="w-3.5 h-3.5 text-brand-gold/60" />
                    <span className="text-[8px] uppercase tracking-widest text-text-muted font-mono">SUPERFICIE</span>
                  </div>
                  <h4 className="text-xl font-serif text-text-primary group-hover:text-brand-gold transition-colors">{property.builtArea} m²</h4>
                  <p className="text-[9px] text-text-muted mt-1 font-mono">Construidos</p>
                </div>

                {/* Metric: Location */}
                <div className="p-6 border border-white/5 bg-surface-main/20 backdrop-blur-sm group hover:border-brand-gold/20 transition-all duration-500">
                  <div className="flex items-center justify-between mb-4">
                    <Compass className="w-3.5 h-3.5 text-brand-gold/60" />
                    <span className="text-[8px] uppercase tracking-widest text-text-muted font-mono">COMUNA</span>
                  </div>
                  <h4 className="text-xl font-serif text-text-primary group-hover:text-brand-gold transition-colors">{property.comuna}</h4>
                  <p className="text-[9px] text-text-muted mt-1 font-mono">Región Metropolitana</p>
                </div>

                {/* Metric: ID */}
                <div className="p-6 border border-white/5 bg-surface-main/20 backdrop-blur-sm group hover:border-brand-gold/20 transition-all duration-500">
                  <div className="flex items-center justify-between mb-4">
                    <Award className="w-3.5 h-3.5 text-brand-gold/60" />
                    <span className="text-[8px] uppercase tracking-widest text-text-muted font-mono">CÓDIGO</span>
                  </div>
                  <h4 className="text-xl font-serif text-text-primary group-hover:text-brand-gold transition-colors">{property.code}</h4>
                  <p className="text-[9px] text-text-muted mt-1 font-mono">Activo Seleccionado</p>
                </div>
              </div>
            </div>

            {/* Features lists */}
            {property.features.length > 0 && (
              <div className="flex flex-col gap-6 pt-6">
                <h3 className="font-serif text-xl text-text-primary uppercase tracking-widest">Atributos y Equipamiento</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {property.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 border border-white/5 bg-surface-main/10 backdrop-blur-sm">
                      <div className="w-5 h-5 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold mt-0.5 flex-shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs md:text-sm text-text-secondary font-light leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Lead Contact Form */}
          <aside className="w-full lg:w-1/3 lg:sticky lg:top-36">
            <div className="surface-portfolio p-8 rounded-none border border-white/5 flex flex-col gap-8">
              <div>
                <span className="text-[9px] text-brand-gold uppercase tracking-[0.3em] font-mono block mb-1">
                  Contacto Directo
                </span>
                <h3 className="font-serif text-2xl text-text-primary tracking-tight">
                  Solicitar Información
                </h3>
              </div>
              
              <div className="w-full h-[1px] bg-white/5" />

              <form onSubmit={handleWhatsAppSend} className="flex flex-col gap-5">
                
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name-input" className="text-[9px] uppercase tracking-widest text-text-muted font-mono">Nombre Completo</label>
                  <input
                    id="name-input"
                    type="text"
                    required
                    placeholder="Ej. Roberto Muñoz"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-bg-main/50 border border-white/5 py-2.5 px-4 text-xs text-text-primary focus:border-brand-gold/50 focus:outline-none rounded-none"
                  />
                </div>

                {/* Company */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="company-input" className="text-[9px] uppercase tracking-widest text-text-muted font-mono">Empresa / Organización</label>
                  <input
                    id="company-input"
                    type="text"
                    placeholder="Ej. Logística Central SA"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="bg-bg-main/50 border border-white/5 py-2.5 px-4 text-xs text-text-primary focus:border-brand-gold/50 focus:outline-none rounded-none"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email-input" className="text-[9px] uppercase tracking-widest text-text-muted font-mono">Correo Electrónico</label>
                  <input
                    id="email-input"
                    type="email"
                    required
                    placeholder="Ej. r.munoz@empresa.cl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-bg-main/50 border border-white/5 py-2.5 px-4 text-xs text-text-primary focus:border-brand-gold/50 focus:outline-none rounded-none"
                  />
                </div>

                {/* Lead context summary message */}
                <div className="p-4 border border-white/5 bg-bg-main/40 text-[11px] text-text-muted font-light leading-normal rounded-none">
                  Al enviar la solicitud, se generará una plantilla de mensaje automática para contactar directamente a nuestro broker vía **WhatsApp**.
                </div>

                 {/* Submit button */}
                <MagneticButton
                  type="submit"
                  className="w-full py-4 bg-brand-gold text-bg-main text-xs uppercase tracking-[0.25em] font-semibold hover:bg-brand-gold-soft transition-colors duration-300 flex items-center justify-center gap-3 shadow-[0_4px_20px_rgba(212,175,55,0.15)] rounded-none"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Contactar Broker</span>
                </MagneticButton>

              </form>

              <div className="flex items-center gap-3 text-[10px] text-text-muted justify-center border-t border-white/5 pt-6">
                <Shield className="w-4 h-4 text-brand-gold/60" />
                <span className="font-mono">Asesoría Directa sin intermediarios</span>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
