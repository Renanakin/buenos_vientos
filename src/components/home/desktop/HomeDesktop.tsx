import React from 'react';
import Header from './Header';
import Hero from './Hero';
import ValueProp from './ValueProp';
import Categories from './Categories';
import FeaturedProperties from './FeaturedProperties';
import Sectors from './Sectors';
import Services from './Services';
import Storytelling from './Storytelling';
import CTAFinal from './CTAFinal';
import Footer from './Footer';

export default function HomeDesktop() {
  return (
    <div className="bg-bg-main min-h-screen font-sans selection:bg-brand-accent selection:text-bg-main text-text-secondary-dark">
      <Header />
      <main>
        <Hero />
        <ValueProp />
        <Categories />
        <FeaturedProperties />
        <Sectors />
        <Services />
        <Storytelling />
        <CTAFinal />
      </main>
      <Footer />
    </div>
  );
}
