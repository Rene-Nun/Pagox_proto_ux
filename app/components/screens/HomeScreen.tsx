import { useState, useRef } from 'react'
import MobileContainer from '../MobileContainer'
import Header from '../Header'
import TuristaLogo from '../TuristaLogo'
import { Calendar, CreditCard, Plane, Hotel, Music, ArrowRight, Shield, Eye, EyeOff, ChevronDown, Sparkles, Search } from 'lucide-react'

interface HomeScreenProps {
  onNavigate: (screen: string, tab?: string) => void
  activeTab: string
}

type TabType = 'flights' | 'hotels' | 'events'

export default function HomeScreen({ onNavigate, activeTab }: HomeScreenProps) {
  const [selectedTab, setSelectedTab] = useState<TabType>('flights')
  const [showPlans, setShowPlans] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleTabChange = (tab: TabType) => {
    setSelectedTab(tab)
  }

  const handleSearchClick = () => {
    if (selectedTab === 'flights') {
      onNavigate('flightSearch')
    } else if (selectedTab === 'hotels') {
      onNavigate('hotelSearch')
    } else if (selectedTab === 'events') {
      onNavigate('partner')
    }
  }

  const getSearchPlaceholder = () => {
    switch (selectedTab) {
      case 'flights':
        return '¿Desde dónde?'
      case 'hotels':
        return 'Buscar hoteles'
      case 'events':
        return 'Buscar eventos'
    }
  }

  return (
    <MobileContainer className="bg-white">
      <Header showLogo={false} onNavigate={onNavigate} />

      <div className="flex-1 overflow-y-auto">
        <div className="px-5 py-6 space-y-6">
          
          {/* Hero Section con Tabs */}
          <div className="space-y-4">
            {/* Navigation Tabs - 3D Style */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-2 shadow-inner">
              <div className="grid grid-cols-3 gap-2">
                {/* Vuelos Tab */}
                <button
                  onClick={() => handleTabChange('flights')}
                  className={`relative py-4 rounded-2xl transition-all duration-300 ${
                    selectedTab === 'flights'
                      ? 'bg-white shadow-lg scale-105'
                      : 'bg-transparent hover:bg-white/50'
                  }`}
                >
                  <div className={`w-12 h-12 mx-auto mb-2 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    selectedTab === 'flights'
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/40'
                      : 'bg-gradient-to-br from-blue-400/20 to-blue-500/20'
                  }`}>
                    <Plane className={`w-6 h-6 ${selectedTab === 'flights' ? 'text-white' : 'text-blue-600'}`} />
                  </div>
                  <p className={`text-sm transition-all ${
                    selectedTab === 'flights' ? 'font-bold text-gray-900' : 'font-normal text-gray-600'
                  }`}>
                    Vuelos
                  </p>
                </button>

                {/* Hoteles Tab */}
                <button
                  onClick={() => handleTabChange('hotels')}
                  className={`relative py-4 rounded-2xl transition-all duration-300 ${
                    selectedTab === 'hotels'
                      ? 'bg-white shadow-lg scale-105'
                      : 'bg-transparent hover:bg-white/50'
                  }`}
                >
                  <div className={`w-12 h-12 mx-auto mb-2 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    selectedTab === 'hotels'
                      ? 'bg-gradient-to-br from-rose-500 to-rose-600 shadow-lg shadow-rose-500/40'
                      : 'bg-gradient-to-br from-rose-400/20 to-rose-500/20'
                  }`}>
                    <Hotel className={`w-6 h-6 ${selectedTab === 'hotels' ? 'text-white' : 'text-rose-600'}`} />
                  </div>
                  <p className={`text-sm transition-all ${
                    selectedTab === 'hotels' ? 'font-bold text-gray-900' : 'font-normal text-gray-600'
                  }`}>
                    Hoteles
                  </p>
                </button>

                {/* Eventos Tab */}
                <button
                  onClick={() => handleTabChange('events')}
                  className={`relative py-4 rounded-2xl transition-all duration-300 ${
                    selectedTab === 'events'
                      ? 'bg-white shadow-lg scale-105'
                      : 'bg-transparent hover:bg-white/50'
                  }`}
                >
                  <div className={`w-12 h-12 mx-auto mb-2 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    selectedTab === 'events'
                      ? 'bg-gradient-to-br from-violet-500 to-violet-600 shadow-lg shadow-violet-500/40'
                      : 'bg-gradient-to-br from-violet-400/20 to-violet-500/20'
                  }`}>
                    <Music className={`w-6 h-6 ${selectedTab === 'events' ? 'text-white' : 'text-violet-600'}`} />
                  </div>
                  <p className={`text-sm transition-all ${
                    selectedTab === 'events' ? 'font-bold text-gray-900' : 'font-normal text-gray-600'
                  }`}>
                    Eventos
                  </p>
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <button
              onClick={handleSearchClick}
              className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all flex items-center gap-3"
            >
              <Search className="w-5 h-5 text-gray-400" />
              <span className="text-gray-400 font-light">{getSearchPlaceholder()}</span>
            </button>
          </div>

          {/* Saldo con Logo Turista */}
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl transform translate-x-16 -translate-y-16"></div>
            
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm mb-2">Saldo disponible</p>
                <h2 className="text-4xl font-light text-white mb-1">$3,500</h2>
                <p className="text-emerald-100 text-xs">Gasolina para tu aventura preaprobada</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3">
                <TuristaLogo size={48} />
              </div>
            </div>
          </div>

          {/* Stats Carousel */}
          <div 
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Card 1: Próximo pago */}
            <div className="min-w-[160px] bg-gray-50 rounded-2xl p-5 hover:shadow-md transition-all snap-start">
              <div className="flex justify-between items-start mb-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <Calendar className="w-5 h-5 text-gray-600" />
                </div>
                <span className="text-xs text-gray-400 font-light">En 12 días</span>
              </div>
              <p className="text-2xl font-light text-gray-900 mb-1">$1,825</p>
              <p className="text-xs text-gray-500">Próximo pago</p>
            </div>

            {/* Card 2: Planes activos */}
            <div className="min-w-[160px] bg-gray-50 rounded-2xl p-5 hover:shadow-md transition-all snap-start">
              <div className="flex justify-between items-start mb-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <CreditCard className="w-5 h-5 text-gray-600" />
                </div>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              </div>
              <p className="text-2xl font-light text-gray-900 mb-1">2</p>
              <p className="text-xs text-gray-500">Planes activos</p>
            </div>

            {/* Card 3: Score Pagox */}
            <div className="min-w-[160px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-5 hover:shadow-md transition-all snap-start">
              <div className="flex justify-between items-start mb-3">
                <div className="w-10 h-10 bg-white/10 backdrop-blur rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div className="bg-emerald-500/20 px-2 py-0.5 rounded-full">
                  <span className="text-emerald-400 text-xs font-medium">★</span>
                </div>
              </div>
              <p className="text-2xl font-light text-white mb-1">750</p>
              <p className="text-xs text-white/60">Score Pagox</p>
            </div>
          </div>

          {/* Marketplace - Verde Esmeralda */}
          <div className="relative bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl p-5 overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl transform translate-x-16 -translate-y-16"></div>
            
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-light text-white">Marketplace</h3>
                    <p className="text-emerald-100 text-xs">Las mejores ofertas</p>
                  </div>
                </div>
                <div className="bg-white/90 backdrop-blur text-emerald-600 px-3 py-1.5 rounded-xl">
                  <p className="text-base font-bold">70%</p>
                  <p className="text-xs font-medium -mt-0.5">OFF</p>
                </div>
              </div>

              <p className="text-emerald-50 text-sm mb-5 leading-relaxed">
                Visita nuestro marketplace de reventa
              </p>

              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { icon: Plane, label: 'Vuelos' },
                  { icon: Hotel, label: 'Hoteles' },
                  { icon: Music, label: 'Eventos' }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-white/15 backdrop-blur rounded-xl flex items-center justify-center mx-auto mb-1.5 hover:bg-white/25 transition-colors">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-xs text-emerald-50 font-light">{item.label}</p>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => onNavigate('marketplace', 'marketplace')}
                className="w-full bg-white text-emerald-600 py-3.5 rounded-2xl font-medium hover:bg-gray-50 transition-all duration-300"
              >
                Ver ofertas
              </button>
            </div>
          </div>

          {/* Active Plans */}
          <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
            <button
              onClick={() => setShowPlans(!showPlans)}
              className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                </div>
                <div className="text-left">
                  <p className="text-gray-900 font-light">2 eventos activos</p>
                  <p className="text-sm text-gray-500 flex items-center gap-2 mt-0.5">
                    Total quincenal: $1,825
                    <span className="text-emerald-500 text-xs font-medium">• Al día</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {showPlans ? 
                  <Eye className="w-4 h-4 text-gray-600" /> : 
                  <EyeOff className="w-4 h-4 text-gray-400" />
                }
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${showPlans ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {showPlans && (
              <div className="border-t border-gray-100">
                {/* Plan 1 */}
                <div className="p-5 border-b border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-violet-50 to-violet-100 rounded-2xl flex items-center justify-center">
                      <Music className="w-6 h-6 text-violet-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-light text-gray-900 mb-0.5">Coldplay - Music of the Spheres</h4>
                      <p className="text-sm text-gray-500 font-light">Foro Sol • 15 Mar 2025</p>

                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-gray-400">Progreso</span>
                          <span className="text-xs text-gray-600 font-medium">50%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div className="bg-gradient-to-r from-violet-500 to-violet-400 h-1.5 rounded-full transition-all duration-500" style={{ width: '50%' }}></div>
                        </div>
                        <p className="text-xs text-violet-600 font-light mt-2">3 de 6 quincenas</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-light text-gray-900">$1,225</p>
                      <p className="text-xs text-gray-500 font-light">quincenal</p>
                    </div>
                  </div>
                </div>

                {/* Plan 2 */}
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center">
                      <Plane className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-light text-gray-900 mb-0.5">Vuelo CDMX - Cancún</h4>
                      <p className="text-sm text-gray-500 font-light">Aeroméxico • 28 Jun 2025</p>

                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-gray-400">Progreso</span>
                          <span className="text-xs text-gray-600 font-medium">33%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div className="bg-gradient-to-r from-blue-500 to-blue-400 h-1.5 rounded-full transition-all duration-500" style={{ width: '33%' }}></div>
                        </div>
                        <p className="text-xs text-blue-600 font-light mt-2">1 de 3 quincenas</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-light text-gray-900">$600</p>
                      <p className="text-xs text-gray-500 font-light">quincenal</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </MobileContainer>
  )
}