import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/Container';
import Link from 'next/link';
import { ArrowRight, Wand2 } from 'lucide-react';

const Cta = () => {
  return (
    <section className="py-32 relative overflow-hidden bg-gray-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05),transparent_50%)]" />
      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-500/10 text-primary-400 mb-6">
            <Wand2 className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">
              Ready to Transform Your Career?
            </span>
          </div>

          <h2 className="text-4xl font-bold mb-6 text-white">
            Create Your Perfect Resume Today
          </h2>

          <p className="text-xl mb-8 text-gray-400">
            Join thousands of professionals who have improved their job
            prospects with ResumeAI.
          </p>

          <Button
            size="lg"
            className="bg-primary-500 hover:bg-primary-600"
            asChild
          >
            <Link href="/sign-up" className="flex items-center">
              Get Started Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
};

export { Cta };
