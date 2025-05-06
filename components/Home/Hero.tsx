import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/Container';
import Link from 'next/link';
import { ArrowRight, Sparkles, Star, Rocket, Shield } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import AnimatedText from '@/components/ui/animated-text';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_50%)]" />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedText>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-500/10 text-primary-400 mb-6">
              <Sparkles className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">
                AI-Powered Resume Builder
              </span>
            </div>
          </AnimatedText>

          <AnimatedText delay={0.2}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-600">
                Create Your Perfect
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400">
                Resume with AI
              </span>
            </h1>
          </AnimatedText>

          <AnimatedText delay={0.4}>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Let AI help you craft a professional resume that stands out. Get
              personalized suggestions and optimize your content for success.
            </p>
          </AnimatedText>

          <AnimatedText delay={0.6}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                className="bg-primary-500 hover:bg-primary-600"
                asChild
              >
                <Link href="/sign-up" className="flex items-center">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-500 text-primary-500 hover:bg-primary-500/10"
                asChild
              >
                <Link href="/#features" className="flex items-center">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </AnimatedText>

          <AnimatedText delay={0.8}>
            <div className="flex items-center justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center">
                <Rocket className="h-4 w-4 text-primary-400 mr-1" />
                <span>10,000+ Resumes Created</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-4 w-4 text-green-400 mr-1" />
                <span>ATS Optimized</span>
              </div>
            </div>
          </AnimatedText>
        </div>
      </Container>
    </section>
  );
};

export { Hero };
