import React, { useState } from 'react'
import { Globe, Mail, Phone, MapPin, Send } from 'lucide-react'
import Toast from '../components/Toast'
import { apiRequest } from '../lib/api'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      setToast({ visible: true, message: 'Please fill in all required fields', type: 'error' })
      return
    }

    setLoading(true)

    try {
      await apiRequest('/api/contact', {
        method: 'POST',
        body: JSON.stringify(form)
      })

      setToast({ visible: true, message: 'Message sent successfully!', type: 'success' })
      setForm({ name: '', email: '', company: '', message: '' })
    } catch (error) {
      setToast({ visible: true, message: error.message || 'Failed to send message', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'huliokuneho42@gmail.com' },
    { icon: Phone, label: 'Phone', value: '09091587781' },
    { icon: MapPin, label: 'Location', value: 'Isulan, Sultan Kudarat' },
    {
      icon: Globe,
      label: 'Facebook',
      value: 'NaN Coda Software Solutions',
      href: 'https://facebook.com/NaNcoda',
      meta: 'facebook.com/NaNcoda'
    }
  ]

  return (
    <main className="bg-black">
      <div className="mx-auto max-w-7xl px-6 pb-10 pt-8 md:pb-12 md:pt-10">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_22rem]">
          <div className="space-y-5">
            <div className="rounded-xl border border-gray-800 bg-gradient-to-br from-emerald-500/8 via-black to-black p-5 md:p-6">
              <div className="mb-3 inline-block rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">
                <p className="text-xs font-semibold text-emerald-500">Get In Touch</p>
              </div>

              <h1 className="mb-3 text-3xl font-bold text-white md:text-4xl">Let&apos;s Build Something Great Together</h1>
              <p className="max-w-2xl text-sm leading-relaxed text-gray-400 md:text-base">
                Have a project in mind? Send us the essentials and we&apos;ll get back to you as soon as possible.
              </p>
            </div>

            <div className="rounded-xl border border-gray-800 bg-black p-5 md:p-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-white md:text-2xl">Send us a message</h2>
                  <p className="mt-1 text-sm text-gray-500">A short brief is enough to get started.</p>
                </div>
                <div className="hidden rounded-full border border-emerald-500/15 bg-emerald-500/5 px-3 py-1.5 text-xs text-emerald-400 md:block">
                  Reply within 1 business day
                </div>
              </div>

              <form className="grid gap-3.5 md:grid-cols-2" onSubmit={handleSubmit}>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-300">Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                    placeholder="Your name"
                    className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-sm text-white placeholder-gray-600 focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-300">Email *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                    placeholder="your.email@example.com"
                    className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-sm text-white placeholder-gray-600 focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-sm font-semibold text-gray-300">Company</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({...form, company: e.target.value})}
                    placeholder="Your company name"
                    className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-sm text-white placeholder-gray-600 focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-sm font-semibold text-gray-300">Message *</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({...form, message: e.target.value})}
                    placeholder="Tell us about your project..."
                    rows="4"
                    className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-sm text-white placeholder-gray-600 focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 py-2.5 font-bold text-black hover:bg-emerald-600 disabled:bg-gray-700 md:col-span-2 md:w-auto md:px-6"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                  <Send size={18} />
                </button>
              </form>
            </div>
          </div>

          <div className="self-start rounded-xl border border-gray-800 bg-black p-5 md:p-6">
            <h2 className="mb-2 text-xl font-bold text-white md:text-2xl">Contact Information</h2>
            <p className="mb-4 text-sm leading-relaxed text-gray-400">
              Best for project inquiries, product discussions, and custom software requests.
            </p>

            <div className="space-y-2.5">
              {contactInfo.map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={i} className="flex items-center gap-3 rounded-lg border border-gray-800 bg-gray-950/60 p-3.5">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10">
                      <Icon className="text-emerald-500" size={18} />
                    </div>
                    <div>
                      <p className="mb-0.5 text-xs text-gray-500">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className="group block"
                        >
                          <p className="text-sm font-semibold text-white transition-colors group-hover:text-emerald-400">
                            {item.value}
                          </p>
                          <p className="mt-1 text-xs text-emerald-500 transition-colors group-hover:text-emerald-400">
                            {item.meta}
                          </p>
                        </a>
                      ) : (
                        <p className="text-sm font-semibold text-white">{item.value}</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-3 rounded-lg border border-emerald-500/15 bg-emerald-500/5 px-4 py-3">
              <p className="text-sm text-gray-300">
                Typical reply time: <span className="font-semibold text-emerald-500">within 1 business day</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onHide={() => setToast({...toast, visible: false})}
      />
    </main>
  )
}
