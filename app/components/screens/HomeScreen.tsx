import { useState } from 'react'
import MobileContainer from '../MobileContainer'
import Header from '../Header'
import { Calendar, CreditCard, Clock, Tag, ChevronRight } from 'lucide-react'

interface HomeScreenProps {
  onNavigate: (screen: string, tab?: string) => void
  activeTab: string
}

type TabType = 'flights' | 'hotels' | 'events'

export default function HomeScreen({ onNavigate, activeTab }: HomeScreenProps) {
  const [selectedTab, setSelectedTab] = useState<TabType>('flights')

  const handleTabChange = (tab: TabType) => {
    setSelectedTab(tab)
    // Navigate to respective screens
    if (tab === 'flights') {
      onNavigate('flightSearch')
    } else if (tab === 'hotels') {
      onNavigate('hotelSearch')
    } else if (tab === 'events') {
      onNavigate('partner')
    }
  }

  return (
    <MobileContainer className="bg-white">
      <Header showLogo={true} onNavigate={onNavigate} />

      <div className="flex-1 overflow-y-auto pb-24">
        <div className="px-5 py-6 space-y-6">
          
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar vuelos"
              className="w-full bg-gray-100 rounded-full px-5 py-3.5 pr-14 text-gray-600 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
              readOnly
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>

          {/* Navigation Tabs - Simplified Design */}
          <div className="bg-gray-50 rounded-3xl p-3">
            <div className="grid grid-cols-3 gap-3">
              {/* Vuelos Tab */}
              <button
                onClick={() => handleTabChange('flights')}
                className={`relative py-4 rounded-2xl transition-all duration-300 ${
                  selectedTab === 'flights'
                    ? 'bg-white shadow-md'
                    : 'bg-transparent'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <img 
                    src="/images/VuelosIcon.png" 
                    alt="Vuelos" 
                    className="w-12 h-12 object-contain"
                  />
                  <p className={`text-sm ${
                    selectedTab === 'flights' ? 'font-semibold text-gray-900' : 'font-normal text-gray-600'
                  }`}>
                    Vuelos
                  </p>
                </div>
              </button>

              {/* Hoteles Tab */}
              <button
                onClick={() => handleTabChange('hotels')}
                className={`relative py-4 rounded-2xl transition-all duration-300 ${
                  selectedTab === 'hotels'
                    ? 'bg-white shadow-md'
                    : 'bg-transparent'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <img 
                    src="/images/HotelesIcon.png" 
                    alt="Hospedaje" 
                    className="w-12 h-12 object-contain"
                  />
                  <p className={`text-sm ${
                    selectedTab === 'hotels' ? 'font-semibold text-gray-900' : 'font-normal text-gray-600'
                  }`}>
                    Hospedaje
                  </p>
                </div>
              </button>

              {/* Eventos Tab */}
              <button
                onClick={() => handleTabChange('events')}
                className={`relative py-4 rounded-2xl transition-all duration-300 ${
                  selectedTab === 'events'
                    ? 'bg-white shadow-md'
                    : 'bg-transparent'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <img 
                    src="/images/ExperienciasIcon.png" 
                    alt="Eventos" 
                    className="w-12 h-12 object-contain"
                  />
                  <p className={`text-sm ${
                    selectedTab === 'events' ? 'font-semibold text-gray-900' : 'font-normal text-gray-600'
                  }`}>
                    Eventos
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Saldo disponible - Card con logo */}
          <div className="bg-gradient-to-br from-teal-400 to-emerald-500 rounded-3xl p-6 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-white/90 text-sm mb-2">Saldo disponible</p>
                <h2 className="text-5xl font-light text-white mb-2">$3,500</h2>
                <p className="text-white/80 text-sm">Gasolina para tu aventura preaprobada</p>
              </div>
              <div className="ml-4">
                <img 
                  src="/images/TuristaVector.png" 
                  alt="Turista" 
                  className="w-20 h-20 object-contain opacity-30"
                />
              </div>
            </div>
          </div>

          {/* Stats Grid - Exactly as in Canva */}
          <div className="grid grid-cols-2 gap-4">
            {/* Próximo pago */}
            <div className="bg-gray-50 rounded-2xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-gray-700" />
                </div>
                <span className="text-xs text-gray-500">En 12 días</span>
              </div>
              <p className="text-3xl font-light text-gray-900 mb-1">$1,825</p>
              <p className="text-sm text-gray-600">Próximo pago</p>
            </div>

            {/* Planes activos */}
            <div className="bg-gray-50 rounded-2xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-gray-700" />
                </div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              </div>
              <p className="text-3xl font-light text-gray-900 mb-1">2</p>
              <p className="text-sm text-gray-600">Planes activos</p>
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
            <div className="flex items-center gap-4 mb-5">
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
    </MobileContainer>
  )
}