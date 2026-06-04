'use client';

import SiteNav from '../components/site-nav';
import SiteFooter from '../components/site-footer';
import HeroSection from '../components/sections/hero-section';
import TrustBar from '../components/sections/trust-bar';
import FeaturesSection from '../components/sections/features-section';
import HowItWorksSection from '../components/sections/how-it-works-section';
import PricingSection from '../components/sections/pricing-section';
import DownloadSection from '../components/sections/download-section';

export default function LandingPage() {
  return (
    <>
      <SiteNav />
      <main>
        <HeroSection />
        <TrustBar />
        <FeaturesSection />
        <HowItWorksSection />
        <PricingSection />
        <DownloadSection />
      </main>
      <SiteFooter />
    </>
  );
}