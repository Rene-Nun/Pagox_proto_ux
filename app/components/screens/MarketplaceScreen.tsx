import Header from '../Header'
import BottomNav from '../BottomNav'
import { TrendingUp, TrendingDown, Clock, Percent, Filter, Search, Sparkles, Info, Zap } from 'lucide-react'

interface MarketplaceScreenProps {
  onNavigate: (screen: string, tab?: string) => void
  activeTab: string
}

export default function MarketplaceScreen({ onNavigate, activeTab }: MarketplaceScreenProps) {
  const listings = [
    {
      id: 1,
      event: 'Taylor Swift - The Eras Tour',
      date: '10 Mar 2026',
      venue: 'Estadio GNP Seguros',
      originalPrice: 2500,
      currentPrice: 2200,
      discount: 12,
      debt: 1800,
      seller: 'Ana M.',
      score: 92,
      trend: 'up',
      gradient: 'from-pink-500 to-purple-600',
      emoji: '✨',
      daysListed: 3
    },
    {
      id: 2,
      event: 'Formula 1 - Gran Premio de México',
      date: '29 Oct 2025',
      venue: 'Autódromo Hermanos Rodríguez',
      originalPrice: 4000,
      currentPrice: 3500,
      discount: 13,
      debt: 2800,
      seller: 'Carlos R.',
      score: 88,
      trend: 'down',
      gradient: 'from-red-500 to-orange-600',
      emoji: '🏎️',
      daysListed: 1
    },
    {
      id: 3,
      event: 'Blink-182 World Tour',
      date: '15 Ago 2025',
      venue: 'Palacio de los Deportes',
      originalPrice: 1800,
      currentPrice: 1650,
      discount: 8,
      debt: 1200,
      seller: 'Luis P.',
      score: 75,
      trend: 'stable',
      gradient: 'from-gray-600 to-black',
      emoji: '🎸',
      daysListed: 5
    },
    {
      id: 4,
      event: 'Cirque du Soleil - Kooza',
      date: '22 Sep 2025',
      venue: 'Carpa Santa Fe',
      originalPrice: 3200,
      currentPrice: 2800,
      discount: 13,
      debt: 2100,
      seller: 'María G.',
      score: 95,
      trend: 'up',
      gradient: 'from-blue-500 to-purple-600',
      emoji: '🎪',
      daysListed: 2
    }
  ]

  return (
    // Contenedor principal ajustado para ocupar toda la pantalla y organizar el contenido en columna
    <div className="h-screen flex flex-col bg-gray-50">
      <Header title="Marketplace" onNavigate={onNavigate} />

      {/* El contenido es el único elemento que ahora tendrá scroll */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          {/* Search Bar */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Buscar eventos..."
              className="w-full bg-white rounded-2xl py-4 pl-12 pr-12 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 rounded-xl hover:shadow-lg transition-all">
              <Filter className="w-4 h-4" />
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-2xl p-5 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full -translate-y-10 translate-x-10 opacity-20"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <Percent className="w-5 h-5 text-green-600" />
                  <p className="text-xs text-gray-600 font-medium">Tasa de éxito</p>
                  <button className="ml-auto">
                    <Info className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
                <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">85%</p>
                <p className="text-xs text-gray-500 mt-1">de boletos vendidos</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400 to-blue-600 rounded-full -translate-y-10 translate-x-10 opacity-20"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <p className="text-xs text-gray-600 font-medium">Tiempo promedio</p>
                </div>
                <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">24h</p>
                <p className="text-xs text-gray-500 mt-1">para completar venta</p>
              </div>
            </div>
          </div>

          {/* Listings Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-900">Ofertas Destacadas</h3>
            <button className="text-purple-600 text-sm font-medium flex items-center gap-1">
              <Sparkles className="w-4 h-4" />
              Ver todas
            </button>
          </div>

          {/* Listings */}
          <div className="space-y-4">
            {listings.map((listing) => (
              <div key={listing.id} className="bg-white rounded-3xl shadow-sm overflow-hidden hover:shadow-lg transition-all transform hover:scale-[1.01]">
                <div className="p-5">
                  <div className="flex gap-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${listing.gradient} rounded-2xl flex items-center justify-center text-2xl shadow-lg`}>
                      {listing.emoji}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-bold text-lg text-gray-900">{listing.event}</h4>
                          <p className="text-sm text-gray-600">{listing.date} • {listing.venue}</p>
                        </div>
                        <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded-full">
                          <Zap className="w-3 h-3 text-green-600" />
                          <span className="text-xs font-bold text-green-700">-{listing.discount}%</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mt-3">
                        <div>
                          <p className="text-xs text-gray-500">Precio actual</p>
                          <div className="flex items-center gap-2">
                            <p className="text-xl font-bold text-gray-900">${listing.currentPrice.toLocaleString()}</p>
                            {listing.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                            {listing.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Deuda asumible</p>
                          <p className="text-xl font-bold text-orange-600">${listing.debt.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-purple-700">
                        {listing.seller.split(' ')[0][0]}{listing.seller.split(' ')[1][0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{listing.seller}</p>
                        <div className="flex items-center gap-2">
                          <p className="text-xs text-gray-500">Score: {listing.score}</p>
                          <span className="text-xs text-gray-400">•</span>
                          <p className="text-xs text-gray-500">Hace {listing.daysListed} días</p>
                        </div>
                      </div>
                    </div>
                    <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:shadow-lg transition-all">
                      Ver detalles
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Banner */}
          <div className="mt-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-6 text-white shadow-xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg mb-2">¿Tienes un boleto que vender?</h4>
                <p className="text-white/90 text-sm mb-4">
                  Nuestra IA calcula el mejor precio y encuentra compradores en minutos.
                </p>
                <button className="bg-white text-purple-600 px-5 py-2.5 rounded-full text-sm font-bold hover:shadow-lg transition-all">
                  Publicar ahora
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* El menú ahora se mantiene abajo, fuera del scroll */}
      <BottomNav activeTab={activeTab} onNavigate={onNavigate} />
    </div>
  )
}

