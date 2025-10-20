import React, { useState } from 'react'
import { Package, Server, Cloud, Database, ArrowRight } from 'lucide-react'
import Card from '../components/Card'
import Carousel from '../components/Carousel'
import Lightbox from '../components/Lightbox'

export default function Products() {
  const [selectedImage, setSelectedImage] = useState(null)

  const products = [
    {
      id: 1,
      icon: Package,
      name: 'Student Attendance System',
      description: 'Smart attendance tracking with automated SMS notifications to parents. Real-time monitoring, absence alerts, and comprehensive reporting for schools.',
      features: ['SMS Notifications', 'Real-time Tracking', 'Parent Alerts', 'Absence Reports'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800'
    },
    {
      id: 2,
      icon: Server,
      name: 'Point of Sale System',
      description: 'Complete POS solution for retail and restaurants. Inventory management, sales analytics, payment processing, and multi-location support.',
      features: ['Payment Processing', 'Inventory Sync', 'Sales Analytics', 'Multi-Location'],
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800'
    },
    {
      id: 3,
      icon: Cloud,
      name: 'School Management System',
      description: 'Comprehensive educational management platform. Student records, grading, class scheduling, parent communication, and administrative tools.',
      features: ['Student Records', 'Grade Management', 'Schedule Planning', 'Parent Portal'],
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800'
    },
    {
      id: 4,
      icon: Database,
      name: 'Internal Digital Payroll',
      description: 'Internal wallet and salary management platform similar to GCash. Employee payroll, fund transfers, expense tracking, and financial reporting.',
      features: ['Digital Payroll', 'Employee Transfers', 'Fund Management', 'Financial Reports'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800'
    }
  ]

  const carouselSlides = [
    {
      render: () => (
        <div>
          <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">Featured Product</p>
          <h3 className="text-4xl font-bold text-emerald-500 mb-4">Attendance System Pro</h3>
          <p className="text-gray-300">Revolutionize workforce management with our flagship attendance solution</p>
        </div>
      )
    },
    {
      render: () => (
        <div>
          <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">New Release</p>
          <h3 className="text-4xl font-bold text-emerald-500 mb-4">Internal Digital Payroll</h3>
          <p className="text-gray-300">Advanced employee salary management and fund transfer capabilities</p>
        </div>
      )
    }
  ]

  return (
    <main className="bg-black">
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-8">
          <p className="text-xs text-emerald-500 font-semibold">Our Solutions</p>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Enterprise Products Built for Performance</h1>
        <p className="text-xl text-gray-400">Comprehensive software solutions designed to scale with your business needs</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 mb-20">
        <Carousel slides={carouselSlides} />
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20 space-y-12">
        {products.map((product) => {
          const Icon = product.icon
          return (
            <div key={product.id} className="bg-black border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition-colors">
              <button
                onClick={() => setSelectedImage(product.image)}
                className="w-full h-48 md:h-56 bg-gray-900 flex items-center justify-center hover:bg-gray-800"
              >
                <Icon className="text-emerald-500" size={48} />
              </button>

              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center">
                    <Icon className="text-emerald-500" size={24} />
                  </div>
                  <h2 className="text-3xl font-bold text-white">{product.name}</h2>
                </div>

                <p className="text-gray-400 mb-6 leading-relaxed">{product.description}</p>

                <div className="space-y-2 mb-8">
                  {product.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <p className="text-gray-300">{feature}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-800 pt-6 flex items-center justify-between">
                  <p className="text-xl font-bold text-emerald-500">Custom Pricing</p>
                  <a href="/contact" className="flex items-center gap-2 text-emerald-500 hover:text-emerald-400 font-semibold">
                    Learn More
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Need a Custom Solution?</h2>
        <p className="text-xl text-gray-400 mb-12">We build tailored software solutions to match your unique requirements</p>
        <a href="/contact" className="inline-flex items-center gap-3 bg-emerald-500 text-black font-bold py-4 px-10 rounded-lg hover:bg-emerald-600">
          Contact Us
          <ArrowRight size={24} />
        </a>
      </div>

      <Lightbox visible={!!selectedImage} imageUri={selectedImage} onClose={() => setSelectedImage(null)} />
    </main>
  )
}