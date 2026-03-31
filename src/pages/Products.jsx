import React, { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Carousel from '../components/Carousel'
import Lightbox from '../components/Lightbox'
import { products } from '../data/products'

export default function Products() {
  const [selectedImage, setSelectedImage] = useState(null)

  const carouselSlides = [
    {
      render: () => (
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gray-500 md:text-sm">Featured Product</p>
          <h3 className="mb-3 text-3xl font-bold text-emerald-500 md:text-4xl">School Information System</h3>
          <p className="max-w-xl text-sm text-gray-300 md:text-base">Unify enrollment, attendance, academic records, and parent communication in one campus platform</p>
        </div>
      )
    },
    {
      render: () => (
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gray-500 md:text-sm">New Release</p>
          <h3 className="mb-3 text-3xl font-bold text-emerald-500 md:text-4xl">PULSO</h3>
          <p className="max-w-xl text-sm text-gray-300 md:text-base">Barangay-ready touch terminal intake, service request tracking, and attendance support</p>
        </div>
      )
    }
  ]

  return (
    <main className="bg-black">
      <div className="mx-auto max-w-5xl px-6 pb-12 pt-16 text-center md:pb-14 md:pt-20">
        <div className="mb-6 inline-block rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">
          <p className="text-xs text-emerald-500 font-semibold">Our Solutions</p>
        </div>

        <h1 className="mb-3 text-3xl font-bold text-white md:text-4xl lg:text-5xl">Enterprise Products Built for Performance</h1>
        <p className="text-base text-gray-400 md:text-lg">Comprehensive software solutions designed to scale with your business needs</p>
      </div>

      <div className="mx-auto mb-14 max-w-7xl px-6 md:mb-16">
        <Carousel slides={carouselSlides} />
      </div>

      <div className="mx-auto grid max-w-7xl gap-6 px-6 pb-16 md:grid-cols-2 md:pb-[4.5rem]">
        {products.map((product) => {
          const Icon = product.icon
          return (
            <div key={product.id} className="overflow-hidden rounded-xl border border-gray-800 bg-black transition-colors hover:border-gray-700">
              <button
                onClick={() => setSelectedImage(product.image)}
                className="flex h-40 w-full items-center justify-center bg-gray-900 hover:bg-gray-800 md:h-44"
              >
                <Icon className="text-emerald-500" size={48} />
              </button>

              <div className="p-6">
                <div className="mb-3 flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10">
                    <Icon className="text-emerald-500" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-white">{product.name}</h2>
                </div>

                <p className="mb-5 text-sm leading-relaxed text-gray-400 md:text-base">{product.description}</p>

                <div className="mb-6 space-y-2">
                  {product.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <p className="text-sm text-gray-300">{feature}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between border-t border-gray-800 pt-4">
                  <p className="text-lg font-bold text-emerald-500">Custom Pricing</p>
                  <Link
                    to={`/products/${product.slug}`}
                    className="flex items-center gap-2 text-sm font-semibold text-emerald-500 hover:text-emerald-400"
                  >
                    Learn More
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 text-center md:py-[4.5rem]">
        <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">Need a Custom Solution?</h2>
        <p className="mb-8 text-base text-gray-400 md:text-lg">We build tailored software solutions to match your unique requirements</p>
        <a href="/contact" className="inline-flex items-center gap-3 rounded-lg bg-emerald-500 px-8 py-3.5 font-bold text-black hover:bg-emerald-600">
          Contact Us
          <ArrowRight size={20} />
        </a>
      </div>

      <Lightbox visible={!!selectedImage} imageUri={selectedImage} onClose={() => setSelectedImage(null)} />
    </main>
  )
}
