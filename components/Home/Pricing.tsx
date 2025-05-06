import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/Container';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import AnimatedText from '@/components/ui/animated-text';

const pricingPlans = [
  {
    name: 'Free',
    price: '$0',
    features: [
      'Basic resume templates',
      'AI-powered suggestions',
      '1 resume download',
      'Community support',
    ],
  },
  {
    name: 'Pro',
    price: '$9.99',
    popular: true,
    features: [
      'All Free features',
      'Unlimited resumes',
      'ATS optimization',
      'Priority support',
      'Custom templates',
      'Export to PDF/Word',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: [
      'All Pro features',
      'Team collaboration',
      'Custom branding',
      'API access',
      'Dedicated support',
      'Advanced analytics',
    ],
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-32 bg-gray-950 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05),transparent_50%)]" />
      <Container className="relative z-10">
        <div className="text-center mb-20">
          <AnimatedText>
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-600">
              Simple, Transparent Pricing
            </h2>
          </AnimatedText>
          <AnimatedText delay={0.2}>
            <p className="text-xl text-gray-400">
              Choose the plan that's right for you
            </p>
          </AnimatedText>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <AnimatedText key={index} delay={0.4 + index * 0.2}>
              <div
                className={`p-8 rounded-2xl ${plan.popular
                    ? 'bg-primary-500/10 border-primary-500'
                    : 'bg-gray-800/50 border-gray-700/50'
                  } border relative`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-primary-500 text-white px-4 py-1 rounded-tl-lg rounded-br-lg text-sm">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-4 text-white">
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  {plan.price !== 'Custom' && (
                    <span className="text-gray-400">/month</span>
                  )}
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-gray-300"
                    >
                      <CheckCircle2 className="h-5 w-5 text-primary-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${plan.popular
                      ? 'bg-primary-500 hover:bg-primary-600'
                      : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  asChild
                >
                  <Link href="/sign-up">Get Started</Link>
                </Button>
              </div>
            </AnimatedText>
          ))}
        </div>
      </Container>
    </section>
  );
};

export { Pricing };
