// ============================================
// src/pages/Contact.jsx
// ============================================
import { useState } from 'react'
import Card from '../components/Card'
import Toast from '../components/Toast'

export default function Contact() {
  const [form, setForm] = useState({ name: '', message: '' })
  const [toast, setToast] = useState({ show: false, message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    setToast({ show: true, message: 'Message transmitted successfully!' })
    setForm({ name: '', message: '' })
  }

  return (
    <div className="p-8 bg-da-green-dark min-h-full">
      <div className="max-w-2xl mx-auto">
        <Card>
          <h3 className="text-2xl font-bold text-da-gold mb-4">Contact Us</h3>
          <p className="mb-2 text-da-bone"><strong>Email:</strong> <span className="text-text-muted">jcfarabit@gmail.com</span></p>
          <p className="mb-2 text-da-bone"><strong>Phone:</strong> <span className="text-text-muted">(+63) 909-158-7781</span></p>
          <p className="mb-6 text-da-bone"><strong>Location:</strong> <span className="text-text-muted">Municipality of Isulan, Sultan Kudarat 9805</span></p>
          <hr className="border-da-crimson mb-6" />
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block font-semibold mb-2 text-da-bone">Name</label>
              <input 
                type="text" 
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 border border-da-green bg-da-green-dark text-da-bone rounded focus:outline-none focus:border-da-crimson focus:ring-2 focus:ring-da-crimson/20"
                placeholder="Your full name"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block font-semibold mb-2 text-da-bone">Message</label>
              <textarea 
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 border border-da-green bg-da-green-dark text-da-bone rounded focus:outline-none focus:border-da-crimson focus:ring-2 focus:ring-da-crimson/20"
                rows="4"
                placeholder="How can we assist you?"
                required
              />
            </div>
            <div className="flex justify-end">
              <button 
                type="submit" 
                className="bg-da-crimson text-da-bone px-6 py-3 rounded font-semibold hover:bg-red-900 transition-colors"
              >
                Send Message
              </button>
            </div>
          </form>
        </Card>
      </div>
      <Toast {...toast} onClose={() => setToast({ ...toast, show: false })} />
    </div>
  )
}