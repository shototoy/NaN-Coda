import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()
  
  return (
    <nav className="bg-bg-dark shadow-lg">
      <div className="flex justify-center items-center flex-wrap">
        <NavLink to="/" active={location.pathname === '/'}>Home</NavLink>
        <NavLink to="/products" active={location.pathname === '/products'}>Products</NavLink>
        <NavLink to="/contact" active={location.pathname === '/contact'}>Contact</NavLink>
      </div>
    </nav>
  )
}

function NavLink({ to, active, children }) {
  return (
    <Link
      to={to}
      className={`px-8 py-4 text-white uppercase font-semibold relative group
        ${active ? 'text-white' : 'text-gray-300'}`}
    >
      {children}
      <span className="absolute bottom-2 left-0 w-0 h-0.5 bg-brand-orange group-hover:w-full transition-all duration-300"></span>
    </Link>
  )
}