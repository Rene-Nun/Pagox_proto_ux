import { useState, useEffect } from 'react'
import Header from '../Header'
import { Lock, Calendar, Music, Plane, Unlock, Clock, TrendingUp } from 'lucide-react'

interface WalletScreenProps {
  onNavigate: (screen: string, tab?: string) => void
  activeTab: string
  purchasedEvent?: any
}

export default function WalletScreen({ onNavigate, activeTab, purchasedEvent }: WalletScreenProps) {
  const [tickets, setTickets] = useState<any[]>([
    {
      artist: 'Coldplay',
      tour: 'Music of the Spheres',
      type: 'concert',
      ticketType: 'general',
      quantity: 1,
      venue: 'Foro Sol',
      date: '15 Mar 2025',
      price: 1225,
      totalPaid: 3675,
      totalDebt: 7350,
      progress: 50,
      nextPayment: 1225,
      nextPaymentDate: '01/07/2025',
      unlockDate: '15/03/2025',
      gradient: 'from-blue-500 to-purple-600',
      icon: '🌟'
    },
    {
      artist: 'Vuelo CDMX - Cancún',
      tour: 'Aeroméxico',
      type: 'flight',
      ticketType: 'económico',
      quantity: 1,
      venue: 'AICM',
      date: '28 Jun 2025',
      price: 600,
      totalPaid: 600,
      totalDebt: 1800,
      progress: 33,
      nextPayment: 600,
      nextPaymentDate: '15/06/2025',
      unlockDate: '28/06/2025',
      gradient: 'from-sky-500 to-blue-600',
      icon: '✈️'
    }
  ])

  useEffect(() => {
    if (purchasedEvent?.newTicket) {
      const { event, ticket } = purchasedEvent.newTicket
      const newTicket = {
        ...event,
        ticketType: ticket.type,
        quantity: ticket.quantity,
        price: ticket.price,
        totalPaid: 0,
        totalDebt: ticket.price * ticket.quantity,
        progress: 0,
        nextPayment: Math.round((ticket.price * ticket.quantity * 0.8) / 3),
        nextPaymentDate: '01/07/2025',
        unlockDate: event.date || '31/12/2025',
        gradient: event.gradient || 'from-purple-500 to-pink-600',
        icon: event.emoji || '🎫'
      }
      setTickets(prevTickets => [...prevTickets, newTicket])
    }
  }, [purchasedEvent])

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <Header title="Mi Cartera" onNavigate={onNavigate} />

      {/* Scrollable Content con padding inferior agregado */}
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="p-4 space-y-4">
          {/* Header Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <Lock className="w-5 h-5 text-purple-600" />
                <span className="text-2xl font-bold">{tickets.length}</span>
              </div>
              <p className="text-sm text-gray-600">Boletos activos</p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="text-2xl font-bold">
                  ${tickets.reduce((sum, t) => sum + t.nextPayment, 0).toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-gray-600">Próximo pago total</p>
            </div>
          </div>

          {/* Tickets */}
          {tickets.map((ticket, index) => (
            <div key={index} className="bg-white rounded-3xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-all">
              {/* Ticket Header */}
              <div className={`bg-gradient-to-r ${ticket.gradient} p-5 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 text-6xl opacity-20">{ticket.icon}</div>

                <div className="flex items-start justify-between relative z-10">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{ticket.artist}</h3>
                    <p className="text-white/90 text-sm">{ticket.tour}</p>
                    <div className="flex items-center gap-3 mt-2 text-white/80 text-sm">
                      <span className="capitalize">{ticket.ticketType}</span>
                      <span>•</span>
                      <span>{ticket.quantity} {ticket.quantity > 1 ? 'boletos' : 'boleto'}</span>
                    </div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                    <Lock className="w-6 h-6" />
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-4 text-white/90 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{ticket.date}</span>
                  </div>
                  <span>•</span>
                  <span>{ticket.venue}</span>
                </div>
              </div>

              {/* Ticket Body */}
              <div className="p-5 space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Progreso de pago</span>
                    <span className="text-sm font-bold text-purple-600">{ticket.progress}%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`bg-gradient-to-r ${ticket.gradient} h-full rounded-full transition-all duration-500`}
                      style={{ width: `${ticket.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-500">${ticket.totalPaid.toLocaleString()} pagado</span>
                    <span className="text-xs text-gray-500">${ticket.totalDebt.toLocaleString()} total</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
                      <Lock className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-amber-800">Bloqueado hasta el pago total</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="w-3 h-3 text-amber-600" />
                        <p className="text-xs text-amber-700">Se desbloqueará el {ticket.unlockDate}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-500 mb-1">Próximo pago</p>
                    <p className="text-lg font-bold text-gray-900">${ticket.nextPayment.toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-500 mb-1">Vencimiento</p>
                    <p className="text-lg font-bold text-gray-900">{ticket.nextPaymentDate}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* BottomNav ha sido eliminado */}
    </div>
  )
}
