import { useState, useEffect } from 'react'
import MobileContainer from '../MobileContainer'
import Header from '../Header'
import { Calendar, CreditCard, ChevronRight, TrendingUp, Eye, EyeOff, X, Send, Sparkles } from 'lucide-react'

interface HomeScreenProps {
  onNavigate: (screen: string, tab?: string) => void
  activeTab: string
}

type TabType = 'flights' | 'hotels' | 'events'

export default function HomeScreen({ onNavigate, activeTab }: HomeScreenProps) {
  const [selectedTab, setSelectedTab] = useState<TabType>('flights')
  const [showBalance, setShowBalance] = useState(true)
  const [showFinanceModal, setShowFinanceModal] = useState(false)
  const [showYunusChat, setShowYunusChat] = useState(false)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [chatInput, setChatInput] = useState('')
  const [autoRotate, setAutoRotate] = useState(true)

  // Auto-cambio de cards cada 3 segundos SOLO si autoRotate está activo
  useEffect(() => {
    if (!autoRotate) return

    const interval = setInterval(() => {
      setCurrentCardIndex((prev) => (prev === 0 ? 1 : 0))
    }, 3000)
    return () => clearInterval(interval)
  }, [autoRotate])

  const handleTabChange = (tab: TabType) => {
    setSelectedTab(tab)
  }

  const handleSearchClick = () => {
    if (selectedTab === 'flights') {
      onNavigate('flightSearch')
    } else if (selectedTab === 'hotels') {
      onNavigate('hotelSearch')
    } else if (selectedTab === 'events') {
      // Navegar a TicketSelection SIN evento seleccionado
      onNavigate('ticketSelection')
    }
  }

  const getSearchPlaceholder = () => {
    switch (selectedTab) {
      case 'flights':
        return 'Buscar vuelos'
      case 'hotels':
        return 'Buscar hoteles'
      case 'events':
        return 'Buscar eventos'
    }
  }

  // Manejar clic manual en los indicadores
  const handleIndicatorClick = (index: number) => {
    setCurrentCardIndex(index)
    setAutoRotate(false) // Detener rotación automática
    
    // Reactivar rotación después de 5 segundos de inactividad
    setTimeout(() => {
      setAutoRotate(true)
    }, 5000)
  }

  // Manejar swipe en las cards
  const handleCardSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setCurrentCardIndex(1)
    } else {
      setCurrentCardIndex(0)
    }
    setAutoRotate(false)
    
    setTimeout(() => {
      setAutoRotate(true)
    }, 5000)
  }

  const quickPrompts = [
    "Busca planes con mi presupuesto en mi ciudad",
    "Recomiéndame hoteles para mi próximo destino",
    "Ayúdame a planear unas vacaciones sorpresa"
  ]

  return (
    <MobileContainer className="bg-[#0e1028]">
      <style jsx>{`
        .scroll-container::-webkit-scrollbar {
          display: none;
        }
        .cards-carousel::-webkit-scrollbar {
          display: none;
        }
        .modal-scroll::-webkit-scrollbar {
          display: none;
        }
        .chat-scroll::-webkit-scrollbar {
          display: none;
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .gradient-animated {
          animation: gradient 3s ease infinite;
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

      <Header showLogo={true} onNavigate={onNavigate} />

      <div 
        className="scroll-container flex-1 overflow-y-auto pb-4 bg-[#0e1028]" 
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none' 
        }}
      >
        <div className="bg-[#0e1028]">
          
          {/* Saldo Total */}
          <div className="px-5 pt-5 pb-5">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-sm text-gray-400">Gasolina disponible para tu próxima aventura</h3>
              <button 
                onClick={() => setShowBalance(!showBalance)}
                className="p-1 hover:bg-[#1f203a] rounded-full transition-colors"
              >
                {showBalance ? (
                  <Eye className="w-4 h-4 text-gray-400" />
                ) : (
                  <EyeOff className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
            <div className="mb-1">
              <span className="text-4xl font-light text-white">
                {showBalance ? '$3,500' : '•••••'}
              </span>
              <span className="text-lg text-gray-400 ml-2">MXN</span>
            </div>
            <div className="text-sm text-gray-400">
              <span className="text-green-400">Usado $1,825</span>
              <span className="text-gray-500 mx-2">24 h</span>
            </div>
          </div>

          {/* Barra de Yunus AI */}
          <div className="px-5 pb-5">
            <div className="relative">
              <button 
                onClick={() => setShowYunusChat(true)}
                className="w-full bg-[#1f203a] rounded-full pl-14 pr-5 py-3.5 border border-[#2a2b45] hover:border-[#003d90] transition-all text-left"
              >
                <span className="text-gray-400 text-sm overflow-hidden whitespace-nowrap block">
                  Usa yunus para explorar, planear o comprar tu Aventura
                </span>
              </button>
              <div className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#1f203a] rounded-full flex items-center justify-center border border-[#2a2b45]">
                <img 
                  src="/images/yunus.png" 
                  alt="Yunus" 
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* CARDS ESTILO CAMPAÑA - AUTO CARRUSEL CON INTERACCIÓN */}
          <div className="px-5 pb-2">
            <div 
              className="relative overflow-hidden rounded-3xl"
              onTouchStart={(e) => {
                const touchStart = e.touches[0].clientX
                const handleTouchEnd = (endEvent: TouchEvent) => {
                  const touchEnd = endEvent.changedTouches[0].clientX
                  const diff = touchStart - touchEnd
                  
                  if (Math.abs(diff) > 50) { // Mínimo 50px de swipe
                    handleCardSwipe(diff > 0 ? 'left' : 'right')
                  }
                  
                  document.removeEventListener('touchend', handleTouchEnd)
                }
                document.addEventListener('touchend', handleTouchEnd)
              }}
            >
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentCardIndex * 100}%)` }}
              >
                {/* Card Marketplace */}
                <div className="w-full flex-shrink-0">
                  <div className="bg-gradient-to-br from-[#1f203a] to-[#0e1028] rounded-3xl p-5 border border-[#2a2b45] shadow-xl h-[170px] flex items-center">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex-1 pr-3">
                        <h3 className="text-lg font-bold text-white mb-2">Marketplace</h3>
                        <p className="text-xs text-gray-400 leading-relaxed mb-4">
                          Ofertas con hasta 70% de descuento y compras de último momento
                        </p>
                        <button 
                          onClick={() => onNavigate('marketplace', 'marketplace')}
                          className="bg-[#003d90] text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-[#0051c7] transition-all shadow-lg shadow-[#003d90]/30"
                        >
                          Ver ofertas
                        </button>
                      </div>
                      <div className="flex-shrink-0">
                        <img 
                          src="/images/MarketplaceIcon.png" 
                          alt="Marketplace" 
                          className="w-20 h-20 object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Finanzas */}
                <div className="w-full flex-shrink-0 pl-5">
                  <div className="bg-gradient-to-br from-[#1f203a] to-[#0e1028] rounded-3xl p-5 border border-[#2a2b45] shadow-xl h-[170px] flex items-center">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex-1 pr-3">
                        <h3 className="text-lg font-bold text-white mb-2">Pagos y Finanzas</h3>
                        <p className="text-xs text-gray-400 leading-relaxed mb-4">
                          Consulta tu próximo pago, revisa tus planes activos y conoce tu Score Turista
                        </p>
                        <button 
                          onClick={() => setShowFinanceModal(true)}
                          className="bg-[#003d90] text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-[#0051c7] transition-all shadow-lg shadow-[#003d90]/30"
                        >
                          Ver detalles
                        </button>
                      </div>
                      <div className="flex-shrink-0">
                        <img 
                          src="/images/PlansIcon.png" 
                          alt="Finanzas" 
                          className="w-20 h-20 object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Indicadores de página - AHORA INTERACTIVOS */}
            <div className="flex justify-center gap-2 mt-3">
              <button
                onClick={() => handleIndicatorClick(0)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentCardIndex === 0 ? 'bg-[#003d90] w-4' : 'bg-gray-600'
                }`}
              />
              <button
                onClick={() => handleIndicatorClick(1)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentCardIndex === 1 ? 'bg-[#003d90] w-4' : 'bg-gray-600'
                }`}
              />
            </div>
          </div>

          {/* SEPARADOR DE BORDE A BORDE */}
          <div className="py-5">
            <div className="w-full h-0.5 bg-[#2a2b45]"></div>
          </div>

          {/* Search Bar - Botón azul */}
          <div className="px-5 pb-4">
            <div className="relative">
              <input
                type="text"
                placeholder={getSearchPlaceholder()}
                onClick={handleSearchClick}
                className="w-full bg-[#1f203a] rounded-full px-5 py-3.5 pr-14 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#003d90] cursor-pointer border border-[#2a2b45]"
                readOnly
              />
              <button 
                onClick={handleSearchClick}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#003d90] rounded-full flex items-center justify-center hover:bg-[#0051c7] transition-colors"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="px-5">
            <div className="flex gap-3">
              {/* Vuelos Tab */}
              <button
                onClick={() => handleTabChange('flights')}
                className={`flex-1 flex flex-col items-center gap-1.5 py-3 px-3 transition-all duration-300 rounded-2xl border ${
                  selectedTab === 'flights' 
                    ? 'bg-[#1f203a] border-[#003d90] shadow-lg shadow-[#003d90]/20' 
                    : 'bg-[#1f203a] border-[#2a2b45]'
                }`}
              >
                <img 
                  src="/images/VuelosIcon.png" 
                  alt="Vuelos" 
                  className="w-10 h-10 object-contain"
                  style={{
                    filter: selectedTab === 'flights' ? 'drop-shadow(0 0 8px rgba(0, 61, 144, 0.6))' : 'none'
                  }}
                />
                <p className={`text-xs transition-all ${
                  selectedTab === 'flights' ? 'font-bold text-white' : 'font-normal text-gray-400'
                }`}>
                  Vuelos
                </p>
                {selectedTab === 'flights' && (
                  <div className="w-8 h-1 bg-white rounded-full"></div>
                )}
              </button>

              {/* Hoteles Tab */}
              <button
                onClick={() => handleTabChange('hotels')}
                className={`flex-1 flex flex-col items-center gap-1.5 py-3 px-3 transition-all duration-300 rounded-2xl border ${
                  selectedTab === 'hotels' 
                    ? 'bg-[#1f203a] border-[#003d90] shadow-lg shadow-[#003d90]/20' 
                    : 'bg-[#1f203a] border-[#2a2b45]'
                }`}
              >
                <img 
                  src="/images/HotelesIcon.png" 
                  alt="Hospedaje" 
                  className="w-10 h-10 object-contain"
                  style={{
                    filter: selectedTab === 'hotels' ? 'drop-shadow(0 0 8px rgba(0, 61, 144, 0.6))' : 'none'
                  }}
                />
                <p className={`text-xs transition-all ${
                  selectedTab === 'hotels' ? 'font-bold text-white' : 'font-normal text-gray-400'
                }`}>
                  Hospedaje
                </p>
                {selectedTab === 'hotels' && (
                  <div className="w-8 h-1 bg-white rounded-full"></div>
                )}
              </button>

              {/* Eventos Tab */}
              <button
                onClick={() => handleTabChange('events')}
                className={`flex-1 flex flex-col items-center gap-1.5 py-3 px-3 transition-all duration-300 rounded-2xl border ${
                  selectedTab === 'events' 
                    ? 'bg-[#1f203a] border-[#003d90] shadow-lg shadow-[#003d90]/20' 
                    : 'bg-[#1f203a] border-[#2a2b45]'
                }`}
              >
                <img 
                  src="/images/ExperienciasIcon.png" 
                  alt="Eventos" 
                  className="w-10 h-10 object-contain"
                  style={{
                    filter: selectedTab === 'events' ? 'drop-shadow(0 0 8px rgba(0, 61, 144, 0.6))' : 'none'
                  }}
                />
                <p className={`text-xs transition-all ${
                  selectedTab === 'events' ? 'font-bold text-white' : 'font-normal text-gray-400'
                }`}>
                  Eventos
                </p>
                {selectedTab === 'events' && (
                  <div className="w-8 h-1 bg-white rounded-full"></div>
                )}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* MODAL DE CHAT YUNUS */}
      {showYunusChat && (
        <>
          <div 
            className="modal-backdrop fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowYunusChat(false)}
          />
          
          <div className="modal-content fixed inset-0 bg-[#0e1028] z-50 flex flex-col">
            
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#2a2b45]">
              <div className="flex items-center gap-3">
                <img 
                  src="/images/yunus.png" 
                  alt="Yunus" 
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-lg font-semibold text-white">Yunus AI</h2>
                  <p className="text-xs text-gray-400">Tu asistente de viajes</p>
                </div>
              </div>
              <button 
                onClick={() => setShowYunusChat(false)}
                className="p-2 hover:bg-[#1f203a] rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6 chat-scroll" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <div className="flex items-start gap-3 mb-6">
                <img 
                  src="/images/yunus.png" 
                  alt="Yunus" 
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                />
                <div className="bg-[#1f203a] rounded-2xl rounded-tl-none px-4 py-3 max-w-[80%]">
                  <p className="text-sm text-white leading-relaxed">
                    ¡Hola! Soy Yunus, tu asistente de viajes. ¿En qué puedo ayudarte hoy? 
                  </p>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <p className="text-xs text-gray-400 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Sugerencias para empezar
                </p>
                {quickPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => setChatInput(prompt)}
                    className="w-full bg-[#1f203a] hover:bg-[#2a2b45] border border-[#2a2b45] hover:border-[#003d90] rounded-xl px-4 py-3 text-left transition-all"
                  >
                    <p className="text-sm text-white">{prompt}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-[#2a2b45] px-5 py-4">
              <div className="relative">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                  className="w-full bg-[#1f203a] rounded-full px-5 py-3.5 pr-14 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#003d90] border border-[#2a2b45]"
                />
                <button 
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#003d90] rounded-full flex items-center justify-center hover:bg-[#0051c7] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!chatInput.trim()}
                >
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Yunus puede cometer errores. Verifica información importante.
              </p>
            </div>
          </div>
        </>
      )}

      {/* MODAL / BOTTOM SHEET DE FINANZAS */}
      {showFinanceModal && (
        <>
          <div 
            className="modal-backdrop fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowFinanceModal(false)}
          />
          
          <div className="modal-content modal-scroll fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-h-[85vh] overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            
            <div className="sticky top-0 bg-white border-b border-gray-200 px-5 py-4 flex items-center justify-between rounded-t-3xl">
              <h2 className="text-xl font-bold text-gray-900">Pagos y Finanzas</h2>
              <button 
                onClick={() => setShowFinanceModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="px-5 py-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#1f203a] rounded-2xl p-4 border border-[#2a2b45]">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 bg-[#0e1028] rounded-xl flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xs text-gray-400">En 12 días</span>
                  </div>
                  <p className="text-3xl font-light text-white mb-1">$1,825</p>
                  <p className="text-sm text-gray-400">Próximo pago</p>
                </div>

                <div className="bg-[#1f203a] rounded-2xl p-4 border border-[#2a2b45]">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 bg-[#0e1028] rounded-xl flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-white" />
                    </div>
                    <div className="w-2 h-2 bg-[#003d90] rounded-full shadow-lg shadow-[#003d90]/50"></div>
                  </div>
                  <p className="text-3xl font-light text-white mb-1">2</p>
                  <p className="text-sm text-gray-400">Planes activos</p>
                </div>
              </div>

              <div className="bg-[#1f203a] rounded-2xl p-4 border border-[#2a2b45]">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-[#003d90] rounded-xl flex items-center justify-center shadow-lg shadow-[#003d90]/30">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-3xl font-light text-white mb-1">750</p>
                <p className="text-sm text-gray-400 mb-3">Score Turista</p>
                <div className="w-full bg-[#0e1028] rounded-full h-2">
                  <div className="bg-gradient-to-r from-[#003d90] to-[#0051c7] h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>

              <div className="bg-[#1f203a] rounded-2xl p-5 border border-[#2a2b45]">
                <h3 className="text-lg font-semibold text-white mb-3">Resumen Financiero</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Saldo disponible</span>
                    <span className="text-base font-semibold text-white">$3,500 MXN</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Total usado</span>
                    <span className="text-base font-semibold text-green-400">$1,825 MXN</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Crédito restante</span>
                    <span className="text-base font-semibold text-white">$1,675 MXN</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </MobileContainer>
  )
}