import Header from '../Header'
import { User, CreditCard, Bell, Shield, HelpCircle, LogOut, ChevronRight, Award, Check } from 'lucide-react'

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
    <div className="h-full flex flex-col bg-white">
      <Header title="Mi Perfil" onNavigate={onNavigate} />

      <div className="flex-1 overflow-y-auto">
        <div className="px-5 py-6 space-y-6">
          
          {/* Profile Header */}
          <div className="text-center mb-6">
            <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center text-white text-2xl font-light mx-auto mb-4">
              MP
            </div>
            <h1 className="text-2xl font-light text-black mb-1">MARÍA PÉREZ</h1>
            <p className="text-gray-500 text-sm">maria.perez@email.com</p>
            <p className="text-gray-500 text-sm">+52 555 123 4567</p>
          </div>

          {/* Score Section */}
          <div className="bg-gray-50 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Score Pagox</p>
                  <p className="text-2xl font-light text-black">750</p>
                </div>
              </div>
              <div className="text-right">
                <div className="bg-emerald-500/20 px-3 py-1 rounded-full mb-1">
                  <span className="text-emerald-600 text-xs font-medium flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Excelente
                  </span>
                </div>
                <p className="text-xs text-gray-500">Nivel actual</p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-2xl p-5">
              <div className="text-center">
                <p className="text-2xl font-light text-black mb-1">2</p>
                <p className="text-xs text-gray-500">Planes activos</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-5">
              <div className="text-center">
                <p className="text-2xl font-light text-black mb-1">1</p>
                <p className="text-xs text-gray-500">Completados</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-2">
            <h3 className="text-lg font-light text-black mb-4">Configuración</h3>
            
            <div className="border border-gray-200 rounded-2xl overflow-hidden">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <span className="font-medium text-black">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {item.badge && (
                      <span className="bg-black text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Account Actions */}
          <div className="space-y-3">
            <h3 className="text-lg font-light text-black mb-4">Cuenta</h3>
            
            <button className="w-full p-4 border border-gray-200 rounded-2xl flex items-center justify-center gap-3 text-gray-700 hover:bg-gray-50 transition-colors">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Cerrar Sesión</span>
            </button>
          </div>

          {/* App Info */}
          <div className="text-center py-4 border-t border-gray-100">
            <p className="text-xs text-gray-400 mb-2">Pagox v1.0.0</p>
            <p className="text-xs text-gray-400">Tu pasaporte financiero</p>
          </div>

        </div>
      </div>

      {/* ELIMINAMOS ESTA LÍNEA QUE CAUSABA EL PROBLEMA */}
      {/* <BottomNav activeTab={activeTab} onNavigate={onNavigate} /> */}
    </div>
  )
}