import MobileContainer from '../MobileContainer'
import Header from '../Header'
import BottomNav from '../BottomNav'
import { TrendingUp, TrendingDown, Clock, Percent, Filter, Search } from 'lucide-react'

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
      gradient: 'from-pink-400 to-purple-500',
      emoji: '✨'
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
      gradient: 'from-red-400 to-orange-500',
      emoji: '🏎️'
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
      gradient: 'from-gray-400 to-black',
      emoji: '🎸'
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
      gradient: 'from-blue-400 to-purple-500',
      emoji: '🎪'
    }
  ]

  return (
    <MobileContainer className="pb-20">
      <Header title="Marketplace" />

      <div className="p-4">
        {/* Search Bar */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Buscar eventos..."
            className="w-full bg-white rounded-full py-3 pl-12 pr-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white p-2 rounded-full">
            <Filter className="w-4 h-4" />
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-green-400 to-green-600 text-white rounded-2xl p-4">
            <Percent className="w-6 h-6 mb-2 opacity-80" />
            <p className="text-3xl font-bold">85%</p>
            <p className="text-sm opacity-90">Tasa de éxito</p>
          </div>
          <div className="bg-gradient-to-br from-purple-400 to-purple-600 text-white rounded-2xl p-4">
            <Clock className="w-6 h-6 mb-2 opacity-80" />
            <p className="text-3xl font-bold">24h</p>
            <p className="text-sm opacity-90">Tiempo promedio</p>
          </div>
        </div>

        {/* Listings */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Ofertas Destacadas</h3>
          <button className="text-purple-600 text-sm font-medium">Ver todas</button>
        </div>
        
        <div className="space-y-4">
          {listings.map((listing) => (
            <div key={listing.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-4">
                <div className="flex gap-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${listing.gradient} rounded-2xl flex items-center justify-center text-2xl shadow-sm`}>
                    {listing.emoji}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-1">{listing.event}</h4>
                    <p className="text-sm text-gray-600">{listing.date} • {listing.venue}</p>
                    
                    <div className="flex items-center justify-between mt-3">
                      <div>
                        <p className="text-xs text-gray-500">Precio actual</p>
                        <div className="flex items-center gap-2">
                          <p className="text-xl font-bold">${listing.currentPrice.toLocaleString()}</p>
                          <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">
                            -{listing.discount}%
                          </span>
                          {listing.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                          {listing.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Deuda asumible</p>
                        <p className="text-xl font-bold text-orange-600">${listing.debt.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium">
                      {listing.seller.split(' ')[0][0]}{listing.seller.split(' ')[1][0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{listing.seller}</p>
                      <p className="text-xs text-gray-500">Score: {listing.score}</p>
                    </div>
                  </div>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-700 transition-colors">
                    Ver detalles
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Banner */}
        <div className="mt-6 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-2xl p-4">
          <h4 className="font-bold mb-2">¿Tienes un boleto que vender?</h4>
          <p className="text-sm opacity-90 mb-3">
            Publica tu boleto con deuda y encuentra un comprador en minutos.
          </p>
          <button className="bg-white text-purple-600 px-4 py-2 rounded-full text-sm font-medium">
            Publicar ahora
          </button>
        </div>
      </div>

      <BottomNav activeTab={activeTab} onNavigate={onNavigate} />
    </MobileContainer>
  )
}