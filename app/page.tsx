'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Brain, Cpu, Globe2, Layers, MessageSquare, Zap } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-indigo-950 via-blue-900 to-blue-950">
      {/* Navbar Section */}
      <motion.nav
        className="bg-gradient-to-r from-blue-900 via-indigo-800 to-blue-700 p-2 mt-4 rounded-full mx-auto max-w-screen-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto flex justify-center gap-8 text-white text-md">
          <ScrollLink to="hero" smooth={true} offset={-80} className="cursor-pointer hover:text-cyan-200">
            Home
          </ScrollLink>
          <ScrollLink to="features" smooth={true} offset={-80} className="cursor-pointer hover:text-cyan-200">
            Features
          </ScrollLink>
          <ScrollLink to="pricing" smooth={true} offset={-80} className="cursor-pointer hover:text-cyan-200">
            Pricing
          </ScrollLink>
          <ScrollLink to="join" smooth={true} offset={-80} className="cursor-pointer hover:text-cyan-200">
            Join
          </ScrollLink>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        id="hero"
        className="relative bg-gradient-to-b from-indigo-950 via-blue-900 to-blue-950 pt-24 pb-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-30 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-cyan-200 to-blue-400 mb-6 leading-tight">
              Unify Your AI Experience with One Powerful Platform
            </h1>
            <p className="text-xl text-cyan-100 mb-8 leading-relaxed">
              Seamlessly integrate GPT-4, Claude, PaLM, and more through our intelligent interface.
              Experience the future of AI with smart model selection and unified management.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/app">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white px-8">
                  Launch App
                </Button>
              </Link>
              <Link href="/app">
                <Button size="lg" variant="outline" className="border-cyan-400 text-cyan-200 hover:bg-blue-900/50 px-8">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        id="features"
        className="py-24 bg-gradient-to-b from-blue-950 via-indigo-900 to-blue-900"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-cyan-100">Why Choose Our Platform?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="w-full"
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow border-blue-800/50 bg-gradient-to-br from-blue-900/90 to-indigo-900/90 backdrop-blur-sm">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-cyan-100">
                    {feature.title}
                  </h3>
                  <p className="text-cyan-200 leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Pricing Plans Section */}
      <motion.section
        id="pricing"
        className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-800 py-24"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-12">
            Pricing Plans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className="p-8 rounded-3xl shadow-lg bg-gradient-to-b from-blue-900 to-indigo-900"
              >
                <h3 className="text-2xl font-bold text-cyan-100 mb-6">
                  {plan.name}
                </h3>
                <p className="text-4xl font-bold text-white mb-6">
                  {plan.price}
                </p>
                <ul className="text-cyan-200 space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center justify-center gap-3"
                    >
                      <span className="text-green-400"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/app">
                  <button className="w-full py-3 px-6 rounded-xl text-lg font-medium text-white bg-blue-600 hover:bg-blue-700">
                    Get Started
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Join Section */}
      <motion.section
        id="join"
        className="bg-gradient-to-r from-indigo-900 via-blue-900 to-blue-800 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-cyan-100 mb-6">
            Ready to Transform Your AI Workflow?
          </h2>
          <p className="text-cyan-200 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
            Join innovative teams and developers who are building the future of AI-powered applications with our comprehensive platform.
          </p>
          <Link href="/app">
            <Button size="lg" className="font-semibold px-8 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 hover:from-blue-800 hover:via-blue-700 hover:to-indigo-800 text-cyan-50">
              Join Now
            </Button>
          </Link>
        </div>
      </motion.section>
    </main>
  );
}

const features = [
  {
    icon: <Brain className="w-10 h-10 text-cyan-400" />,
    title: 'Multiple Models',
    description:
      'Access all leading language models through a unified API. Switch between models instantly based on your needs.',
  },
  {
    icon: <Zap className="w-10 h-10 text-blue-400" />,
    title: 'Smart Routing',
    description:
      'Let our AI select the perfect model for each task. Optimize for performance, cost, or specific requirements automatically.',
  },
  {
    icon: <MessageSquare className="w-10 h-10 text-indigo-400" />,
    title: 'Unified Chat Interface',
    description:
      'Enjoy a seamless chat experience across all models with advanced context management and history tracking.',
  },
  {
    icon: <Layers className="w-10 h-10 text-cyan-400" />,
    title: 'Cost Optimization',
    description:
      'Save resources with intelligent request routing. Our platform automatically selects the most cost-effective model for your needs.',
  },
  {
    icon: <Globe2 className="w-10 h-10 text-blue-400" />,
    title: 'Global Availability',
    description:
      'Experience minimal latency with our distributed infrastructure. Deploy and scale your AI applications worldwide.',
  },
  {
    icon: <Cpu className="w-10 h-10 text-indigo-400" />,
    title: 'Advanced Analytics',
    description:
      'Monitor performance metrics, track costs, and optimize usage across all models with detailed real-time analytics.',
  },
];

const pricingPlans = [
  {
    name: 'Free',
    price: 'Free',
    features: ['1,000 API calls/month', 'Basic Support', 'Access to GPT-4 and Claude'],
  },
  {
    name: 'Basic',
    price: '$49/month',
    features: ['50,000 API calls/month', 'Priority Support', 'Access to GPT-4, Claude, and PaLM'],
  },
  {
    name: 'Premium',
    price: '$149/month',
    features: ['Unlimited API calls', '24/7 Premium Support', 'Access to All Models with Advanced Features'],
  },
];
