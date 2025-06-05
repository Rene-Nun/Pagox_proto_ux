import MobileContainer from '../MobileContainer'
import Header from '../Header'
import BottomNav from '../BottomNav'
import { Lock, Calendar, Music, AlertTriangle } from 'lucide-react'

interface WalletScreenProps {
  onNavigate: (screen: string, tab?: string) => void
  activeTab: string
}

export default function WalletScreen({ onNavigate, activeTab }: WalletScreenProps) {
  return (
    <MobileContainer className="pb-20">
      <Header title="Mi Cartera" />

      <div className="p-4">
        {/* Locked Ticket Card */}
        <div className="bg-gray-800 text-white rounded-3xl p-6 relative overflow-hidden shadow-xl">
          <div className="absolute top-4 right-4 w-16 h-16 bg-white rounded-full opacity-10"></div>
          
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-1">Concierto Bad Bunny</h3>
              <p className="text-gray-300 text-sm">World Tour</p>
            </div>
            <div className="bg-yellow-500/20 p-3 rounded-full">
              <Lock className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
          
          {/* Ticket Visual */}
          <div className="bg-gray-700 rounded-2xl p-4 mb-6">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl aspect-[16/9] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative text-center">
                <Music className="w-16 h-16 text-white/80 mx-auto mb-2" />
                <p className="text-white text-xl font-bold">BAD BUNNY</p>
                <p className="text-white/80 text-sm">GENERAL • CDMX</p>
              </div>
              <div className="absolute top-4 right-4">
                <Lock className="w-6 h-6 text-white/60" />
              </div>
            </div>
          </div>

          {/* Lock Status */}
          <div className="bg-red-900/40 backdrop-blur-sm rounded-xl p-4 mb-6 border border-red-500/30">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="w-6 h-6 text-yellow-400" />
              <p className="text-yellow-400 font-bold text-lg">BLOQUEADO HASTA EL PAGO TOTAL</p>
            </div>
            <p className="text-gray-300 text-sm">
              Tu boleto se desbloqueará el 15 de Julio de 2025 una vez que finalices tus pagos.
            </p>
          </div>

          {/* Payment Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-700/50 rounded-xl p-3">
              <p className="text-gray-400 text-xs mb-1">Próximo Pago</p>
              <p className="text-lg font-bold">$400 MXN</p>
            </div>
            <div className="bg-gray-700/50 rounded-xl p-3">
              <p className="text-gray-400 text-xs mb-1">Vencimiento</p>
              <p className="text-lg font-bold">01/07/2025</p>
            </div>
          </div>
        </div>

        {/* Other Tickets Section */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-4">Otros Boletos</h3>
          <div className="bg-gray-100 rounded-2xl p-8 text-center">
            <Wallet className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No tienes más boletos</p>
            <button 
              onClick={() => onNavigate('home', 'home')}
              className="text-purple-600 font-medium mt-2 hover:underline"
            >
              Explorar experiencias
            </button>
          </div>
        </div>
      </div>

      <BottomNav activeTab={activeTab} onNavigate={onNavigate} />
    </MobileContainer>
  )
}