import { useState } from 'react'
import MobileContainer from '../MobileContainer'
import Header from '../Header'
import { Calendar, CreditCard, Clock, Tag, ChevronRight, TrendingUp } from 'lucide-react'

interface HomeScreenProps {
  onNavigate: (screen: string, tab?: string) => void
  activeTab: string
}

type TabType = 'flights' | 'hotels' | 'events'

export default function HomeScreen({ onNavigate, activeTab }: HomeScreenProps) {
  const [selectedTab, setSelectedTab] = useState<TabType>('flights')

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
    <MobileContainer className="bg-white">
      <Header showLogo={true} onNavigate={onNavigate} />

      <div className="flex-1 overflow-y-auto pb-24">
        <div className="px-5 space-y-0">
          
          {/* Search Bar - Más pegada al header */}
          <div className="pt-3 pb-4">
            <div className="relative">
              <input
                type="text"
                placeholder={getSearchPlaceholder()}
                onClick={handleSearchClick}
                className="w-full bg-gray-100 rounded-full px-5 py-3.5 pr-14 text-gray-600 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 cursor-pointer"
                readOnly
              />
              <button 
                onClick={handleSearchClick}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation Tabs - Clean design con underline NEGRO */}
          <div className="pb-0">
            <div className="flex items-center justify-around gap-2 relative">
              {/* Vuelos Tab */}
              <button
                onClick={() => handleTabChange('flights')}
                className="flex-1 flex flex-col items-center gap-2 py-4 transition-all duration-300 relative group"
              >
                <img 
                  src="/images/VuelosIcon.png" 
                  alt="Vuelos" 
                  className="w-12 h-12 object-contain"
                />
                <p className={`text-sm transition-all ${
                  selectedTab === 'flights' ? 'font-semibold text-gray-900' : 'font-normal text-gray-600'
                }`}>
                  Vuelos
                </p>
                {/* Underline indicator NEGRO */}
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-black transition-all duration-300 ${
                  selectedTab === 'flights' ? 'opacity-100' : 'opacity-0'
                }`} />
              </button>

              {/* Hoteles Tab */}
              <button
                onClick={() => handleTabChange('hotels')}
                className="flex-1 flex flex-col items-center gap-2 py-4 transition-all duration-300 relative group"
              >
                <img 
                  src="/images/HotelesIcon.png" 
                  alt="Hospedaje" 
                  className="w-12 h-12 object-contain"
                />
                <p className={`text-sm transition-all ${
                  selectedTab === 'hotels' ? 'font-semibold text-gray-900' : 'font-normal text-gray-600'
                }`}>
                  Hospedaje
                </p>
                {/* Underline indicator NEGRO */}
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-black transition-all duration-300 ${
                  selectedTab === 'hotels' ? 'opacity-100' : 'opacity-0'
                }`} />
              </button>

              {/* Eventos Tab */}
              <button
                onClick={() => handleTabChange('events')}
                className="flex-1 flex flex-col items-center gap-2 py-4 transition-all duration-300 relative group"
              >
                <img 
                  src="/images/ExperienciasIcon.png" 
                  alt="Eventos" 
                  className="w-12 h-12 object-contain"
                />
                <p className={`text-sm transition-all ${
                  selectedTab === 'events' ? 'font-semibold text-gray-900' : 'font-normal text-gray-600'
                }`}>
                  Eventos
                </p>
                {/* Underline indicator NEGRO */}
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-black transition-all duration-300 ${
                  selectedTab === 'events' ? 'opacity-100' : 'opacity-0'
                }`} />
              </button>
            </div>
            
            {/* Separador gris sutil - como en Hopper (el de verdad 😂) */}
            <div className="w-full h-px bg-gray-200 mt-0"></div>
          </div>

          {/* Resto del contenido con espaciado */}
          <div className="space-y-4 pt-6">
            {/* Saldo disponible - Card simple blanca con logo MÁS GRANDE a la izquierda */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <img 
                    src="/images/TuristaVector.png" 
                    alt="Turista" 
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-normal text-gray-900 mb-0.5">$3,500</h2>
                  <p className="text-gray-600 text-xs leading-tight">Gasolina para tu aventura preaprobada</p>
                </div>
              </div>
            </div>

            {/* Stats Grid - SCROLL HORIZONTAL con 3 cards */}
            <div className="overflow-x-auto -mx-5 px-5 scrollbar-hide">
              <div className="flex gap-3 min-w-min pb-2">
                {/* Próximo pago */}
                <div className="bg-gray-50 rounded-2xl p-3.5 min-w-[160px]">
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-gray-700" />
                    </div>
                    <span className="text-xs text-gray-500">En 12 días</span>
                  </div>
                  <p className="text-2xl font-light text-gray-900 mb-0.5">$1,825</p>
                  <p className="text-xs text-gray-600">Próximo pago</p>
                </div>

                {/* Planes activos */}
                <div className="bg-gray-50 rounded-2xl p-3.5 min-w-[160px]">
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-gray-700" />
                    </div>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  </div>
                  <p className="text-2xl font-light text-gray-900 mb-0.5">2</p>
                  <p className="text-xs text-gray-600">Planes activos</p>
                </div>

                {/* Score Turista - Tercera card (VISIBLE AL HACER SCROLL) */}
                <div className="bg-gray-50 rounded-2xl p-3.5 min-w-[160px]">
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-2xl font-light text-gray-900 mb-0.5">750</p>
                  <p className="text-xs text-gray-600">Score Turista</p>
                </div>
              </div>
            </div>

            {/* Marketplace - Siguiendo diseño de Canva */}
            <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-3xl p-6 shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Marketplace</h3>
                    <p className="text-blue-100 text-sm">Las mejores ofertas</p>
                  </div>
                </div>
                <div className="bg-emerald-400 text-white px-3 py-1 rounded-lg">
                  <p className="text-lg font-bold leading-tight">70%</p>
                </div>
              </div>

              {/* Mini features */}
              <div className="flex items-center gap-3 mb-5 flex-wrap">
                <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-xl backdrop-blur-sm">
                  <Clock className="w-4 h-4 text-white" />
                  <span className="text-white text-xs">Compras de último momento</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-xl backdrop-blur-sm">
                  <Tag className="w-4 h-4 text-white" />
                  <span className="text-white text-xs">Hasta 70% de descuento</span>
                </div>
              </div>

              <button 
                onClick={() => onNavigate('marketplace', 'marketplace')}
                className="w-full bg-white text-blue-600 py-3.5 rounded-xl font-semibold hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
              >
                Ver ofertas
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* CSS para ocultar scrollbar pero mantener funcionalidad */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </MobileContainer>
  )
}