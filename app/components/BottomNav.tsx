import { Home, ShoppingBag, CreditCard, Wallet } from 'lucide-react'

interface BottomNavProps {
  activeTab: string
  onNavigate: (screen: string, tab: string) => void
}

export default function BottomNav({ activeTab, onNavigate }: BottomNavProps) {
  const navItems = [
    { icon: Home, label: 'Inicio', screen: 'home', tab: 'home' },
    { icon: ShoppingBag, label: 'Marketplace', screen: 'marketplace', tab: 'marketplace' },
    { icon: CreditCard, label: 'Mis Pagos', screen: 'plans', tab: 'plans' },
    { icon: Wallet, label: 'Cartera', screen: 'wallet', tab: 'wallet' }
  ]

  return (
    <div className="border-t safe-area-inset flex-shrink-0" style={{ backgroundColor: '#0e1028', borderColor: '#1f203a' }}>
      <div className="flex justify-around px-5 py-3 pb-6">
        {navItems.map(({ icon: Icon, label, screen, tab }) => (
          <button
            key={tab}
            onClick={() => onNavigate(screen, tab)}
            className="flex flex-col items-center gap-1 transition-all duration-200 min-w-0 flex-1"
          >
            <div className="p-2 transition-all duration-200">
              <Icon 
                className="w-5 h-5 transition-colors duration-200"
                style={{ 
                  color: activeTab === tab ? '#003d90' : '#ffffff',
                  fill: activeTab === tab ? '#003d90' : 'none',
                  strokeWidth: activeTab === tab ? 0 : 2
                }}
              />
            </div>
            <span 
              className="text-xs font-medium transition-colors duration-200"
              style={{ color: activeTab === tab ? '#003d90' : '#ffffff' }}
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}