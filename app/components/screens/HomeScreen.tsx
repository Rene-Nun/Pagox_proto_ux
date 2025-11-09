import { useState } from 'react'
import MobileContainer from '../MobileContainer'
import Header from '../Header'
import { Calendar, CreditCard, Clock, Tag, ChevronRight, TrendingUp, Eye, X } from 'lucide-react'

interface HomeScreenProps {
  onNavigate: (screen: string, tab?: string) => void
  activeTab: string
}

type TabType = 'flights' | 'hotels' | 'events'

export default function HomeScreen({ onNavigate, activeTab }: HomeScreenProps) {
  const [selectedTab, setSelectedTab] = useState<TabType>('flights')
  const [showBalance, setShowBalance] = useState(true)
  const [showFinanceModal, setShowFinanceModal] = useState(false)

  const handleTabChange = (tab: TabType) => {
    setSelectedTab(tab)
  }

  const handleSearchClick = () => {
    if (selectedTab === 'flights') {
      onNavigate('flightSearch')
    } else if (selectedTab === 'hotels') {
      onNavigate('hotelSearch')
    } else if (selectedTab === 'events') {
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

  return (
    <MobileContainer className="bg-[#0e1028]">
      <style jsx>{`
        .scroll-container::-webkit-scrollbar {
          display: none;
        }
        .carousel-container::-webkit-scrollbar {
          display: none;
        }
        .cards-carousel::-webkit-scrollbar {
          display: none;
        }
        .modal-scroll::-webkit-scrollbar {
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
          <div className="px-5 pt-5 pb-4">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-sm text-gray-400">Saldo Total</h3>
              <button 
                onClick={() => setShowBalance(!showBalance)}
                className="p-1 hover:bg-[#1f203a] rounded-full transition-colors"
              >
                <Eye className="w-4 h-4 text-gray-400" />
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
          <div className="px-5 pb-4">
            <div className="relative">
              <button 
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
                className={`flex-1 flex flex-col items-center gap-2 py-4 px-3 transition-all duration-300 rounded-2xl border ${
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
                  <div className="w-8 h-1 bg-white rounded-full mt-1"></div>
                )}
              </button>

              {/* Hoteles Tab */}
              <button
                onClick={() => handleTabChange('hotels')}
                className={`flex-1 flex flex-col items-center gap-2 py-4 px-3 transition-all duration-300 rounded-2xl border ${
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
                  <div className="w-8 h-1 bg-white rounded-full mt-1"></div>
                )}
              </button>

              {/* Eventos Tab */}
              <button
                onClick={() => handleTabChange('events')}
                className={`flex-1 flex flex-col items-center gap-2 py-4 px-3 transition-all duration-300 rounded-2xl border ${
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
                  <div className="w-8 h-1 bg-white rounded-full mt-1"></div>
                )}
              </button>
            </div>
          </div>

          {/* SEPARADOR DE BORDE A BORDE */}
          <div className="py-6">
            <div className="w-full h-0.5 bg-[#2a2b45]"></div>
          </div>

          {/* Contenido */}
          <div className="space-y-4 px-5">
            {/* Stats Grid - SCROLL HORIZONTAL */}
            <div className="-mx-5">
              <div className="carousel-container overflow-x-auto pl-5" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
                <div className="flex gap-3 pb-2 pr-5">
                  <div className="bg-[#1f203a] rounded-2xl p-3.5 w-[160px] flex-shrink-0 border border-[#2a2b45]">
                    <div className="flex items-start justify-between mb-2">
                      <div className="w-8 h-8 bg-[#0e1028] rounded-xl flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-xs text-gray-400">En 12 días</span>
                    </div>
                    <p className="text-2xl font-light text-white mb-0.5">$1,825</p>
                    <p className="text-xs text-gray-400">Próximo pago</p>
                  </div>

                  <div className="bg-[#1f203a] rounded-2xl p-3.5 w-[160px] flex-shrink-0 border border-[#2a2b45]">
                    <div className="flex items-start justify-between mb-2">
                      <div className="w-8 h-8 bg-[#0e1028] rounded-xl flex items-center justify-center">
                        <CreditCard className="w-4 h-4 text-white" />
                      </div>
                      <div className="w-2 h-2 bg-[#003d90] rounded-full shadow-lg shadow-[#003d90]/50"></div>
                    </div>
                    <p className="text-2xl font-light text-white mb-0.5">2</p>
                    <p className="text-xs text-gray-400">Planes activos</p>
                  </div>

                  <div className="bg-[#1f203a] rounded-2xl p-3.5 w-[160px] flex-shrink-0 border border-[#2a2b45]">
                    <div className="flex items-start justify-between mb-2">
                      <div className="w-8 h-8 bg-[#003d90] rounded-xl flex items-center justify-center shadow-lg shadow-[#003d90]/30">
                        <TrendingUp className="w-4 h-4 text-white" />
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-2xl font-light text-white mb-0.5">750</p>
                    <p className="text-xs text-gray-400">Score Turista</p>
                  </div>
                </div>
              </div>
            </div>

            {/* NUEVAS CARDS ESTILO CAMPAÑA - CARRUSEL HORIZONTAL */}
            <div className="-mx-5">
              <div className="cards-carousel overflow-x-auto pl-5" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
                <div className="flex gap-3 pb-2 pr-5">
                  
                  {/* Card Marketplace */}
                  <div className="bg-gradient-to-br from-[#1f203a] to-[#0e1028] rounded-3xl p-5 w-[320px] flex-shrink-0 border border-[#2a2b45] shadow-xl">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">Marketplace</h3>
                        <p className="text-sm text-gray-400 leading-relaxed mb-4">
                          Descubre ofertas exclusivas con hasta 70% de descuento y aprovecha las compras de último momento
                        </p>
                        <button 
                          onClick={() => onNavigate('marketplace', 'marketplace')}
                          className="bg-[#003d90] text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-[#0051c7] transition-all shadow-lg shadow-[#003d90]/30"
                        >
                          Ver ofertas
                        </button>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <img 
                          src="/images/MarketplaceIcon.png" 
                          alt="Marketplace" 
                          className="w-24 h-24 object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card Finanzas */}
                  <div className="bg-gradient-to-br from-[#1f203a] to-[#0e1028] rounded-3xl p-5 w-[320px] flex-shrink-0 border border-[#2a2b45] shadow-xl">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">Pagos y Finanzas</h3>
                        <p className="text-sm text-gray-400 leading-relaxed mb-4">
                          Consulta tu próximo pago, revisa tus planes activos y conoce tu Score Turista
                        </p>
                        <button 
                          onClick={() => setShowFinanceModal(true)}
                          className="bg-[#003d90] text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-[#0051c7] transition-all shadow-lg shadow-[#003d90]/30"
                        >
                          Ver detalles
                        </button>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <img 
                          src="/images/PlansIcon.png" 
                          alt="Finanzas" 
                          className="w-24 h-24 object-contain"
                        />
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* MODAL / BOTTOM SHEET DE FINANZAS */}
      {showFinanceModal && (
        <>
          {/* Backdrop oscuro */}
          <div 
            className="modal-backdrop fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowFinanceModal(false)}
          />
          
          {/* Contenido del modal */}
          <div className="modal-content modal-scroll fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-h-[85vh] overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            
            {/* Header del modal */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-5 py-4 flex items-center justify-between rounded-t-3xl">
              <h2 className="text-xl font-bold text-gray-900">Pagos y Finanzas</h2>
              <button 
                onClick={() => setShowFinanceModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Contenido del modal */}
            <div className="px-5 py-5 space-y-4">
              {/* Primera fila - 2 cards */}
              <div className="grid grid-cols-2 gap-3">
                {/* Próximo pago */}
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

                {/* Planes activos */}
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

              {/* Segunda fila - 1 card */}
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

              {/* Información adicional */}
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