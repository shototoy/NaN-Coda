export default function Lightbox({ src, alt, isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div 
      onClick={onClose} 
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 cursor-pointer"
    >
      <img src={src} alt={alt} className="max-w-[90%] max-h-[90%] object-contain" />
    </div>
  )
}