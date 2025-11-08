import { useState } from 'react'
import MobileContainer from '../MobileContainer'
import Header from '../Header'
import { Calendar, CreditCard, Clock, Tag, ChevronRight, TrendingUp, Eye } from 'lucide-react'

interface HomeScreenProps {
  onNavigate: (screen: string, tab?: string) => void
  activeTab: string
}

type TabType = 'flights' | 'hotels' | 'events'

export default function HomeScreen({ onNavigate, activeTab }: HomeScreenProps) {
  const [selectedTab, setSelectedTab] = useState<TabType>('flights')
  const [showBalance, setShowBalance] = useState(true)

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
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .gradient-animated {
          animation: gradient 3s ease infinite;
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
          
          {/* NUEVO: Saldo Total */}
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

          {/* NUEVO: Barra de Yunus AI - Mismo tamaño que search bar */}
          <div className="px-5 pb-4">
            <button 
              className="w-full bg-[#1f203a] rounded-full px-5 py-3.5 border border-[#2a2b45] hover:border-[#003d90] transition-all flex items-center gap-3"
            >
              <img 
                src="/images/yunus.png" 
                alt="Yunus" 
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              />
              <span className="text-gray-400 text-sm text-left flex-1 overflow-hidden whitespace-nowrap">
                Usa yunus para explorar, planear o comprar tu Aventura
              </span>
            </button>
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

            {/* Marketplace */}
            <div className="bg-[#1f203a] rounded-3xl p-5 border border-[#2a2b45] shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#003d90] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#003d90]/30">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white leading-tight">Marketplace</h3>
                  <p className="text-gray-400 text-xs">Las mejores ofertas</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="flex items-center gap-2 bg-[#0e1028] rounded-xl p-2 border border-[#2a2b45]">
                  <div className="w-8 h-8 bg-[#003d90] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white text-xs font-medium leading-tight">Compras de último momento</span>
                </div>
                <div className="flex items-center gap-2 bg-[#0e1028] rounded-xl p-2 border border-[#2a2b45]">
                  <div className="w-8 h-8 bg-[#003d90] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Tag className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white text-xs font-medium leading-tight">Hasta 70% de descuento</span>
                </div>
              </div>

              <button 
                onClick={() => onNavigate('marketplace', 'marketplace')}
                className="w-full bg-[#003d90] text-white py-3 rounded-2xl font-bold hover:bg-[#0051c7] transition-all text-base shadow-lg shadow-[#003d90]/30"
              >
                Ver ofertas
              </button>
            </div>
          </div>

        </div>
      </div>
    </MobileContainer>
  )
}