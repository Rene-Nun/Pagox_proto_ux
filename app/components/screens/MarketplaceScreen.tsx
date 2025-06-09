import { useState, useRef, useEffect } from 'react'
import Header from '../Header'
import { TrendingUp, TrendingDown, Clock, Percent, Filter, Search, Info, Zap, Star, MapPin, Calendar } from 'lucide-react'

interface MarketplaceScreenProps {
  onNavigate: (screen: string, tab?: string) => void
  activeTab: string
}

export default function MarketplaceScreen({ onNavigate, activeTab }: MarketplaceScreenProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const listings = [
    {
      id: 1,
      event: 'Taylor Swift - The Eras Tour',
      date: '10 Mar 2026',
      venue: 'Estadio GNP Seguros',
      location: 'CDMX',
      originalPrice: 2500,
      currentPrice: 2200,
      discount: 12,
      debt: 1800,
      seller: 'Ana M.',
      sellerRating: 4.8,
      score: 92,
      trend: 'up',
      bgColor: 'bg-gradient-to-br from-pink-400 to-purple-500',
      emoji: '✨',
      daysListed: 3,
      image: '/api/placeholder/400/600'
    },
    {
      id: 2,
      event: 'Formula 1 - Gran Premio de México',
      date: '29 Oct 2025',
      venue: 'Autódromo Hermanos Rodríguez',
      location: 'CDMX',
      originalPrice: 4000,
      currentPrice: 3500,
      discount: 13,
      debt: 2800,
      seller: 'Carlos R.',
      sellerRating: 4.5,
      score: 88,
      trend: 'down',
      bgColor: 'bg-gradient-to-br from-red-400 to-orange-500',
      emoji: '🏎️',
      daysListed: 1,
      image: '/api/placeholder/400/600'
    },
    {
      id: 3,
      event: 'Blink-182 World Tour',
      date: '15 Ago 2025',
      venue: 'Palacio de los Deportes',
      location: 'CDMX',
      originalPrice: 1800,
      currentPrice: 1650,
      discount: 8,
      debt: 1200,
      seller: 'Luis P.',
      sellerRating: 4.2,
      score: 75,
      trend: 'stable',
      bgColor: 'bg-gradient-to-br from-gray-700 to-black',
      emoji: '🎸',
      daysListed: 5,
      image: '/api/placeholder/400/600'
    },
    {
      id: 4,
      event: 'Cirque du Soleil - Kooza',
      date: '22 Sep 2025',
      venue: 'Carpa Santa Fe',
      location: 'CDMX',
      originalPrice: 3200,
      currentPrice: 2800,
      discount: 13,
      debt: 2100,
      seller: 'María G.',
      sellerRating: 4.9,
      score: 95,
      trend: 'up',
      bgColor: 'bg-gradient-to-br from-blue-400 to-indigo-600',
      emoji: '🎪',
      daysListed: 2,
      image: '/api/placeholder/400/600'
    }
  ]

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollTop = scrollRef.current.scrollTop
      const cardHeight = window.innerHeight * 0.7
      const newIndex = Math.round(scrollTop / cardHeight)
      setActiveIndex(newIndex)
    }
  }

  return (
    <div className="h-full flex flex-col bg-white">
      <Header title="Marketplace" onNavigate={onNavigate} />
      
      {/* Search Bar */}
      <div className="px-5 py-3 bg-white/95 backdrop-blur sticky top-0 z-10">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar eventos..."
            className="w-full bg-gray-100 rounded-2xl py-3 pl-11 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2">
            <Filter className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Stats Pills */}
      <div className="px-5 py-2 flex gap-3 overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full whitespace-nowrap">
          <Percent className="w-3.5 h-3.5 text-green-600" />
          <span className="text-xs text-green-700 font-medium">85% vendidos</span>
        </div>
        <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-full whitespace-nowrap">
          <Clock className="w-3.5 h-3.5 text-purple-600" />
          <span className="text-xs text-purple-700 font-medium">Venta en 24h</span>
        </div>
        <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full whitespace-nowrap">
          <Star className="w-3.5 h-3.5 text-blue-600" />
          <span className="text-xs text-blue-700 font-medium">4.7 rating</span>
        </div>
      </div>

      {/* Card Stack Container */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto snap-y snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="relative">
          {listings.map((listing, index) => {
            const isActive = index === activeIndex
            const isPrev = index < activeIndex
            
            return (
              <div
                key={listing.id}
                className={`h-[70vh] px-5 py-3 snap-center transition-all duration-500 ${
                  isPrev ? 'opacity-50' : 'opacity-100'
                }`}
              >
                <div
                  className={`h-full rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ${
                    isActive ? 'scale-100' : 'scale-95'
                  } ${listing.bgColor} relative`}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl transform translate-x-32 -translate-y-32"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-black rounded-full blur-2xl transform -translate-x-24 translate-y-24"></div>
                  </div>

                  {/* Content */}
                  <div className="relative h-full flex flex-col p-6 text-white">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                      <div className="text-6xl animate-pulse">{listing.emoji}</div>
                      <div className="bg-white/20 backdrop-blur px-3 py-1.5 rounded-full">
                        <span className="text-sm font-bold flex items-center gap-1">
                          <Zap className="w-3.5 h-3.5" />
                          -{listing.discount}%
                        </span>
                      </div>
                    </div>

                    {/* Event Info */}
                    <div className="flex-1 flex flex-col justify-center space-y-4">
                      <div>
                        <h2 className="text-3xl font-light mb-2 leading-tight">{listing.event}</h2>
                        <div className="flex items-center gap-3 text-white/80 text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {listing.date}
                          </div>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {listing.location}
                          </div>
                        </div>
                        <p className="text-white/70 text-sm mt-1">{listing.venue}</p>
                      </div>

                      {/* Price Section */}
                      <div className="space-y-3">
                        <div>
                          <p className="text-white/60 text-xs uppercase tracking-wider mb-1">Precio actual</p>
                          <div className="flex items-baseline gap-3">
                            <span className="text-4xl font-light">${listing.currentPrice.toLocaleString()}</span>
                            <span className="text-white/50 text-lg line-through">${listing.originalPrice.toLocaleString()}</span>
                            {listing.trend === 'up' && <TrendingUp className="w-5 h-5 text-green-300" />}
                            {listing.trend === 'down' && <TrendingDown className="w-5 h-5 text-red-300" />}
                          </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur rounded-2xl p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-white/70 text-xs mb-1">Deuda asumible</p>
                              <p className="text-2xl font-light">${listing.debt.toLocaleString()}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-white/70 text-xs mb-1">Score vendedor</p>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-lg">{listing.sellerRating}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="space-y-4">
                      {/* Seller Info */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold">
                              {listing.seller.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{listing.seller}</p>
                            <p className="text-xs text-white/70">Hace {listing.daysListed} días</p>
                          </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur px-3 py-1 rounded-full">
                          <p className="text-xs">Score: {listing.score}</p>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <button className="w-full bg-white text-gray-900 py-4 rounded-2xl font-medium hover:bg-gray-100 transition-all">
                        Ver detalles
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Page Indicator */}
      <div className="absolute bottom-24 right-5 flex flex-col gap-2">
        {listings.map((_, index) => (
          <div
            key={index}
            className={`transition-all duration-300 ${
              index === activeIndex 
                ? 'w-1 h-6 bg-gray-800' 
                : 'w-1 h-1 bg-gray-400'
            } rounded-full`}
          />
        ))}
      </div>
    </div>
  )
}