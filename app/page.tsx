'use client';

import Header from '@/components/layout/Header';
import { Hero } from '@/components/Home/Hero';
import { Features } from '@/components/Home/Features';
import { HowItWorks } from '@/components/Home/HowItWorks';
import { Testimonials } from '@/components/Home/Testimonials';
import { Pricing } from '@/components/Home/Pricing';
import { Faqs } from '@/components/Home/Faqs';
import { Cta } from '@/components/Home/Cta';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-950 text-white">
      {/* Navigation */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Pricing Section */}
      <Pricing />

      {/* FAQ Section */}
      <Faqs />

      {/* CTA Section */}
      <Cta />

      {/* Footer */}
      <Footer />
    </main>
  );
}
