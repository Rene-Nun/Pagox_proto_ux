import { useState, useEffect } from 'react'
import MobileContainer from '../MobileContainer'
import Header from '../Header'
import BottomNav from '../BottomNav'
import { Lock, Calendar, Music, AlertTriangle, Wallet } from 'lucide-react'

interface WalletScreenProps {
  onNavigate: (screen: string, tab?: string) => void
  activeTab: string
  purchasedEvent?: any
}

export default function WalletScreen({ onNavigate, activeTab, purchasedEvent }: WalletScreenProps) {
  const [tickets, setTickets] = useState<any[]>([])

  useEffect(() => {
    // Si viene de aceptar un plan, agregar el boleto
    if (purchasedEvent && purchasedEvent.event) {
      const newTicket = {
        ...purchasedEvent.event,
        purchaseDate: new Date().toISOString(),
        unlockDate: '2025-07-15', // Fecha ejemplo
        nextPayment: 400,
        nextPaymentDate: '2025-07-01'
      }
      setTickets([newTicket])
    }
  }, [purchasedEvent])

  return (
    <MobileContainer className="pb-20">
      <Header title="Mi Cartera" onNavigate={onNavigate} />

      <div className="p-4">
        {tickets.length > 0 ? (
          tickets.map((ticket, index) => (
            <div key={index} className="bg-gray-800 text-white rounded-3xl p-6 relative overflow-hidden shadow-xl mb-4">
              <div className="absolute top-4 right-4 w-16 h-16 bg-white rounded-full opacity-10"></div>
              
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">
                    {ticket.type === 'flight' ? 'Vuelo CDMX - Cancún' : `Concierto ${ticket.artist}`}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {ticket.type === 'flight' ? 'Aeroméxico' : ticket.tour}
                  </p>
                </div>
                <div className="bg-yellow-500/20 p-3 rounded-full">
                  <Lock className="w-8 h-8 text-yellow-400" />
                </div>
              </div>
              
              {/* Ticket Visual */}
              <div className="bg-gray-700 rounded-2xl p-4 mb-6">
                <div className={`bg-gradient-to-br ${ticket.gradient || 'from-yellow-400 to-orange-500'} rounded-xl aspect-[16/9] flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative text-center">
                    <Music className="w-16 h-16 text-white/80 mx-auto mb-2" />
                    <p className="text-white text-xl font-bold uppercase">{ticket.artist || 'EVENTO'}</p>
                    <p className="text-white/80 text-sm">
                      {ticket.type === 'flight' ? 'VUELO' : 'GENERAL'} • {ticket.city || 'CDMX'}
                    </p>
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
                  Tu boleto se desbloqueará el {ticket.unlockDate} una vez que finalices tus pagos.
                </p>
              </div>

              {/* Payment Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700/50 rounded-xl p-3">
                  <p className="text-gray-400 text-xs mb-1">Próximo Pago</p>
                  <p className="text-lg font-bold">${ticket.nextPayment} MXN</p>
                </div>
                <div className="bg-gray-700/50 rounded-xl p-3">
                  <p className="text-gray-400 text-xs mb-1">Vencimiento</p>
                  <p className="text-lg font-bold">{ticket.nextPaymentDate}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Wallet className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Tu cartera está vacía</h3>
            <p className="text-gray-600 text-center mb-6">
              Aún no tienes boletos. Explora nuestras experiencias y comienza a vivir tus sueños.
            </p>
            <button 
              onClick={() => onNavigate('home', 'home')}
              className="bg-purple-600 text-white px-6 py-3 rounded-full font-medium hover:bg-purple-700 transition-colors"
            >
              Explorar experiencias
            </button>
          </div>
        )}
      </div>

      <BottomNav activeTab={activeTab} onNavigate={onNavigate} />
    </MobileContainer>
  )
}