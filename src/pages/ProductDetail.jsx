import React, { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, FileDown } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import Lightbox from '../components/Lightbox'
import { getProductBySlug } from '../data/products'
import { apiRequest } from '../lib/api'

function getGalleryCardCopy(imageUrl, index) {
  const filename = imageUrl.split('/').pop() || `photo-${index + 1}.png`

  if (filename.toLowerCase() === 'banner.png') {
    return {
      eyebrow: 'Banner Preview',
      title: 'Product cover visual',
      filename,
    }
  }

  const normalizedTitle = filename
    .replace(/\.png$/i, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase())

  return {
    eyebrow: `Photo ${String(index + 1).padStart(2, '0')}`,
    title: normalizedTitle,
    filename,
  }
}

function getEarlyAdopterName(earlyAdopter) {
  return typeof earlyAdopter === 'string' ? earlyAdopter : earlyAdopter?.name || ''
}

function getEarlyAdopterLogo(product, index) {
  if (!product?.photoDirectory) {
    return ''
  }

  return `${product.photoDirectory}/partner${index + 1}.png`
}

export default function ProductDetail() {
  const { productSlug } = useParams()
  const product = getProductBySlug(productSlug)
  const brochureHref = product ? `${product.brochure}?v=${Date.now()}` : ''
  const [galleryImages, setGalleryImages] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const [isLoadingGallery, setIsLoadingGallery] = useState(Boolean(product))

  useEffect(() => {
    let isMounted = true

    async function loadGallery() {
      if (!product) {
        setGalleryImages([])
        setSelectedImage(null)
        setIsLoadingGallery(false)
        return
      }

      setIsLoadingGallery(true)
      setSelectedImage(null)

      try {
        const response = await apiRequest(`/api/product-photos?slug=${encodeURIComponent(product.slug)}`)
        const nextImages = Array.isArray(response?.photos) ? response.photos : []

        if (isMounted) {
          setGalleryImages(nextImages.length ? nextImages : [product.bannerImage || product.image].filter(Boolean))
        }
      } catch (error) {
        if (isMounted) {
          setGalleryImages([product.bannerImage || product.image].filter(Boolean))
        }
      } finally {
        if (isMounted) {
          setIsLoadingGallery(false)
        }
      }
    }

    loadGallery()

    return () => {
      isMounted = false
    }
  }, [product])

  if (!product) {
    return (
      <main className="bg-black">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <div className="rounded-2xl border border-gray-800 bg-black p-8 text-center md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-500">Product Not Found</p>
            <h1 className="mt-4 text-3xl font-bold text-white md:text-4xl">We couldn&apos;t find that product page.</h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-gray-400 md:text-base">
              The requested product detail may have moved, or the link may be incomplete. You can go back to the
              products page and open another solution from there.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-700 px-5 py-3 text-sm font-semibold text-white hover:border-emerald-500/50"
              >
                <ArrowLeft size={18} />
                Back to Products
              </Link>
            </div>
          </div>
        </div>
      </main>
    )
  }

  const Icon = product.icon

  return (
    <main className="bg-black">
      <div className="mx-auto max-w-7xl px-6 pb-14 pt-10 md:pb-16 md:pt-14">
        <div className="mb-6">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 transition hover:text-emerald-400"
          >
            <ArrowLeft size={16} />
            Back to Products
          </Link>
        </div>

        <section className="grid gap-6 rounded-3xl border border-gray-800 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.12),transparent_38%),linear-gradient(180deg,rgba(5,8,7,1),rgba(0,0,0,1))] p-6 md:p-8 xl:grid-cols-[minmax(0,1.1fr)_22rem]">
          <div>
            <div className="mb-4 inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">{product.category}</p>
            </div>

            <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white md:text-5xl">{product.name}</h1>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-300 md:text-xl">{product.headline}</p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-gray-400 md:text-base">{product.description}</p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {product.features.map((feature) => (
                <span
                  key={feature}
                  className="rounded-full border border-gray-700 bg-gray-950/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gray-200"
                >
                  {feature}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 font-bold text-black hover:bg-emerald-600"
              >
                Talk to Us
                <ArrowRight size={18} />
              </Link>
              <a
                href={brochureHref}
                download={`${product.name}.pdf`}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/8 px-6 py-3 font-semibold text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-500/12"
              >
                View Brochure
                <FileDown size={18} />
              </a>
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-700 px-6 py-3 font-semibold text-white hover:border-emerald-500/40"
              >
                View Other Products
              </Link>
            </div>

            <div className="mt-8 rounded-2xl border border-gray-800 bg-[linear-gradient(180deg,rgba(5,9,7,0.92),rgba(2,4,3,0.98))] p-4 md:p-5">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-500">Gallery</p>
                  <h2 className="mt-2 text-lg font-bold text-white md:text-xl">Product visuals and reference screens</h2>
                </div>
                <p className="text-sm text-gray-500">{galleryImages.length} visual{galleryImages.length === 1 ? '' : 's'}</p>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {isLoadingGallery ? (
                  <div className="rounded-2xl border border-dashed border-gray-700 bg-gray-950/60 px-4 py-10 text-center text-sm text-gray-500 sm:col-span-2">
                    Loading gallery...
                  </div>
                ) : galleryImages.length ? (
                  galleryImages.map((imageUrl, index) => {
                    const galleryCardCopy = getGalleryCardCopy(imageUrl, index)

                    return (
                      <button
                        key={imageUrl}
                        type="button"
                        onClick={() => setSelectedImage(imageUrl)}
                        className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-[#06100a] text-left transition hover:border-emerald-500/35"
                      >
                        <div className="aspect-[16/9] overflow-hidden">
                          <img
                            src={imageUrl}
                            alt={`${product.name} gallery ${index + 1}`}
                            className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.03]"
                          />
                        </div>
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3 sm:p-4">
                          <div className="rounded-xl border border-white/10 bg-black/60 px-3 py-2 backdrop-blur-sm">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-emerald-300">{galleryCardCopy.eyebrow}</p>
                            <p className="mt-1 text-sm font-semibold text-white">{galleryCardCopy.title}</p>
                            <p className="mt-0.5 text-xs text-gray-300/80">{galleryCardCopy.filename}</p>
                          </div>
                        </div>
                      </button>
                    )
                  })
                ) : (
                  <div className="rounded-2xl border border-dashed border-gray-700 bg-gray-950/60 px-4 py-10 text-center text-sm text-gray-500 sm:col-span-2">
                    No PNG photos found in {product.photoDirectory}.
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-950/70 p-6">
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />
              <div className="relative flex min-h-[18rem] flex-col gap-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10">
                  <Icon className="text-emerald-400" size={34} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Solution Focus</p>
                  <p className="mt-3 text-2xl font-bold text-white">{product.category}</p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-400">
                    One flexible product layout, with content filled dynamically from the selected solution.
                  </p>
                </div>
                {product.earlyAdopters?.length ? (
                  <div className="mt-auto rounded-2xl border border-gray-800 bg-black/35 p-4">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-500">Early Adopters</p>
                      <p className="text-xs text-gray-500">{product.earlyAdopters.length} partners</p>
                    </div>
                    <div className="space-y-3">
                      {product.earlyAdopters.map((partner, index) => {
                        const partnerName = getEarlyAdopterName(partner)
                        const partnerLogo = getEarlyAdopterLogo(product, index)

                        return (
                          <div
                            key={partnerName || `partner-${index + 1}`}
                            className="grid grid-cols-[25%_1fr] items-center gap-3 rounded-xl border border-gray-800 bg-gray-950/70 px-3 py-3"
                          >
                            <img
                              src={partnerLogo}
                              alt={`${partnerName} logo`}
                              className="h-14 w-full object-contain object-left"
                              loading="lazy"
                            />
                            <div className="min-w-0">
                              <p className="text-sm font-semibold leading-tight text-white">{partnerName}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
              <div className="rounded-2xl border border-gray-800 bg-black p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-gray-500">Modules</p>
                <p className="mt-3 text-3xl font-black text-emerald-500">{product.modules.length}</p>
              </div>
              <div className="rounded-2xl border border-gray-800 bg-black p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-gray-500">Features</p>
                <p className="mt-3 text-3xl font-black text-emerald-500">{product.features.length}</p>
              </div>
              <div className="rounded-2xl border border-gray-800 bg-black p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-gray-500">Use Cases</p>
                <p className="mt-3 text-3xl font-black text-emerald-500">{product.useCases.length}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_20rem]">
          <div className="rounded-2xl border border-gray-800 bg-black p-6 md:p-7">
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-500">What This Product Delivers</p>
              <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">Core capabilities in one reusable layout</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {product.modules.map((module) => (
                <article key={module.title} className="rounded-xl border border-gray-800 bg-gray-950/60 p-4">
                  <div className="mb-3 h-1.5 w-10 rounded-full bg-emerald-500" />
                  <h3 className="text-lg font-bold text-white">{module.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-400">{module.description}</p>
                </article>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-gray-800 bg-gray-950/60 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-500">Key Highlights</p>
              <div className="mt-4 grid gap-3">
                {product.highlights.map((highlight) => (
                  <div key={highlight} className="flex items-start gap-3">
                    <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-500" />
                    <p className="text-sm leading-relaxed text-gray-300">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-800 bg-black p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-500">Ideal For</p>
              <div className="mt-4 space-y-3">
                {product.idealFor.map((item) => (
                  <div key={item} className="rounded-xl border border-gray-800 bg-gray-950/60 px-4 py-3 text-sm text-gray-300">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-black p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-500">Common Use Cases</p>
              <div className="mt-4 space-y-3">
                {product.useCases.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl border border-gray-800 bg-gray-950/60 px-4 py-3">
                    <div className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-500" />
                    <p className="text-sm text-gray-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-500">Next Step</p>
              <h3 className="mt-3 text-2xl font-bold text-white">Want this tailored to your workflow?</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-300">
                We can adapt the modules, reporting, and interfaces around your internal process instead of forcing your
                team into a rigid template.
              </p>
              <div className="mt-5">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-3 text-sm font-bold text-black hover:bg-emerald-600"
                >
                  Request a Consultation
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Lightbox visible={!!selectedImage} imageUri={selectedImage} onClose={() => setSelectedImage(null)} />
    </main>
  )
}
