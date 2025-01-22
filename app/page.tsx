'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Brain, Cpu, Globe2, Layers, MessageSquare, Zap } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import { useState, useEffect } from 'react';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main 
      className="flex min-h-screen flex-col bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/Gradient 5.jpg')" }}
    >
      {/* Navbar Section */}
      <motion.nav
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-2' : 'py-4'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={`w-full px-8 transition-all duration-300 ${
          scrolled ? 'bg-white/10 shadow-lg backdrop-blur-md' : 'bg-transparent'
        }`}>
          <div className="flex items-center justify-between py-3 max-w-[1920px] mx-auto">
            <motion.div
              className="text-white font-bold text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              AI Aggregator
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'Features', 'Pricing', 'Join'].map((item, index) => (
                <ScrollLink
                  key={item}
                  to={item.toLowerCase()}
                  smooth={true}
                  offset={-80}
                  className={`cursor-pointer relative group px-2 py-1`}
                >
                  <span className="relative z-10 text-white hover:text-cyan-200 transition-colors duration-200">
                    {item}
                  </span>
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                    whileHover={{ scaleX: 1 }}
                  />
                </ScrollLink>
              ))}
            </div>

            <div className="hidden md:flex items-center">
              <Link href="/app">
                <Button 
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white hover:from-cyan-500 hover:to-blue-600 shadow-lg hover:shadow-cyan-400/20 transition-all duration-200"
                >
                  Get Started
                </Button>
              </Link>
            </div>

            <button className="md:hidden text-white hover:text-cyan-200 transition-colors">
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        id="hero"
        className="relative pt-60 pb-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-30 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-6xl font-bold text-white mb-5 leading-tight">
            Simplify AI workflows with one unified solution
            </h1>
            <p className="text-lg text-white/90 mb-6 leading-relaxed">
              Seamlessly integrate GPT-4, Claude, PaLM, and more through our intelligent interface.
              Experience the future of AI with smart model selection and unified management.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/app">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white hover:from-cyan-500 hover:to-blue-600 px-8"
                >
                  Launch App
                </Button>
              </Link>
              <Link href="/app">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/50 text-white hover:bg-white/10 px-8"
                >
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
        className="py-24 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-white">Why Choose Our Platform?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="w-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 hover:from-cyan-500/20 hover:to-blue-500/20 transition-all duration-300 border-cyan-400/20 backdrop-blur-sm shadow-xl hover:shadow-cyan-400/20 group transform hover:-translate-y-1 hover:scale-105">
                  <div className="mb-4 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-cyan-50 group-hover:text-white transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-cyan-100/80 group-hover:text-white/90 transition-colors duration-300 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Pricing Plans Section */}
      <motion.section
        id="pricing"
        className="py-24"
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
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 backdrop-blur-sm border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <h3 className="text-2xl font-bold text-white mb-6">
                  {plan.name}
                </h3>
                <p className="text-4xl font-bold text-white mb-6">
                  {plan.price}
                </p>
                <ul className="text-white/80 space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center justify-center gap-3"
                    >
                      <span className="text-cyan-400">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/app">
                  <Button 
                    className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white hover:from-cyan-500 hover:to-blue-600"
                  >
                    Get Started
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Join Section */}
      <motion.section
        id="join"
        className="py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your AI Workflow?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
            Join innovative teams and developers who are building the future of AI-powered applications with our comprehensive platform.
          </p>
          <Link href="/app">
            <Button 
              size="lg" 
              className="font-semibold px-8 bg-gradient-to-r from-cyan-400 to-blue-500 text-white hover:from-cyan-500 hover:to-blue-600"
            >
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
    icon: <Brain className="w-10 h-10" />,
    title: 'Multiple Models',
    description:
      'Access all leading language models through a unified API. Switch between models instantly based on your needs.',
  },
  {
    icon: <Zap className="w-10 h-10" />,
    title: 'Smart Routing',
    description:
      'Let our AI select the perfect model for each task. Optimize for performance, cost, or specific requirements automatically.',
  },
  {
    icon: <MessageSquare className="w-10 h-10" />,
    title: 'Unified Chat Interface',
    description:
      'Enjoy a seamless chat experience across all models with advanced context management and history tracking.',
  },
  {
    icon: <Layers className="w-10 h-10" />,
    title: 'Cost Optimization',
    description:
      'Save resources with intelligent request routing. Our platform automatically selects the most cost-effective model for your needs.',
  },
  {
    icon: <Globe2 className="w-10 h-10" />,
    title: 'Global Availability',
    description:
      'Experience minimal latency with our distributed infrastructure. Deploy and scale your AI applications worldwide.',
  },
  {
    icon: <Cpu className="w-10 h-10" />,
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