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
    <div className="text-white safe-area-inset" style={{ backgroundColor: '#0e1028' }}>
      <div className="flex items-center justify-between px-5 py-4">
        {/* Left Side */}
        <div className="flex items-center gap-3 flex-1">
          {showBack ? (
            <>
              <button 
                onClick={onBack}
                className="p-2 hover:bg-gray-800 rounded-full transition-colors -ml-2"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              {title && (
                <h1 className="text-xl font-light text-white">{title}</h1>
              )}
            </>
          ) : showLogo ? (
            <h1 className="text-xl font-light text-white">Tu aventura te espera</h1>
          ) : (
            <h1 className="text-xl font-light text-white">{title || 'Inicio'}</h1>
          )}
        </div>
        
        {/* Right Side - Only Profile */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onNavigate && onNavigate('profile', 'profile')}
            className="p-2 rounded-full transition-colors"
            style={{ backgroundColor: '#1f203a' }}
          >
            <User className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}