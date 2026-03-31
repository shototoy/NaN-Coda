import React, { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import Toast from '../components/Toast'

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
    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('email', form.email)
    formData.append('company', form.company)
    formData.append('message', form.message)

    try {
      const response = await fetch('submit_form.php', {
        method: 'POST',
        body: formData
      })
      
      if (response.ok) {
        setToast({ visible: true, message: 'Message sent successfully!', type: 'success' })
        setForm({ name: '', email: '', company: '', message: '' })
      } else {
        setToast({ visible: true, message: 'Failed to send message', type: 'error' })
      }
    } catch (error) {
      setToast({ visible: true, message: 'Failed to send message', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'huliokuneho42@gmail.com' },
    { icon: Phone, label: 'Phone', value: '09091587781' },
    { icon: MapPin, label: 'Location', value: 'Isulan, Sultan Kudarat' }
  ]

  return (
    <main className="bg-black">
      <div className="mx-auto max-w-4xl px-6 pb-8 pt-10 text-center md:pb-10 md:pt-12">
        <div className="mb-4 inline-block rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">
          <p className="text-xs text-emerald-500 font-semibold">Get In Touch</p>
        </div>

        <h1 className="mb-3 text-3xl font-bold text-white md:text-4xl">Let's Build Something Great Together</h1>
        <p className="mx-auto max-w-2xl text-base text-gray-400 md:text-lg">
          Have a project in mind? Send us a message and we&apos;ll get back to you as soon as possible.
        </p>
      </div>

      <div className="mx-auto grid max-w-7xl gap-6 px-6 pb-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <div className="rounded-xl border border-gray-800 bg-black p-5 md:p-6">
          <h2 className="mb-5 text-xl font-bold text-white md:text-2xl">Send us a message</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({...form, name: e.target.value})}
                placeholder="Your name"
                className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-sm text-white placeholder-gray-600 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Email *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
                placeholder="your.email@example.com"
                className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-sm text-white placeholder-gray-600 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-300 mb-2">Company</label>
              <input
                type="text"
                value={form.company}
                onChange={(e) => setForm({...form, company: e.target.value})}
                placeholder="Your company name"
                className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-sm text-white placeholder-gray-600 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-300 mb-2">Message *</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({...form, message: e.target.value})}
                placeholder="Tell us about your project..."
                rows="5"
                className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-sm text-white placeholder-gray-600 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 py-3 font-bold text-black hover:bg-emerald-600 disabled:bg-gray-700 md:col-span-2"
            >
              {loading ? 'Sending...' : 'Send Message'}
              <Send size={20} />
            </button>
          </div>
        </div>

        <div className="self-start rounded-xl border border-gray-800 bg-black p-5 md:p-6">
          <h2 className="mb-2 text-xl font-bold text-white md:text-2xl">Contact Information</h2>
          <p className="mb-5 text-sm leading-relaxed text-gray-400">
            Best for project inquiries, product discussions, and custom software requests.
          </p>

          <div className="space-y-3">
            {contactInfo.map((item, i) => {
              const Icon = item.icon
              return (
                <div key={i} className="flex items-center gap-3 rounded-lg border border-gray-800 bg-gray-950/60 p-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10">
                    <Icon className="text-emerald-500" size={20} />
                  </div>
                  <div>
                    <p className="mb-1 text-xs text-gray-500">{item.label}</p>
                    <p className="text-sm font-semibold text-white md:text-base">{item.value}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-4 rounded-lg border border-emerald-500/15 bg-emerald-500/5 px-4 py-3">
            <p className="text-sm text-gray-300">
              Typical reply time: <span className="font-semibold text-emerald-500">within 1 business day</span>
            </p>
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
