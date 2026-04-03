import React, { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Carousel from '../components/Carousel'
import Lightbox from '../components/Lightbox'
import { products } from '../data/products'

export default function Products() {
  const [selectedImage, setSelectedImage] = useState(null)

  const carouselSlides = products.map((product, index) => {
    const bannerImage = product.bannerImage || product.image

    return {
      render: () => (
        <Link to={`/products/${product.slug}`} className="group relative block h-full overflow-hidden bg-[#020605]">
          <img
            src={bannerImage}
            alt={`${product.name} banner`}
            className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.26),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.12),transparent_28%)]" />
          <div className="absolute inset-x-0 bottom-0 h-[24%] bg-black/8 backdrop-blur-xl [mask-image:linear-gradient(to_top,black_0%,black_72%,transparent_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-[24%] bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.5)_42%,rgba(0,0,0,0.86)_100%)]" />

          <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-7 md:p-8 lg:p-10">
            <div className="flex justify-end">
              <p className="rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-white/75 backdrop-blur-sm">
                {String(index + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}
              </p>
            </div>

            <div className="w-full rounded-[1.35rem] border border-white/10 bg-black/14 p-3.5 backdrop-blur-md sm:p-4 md:p-5">
              <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-emerald-300/90 md:text-[10px]">{product.category}</p>
              <div className="mt-2.5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div className="min-w-0">
                  <h2 className="max-w-2xl text-2xl font-black tracking-tight text-white md:text-4xl lg:text-[2.8rem]">
                    {product.name}
                  </h2>
                  <p className="mt-2 max-w-2xl text-xs leading-5 text-gray-200/85 md:text-base md:leading-7">
                    {product.headline}
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 self-start rounded-full border border-emerald-400/30 bg-black/28 px-3.5 py-1.5 text-xs font-semibold text-emerald-200 backdrop-blur-sm transition group-hover:border-emerald-300/50 group-hover:bg-black/36 md:self-end md:text-sm">
                  View Product
                  <ArrowRight size={16} />
                </span>
              </div>
            </div>
          </div>
        </Link>
      ),
    }
  })

  return (
    <main className="bg-black">
      <div className="mx-auto max-w-5xl px-6 pb-12 pt-16 text-center md:pb-14 md:pt-20">
        <h1 className="mb-3 text-3xl font-bold text-white md:text-4xl lg:text-5xl">Enterprise Products Built for Performance</h1>
        <p className="text-base text-gray-400 md:text-lg">Comprehensive software solutions designed to scale with your business needs</p>
      </div>

      <div className="mx-auto mb-14 max-w-7xl px-6 md:mb-16">
        <Carousel slides={carouselSlides} className="h-[24rem] sm:h-[26rem] md:h-[30rem] lg:h-[33rem]" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-5 px-6 pb-16 md:grid-cols-2 md:pb-[4.5rem]">
        {products.map((product) => {
          const Icon = product.icon
          const bannerImage = product.bannerImage || product.image

          return (
            <article
              key={product.id}
              className="overflow-hidden rounded-2xl border border-gray-800 bg-[linear-gradient(180deg,#050809_0%,#020304_100%)] transition-colors hover:border-gray-700"
            >
              <button
                type="button"
                onClick={() => setSelectedImage(bannerImage)}
                className="group block w-full border-b border-gray-800 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.12),transparent_40%),linear-gradient(180deg,#071113_0%,#020405_100%)]"
              >
                <div className="relative aspect-[16/6.2] w-full overflow-hidden">
                  <img
                    src={bannerImage}
                    alt={`${product.name} banner`}
                    className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              </button>

              <div className="p-4">
                <div className="mb-3 flex items-start gap-2.5">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10">
                    <Icon className="text-emerald-500" size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-emerald-400 md:text-[10px] md:tracking-[0.22em]">{product.category}</p>
                    <h2 className="mt-0.5 text-[1.35rem] font-bold leading-none text-white md:text-[1.55rem]">{product.name}</h2>
                  </div>
                </div>

                <p className="text-[13px] leading-5 text-gray-400 md:text-[14px] md:leading-6">{product.headline}</p>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  {product.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex min-h-[40px] items-center gap-2 rounded-xl border border-gray-800 bg-gray-950/60 px-2.5 py-2"
                    >
                      <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                      <p className="text-[13px] font-medium leading-tight text-gray-200 md:text-sm">{feature}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-gray-800 pt-3">
                  <p className="text-sm font-bold text-emerald-500 md:text-base">Custom Pricing</p>
                  <Link
                    to={`/products/${product.slug}`}
                    className="flex items-center gap-2 text-[13px] font-semibold text-emerald-500 hover:text-emerald-400 md:text-sm"
                  >
                    Learn More
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </article>
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
