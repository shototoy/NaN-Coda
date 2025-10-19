export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-lg 
      hover:transform hover:-translate-y-2 hover:shadow-xl hover:border-brand-orange 
      transition-all duration-300 ${className}`}>
      {children}
    </div>
  )
}
