import { useState, useEffect } from 'react'
import Header from '../Header'
import { Lock, Unlock, Calendar, MapPin, Music, Plane, Eye, EyeOff, QrCode, DollarSign, X, TrendingUp, Brain } from 'lucide-react'

interface WalletScreenProps {
  onNavigate: (screen: string, tab?: string) => void
  activeTab: string
  purchasedEvent?: any
  onResaleTicket?: (ticketData: any) => void
}

export default function WalletScreen({ onNavigate, activeTab, purchasedEvent, onResaleTicket }: WalletScreenProps) {
  const [showAmounts, setShowAmounts] = useState(true)
  const [showResaleModal, setShowResaleModal] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<any>(null)
  const [resalePrice, setResalePrice] = useState('')
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
      status: 'active',
      unlockDate: '01 Mar 2025',
      qrCode: 'CLD2025FORO15MAR'
    },
    {
      id: 2,
      title: 'Vuelo CDMX - Cancún',
      venue: 'Aeroméxico',
      date: '28 Jun 2025',
      time: '14:30',
      type: 'travel',
      ticketType: 'Económico',
      section: '12F',
      seat: 'Ventana',
      quantity: 1,
      totalAmount: 1800,
      paidAmount: 600,
      progress: 33,
      status: 'active',
      unlockDate: 'Al completar pago',
      qrCode: 'AM2025CUN28JUN'
    },
    {
      id: 3,
      title: 'Bruno Mars - 24K Magic Tour',
      venue: 'Palacio de los Deportes',
      date: '15 Nov 2024',
      time: '21:00',
      type: 'event',
      ticketType: 'VIP',
      section: 'Pista',
      seat: 'Standing',
      quantity: 1,
      totalAmount: 4500,
      paidAmount: 4500,
      progress: 100,
      status: 'completed',
      unlockDate: 'Disponible',
      qrCode: 'BM2024PALACIO15NOV'
    }
  ])

  useEffect(() => {
    if (purchasedEvent?.newTicket) {
      const { event, ticket } = purchasedEvent.newTicket
      
      const newTicket = {
        id: Date.now(),
        title: event.artist || event.title || 'Evento',
        venue: event.venue || 'Venue',
        date: event.date || '31 Dic 2025',
        time: '20:00',
        type: event.type || 'event',
        ticketType: ticket.type || 'General',
        section: 'TBD',
        seat: 'TBD', 
        quantity: ticket.quantity || 1,
        totalAmount: ticket.price * ticket.quantity,
        paidAmount: 0, // Nuevo boleto empieza sin pagos
        progress: 0,   // 0% progreso inicial
        status: 'active', // Siempre empieza como activo
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

  // Calcular recomendación de precio de Yunus
  const calculateYunusRecommendation = (ticket: any) => {
    if (!ticket) return { price: 0, confidence: 0, trend: 'stable' }
    
    // Caso específico para el vuelo CDMX - Cancún: recomendar exactamente lo pagado
    if (ticket.title === 'Vuelo CDMX - Cancún' && ticket.paidAmount === 600) {
      return {
        price: 600, // Exactamente lo que ha pagado
        confidence: 85,
        trend: 'stable',
        marketAnalysis: {
          demand: 'Media',
          competition: 'Baja',
          timing: 'Óptimo'
        }
      }
    }
    
    // Simulación de análisis de Yunus para otros tickets
    const basePrice = ticket.paidAmount
    const eventMultiplier = ticket.type === 'event' ? 1.2 : 1.1 // Eventos tienen mejor reventa
    const progressBonus = ticket.progress / 100 * 0.3 // Más progreso = mejor precio
    
    const recommendedPrice = Math.round(basePrice * eventMultiplier * (1 + progressBonus))
    const confidence = ticket.type === 'event' ? 88 : 72
    const trend = recommendedPrice > basePrice ? 'up' : 'stable'
    
    return {
      price: recommendedPrice,
      confidence,
      trend,
      marketAnalysis: {
        demand: ticket.type === 'event' ? 'Alta' : 'Media',
        competition: 'Baja',
        timing: 'Óptimo'
      }
    }
  }

  const handleResaleClick = (ticket: any) => {
    setSelectedTicket(ticket)
    const yunusRec = calculateYunusRecommendation(ticket)
    setResalePrice(yunusRec.price.toString())
    setShowResaleModal(true)
  }

  const handleResaleConfirm = () => {
    if (selectedTicket && resalePrice && onResaleTicket) {
      const resaleData = {
        ...selectedTicket,
        resalePrice: parseInt(resalePrice),
        status: 'for_sale'
      }
      
      // Remover ticket de la wallet
      setTickets(prevTickets => 
        prevTickets.filter(t => t.id !== selectedTicket.id)
      )
      
      // Notificar al componente padre
      onResaleTicket(resaleData)
      
      setShowResaleModal(false)
      setSelectedTicket(null)
      setResalePrice('')
    }
  }

  const activeTickets = tickets.filter(t => t.status === 'active')
  const completedTickets = tickets.filter(t => t.status === 'completed')

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
                  <span className="text-2xl font-light text-black">{activeTickets.length}</span>
                </div>
                <p className="text-xs text-gray-500">Activos</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <Unlock className="w-5 h-5 text-gray-600" />
                  <span className="text-2xl font-light text-black">{completedTickets.length}</span>
                </div>
                <p className="text-xs text-gray-500">Completados</p>
              </div>
            </div>
          </div>

          {/* Completed Tickets - Con QR disponible */}
          {completedTickets.length > 0 && (
            <div>
              <h2 className="text-lg font-light text-black mb-4">Completados</h2>
              <div className="space-y-4">
                {completedTickets.map((ticket) => {
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

          {/* Active Tickets - En proceso de pago */}
          {activeTickets.length > 0 && (
            <div className="pb-6">
              <h2 className="text-lg font-light text-black mb-4">Activos</h2>
              <div className="space-y-4">
                {activeTickets.map((ticket) => {
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

                      <div className="grid grid-cols-3 gap-3 text-xs mb-4">
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

                      {/* Botón de Reventa */}
                      <button
                        onClick={() => handleResaleClick(ticket)}
                        className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
                      >
                        <DollarSign className="w-4 h-4" />
                        Poner en reventa
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Modal de Reventa */}
      {showResaleModal && selectedTicket && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
          <div className="bg-white w-full max-w-[390px] rounded-t-3xl p-6 pb-8 transform transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-black">Configurar reventa</h3>
              <button
                onClick={() => setShowResaleModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-medium text-black mb-2">{selectedTicket.title}</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Pagado: ${selectedTicket.paidAmount.toLocaleString()}</p>
                  <p>Restante: ${(selectedTicket.totalAmount - selectedTicket.paidAmount).toLocaleString()}</p>
                </div>
              </div>

              {/* Recomendación de Yunus */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-5 border border-blue-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-white rounded-full border border-blue-200 flex items-center justify-center shadow-sm">
                      <img 
                        src="images/yunus.png" 
                        alt="Yunus AI"
                        className="w-8 h-8 rounded-full"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement!.innerHTML = '<span class="text-lg font-bold text-blue-600">Y</span>';
                        }}
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h4 className="font-medium text-black">Recomendación de Yunus</h4>
                    <p className="text-sm text-blue-600">Análisis de mercado en tiempo real</p>
                  </div>
                </div>

                {(() => {
                  const yunusRec = calculateYunusRecommendation(selectedTicket)
                  return (
                    <div className="space-y-3">
                      <div className="bg-white rounded-xl p-4 border border-blue-100">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600">Precio óptimo sugerido</span>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4 text-green-500" />
                            <span className="text-sm font-medium text-green-600">{yunusRec.confidence}% confianza</span>
                          </div>
                        </div>
                        <div className="text-2xl font-light text-black mb-1">
                          ${yunusRec.price.toLocaleString()}
                        </div>
                        <p className="text-xs text-gray-500">
                          Basado en {yunusRec.marketAnalysis.demand.toLowerCase()} demanda y competencia {yunusRec.marketAnalysis.competition.toLowerCase()}
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-3 text-center text-xs">
                        <div className="bg-white rounded-lg p-2 border border-blue-100">
                          <p className="text-gray-500 mb-1">Demanda</p>
                          <p className="font-medium text-black">{yunusRec.marketAnalysis.demand}</p>
                        </div>
                        <div className="bg-white rounded-lg p-2 border border-blue-100">
                          <p className="text-gray-500 mb-1">Competencia</p>
                          <p className="font-medium text-black">{yunusRec.marketAnalysis.competition}</p>
                        </div>
                        <div className="bg-white rounded-lg p-2 border border-blue-100">
                          <p className="text-gray-500 mb-1">Timing</p>
                          <p className="font-medium text-black">{yunusRec.marketAnalysis.timing}</p>
                        </div>
                      </div>
                    </div>
                  )
                })()}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Precio de venta
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={resalePrice}
                    onChange={(e) => setResalePrice(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  El comprador asumirá la deuda restante de ${(selectedTicket.totalAmount - selectedTicket.paidAmount).toLocaleString()}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowResaleModal(false)}
                  className="flex-1 bg-gray-100 text-gray-900 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleResaleConfirm}
                  className="flex-1 bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
                  disabled={!resalePrice || parseInt(resalePrice) <= 0}
                >
                  Publicar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}