import Image from 'next/image' // Asegúrate de que esta importación esté presente
import { ChevronLeft, Bell, User } from 'lucide-react'

interface HeaderProps {
  title?: string
  showBack?: boolean
  onBack?: () => void
  onNavigate?: (screen: string, tab?: string) => void
  // Eliminamos showLogo porque ahora el logo es el estado por defecto
}

export default function Header({ title, showBack = false, onBack, onNavigate }: HeaderProps) {
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
          ) : null}

          {/* ESTA ES LA PARTE QUE CAMBIÓ */}
          <div className="flex-1">
            {title ? (
              // Si hay un título, lo muestra (para otras pantallas)
              <h1 className="text-xl font-light text-black">{title}</h1>
            ) : (
              // Si no hay título, muestra el logo (para la pantalla de inicio)
              <Image
                src="/images/TuristaLogo.png"
                alt="Logo de Turista"
                width={120} // Ajusta el ancho según tu imagen
                height={30} // Ajusta el alto según tu imagen
                priority
              />
            )}
          </div>
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
