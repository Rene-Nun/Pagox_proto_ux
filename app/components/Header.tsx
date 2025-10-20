import Image from 'next/image'
import { ChevronLeft, Bell, User } from 'lucide-react'

interface HeaderProps {
  title?: string
  showBack?: boolean
  onBack?: () => void
  showLogo?: boolean
  onNavigate?: (screen: string, tab?: string) => void
}

export default function Header({ title, showBack = false, onBack, showLogo = false, onNavigate }: HeaderProps) {
  return (
    <div className="bg-white text-gray-900 safe-area-inset border-b border-gray-100">
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          {showBack ? (
            <button 
              onClick={onBack}
              className="p-2 hover:bg-gray-50 rounded-full transition-colors -ml-2"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="flex-1">
              {showLogo && (
                <Image
                  src="/images/TuristaLogo.png"
                  alt="Logo de Turista"
                  width={120} // <-- Ajusta este valor al ancho real de tu imagen de logo
                  height={30} // <-- Ajusta este valor al alto real de tu imagen de logo
                  priority // Mejora la velocidad de carga de la imagen más importante
                />
              )}
              {title && !showLogo && (
                <h1 className="text-xl font-light text-black">{title}</h1>
              )}
              {!title && !showLogo && (
                <h1 className="text-xl font-light text-black">Inicio</h1>
              )}
            </div>
          )}
          {showBack && title && (
            <h1 className="text-xl font-light text-black">{title}</h1>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <button className="relative p-2 hover:bg-gray-50 rounded-full transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-black rounded-full"></div>
          </button>
          <button 
            onClick={() => onNavigate && onNavigate('profile', 'profile')}
            className="p-2 hover:bg-gray-50 rounded-full transition-colors"
          >
            <User className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  )
}
