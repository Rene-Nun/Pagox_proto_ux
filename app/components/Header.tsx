import React from 'react'
import { ChevronLeft, User } from 'lucide-react'

interface HeaderProps {
  title?: string
  showBack?: boolean
  onBack?: () => void
  showLogo?: boolean
  onNavigate?: (screen: string, tab?: string) => void
}

export default function Header({ title, showBack = false, onBack, showLogo = false, onNavigate }: HeaderProps) {
  return (
    <div className="bg-white text-gray-900 safe-area-inset">
      <div className="flex items-center justify-between px-5 py-4">
        {/* Left Side */}
        <div className="flex items-center gap-3">
          {showBack ? (
            <>
              <button 
                onClick={onBack}
                className="p-2 hover:bg-gray-50 rounded-full transition-colors -ml-2"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              {title && (
                <h1 className="text-xl font-light text-black">{title}</h1>
              )}
            </>
          ) : (
            <>
              {!showLogo && (
                <h1 className="text-xl font-light text-black">{title || 'Inicio'}</h1>
              )}
            </>
          )}
        </div>

        {/* Center - Logo only on Home */}
        {showLogo && (
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <img 
              src="/images/TuristaLogo.png" 
              alt="Turista" 
              className="h-5 w-auto object-contain"
            />
          </div>
        )}
        
        {/* Right Side - Only Profile */}
        <div className="flex items-center gap-2">
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