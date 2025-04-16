import { Container } from '@/components/layout/Container';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'How does the AI resume builder work?',
    answer:
      "Our AI analyzes your input and provides intelligent suggestions to improve your resume's content, formatting, and ATS compatibility. It uses advanced natural language processing to ensure your resume stands out.",
  },
  {
    question: 'Is my data secure?',
    answer:
      'Yes, we take data security seriously. All your information is encrypted and stored securely. We never share your data with third parties.',
  },
  {
    question: 'Can I customize my resume template?',
    answer:
      'Absolutely! We offer a variety of professional templates that you can customize to match your personal style and industry requirements.',
  },
  {
    question: 'Do you offer refunds?',
    answer:
      "Yes, we offer a 30-day money-back guarantee if you're not satisfied with our service.",
  },
];

const Faqs = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section id="faq" className="py-32 bg-gray-900 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05),transparent_50%)]" />
      <Container className="relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-600">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-400">
            Everything you need to know about ResumeAI
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-700/50 rounded-xl overflow-hidden"
            >
              <button
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-800/50 transition-colors"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <span className="text-lg font-medium text-white">
                  {faq.question}
                </span>
                {openFaq === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </button>
              {openFaq === index && (
                <div className="p-6 pt-0 text-gray-300">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export { Faqs };
