import { useState, useEffect } from 'react'
import MobileContainer from '../MobileContainer'
import Header from '../Header'
import { Lock, Unlock, Calendar, MapPin, Music, Plane, Eye, EyeOff, QrCode, DollarSign, X, TrendingUp, Sparkles } from 'lucide-react'

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
        paidAmount: 0,
        progress: 0,
        status: 'active',
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

  const calculateYunusRecommendation = (ticket: any) => {
    if (!ticket) return { price: 0, confidence: 0, trend: 'stable' }
    
    if (ticket.title === 'Vuelo CDMX - Cancún' && ticket.paidAmount === 600) {
      return {
        price: 600,
        confidence: 85,
        trend: 'stable',
        marketAnalysis: {
          demand: 'Media',
          competition: 'Baja',
          timing: 'Óptimo'
        }
      }
    }
    
    const basePrice = ticket.paidAmount
    const eventMultiplier = ticket.type === 'event' ? 1.2 : 1.1
    const progressBonus = ticket.progress / 100 * 0.3
    
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
      
      setTickets(prevTickets => 
        prevTickets.filter(t => t.id !== selectedTicket.id)
      )
      
      onResaleTicket(resaleData)
      
      setShowResaleModal(false)
      setSelectedTicket(null)
      setResalePrice('')
    }
  }

  const activeTickets = tickets.filter(t => t.status === 'active')
  const completedTickets = tickets.filter(t => t.status === 'completed')

  return (
    <MobileContainer className="bg-[#0e1027]">
      <style jsx>{`
        .scroll-container::-webkit-scrollbar {
          display: none;
        }
        .modal-scroll::-webkit-scrollbar {
          display: none;
        }
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .modal-backdrop {
          animation: fadeIn 0.3s ease-out;
        }
        .modal-content {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>

      <Header title="Mi Cartera" onNavigate={onNavigate} />
      
      <div className="scroll-container flex-1 overflow-y-auto pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div className="px-5 space-y-6">
          
          {/* Overview */}
          <div className="pt-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h1 className="text-2xl font-light text-white mb-1">Mis boletos</h1>
                <p className="text-sm text-gray-400">{tickets.length} en total</p>
              </div>
              <button
                onClick={() => setShowAmounts(!showAmounts)}
                className="p-2 hover:bg-[#1f203a] rounded-full transition-colors"
              >
                {showAmounts ? 
                  <Eye className="w-5 h-5 text-gray-400" /> : 
                  <EyeOff className="w-5 h-5 text-gray-400" />
                }
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#1f203a] rounded-2xl p-4 border border-[#2a2b45]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-[#0e1027] rounded-xl flex items-center justify-center">
                    <Lock className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-2xl font-light text-white">{activeTickets.length}</span>
                </div>
                <p className="text-xs text-gray-400">Activos</p>
              </div>
              <div className="bg-[#1f203a] rounded-2xl p-4 border border-[#2a2b45]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-[#003d90] rounded-xl flex items-center justify-center shadow-lg shadow-[#003d90]/30">
                    <Unlock className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-2xl font-light text-white">{completedTickets.length}</span>
                </div>
                <p className="text-xs text-gray-400">Completados</p>
              </div>
            </div>
          </div>

          {/* Completed Tickets */}
          {completedTickets.length > 0 && (
            <div>
              <h2 className="text-lg font-light text-white mb-4">Completados</h2>
              <div className="space-y-3">
                {completedTickets.map((ticket) => {
                  const Icon = getIcon(ticket.type)

                  return (
                    <div key={ticket.id} className="bg-gradient-to-br from-[#1f203a] to-[#0e1027] rounded-2xl p-5 border border-[#2a2b45] relative overflow-hidden">
                      <div className="absolute top-4 right-4">
                        <div className="w-8 h-8 bg-[#003d90] rounded-full flex items-center justify-center shadow-lg shadow-[#003d90]/30">
                          <Unlock className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-10 h-10 bg-[#003d90] rounded-full flex items-center justify-center shadow-lg shadow-[#003d90]/30">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 pr-10">
                          <h3 className="font-semibold text-white mb-1">{ticket.title}</h3>
                          <div className="flex items-center gap-3 text-xs text-gray-400">
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

                      <div className="grid grid-cols-3 gap-3 text-xs mb-4">
                        <div>
                          <p className="text-gray-400 mb-1">Tipo</p>
                          <p className="text-white font-medium">{ticket.ticketType}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 mb-1">Sección</p>
                          <p className="text-white font-medium">{ticket.section}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 mb-1">Asiento</p>
                          <p className="text-white font-medium">{ticket.seat}</p>
                        </div>
                      </div>

                      <button className="w-full bg-[#003d90] text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#0051c7] transition-all shadow-lg shadow-[#003d90]/30">
                        <QrCode className="w-4 h-4" />
                        Mostrar código QR
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Active Tickets */}
          {activeTickets.length > 0 && (
            <div className="pb-4">
              <h2 className="text-lg font-light text-white mb-4">Activos</h2>
              <div className="space-y-3">
                {activeTickets.map((ticket) => {
                  const Icon = getIcon(ticket.type)
                  const remaining = ticket.totalAmount - ticket.paidAmount

                  return (
                    <div key={ticket.id} className="bg-[#1f203a] border border-[#2a2b45] rounded-2xl p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="w-10 h-10 bg-[#0e1027] rounded-full flex items-center justify-center">
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-white mb-1">{ticket.title}</h3>
                            <div className="flex items-center gap-3 text-xs text-gray-400">
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
                        <Lock className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      </div>

                      <div className="bg-[#0e1027] rounded-xl p-4 mb-4 border border-[#2a2b45]">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-gray-400">Progreso de pago</span>
                          <span className="text-xs font-semibold text-white">{ticket.progress}%</span>
                        </div>
                        <div className="w-full bg-[#2a2b45] rounded-full h-2 mb-2">
                          <div 
                            className="bg-gradient-to-r from-[#003d90] to-[#0051c7] h-2 rounded-full transition-all duration-500" 
                            style={{ width: `${ticket.progress}%` }}
                          />
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-green-400">Pagado: {maskAmount(ticket.paidAmount)}</span>
                          <span className="text-gray-400">Restante: {maskAmount(remaining)}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3 text-xs mb-4">
                        <div>
                          <p className="text-gray-400 mb-1">Tipo</p>
                          <p className="text-white font-medium">{ticket.ticketType}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 mb-1">Cantidad</p>
                          <p className="text-white font-medium">{ticket.quantity}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 mb-1">Disponible</p>
                          <p className="text-white font-medium">{ticket.unlockDate}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleResaleClick(ticket)}
                        className="w-full bg-[#003d90] text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#0051c7] transition-all shadow-lg shadow-[#003d90]/30"
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
        <>
          <div 
            className="modal-backdrop fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowResaleModal(false)}
          />
          
          <div className="modal-content modal-scroll fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-h-[90vh] overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="sticky top-0 bg-white border-b border-gray-200 px-5 py-4 flex items-center justify-between rounded-t-3xl">
              <h3 className="text-xl font-bold text-gray-900">Configurar reventa</h3>
              <button
                onClick={() => setShowResaleModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="px-5 py-5 space-y-5">
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">{selectedTicket.title}</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Pagado: ${selectedTicket.paidAmount.toLocaleString()}</p>
                  <p>Restante: ${(selectedTicket.totalAmount - selectedTicket.paidAmount).toLocaleString()}</p>
                </div>
              </div>

              {/* Recomendación de Yunus */}
              <div className="bg-gradient-to-br from-[#1f203a] to-[#0e1027] rounded-2xl p-5 border border-[#2a2b45]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-[#003d90] rounded-full flex items-center justify-center shadow-lg shadow-[#003d90]/30">
                      <img 
                        src="/images/yunus.png" 
                        alt="Yunus AI"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white flex items-center gap-2">
                      Recomendación de Yunus
                      <Sparkles className="w-4 h-4 text-[#003d90]" />
                    </h4>
                    <p className="text-sm text-gray-400">Análisis de mercado en tiempo real</p>
                  </div>
                </div>

                {(() => {
                  const yunusRec = calculateYunusRecommendation(selectedTicket)
                  return (
                    <div className="space-y-3">
                      <div className="bg-[#0e1027] rounded-xl p-4 border border-[#2a2b45]">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-400">Precio óptimo sugerido</span>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4 text-green-400" />
                            <span className="text-sm font-semibold text-green-400">{yunusRec.confidence}% confianza</span>
                          </div>
                        </div>
                        <div className="text-3xl font-light text-white mb-1">
                          ${yunusRec.price.toLocaleString()}
                        </div>
                        <p className="text-xs text-gray-400">
                          Basado en {yunusRec.marketAnalysis.demand.toLowerCase()} demanda y competencia {yunusRec.marketAnalysis.competition.toLowerCase()}
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div className="bg-[#0e1027] rounded-lg p-3 border border-[#2a2b45]">
                          <p className="text-gray-400 mb-1">Demanda</p>
                          <p className="font-semibold text-white">{yunusRec.marketAnalysis.demand}</p>
                        </div>
                        <div className="bg-[#0e1027] rounded-lg p-3 border border-[#2a2b45]">
                          <p className="text-gray-400 mb-1">Competencia</p>
                          <p className="font-semibold text-white">{yunusRec.marketAnalysis.competition}</p>
                        </div>
                        <div className="bg-[#0e1027] rounded-lg p-3 border border-[#2a2b45]">
                          <p className="text-gray-400 mb-1">Timing</p>
                          <p className="font-semibold text-white">{yunusRec.marketAnalysis.timing}</p>
                        </div>
                      </div>
                    </div>
                  )
                })()}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Precio de venta
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">$</span>
                  <input
                    type="number"
                    value={resalePrice}
                    onChange={(e) => setResalePrice(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#003d90] focus:border-transparent text-gray-900"
                    placeholder="0"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  El comprador asumirá la deuda restante de ${(selectedTicket.totalAmount - selectedTicket.paidAmount).toLocaleString()}
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowResaleModal(false)}
                  className="flex-1 bg-gray-100 text-gray-900 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleResaleConfirm}
                  className="flex-1 bg-[#003d90] text-white py-3 rounded-xl font-semibold hover:bg-[#0051c7] transition-colors shadow-lg shadow-[#003d90]/30"
                  disabled={!resalePrice || parseInt(resalePrice) <= 0}
                >
                  Publicar
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </MobileContainer>
  )
}