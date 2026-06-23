import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import Header from './Header';
import Hero from './Hero';
import CuratorStatement from './CuratorStatement';
import Categories from './Categories';
import FeaturedProperties from './FeaturedProperties';
import Sectors from './Sectors';
import Services from './Services';
import Storytelling from './Storytelling';
import CTAFinal from './CTAFinal';
import Footer from './Footer';
import ScrollRevealWrapper from './ScrollRevealWrapper';
import AuthorityMetrics from './AuthorityMetrics';
import PropertiesPortal from './PropertiesPortal';
import PropertyDetailPage from './PropertyDetailPage';

export default function HomeDesktop() {
  const [view, setView] = useState<'home' | 'portal' | 'detail'>('home');
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);
  const [preFilters, setPreFilters] = useState<any>({});

  useEffect(() => {
    // Initialize Lenis for smooth scrolling (AAA Standard)
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleNavigate = (newView: 'home' | 'portal' | 'detail', filters: any = {}) => {
    setView(newView);
    setPreFilters(filters);
    if (newView !== 'detail') {
      setSelectedPropertyId(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProperty = (id: number) => {
    setSelectedPropertyId(id);
    setView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-bg-main min-h-screen font-sans selection:bg-brand-gold/30 selection:text-white text-text-secondary overflow-x-hidden antialiased">
      <Header currentView={view} onNavigate={handleNavigate} />
      
      <main className="flex flex-col gap-0">
        {view === 'home' && (
          <>
            <Hero />
            
            {/* AAA Narrative Integration */}
            <ScrollRevealWrapper>
              <CuratorStatement />
            </ScrollRevealWrapper>

            <ScrollRevealWrapper>
              <FeaturedProperties 
                onViewAll={() => handleNavigate('portal')} 
                onSelectProperty={handleSelectProperty} 
              />
            </ScrollRevealWrapper>

            <ScrollRevealWrapper>
              <Categories 
                onSelectCategory={(type) => handleNavigate('portal', { type })} 
              />
            </ScrollRevealWrapper>

            <ScrollRevealWrapper>
              <Sectors 
                onSelectSector={(comuna) => handleNavigate('portal', comuna === 'Todos' ? {} : { comuna })} 
              />
            </ScrollRevealWrapper>

            <ScrollRevealWrapper>
              <AuthorityMetrics />
            </ScrollRevealWrapper>

            <ScrollRevealWrapper>
              <Services />
            </ScrollRevealWrapper>

            <ScrollRevealWrapper>
              <Storytelling />
            </ScrollRevealWrapper>

            <ScrollRevealWrapper>
              <CTAFinal />
            </ScrollRevealWrapper>
          </>
        )}

        {view === 'portal' && (
          <PropertiesPortal 
            onSelectProperty={handleSelectProperty} 
            preFilters={preFilters} 
          />
        )}

        {view === 'detail' && selectedPropertyId !== null && (
          <PropertyDetailPage 
            propertyId={selectedPropertyId} 
            onBack={() => handleNavigate('portal')} 
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
