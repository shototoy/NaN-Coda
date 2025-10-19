// ============================================
// src/pages/Products.jsx
// ============================================
import { useState } from 'react'
import Card from '../components/Card'
import Lightbox from '../components/Lightbox'

const products = [
  { 
    icon: '🛠', 
    title: 'NaNCoda STOCK', 
    img: '/asset/box_STOCK.png', 
    subtitle: 'Inventory Management System', 
    desc: 'Built for small hardware stores and mid-size retailers, NaNCoda STOCK simplifies product management, tracks stock movement, and offers real-time dashboard visibility with integrated point-of-sale functionality.' 
  },
  { 
    icon: '🎓', 
    title: 'NaNCoda QRISP', 
    img: '/asset/box_QRISP.png', 
    subtitle: 'Student Attendance Monitoring System', 
    desc: 'QRISP helps educational institutions track attendance through kiosk-based check-in, real-time reporting, and offline-ready syncing via local servers with automated SMS parent notifications.' 
  },
  { 
    icon: '⚙️', 
    title: 'Custom Modules', 
    img: '/asset/box_custom.png', 
    subtitle: 'Tailored Software Solutions', 
    desc: 'We design scalable modules for administrative automation, advanced reporting, and intelligent analytics — engineered to integrate seamlessly with your existing workflows and operational requirements.' 
  }
]

export default function Products() {
  const [lightbox, setLightbox] = useState({ open: false, src: '', alt: '' })

  return (
    <div className="p-8 bg-da-green-dark min-h-full">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {products.map((p, i) => (
          <Card key={i}>
            <h4 className="text-xl font-bold mb-4 text-da-bone">{p.icon} {p.title}</h4>
            <div 
              onClick={() => setLightbox({ open: true, src: p.img, alt: p.title })}
              className="bg-da-green-dark rounded overflow-hidden mb-4 cursor-pointer aspect-[2.4/3] flex items-center justify-center border border-da-green"
            >
              <img 
                src={p.img} 
                alt={p.title} 
                className="max-w-full h-auto object-contain hover:scale-105 transition-transform" 
              />
            </div>
            <p className="text-lg font-semibold text-da-gold mb-2">{p.subtitle}</p>
            <p className="text-text-muted text-sm">{p.desc}</p>
          </Card>
        ))}
      </div>
      <Lightbox {...lightbox} onClose={() => setLightbox({ ...lightbox, open: false })} />
    </div>
  )
}