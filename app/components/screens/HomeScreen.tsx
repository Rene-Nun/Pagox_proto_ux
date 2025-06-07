import MobileContainer from '../MobileContainer'
import Header from '../Header'
import BottomNav from '../BottomNav'
import { Calendar, CreditCard, Check, ArrowRight, ChevronDown, ChevronUp, Sparkles, Plane, Hotel, Music, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

interface HomeScreenProps {
  onNavigate: (screen: string, tab?: string) => void
  activeTab: string
}

export default function HomeScreen({ onNavigate, activeTab }: HomeScreenProps) {
  const [showPlans, setShowPlans] = useState(false)

  return (
    <MobileContainer>
      <Header showLogo={false} onNavigate={onNavigate} />

      {/* Scrollable Content - se eliminó pb-24 */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {/* Score Card */}
          <div className="p-6 bg-gray-800 text-white rounded-2xl relative overflow-hidden shadow-lg animate-fade-in">
            <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full opacity-20"></div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-400 text-sm mb-2">Tu score pagox</p>
                <p className="text-6xl font-bold">750</p>
              </div>
              <div className="bg-green-500 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                <Check className="w-4 h-4" />
                Activo
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Desbloquea productos futuros y facilita tu regreso al sistema financiero tradicional
            </p>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-gray-400">300</span>
              <div className="flex-1">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full transition-all duration-500" style={{ width: '88%' }}></div>
                </div>
              </div>
              <span className="text-sm text-gray-400">Score máximo: 850</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">ID: PX-2025-0729</span>
              <span className="font-medium">MARÍA PÉREZ</span>
            </div>
          </div>

          {/* Stats Row */}
          <div className="flex justify-around gap-4">
            <div className="flex-1 bg-white rounded-xl p-4 shadow-sm text-center">
              <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="text-xs text-gray-600">En 12 días</p>
              <p className="text-2xl font-bold">$1,825</p>
              <p className="text-xs text-gray-600">Próximo pago</p>
            </div>
            <div className="flex-1 bg-white rounded-xl p-4 shadow-sm text-center">
              <CreditCard className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <p className="text-xs text-gray-600">Activos</p>
              <p className="text-2xl font-bold">2</p>
              <p className="text-xs text-gray-600">Planes vigentes</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h2 className="text-xl font-bold mb-2">Cumple tus sueños con pagox</h2>
            <p className="text-gray-600 text-sm mb-4">
              Arma ahora tu aventura con nuestras plataformas asociadas
            </p>
            <button
              onClick={() => onNavigate('partner')}
              className="w-full bg-black text-white py-4 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors"
            >
              Explorar <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Ofertas Exclusivas Card */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-6 text-white relative overflow-hidden shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Ofertas</h3>
                  <h3 className="text-2xl font-bold">Exclusivas</h3>
                  <p className="text-sm opacity-90 mt-1">Marketplace pagox</p>
                </div>
              </div>
              <div className="bg-yellow-400 text-black px-4 py-2 rounded-2xl">
                <p className="text-lg font-black">70%</p>
                <p className="text-sm font-bold -mt-1">OFF</p>
              </div>
            </div>

            <p className="mb-6 text-lg opacity-90">
              Accede a descuentos exclusivos para miembros pagox
            </p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-2">
                  <Plane className="w-8 h-8" />
                </div>
                <p className="text-sm font-medium">Vuelos</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-2">
                  <Hotel className="w-8 h-8" />
                </div>
                <p className="text-sm font-medium">Hoteles</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-2">
                  <Music className="w-8 h-8" />
                </div>
                <p className="text-sm font-medium">Eventos</p>
              </div>
            </div>

            <button 
              onClick={() => onNavigate('marketplace', 'marketplace')}
              className="w-full bg-white text-purple-600 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              Ver todas las ofertas
            </button>
          </div>

          {/* Planes de Pago Activos */}
          <div className="pb-4">
            <h3 className="text-xl font-bold mb-4">Planes de Pago Activos</h3>

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <button
                onClick={() => setShowPlans(!showPlans)}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="text-left">
                    <p className="font-bold">2 eventos • Siguiente pago en 12 días</p>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      Total quincenal: $1,825 
                      <span className="text-green-500 text-xs font-medium">• Al día</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {showPlans ? <Eye className="w-5 h-5 text-gray-600" /> : <EyeOff className="w-5 h-5 text-gray-400" />}
                  {showPlans ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </div>
              </button>

              {showPlans && (
                <div className="border-t border-gray-100">
                  {/* Plan 1 - Coldplay */}
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                        <Music className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold">Coldplay - Music of the Spheres</h4>
                        <p className="text-sm text-gray-600">Foro Sol • 15 Mar 2025</p>

                        <div className="mt-3">
                          <div className="flex justify-between items-center mb-1">
                            <div className="w-full bg-gray-200 rounded-full h-2 mr-3">
                              <div className="bg-purple-600 h-2 rounded-full" style={{ width: '50%' }}></div>
                            </div>
                            <span className="text-sm text-gray-600">50%</span>
                          </div>
                          <p className="text-xs text-purple-600 font-medium">3 de 6 quincenas</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold">$1,225</p>
                        <p className="text-xs text-gray-600">por quincena</p>
                      </div>
                    </div>
                  </div>

                  {/* Plan 2 - Vuelo */}
                  <div className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Plane className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold">Vuelo CDMX - Cancún</h4>
                        <p className="text-sm text-gray-600">Aeroméxico • 28 Jun 2025</p>

                        <div className="mt-3">
                          <div className="flex justify-between items-center mb-1">
                            <div className="w-full bg-gray-200 rounded-full h-2 mr-3">
                              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '33%' }}></div>
                            </div>
                            <span className="text-sm text-gray-600">33%</span>
                          </div>
                          <p className="text-xs text-blue-600 font-medium">1 de 3 quincenas</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold">$600</p>
                        <p className="text-xs text-gray-600">por quincena</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <BottomNav activeTab={activeTab} onNavigate={onNavigate} />
    </MobileContainer>
  )
}

