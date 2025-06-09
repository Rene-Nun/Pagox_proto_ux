import Header from '../Header'
import { Calendar, CreditCard, Check, ArrowRight, ChevronDown, Sparkles, Plane, Hotel, Music, Eye, EyeOff, TrendingUp, Shield, Zap, Target } from 'lucide-react'
import { useState } from 'react'

interface HomeScreenProps {
  onNavigate: (screen: string, tab?: string) => void
  activeTab: string
}

export default function HomeScreen({ onNavigate, activeTab }: HomeScreenProps) {
  const [showPlans, setShowPlans] = useState(false)

  return (
    <div className="h-full flex flex-col bg-white">
      <Header showLogo={false} onNavigate={onNavigate} />

      <div className="flex-1 overflow-y-auto">
        <div className="px-5 py-6 space-y-6">
          
          {/* Score Pagox - Pasaporte Financiero Compacto */}
          <div className="bg-black rounded-3xl p-5 shadow-xl relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl transform translate-x-16 -translate-y-16"></div>
            
            <div className="relative">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-white/60" />
                    <p className="text-white/60 text-xs uppercase tracking-wider">Tu score pagox</p>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <h1 className="text-6xl font-light text-white">750</h1>
                    <div className="bg-emerald-500/20 px-3 py-1 rounded-full">
                      <span className="text-emerald-400 text-xs font-medium flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        Excelente
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-white/40 text-xs font-mono">PX-2025-0729</p>
                  <p className="text-white text-sm font-medium">MARÍA PÉREZ</p>
                </div>
              </div>
              
              {/* Score Range */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-xs">Rango de score</span>
                  <span className="text-white/60 text-xs">0 - 850</span>
                </div>
                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-white/40 to-white/60 rounded-full transition-all duration-500" style={{ width: '88%' }}></div>
                </div>
              </div>

              <p className="text-white/70 text-xs leading-relaxed">
                Facilita tu reintegración al sistema financiero tradicional
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-2xl p-5 hover:shadow-md transition-all duration-300">
              <div className="flex justify-between items-start mb-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <Calendar className="w-5 h-5 text-gray-600" />
                </div>
                <span className="text-xs text-gray-400 font-light">En 12 días</span>
              </div>
              <p className="text-2xl font-light text-gray-900 mb-1">$1,825</p>
              <p className="text-xs text-gray-500">Próximo pago</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-5 hover:shadow-md transition-all duration-300">
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

          {/* Partner CTA */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-6 border border-gray-100">
            <h2 className="text-xl font-light text-gray-900 mb-2">
              Cumple tus sueños con <span className="font-normal">pagox</span>
            </h2>
            <p className="text-gray-500 text-sm font-light mb-5 leading-relaxed">
              Descubre experiencias increíbles con nuestros partners
            </p>
            <button
              onClick={() => onNavigate('partner')}
              className="w-full bg-gray-900 text-white py-4 rounded-2xl font-light flex items-center justify-center gap-3 hover:bg-gray-800 transition-all duration-300 group"
            >
              Explorar experiencias
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Marketplace - Verde Esmeralda Statement */}
          <div className="relative bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl p-5 overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl transform translate-x-16 -translate-y-16"></div>
            
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-light text-white">
                      Marketplace
                    </h3>
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

          {/* Active Plans - Con ojo realista */}
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
    </div>
  )
}