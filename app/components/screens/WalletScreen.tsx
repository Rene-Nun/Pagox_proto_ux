import { useState, useEffect } from 'react'
import Header from '../Header'
import { Lock, Unlock, Calendar, MapPin, Music, Plane, Eye, EyeOff, QrCode } from 'lucide-react'

interface WalletScreenProps {
  onNavigate: (screen: string, tab?: string) => void
  activeTab: string
  purchasedEvent?: any
}

export default function WalletScreen({ onNavigate, activeTab, purchasedEvent }: WalletScreenProps) {
  const [showAmounts, setShowAmounts] = useState(true)
  const [tickets, setTickets] = useState<any[]>([
    {
      id: 1,
      title: 'Coldplay - Music of the Spheres',
      venue: 'Foro Sol',
      date: '15 Mar 2025',
      time: '20:00',
      type: 'event',
      ticketType: 'General',
      section: 'A1',
      seat: '15-16',
      quantity: 2,
      totalAmount: 7350,
      paidAmount: 3675,
      progress: 50,
      status: 'locked',
      unlockDate: '01 Mar 2025',
      qrCode: 'CLD2025FORO15MAR'
    },
    {
      id: 2,
      title: 'Vuelo CDMX - Cancún',
      venue: 'Aeromexico',
      date: '28 Jun 2025',
      time: '14:30',
      type: 'travel',
      ticketType: 'Económico',
      section: '12F',
      seat: 'Ventana',
      quantity: 1,
      totalAmount: 1800,
      paidAmount: 1800,
      progress: 100,
      status: 'unlocked',
      unlockDate: 'Disponible',
      qrCode: 'AM2025CUN28JUN'
    }
  ])

  useEffect(() => {
    if (purchasedEvent?.newTicket) {
      const { event, ticket } = purchasedEvent.newTicket
      const newTicket = {
        id: Date.now(),
        title: event.artist || event.title,
        venue: event.venue,
        date: event.date,
        time: '20:00',
        type: event.type || 'event',
        ticketType: ticket.type,
        section: 'TBD',
        seat: 'TBD',
        quantity: ticket.quantity,
        totalAmount: ticket.price * ticket.quantity,
        paidAmount: 0,
        progress: 0,
        status: 'locked',
        unlockDate: 'Al completar pago',
        qrCode: `TKT${Date.now()}`
      }
      setTickets(prevTickets => [...prevTickets, newTicket])
    }
  }, [purchasedEvent])

  const getIcon = (type: string) => {
    return type === 'event' ? Music : Plane
  }

  const maskAmount = (amount: number) => {
    return showAmounts ? `$${amount.toLocaleString()}` : '••••'
  }

  const lockedTickets = tickets.filter(t => t.status === 'locked')
  const unlockedTickets = tickets.filter(t => t.status === 'unlocked')

  return (
    <div className="h-full flex flex-col bg-white">
      <Header title="Mi Cartera" onNavigate={onNavigate} />
      
      <div className="flex-1 overflow-y-auto">
        <div className="px-5 space-y-8">
          
          {/* Overview */}
          <div className="pt-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-light text-black mb-1">Mis boletos</h1>
                <p className="text-sm text-gray-500">{tickets.length} en total</p>
              </div>
              <button
                onClick={() => setShowAmounts(!showAmounts)}
                className="p-3 hover:bg-gray-50 rounded-full transition-colors"
              >
                {showAmounts ? 
                  <Eye className="w-5 h-5 text-gray-600" /> : 
                  <EyeOff className="w-5 h-5 text-gray-600" />
                }
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <Lock className="w-5 h-5 text-gray-600" />
                  <span className="text-2xl font-light text-black">{lockedTickets.length}</span>
                </div>
                <p className="text-xs text-gray-500">En proceso de pago</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <Unlock className="w-5 h-5 text-gray-600" />
                  <span className="text-2xl font-light text-black">{unlockedTickets.length}</span>
                </div>
                <p className="text-xs text-gray-500">Listos para usar</p>
              </div>
            </div>
          </div>

          {/* Unlocked Tickets */}
          {unlockedTickets.length > 0 && (
            <div>
              <h2 className="text-lg font-light text-black mb-4">Disponibles</h2>
              <div className="space-y-4">
                {unlockedTickets.map((ticket) => {
                  const Icon = getIcon(ticket.type)

                  return (
                    <div key={ticket.id} className="bg-black rounded-2xl p-5 text-white relative overflow-hidden">
                      <div className="absolute top-4 right-4">
                        <Unlock className="w-5 h-5 text-white/60" />
                      </div>
                      
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-white mb-1">{ticket.title}</h3>
                          <div className="flex items-center gap-3 text-xs text-white/70">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {ticket.venue}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {ticket.date}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-xs mb-4">
                        <div>
                          <p className="text-white/60 mb-1">Tipo</p>
                          <p className="text-white font-medium">{ticket.ticketType}</p>
                        </div>
                        <div>
                          <p className="text-white/60 mb-1">Sección</p>
                          <p className="text-white font-medium">{ticket.section}</p>
                        </div>
                        <div>
                          <p className="text-white/60 mb-1">Asiento</p>
                          <p className="text-white font-medium">{ticket.seat}</p>
                        </div>
                      </div>

                      <button className="w-full bg-white text-black py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors">
                        <QrCode className="w-4 h-4" />
                        Mostrar código QR
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Locked Tickets */}
          {lockedTickets.length > 0 && (
            <div className="pb-6">
              <h2 className="text-lg font-light text-black mb-4">En proceso</h2>
              <div className="space-y-4">
                {lockedTickets.map((ticket) => {
                  const Icon = getIcon(ticket.type)
                  const remaining = ticket.totalAmount - ticket.paidAmount

                  return (
                    <div key={ticket.id} className="border border-gray-200 rounded-2xl p-5 hover:border-gray-300 transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <Icon className="w-5 h-5 text-gray-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-black mb-1">{ticket.title}</h3>
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {ticket.venue}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {ticket.date}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Lock className="w-5 h-5 text-gray-400" />
                      </div>

                      <div className="bg-gray-50 rounded-xl p-4 mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-gray-500">Progreso de pago</span>
                          <span className="text-xs font-medium text-black">{ticket.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1 mb-2">
                          <div 
                            className="bg-black h-1 rounded-full transition-all duration-500" 
                            style={{ width: `${ticket.progress}%` }}
                          />
                        </div>
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>Pagado: {maskAmount(ticket.paidAmount)}</span>
                          <span>Restante: {maskAmount(remaining)}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3 text-xs">
                        <div>
                          <p className="text-gray-500 mb-1">Tipo</p>
                          <p className="text-black font-medium">{ticket.ticketType}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 mb-1">Cantidad</p>
                          <p className="text-black font-medium">{ticket.quantity}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 mb-1">Disponible</p>
                          <p className="text-black font-medium">{ticket.unlockDate}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}