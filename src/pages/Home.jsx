// ============================================
// src/pages/Home.jsx
// ============================================
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Carousel from '../components/Carousel'
import Card from '../components/Card'
import Accordion from '../components/Accordion'

const slides = [
  { 
    title: 'Enterprise-Grade Solutions', 
    content: 'Our platforms deliver institutional reliability with scalable architecture designed for long-term operational success.' 
  },
  { 
    title: 'Adaptive Infrastructure', 
    content: 'From attendance systems to inventory management, our modular solutions evolve alongside your organizational requirements.' 
  },
  { 
    title: 'Professional Standards', 
    content: 'Engineered with precision, tested rigorously, deployed with comprehensive support.' 
  }
]

const values = [
  { 
    icon: '🛡️', 
    title: 'Integrity', 
    content: 'We maintain unwavering commitment to quality and ethical business practices throughout every project lifecycle.' 
  },
  { 
    icon: '🔒', 
    title: 'Security', 
    content: 'Robust systems with continuous monitoring and proactive threat management ensure your operations remain protected.' 
  },
  { 
    icon: '⚔️', 
    title: 'Excellence', 
    content: 'Mastery in software engineering, delivering solutions that exceed industry standards and client expectations.' 
  }
]

export default function Home() {
  const location = useLocation()

  useEffect(() => {
    document.getElementById('main')?.classList.add('bg-home')
    return () => document.getElementById('main')?.classList.remove('bg-home')
  }, [location])

  return (
    <div 
      id="main" 
      className="p-8 md:p-16 bg-gradient-to-br from-primary via-secondary to-primary min-h-full"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-bone via-gold to-bone mb-6 drop-shadow-2xl">
            NaN Coda
          </h1>
          <div className="flex items-center justify-center gap-4 text-gold">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold"></div>
            <p className="text-xl md:text-2xl font-light tracking-wider">Precision. Reliability. Excellence.</p>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold"></div>
          </div>
        </div>

        <div className="mb-20">
          <Carousel slides={slides} />
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="bg-gradient-to-br from-secondary to-accent/20 backdrop-blur-sm border border-accent/30 rounded-2xl p-8 shadow-2xl hover:shadow-accent/20 transition-all duration-500 hover:-translate-y-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-gold to-crimson rounded-full"></div>
              <h2 className="text-3xl font-bold text-bone">About Us</h2>
            </div>
            
            <p className="text-text-secondary mb-6 leading-relaxed">
              <strong className="text-gold">NaN Coda</strong> is dedicated to creating scalable, 
              enterprise-grade systems that empower organizations to achieve operational excellence 
              through innovative software solutions.
            </p>
            <p className="text-text-secondary mb-8 leading-relaxed">
              With expertise in custom software development, system integration, and digital transformation, 
              we deliver solutions that drive measurable business outcomes.
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-accent/30">
              <div className="group text-center p-6 bg-accent/10 rounded-xl hover:bg-accent/20 transition-all duration-300 cursor-pointer hover:scale-105">
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">🤝</div>
                <div className="font-semibold text-gold text-sm">Strategic Partnerships</div>
              </div>
              <div className="group text-center p-6 bg-accent/10 rounded-xl hover:bg-accent/20 transition-all duration-300 cursor-pointer hover:scale-105">
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">⚡</div>
                <div className="font-semibold text-gold text-sm">Innovative Solutions</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-secondary to-accent/20 backdrop-blur-sm border border-accent/30 rounded-2xl p-8 shadow-2xl hover:shadow-accent/20 transition-all duration-500 hover:-translate-y-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-gold to-crimson rounded-full"></div>
              <h2 className="text-3xl font-bold text-bone">Our Values</h2>
            </div>
            <Accordion items={values} />
          </div>
        </div>
      </div>
    </div>
  )
}