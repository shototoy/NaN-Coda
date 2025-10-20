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
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-8">
          <p className="text-xs text-emerald-500 font-semibold">Get In Touch</p>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Let's Build Something Great Together</h1>
        <p className="text-xl text-gray-400">Have a project in mind? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20 grid md:grid-cols-2 gap-12">
        <div className="bg-black border border-gray-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-8">Send us a message</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({...form, name: e.target.value})}
                placeholder="Your name"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Email *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
                placeholder="your.email@example.com"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Company</label>
              <input
                type="text"
                value={form.company}
                onChange={(e) => setForm({...form, company: e.target.value})}
                placeholder="Your company name"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Message *</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({...form, message: e.target.value})}
                placeholder="Tell us about your project..."
                rows="6"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-emerald-500 text-black font-bold py-3 rounded-lg hover:bg-emerald-600 disabled:bg-gray-700 flex items-center justify-center gap-2"
            >
              {loading ? 'Sending...' : 'Send Message'}
              <Send size={20} />
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-8">Contact Information</h2>

          <div className="space-y-4">
            {contactInfo.map((item, i) => {
              const Icon = item.icon
              return (
                <div key={i} className="flex items-center gap-4 bg-black border border-gray-800 rounded-lg p-6">
                  <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="text-emerald-500" size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                    <p className="font-semibold text-white">{item.value}</p>
                  </div>
                </div>
              )
            })}
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