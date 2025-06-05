import MobileContainer from '../MobileContainer'
import Header from '../Header'
import BottomNav from '../BottomNav'
import { Calendar, CreditCard, Check, ArrowRight } from 'lucide-react'

interface HomeScreenProps {
  onNavigate: (screen: string, tab?: string) => void
  activeTab: string
}

export default function HomeScreen({ onNavigate, activeTab }: HomeScreenProps) {
  return (
    <MobileContainer className="pb-20">
      <Header showLogo={true} />
      
      {/* Score Card */}
      <div className="m-4 p-6 bg-gray-800 text-white rounded-2xl relative overflow-hidden shadow-lg animate-fade-in">
        <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full opacity-20"></div>
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-gray-400 text-sm mb-2">Tu score pagox</p>
            <p className="text-6xl font-bold">750</p>
          </div>
          <div className="bg-green-500 px-3 py-1 rounded-full text-sm flex items-center gap-1">
            <Check className="w-4 h-4" />
            Activo
          </div>
        </div>
        <p className="text-gray-300 text-sm mb-4">
          Desbloquea productos futuros y facilita tu regreso al sistema financiero tradicional
        </p>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1">
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full transition-all duration-500" style={{ width: '88%' }}></div>
            </div>
          </div>
          <p className="text-xs text-gray-400 whitespace-nowrap">Score máximo: 850</p>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">ID: PX-2025-0729</span>
          <span className="font-medium">MARÍA PÉREZ</span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex justify-around mx-4 mb-6 gap-4">
        <div className="flex-1 bg-white rounded-xl p-4 shadow-sm text-center">
          <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <p className="text-xs text-gray-600">En 12 días</p>
          <p className="text-2xl font-bold">$1,825</p>
          <p className="text-xs text-gray-600">Próximo pago</p>
        </div>
        <div className="flex-1 bg-white rounded-xl p-4 shadow-sm text-center">
          <CreditCard className="w-8 h-8 text-purple-500 mx-auto mb-2" />
          <p className="text-xs text-gray-600">Activos</p>
          <p className="text-2xl font-bold">2</p>
          <p className="text-xs text-gray-600">Planes vigentes</p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mx-4 mb-6">
        <h2 className="text-xl font-bold mb-2">Cumple tus sueños con pagox</h2>
        <p className="text-gray-600 text-sm mb-4">
          Arma ahora tu aventura con nuestras plataformas asociadas
        </p>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-3xl mb-1">✈️</div>
              <p className="text-xs">Viajes</p>
            </div>
          </div>
          <div className="aspect-square rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-3xl mb-1">🎵</div>
              <p className="text-xs">Eventos</p>
            </div>
          </div>
          <div className="aspect-square rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-3xl mb-1">🏨</div>
              <p className="text-xs">Hoteles</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => onNavigate('partner')}
          className="w-full bg-black text-white py-4 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors"
        >
          Explorar <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <BottomNav activeTab={activeTab} onNavigate={onNavigate} />
    </MobileContainer>
  )
}