import React from 'react'

export default function Footer() {
  const sections = [
    { title: 'Product', links: ['Features', 'Pricing', 'Security', 'Roadmap'] },
    { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
    { title: 'Legal', links: ['Privacy', 'Terms', 'Cookies', 'Licenses'] }
  ]

  return (
    <footer className="border-t border-gray-800 bg-black">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-4">
          <div>
            <h2 className="mb-2 text-xl font-black text-emerald-500 md:text-2xl">NaN Coda</h2>
            <p className="text-sm text-gray-500">Enterprise solutions built for scale</p>
          </div>

          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-3 text-sm font-bold text-white">{section.title}</h3>
              <ul className="space-y-1.5">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-gray-500 hover:text-gray-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-600">
          Copyright 2025 NaN Coda. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
