import React from 'react';
import { Navbar } from '../components/Navbar';
import HomeSEO from '../components/HomeSEO';
import { Hero } from '../components/Hero';
import { HowItWorks } from '../components/HowItWorks';
import { Features } from '../components/Features';
import { Stats } from '../components/Stats';
import { Testimonials } from '../components/Testimonials';
import { CTABanner } from '../components/CTABanner';
import { Newsletter } from '../components/Newsletter';
import { Footer } from '../components/Footer';

const LandingHomePage: React.FC = () => {
  return (
    <>
      <Navbar />
      <HomeSEO />
      <Hero />
      <HowItWorks />
      <Features />
      <Stats />
      <Testimonials />
      <CTABanner />
      <Newsletter />
      <Footer />
    </>
  );
};

export default LandingHomePage;


