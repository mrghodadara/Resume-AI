import React from 'react';
import { Container } from '../layout/Container';
import AnimatedText from '@/components/ui/animated-text';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Software Engineer',
    image: '/testimonials/sarah.jpg',
    content:
      'ResumeAI helped me land my dream job at Google. The AI suggestions were spot-on and the ATS optimization was a game-changer.',
  },
  {
    name: 'Michael Chen',
    role: 'Product Manager',
    image: '/testimonials/michael.jpg',
    content:
      "I was skeptical at first, but ResumeAI's AI-powered writing suggestions significantly improved my resume. Got 3 interviews in the first week!",
  },
  {
    name: 'Emily Rodriguez',
    role: 'Marketing Director',
    image: '/testimonials/emily.jpg',
    content:
      "The quick generation feature saved me so much time. My resume looks professional and I've received multiple job offers.",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-32 bg-gray-900 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05),transparent_50%)]" />
      <Container className="relative z-10">
        <div className="text-center mb-20">
          <AnimatedText>
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-600">
              What Our Users Say
            </h2>
          </AnimatedText>
          <AnimatedText delay={0.2}>
            <p className="text-xl text-gray-400">
              Success stories from professionals who used ResumeAI
            </p>
          </AnimatedText>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimatedText key={index} delay={0.4 + index * 0.2}>
              <div className="p-8 rounded-2xl bg-gray-800/50 border border-gray-700/50">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-gray-700 mr-4 overflow-hidden">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300">{testimonial.content}</p>
              </div>
            </AnimatedText>
          ))}
        </div>
      </Container>
    </section>
  );
};

export { Testimonials };
