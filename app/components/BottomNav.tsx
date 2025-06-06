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
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-inset">
      <div className="flex justify-around py-2">
        {navItems.map(({ icon: Icon, label, screen, tab }) => (
          <button
            key={tab}
            onClick={() => onNavigate(screen, tab)}
            className={`flex flex-col items-center p-2 transition-colors ${
              activeTab === tab ? 'text-green-500' : 'text-gray-600'
            }`}
          >
            <Icon className="w-5 h-5 mb-1" />
            <span className="text-xs">{label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}