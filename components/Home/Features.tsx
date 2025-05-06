import { Container } from '@/components/layout/Container';
import { CheckCircle2, Sparkles, Zap } from 'lucide-react';
import AnimatedText from '@/components/ui/animated-text';

const Features = () => {
  return (
    <section id="features" className="py-32 bg-gray-900 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05),transparent_50%)]" />
      <Container className="relative z-10">
        <div className="text-center mb-20">
          <AnimatedText>
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-600">
              Powerful Features
            </h2>
          </AnimatedText>
          <AnimatedText delay={0.2}>
            <p className="text-xl text-gray-400">
              Everything you need to create the perfect resume
            </p>
          </AnimatedText>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Sparkles className="h-6 w-6" />,
              title: 'AI-Powered Writing',
              description:
                'Get intelligent suggestions to improve your resume content and make it more impactful.',
              color: 'from-primary-500 to-primary-600',
            },
            {
              icon: <CheckCircle2 className="h-6 w-6" />,
              title: 'ATS Optimization',
              description:
                'Ensure your resume passes through Applicant Tracking Systems with our optimization tools.',
              color: 'from-secondary-500 to-secondary-600',
            },
            {
              icon: <Zap className="h-6 w-6" />,
              title: 'Quick Generation',
              description:
                'Create professional resumes in minutes with our easy-to-use templates and tools.',
              color: 'from-purple-500 to-purple-600',
            },
          ].map((feature, index) => (
            <AnimatedText key={index} delay={0.4 + index * 0.2}>
              <div className="group p-8 rounded-2xl bg-gray-800/50 hover:bg-gray-800 transition-all duration-300 border border-gray-700/50">
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 text-white`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </AnimatedText>
          ))}
        </div>
      </Container>
    </section>
  );
};

export { Features };
