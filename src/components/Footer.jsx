import React from 'react'

export default function Footer() {
  const sections = [
    { title: 'Product', links: ['Features', 'Pricing', 'Security', 'Roadmap'] },
    { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
    { title: 'Legal', links: ['Privacy', 'Terms', 'Cookies', 'Licenses'] }
  ]

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h2 className="text-2xl font-black text-emerald-500 mb-2">NaN Coda</h2>
            <p className="text-sm text-gray-500">Enterprise solutions built for scale</p>
          </div>
          {sections.map((section, i) => (
            <div key={i}>
              <h3 className="text-sm font-bold text-white mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <a href="#" className="text-sm text-gray-500 hover:text-gray-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-xs text-gray-600">
          © 2025 NaN Coda. All rights reserved.
        </div>
      </div>
    </footer>
  )
}