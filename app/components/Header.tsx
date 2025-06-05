import { ChevronLeft, Menu, Bell, User } from 'lucide-react'

interface HeaderProps {
  title?: string
  showBack?: boolean
  onBack?: () => void
  showLogo?: boolean
}

export default function Header({ title, showBack = false, onBack, showLogo = false }: HeaderProps) {
  return (
    <div className="bg-gray-900 text-white safe-area-inset">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          {showBack ? (
            <ChevronLeft 
              className="w-6 h-6 cursor-pointer hover:opacity-80 transition-opacity" 
              onClick={onBack} 
            />
          ) : (
            <Menu className="w-6 h-6 cursor-pointer hover:opacity-80 transition-opacity" />
          )}
          {showLogo && (
            <div className="text-xl font-bold tracking-wider">PAGOX</div>
          )}
          {title && !showLogo && (
            <span className="text-lg font-medium">{title}</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bell className="w-5 h-5 cursor-pointer hover:opacity-80 transition-opacity" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
          <User className="w-5 h-5 cursor-pointer hover:opacity-80 transition-opacity" />
        </div>
      </div>
    </div>
  )
}