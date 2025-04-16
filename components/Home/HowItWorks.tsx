import React from 'react';
import { Container } from '../layout/Container';

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-32 bg-gray-950 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05),transparent_50%)]" />
      <Container className="relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-600">
            How It Works
          </h2>
          <p className="text-xl text-gray-400">
            Create your perfect resume in just a few steps
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              step: '1',
              title: 'Sign Up',
              description: 'Create your free account',
            },
            {
              step: '2',
              title: 'Input Details',
              description: 'Add your work experience and skills',
            },
            {
              step: '3',
              title: 'AI Enhancement',
              description: 'Get AI-powered suggestions',
            },
            {
              step: '4',
              title: 'Download',
              description: 'Export your professional resume',
            },
          ].map((item) => (
            <div key={item.step} className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl font-bold shadow-[0_0_20px_rgba(59,130,246,0.3)] group-hover:scale-110 transition-transform duration-300">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                {item.title}
              </h3>
              <p className="text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export { HowItWorks };
