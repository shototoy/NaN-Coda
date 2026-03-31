import React, { useState } from 'react'
import { Shield, Lock, Sword, Users, Zap, CheckCircle, ArrowRight } from 'lucide-react'
import Card from '../components/Card'
import HeroLogo from '../components/HeroLogo'

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
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 pb-10 pt-8 md:gap-10 md:pb-12 md:pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <div className="mb-4 inline-block rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">
            <p className="text-xs font-semibold text-emerald-500">Building the future of enterprise software</p>
          </div>

          <h1 className="mb-3 text-4xl font-black text-white md:text-5xl lg:text-6xl xl:text-7xl">NaN Coda</h1>
          <h2 className="mb-4 text-xl font-bold text-emerald-500 md:text-2xl lg:max-w-3xl lg:text-3xl xl:text-4xl">
            Precision. Reliability. Excellence.
          </h2>

          <p className="mx-auto mb-7 max-w-2xl text-base text-gray-400 md:text-lg lg:mx-0 lg:max-w-xl">
            Transforming visions into enterprise-grade digital solutions that scale
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <button className="flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-7 py-3 text-sm font-bold text-black hover:bg-emerald-600 md:px-8">
              Get Started
              <ArrowRight size={18} />
            </button>
            <a href="/products" className="flex items-center justify-center gap-2 rounded-lg border border-gray-700 px-7 py-3 text-sm font-bold text-white hover:border-gray-500 md:px-8">
              View Projects
            </a>
          </div>
        </div>

        <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
          <HeroLogo
            className="mb-2"
            sizeClassName="h-44 w-44 md:h-52 md:w-52 lg:h-60 lg:w-60 xl:h-64 xl:w-64"
          />
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-4 px-6 py-10 md:grid-cols-3 md:gap-5 md:py-12">
        {slides.map((slide, i) => (
          <Card key={i} variant="stat" stat={slide.stat} label={slide.label} title={slide.title} content={slide.content} />
        ))}
      </div>

      <div className="mx-auto max-w-7xl bg-gradient-to-b from-transparent to-emerald-500/5 px-6 py-10 md:py-12">
        <div className="mb-6 inline-block rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">
          <p className="text-xs text-emerald-500 font-semibold">About Us</p>
        </div>

        <h2 className="mb-5 text-3xl font-bold leading-tight text-white md:text-4xl">Enterprise Solutions Built for Scale</h2>

        <p className="mb-7 max-w-3xl text-base leading-relaxed text-gray-400 md:text-lg">
          <span className="text-emerald-500 font-bold">NaN Coda</span> is dedicated to creating scalable, enterprise-grade systems that empower organizations to achieve operational excellence through innovative software solutions.
        </p>

        <div className="mb-8 space-y-3">
          {services.map((service, i) => (
            <div key={i} className="flex items-center gap-3">
              <CheckCircle className="text-emerald-500 flex-shrink-0" size={20} />
              <p className="text-gray-300">{service}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 md:gap-5">
          <Card icon={Users} title="10+" content="Strategic Partners" />
          <Card icon={Zap} title="20+" content="Projects Delivered" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10 md:py-12">
        <h2 className="mb-7 text-3xl font-bold text-white md:text-4xl">Our Values</h2>

        <div className="space-y-3">
          {values.map((value, i) => {
            const Icon = value.icon
            const isActive = activeValue === i

            return (
              <button
                key={i}
                onClick={() => setActiveValue(isActive ? null : i)}
                className={`w-full rounded-lg border p-5 text-left transition-colors md:p-6 ${
                  isActive
                    ? 'bg-emerald-500/10 border-emerald-500/50'
                    : 'bg-gray-900/40 border-gray-700/50 hover:border-gray-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10 md:h-11 md:w-11">
                    <Icon className="text-emerald-500" size={22} />
                  </div>
                  <h3 className="flex-1 text-lg font-bold text-white md:text-xl">{value.title}</h3>
                </div>
                {isActive && <p className="mt-3 text-sm leading-relaxed text-gray-400">{value.content}</p>}
              </button>
            )
          })}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12 text-center md:py-14">
        <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">Ready to Transform Your Business?</h2>
        <p className="mb-8 text-base text-gray-400 md:text-lg">Let's build something exceptional together</p>
        <a href="/contact" className="inline-flex items-center gap-3 rounded-lg bg-emerald-500 px-8 py-3.5 font-bold text-black hover:bg-emerald-600">
          Start Your Project
          <ArrowRight size={20} />
        </a>
      </div>
    </main>
  )
}
