import MobileContainer from '../MobileContainer'
import Header from '../Header'
import { Calendar, CreditCard, Check, ArrowRight, ChevronDown, ChevronUp, Sparkles, Plane, Hotel, Music, Eye, EyeOff, TrendingUp, Users } from 'lucide-react'
import { useState } from 'react'

interface HomeScreenProps {
  onNavigate: (screen: string, tab?: string) => void
  activeTab: string
}

export default function HomeScreen({ onNavigate, activeTab }: HomeScreenProps) {
  const [showPlans, setShowPlans] = useState(false)

  return (
    <MobileContainer className="bg-white">
      <Header showLogo={false} onNavigate={onNavigate} />

      <div className="flex-1 overflow-y-auto">
        <div className="px-5 py-6 space-y-6">
          {/* Score Card - Diseño minimalista con gradiente sutil */}
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-white/10 rounded-full blur-3xl"></div>
              
              <div className="relative">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-gray-400 text-sm font-light mb-1">Tu score</p>
                    <div className="flex items-baseline gap-3">
                      <p className="text-7xl font-extralight text-white">750</p>
                      <div className="bg-emerald-500/20 backdrop-blur px-3 py-1.5 rounded-full">
                        <span className="text-emerald-400 text-xs font-medium flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5" />
                          Activo
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-gray-400 to-gray-300 rounded-full transition-all duration-700" style={{ width: '88%' }}></div>
                    </div>
                    <span className="text-gray-400 text-xs font-light">850</span>
                  </div>
                  
                  <p className="text-gray-400 text-xs leading-relaxed">
                    Desbloquea productos premium y accede al sistema financiero tradicional
                  </p>
                </div>

                <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-700/50">
                  <span className="text-gray-500 text-xs font-mono">PX-2025-0729</span>
                  <span className="text-white text-sm font-light tracking-wide">MARÍA PÉREZ</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards - Diseño limpio y moderno */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-2xl p-5 group hover:shadow-md transition-all duration-300">
              <div className="flex justify-between items-start mb-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <Calendar className="w-5 h-5 text-gray-600" />
                </div>
                <span className="text-xs text-gray-400 font-light">En 12 días</span>
              </div>
              <p className="text-2xl font-light text-gray-900 mb-1">$1,825</p>
              <p className="text-xs text-gray-500">Próximo pago</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-5 group hover:shadow-md transition-all duration-300">
              <div className="flex justify-between items-start mb-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <CreditCard className="w-5 h-5 text-gray-600" />
                </div>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              </div>
              <p className="text-2xl font-light text-gray-900 mb-1">2</p>
              <p className="text-xs text-gray-500">Planes activos</p>
            </div>
          </div>

          {/* CTA Section - Botón destacado */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-6 border border-gray-100">
            <h2 className="text-xl font-light text-gray-900 mb-2">
              Cumple tus sueños con <span className="font-normal">pagox</span>
            </h2>
            <p className="text-gray-500 text-sm font-light mb-5 leading-relaxed">
              Arma tu aventura con nuestras plataformas asociadas
            </p>
            <button
              onClick={() => onNavigate('partner')}
              className="w-full bg-gray-900 text-white py-4 rounded-2xl font-light flex items-center justify-center gap-3 hover:bg-gray-800 transition-all duration-300 group"
            >
              Explorar experiencias
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Ofertas Exclusivas - Diseño con acento de color sutil */}
          <div className="relative bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-3xl p-6 overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl transform translate-x-20 -translate-y-20"></div>
            
            <div className="relative">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-11 h-11 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-extralight text-white">
                        Ofertas exclusivas
                      </h3>
                      <p className="text-indigo-200 text-xs">Marketplace premium</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/90 backdrop-blur text-indigo-600 px-4 py-2 rounded-2xl">
                  <p className="text-lg font-bold">70%</p>
                  <p className="text-xs font-medium -mt-1">OFF</p>
                </div>
              </div>

              <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
                Descuentos exclusivos para miembros pagox
              </p>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { icon: Plane, label: 'Vuelos' },
                  { icon: Hotel, label: 'Hoteles' },
                  { icon: Music, label: 'Eventos' }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="w-14 h-14 bg-white/15 backdrop-blur rounded-2xl flex items-center justify-center mx-auto mb-2 hover:bg-white/25 transition-colors">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-xs text-indigo-100 font-light">{item.label}</p>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => onNavigate('marketplace', 'marketplace')}
                className="w-full bg-white text-indigo-600 py-4 rounded-2xl font-medium hover:bg-gray-50 transition-all duration-300"
              >
                Ver ofertas
              </button>
            </div>
          </div>

          {/* Planes de Pago - Diseño minimalista expandible */}
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
                <Eye className={`w-4 h-4 transition-colors ${showPlans ? 'text-gray-600' : 'text-gray-400'}`} />
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
    </MobileContainer>
  )
}