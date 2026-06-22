import React, { useEffect } from 'react';
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

export default function HomeDesktop() {
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

  return (
    <div className="bg-bg-main min-h-screen font-sans selection:bg-brand-gold/30 selection:text-white text-text-secondary overflow-x-hidden antialiased">
      <Header />
      <main className="flex flex-col gap-0">
        <Hero />
        
        {/* AAA Narrative Integration */}
        <ScrollRevealWrapper>
          <CuratorStatement />
        </ScrollRevealWrapper>

        <ScrollRevealWrapper>
          <FeaturedProperties />
        </ScrollRevealWrapper>

        <ScrollRevealWrapper>
          <Categories />
        </ScrollRevealWrapper>

        <ScrollRevealWrapper>
          <Sectors />
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
      </main>
      <Footer />
    </div>
  );
}
