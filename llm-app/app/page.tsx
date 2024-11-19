'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Rocket, Zap, Shield, Send, ArrowRight, Code, Brain, MessageSquare } from 'lucide-react'

const SimpleChatInterface = () => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage = {
      id: Date.now(),
      text: input,
      sender: 'user'
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: `You said: ${input}. How can I help you today?`,
        sender: 'ai'
      }
      setMessages(prev => [...prev, aiResponse])
    }, 1000)
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`flex ${
              message.sender === 'user' 
                ? 'justify-end' 
                : 'justify-start'
            }`}
          >
            <div 
              className={`
                max-w-xl p-4 rounded-2xl 
                ${message.sender === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-800 text-gray-100'
                }
              `}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-6 bg-gray-800 border-t border-gray-700">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Message your AI companion..."
            className="flex-1 p-3 bg-gray-700 text-white rounded-full placeholder-gray-400"
          />
          <button 
            onClick={handleSendMessage}
            className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

const AILandingPage = () => {
  const [isAppLaunched, setIsAppLaunched] = useState(false)
  const [activeFeature, setActiveFeature] = useState(null)

  const features = [
    {
      icon: Zap,
      title: 'Multi-Model AI',
      description: 'Leverage multiple AI models in one platform.',
      color: 'bg-blue-600'
    },
    {
      icon: Shield,
      title: 'Secure Communication',
      description: 'Advanced encryption and privacy protection.',
      color: 'bg-green-600'
    },
    {
      icon: Code,
      title: 'Developer Friendly',
      description: 'Seamless integration with your workflows.',
      color: 'bg-purple-600',
      customClass: 'max-w-4xl' // Increased size for Developer Friendly
    },
    {
      icon: MessageSquare,
      title: 'Real-Time Messaging',
      description: 'Connect with AI instantly for real-time feedback.',
      color: 'bg-yellow-600'
    }
  ]

  if (isAppLaunched) {
    return <SimpleChatInterface />
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col text-gray-100 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900"
    >
      {/* Navigation */}
      <nav className="flex justify-between p-6 items-center bg-gray-800 bg-opacity-50">
        <div className="flex items-center space-x-2">
          <Brain className="text-blue-400" size={32} />
          <h1 className="text-2xl font-bold text-blue-300">AICompanion</h1>
        </div>
        <div className="space-x-4">
          <motion.button 
            onClick={() => setIsAppLaunched(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
          >
            Launch App
          </motion.button>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.div 
        className="flex-1 flex items-center justify-center p-12"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <div className="text-center max-w-3xl">
          <h2 className="text-5xl font-bold mb-6 text-blue-300">
            Unleash the Power of Multi-Model AI
          </h2>
          <p className="text-xl mb-10 text-gray-300">
            Seamlessly interact with multiple AI models, from GPT-4 to Claude, 
            all in one intuitive platform.
          </p>
          <motion.button
            onClick={() => setIsAppLaunched(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-6 py-3 rounded-full flex items-center mx-auto hover:bg-blue-700 transition-colors"
          >
            Get Started <ArrowRight className="ml-2" />
          </motion.button>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div 
        className="flex flex-col gap-6 items-center p-12 bg-gray-800 bg-opacity-50 overflow-y-scroll" // Make it scrollable
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            onHoverStart={() => setActiveFeature(feature)}
            onHoverEnd={() => setActiveFeature(null)}
            whileHover={{ scale: 1.05 }}
            className={`bg-gray-700 bg-opacity-50 p-6 rounded-xl shadow-lg text-center ${feature.customClass || 'max-w-xl'}`} // Conditional custom class
          >
            <motion.div
              animate={{ 
                scale: activeFeature === feature ? 1.1 : 1,
                color: activeFeature === feature ? 'white' : 'rgba(255,255,255,0.7)'
              }}
              transition={{ duration: 0.3 }}
              className={`mx-auto mb-4 p-3 rounded-full inline-block ${feature.color}`}
            >
              <feature.icon size={48} />
            </motion.div>
            <h3 className="text-xl font-bold mb-2 text-blue-300">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default AILandingPage
