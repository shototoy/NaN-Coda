import React, { useState } from 'react'
import { Shield, Lock, Sword, Users, Zap, CheckCircle, ArrowRight } from 'lucide-react'
import Card from '../components/Card'
import Carousel from '../components/Carousel'

export default function Home() {
  const [activeValue, setActiveValue] = useState(null)

  const slides = [
    {
      title: 'Enterprise-Grade Solutions',
      content: 'Our platforms deliver institutional reliability with scalable architecture designed for long-term operational success.',
      stat: '99.9%',
      label: 'Uptime'
    },
    {
      title: 'Adaptive Infrastructure',
      content: 'From attendance systems to inventory management, our modular solutions evolve alongside your organizational requirements.',
      stat: '10x',
      label: 'Faster'
    },
    {
      title: 'Professional Standards',
      content: 'Engineered with precision, tested rigorously, deployed with comprehensive support.',
      stat: '24/7',
      label: 'Support'
    }
  ]

  const values = [
    {
      icon: Shield,
      title: 'Integrity',
      content: 'We maintain unwavering commitment to quality and ethical business practices throughout every project lifecycle.'
    },
    {
      icon: Lock,
      title: 'Security',
      content: 'Robust systems with continuous monitoring and proactive threat management ensure your operations remain protected.'
    },
    {
      icon: Sword,
      title: 'Excellence',
      content: 'Mastery in software engineering, delivering solutions that exceed industry standards and client expectations.'
    }
  ]

  const services = ['Custom Software Development', 'System Integration', 'Digital Transformation', 'Cloud Architecture']

  return (
    <main className="bg-black">
      <div className="min-h-screen flex flex-col items-center justify-center">

          <img src="/favicon.svg" alt="NaN Coda" className="w-64 h-64" />


        <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
          <p className="text-xs text-emerald-500 font-semibold">Building the future of enterprise software</p>
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-white text-center mb-4">NaN Coda</h1>
        <h2 className="text-2xl md:text-5xl font-bold text-emerald-500 text-center mb-8">Precision. Reliability. Excellence.</h2>

        <p className="text-xl text-gray-400 text-center max-w-2xl mb-12">
          Transforming visions into enterprise-grade digital solutions that scale
        </p>

        <div className="flex flex-col md:flex-row gap-4 mb-16">
          <button className="flex items-center justify-center gap-2 bg-emerald-500 text-black font-bold py-3 px-8 rounded-lg hover:bg-emerald-600">
            Get Started
            <ArrowRight size={20} />
          </button>
          <a href="/products" className="flex items-center justify-center gap-2 border border-gray-700 text-white font-bold py-3 px-8 rounded-lg hover:border-gray-500">
            View Projects
          </a>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-6">
        {slides.map((slide, i) => (
          <Card key={i} variant="stat" stat={slide.stat} label={slide.label} title={slide.title} content={slide.content} />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 bg-gradient-to-b from-transparent to-emerald-500/5">
        <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-8">
          <p className="text-xs text-emerald-500 font-semibold">About Us</p>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">Enterprise Solutions Built for Scale</h2>

        <p className="text-lg text-gray-400 mb-8 leading-relaxed">
          <span className="text-emerald-500 font-bold">NaN Coda</span> is dedicated to creating scalable, enterprise-grade systems that empower organizations to achieve operational excellence through innovative software solutions.
        </p>

        <div className="space-y-4 mb-12">
          {services.map((service, i) => (
            <div key={i} className="flex items-center gap-3">
              <CheckCircle className="text-emerald-500 flex-shrink-0" size={20} />
              <p className="text-gray-300">{service}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card icon={Users} title="10+" content="Strategic Partners" />
          <Card icon={Zap} title="20+" content="Projects Delivered" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">Our Values</h2>

        <div className="space-y-4">
          {values.map((value, i) => {
            const Icon = value.icon
            const isActive = activeValue === i

            return (
              <button
                key={i}
                onClick={() => setActiveValue(isActive ? null : i)}
                className={`w-full text-left p-6 rounded-lg border transition-colors ${
                  isActive
                    ? 'bg-emerald-500/10 border-emerald-500/50'
                    : 'bg-gray-900/40 border-gray-700/50 hover:border-gray-600'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="text-emerald-500" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white flex-1">{value.title}</h3>
                </div>
                {isActive && <p className="text-gray-400 mt-4 text-sm">{value.content}</p>}
              </button>
            )
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Ready to Transform Your Business?</h2>
        <p className="text-xl text-gray-400 mb-12">Let's build something exceptional together</p>
        <a href="/contact" className="inline-flex items-center gap-3 bg-emerald-500 text-black font-bold py-4 px-10 rounded-lg hover:bg-emerald-600">
          Start Your Project
          <ArrowRight size={24} />
        </a>
      </div>
    </main>
  )
}