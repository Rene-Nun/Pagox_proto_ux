import MobileContainer from '../MobileContainer'
import Header from '../Header'
import BottomNav from '../BottomNav'
import { User, CreditCard, Bell, Shield, HelpCircle, LogOut, ChevronRight, Award } from 'lucide-react'

interface ProfileScreenProps {
  onNavigate: (screen: string, tab?: string) => void
  activeTab: string
}

export default function ProfileScreen({ onNavigate, activeTab }: ProfileScreenProps) {
  const menuItems = [
    { icon: User, label: 'Información Personal', badge: null },
    { icon: CreditCard, label: 'Métodos de Pago', badge: '2' },
    { icon: Bell, label: 'Notificaciones', badge: '5' },
    { icon: Shield, label: 'Seguridad', badge: null },
    { icon: HelpCircle, label: 'Ayuda y Soporte', badge: null },
  ]

  return (
    <MobileContainer>
      <Header title="Mi Perfil" onNavigate={onNavigate} />

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="p-4">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                MP
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold">MARÍA PÉREZ</h2>
                <p className="text-gray-600 text-sm">maria.perez@email.com</p>
                <p className="text-gray-600 text-sm">+52 555 123 4567</p>
              </div>
            </div>

            {/* Score Badge */}
            <div className="bg-gray-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-600">Score Pagox</p>
                    <p className="text-2xl font-bold">750</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Nivel</p>
                  <p className="text-lg font-medium text-green-600">Premium</p>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                style={{ borderBottom: index < menuItems.length - 1 ? '1px solid #f3f4f6' : 'none' }}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-gray-600" />
                  <span className="font-medium">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </button>
            ))}
          </div>

          {/* Logout Button */}
          <button className="w-full p-4 bg-white rounded-2xl shadow-sm flex items-center justify-center gap-2 text-red-600 font-medium hover:bg-red-50 transition-colors mb-6">
            <LogOut className="w-5 h-5" />
            Cerrar Sesión
          </button>

          {/* Version Info */}
          <p className="text-center text-xs text-gray-500 mb-4">
            Versión 1.0.0
          </p>
        </div>
      </div>

      <BottomNav activeTab={activeTab} onNavigate={onNavigate} />
    </MobileContainer>
  )
}