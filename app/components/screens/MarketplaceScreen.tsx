import { useState, useRef, useEffect } from 'react'
// Asumiendo que Header es un componente válido en tu estructura de archivos
const Header = ({ title, onNavigate }) => (
  <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
    <button className="p-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </button>
    <h1 className="text-lg font-semibold">{title}</h1>
    <div className="w-8"></div>
  </header>
);
import { TrendingUp, TrendingDown, Filter, Search, Star, MapPin, Calendar, Music, Plane, Sparkles, Ticket } from 'lucide-react'

interface MarketplaceScreenProps {
  onNavigate: (screen: string, tab?: string) => void
  activeTab: string
}

export default function MarketplaceScreen({ onNavigate, activeTab }: MarketplaceScreenProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeFilter, setActiveFilter] = useState('todos')
  const scrollRef = useRef<HTMLDivElement>(null)

  const filters = [
    { id: 'todos', label: 'Todos', icon: null },
    { id: 'conciertos', label: 'Conciertos', icon: Music },
    { id: 'viajes', label: 'Viajes', icon: Plane },
    { id: 'ofertas', label: 'Súper ofertas', icon: Sparkles },
  ]

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
      bgColor: 'bg-purple-500',
      emoji: '✨',
      daysListed: 3,
      category: 'conciertos'
    },
    {
      id: 2,
      event: 'Formula 1 - Gran Premio',
      date: '29 Oct 2025',
      venue: 'Autódromo Hermanos R.',
      location: 'CDMX',
      originalPrice: 4000,
      currentPrice: 3500,
      discount: 13,
      debt: 2800,
      seller: 'Carlos R.',
      sellerRating: 4.5,
      score: 88,
      trend: 'down',
      bgColor: 'bg-red-500',
      emoji: '🏎️',
      daysListed: 1,
      category: 'eventos'
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
      bgColor: 'bg-gray-800',
      emoji: '🎸',
      daysListed: 5,
      category: 'conciertos'
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
      bgColor: 'bg-blue-600',
      emoji: '🎪',
      daysListed: 2,
      category: 'eventos'
    }
  ]

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollTop = scrollRef.current.scrollTop;
      // La altura de la tarjeta sigue siendo la misma, 55% del viewport + 8px de margen
      const cardHeight = window.innerHeight * 0.55 + 8;
      const newIndex = Math.round(scrollTop / cardHeight);
      const clampedIndex = Math.max(0, Math.min(newIndex, listings.length - 1));
      
      if (clampedIndex !== activeIndex) {
        setActiveIndex(clampedIndex);
      }
    }
  };

  return (
    // Contenedor principal que ocupa toda la altura y usa flexbox en columna
    <div className="h-screen flex flex-col bg-white">
      {/* Header normal, es el primer elemento en el flujo */}
      <Header title="Marketplace" onNavigate={onNavigate} />
      
      {/* Contenedor para la búsqueda y los filtros. Ya no es absoluto. */}
      <div className="px-5 pt-4">
        {/* Barra de búsqueda */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Buscar eventos..."
            className="w-full bg-white rounded-2xl py-3.5 pl-11 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all border border-gray-200"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <Filter className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Pills de filtros */}
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-4">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all whitespace-nowrap ${
                activeFilter === filter.id
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:text-gray-900 bg-white border border-gray-200'
              }`}
            >
              {filter.icon && <filter.icon className="w-3.5 h-3.5" />}
              <span className="text-xs font-medium">{filter.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Contenedor de las tarjetas. Ocupa el espacio restante y es scrollable. */}
      {/* Ya no necesita un padding gigante porque los elementos anteriores están en el flujo normal. */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto snap-y snap-mandatory px-5"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {listings.map((listing, index) => {
          const offset = index - activeIndex
          
          let scale = 1
          let opacity = 1
          let translateY = 0
          let zIndex = 10
          
          if (offset === 0) {
            scale = 1
            opacity = 1
            translateY = 0
            zIndex = 20
          } else if (Math.abs(offset) === 1) {
            scale = 0.92
            opacity = 0.5
            translateY = offset * 15
            zIndex = 15
          } else if (Math.abs(offset) === 2) {
            scale = 0.85
            opacity = 0.25
            translateY = offset * 30
            zIndex = 10
          } else {
            scale = 0.8
            opacity = 0.1
            translateY = offset * 40
            zIndex = 5
          }
          
          return (
            <div
              key={listing.id}
              className="h-[55vh] mb-2 snap-center transition-all duration-300 ease-out"
              style={{
                transform: `scale(${scale}) translateY(${translateY}px)`,
                opacity,
                zIndex
              }}
            >
              <div
                className={`h-full rounded-3xl overflow-hidden shadow-xl ${listing.bgColor} relative p-6 flex flex-col`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl transform translate-x-16 -translate-y-16"></div>

                <div className="flex justify-between items-start mb-6">
                  <div className="text-5xl">{listing.emoji}</div>
                  <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <span className="text-white text-sm font-bold">-{listing.discount}%</span>
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-light text-white mb-3 leading-tight">
                      {listing.event}
                    </h2>
                    
                    <div className="flex items-center gap-4 text-white/80 text-sm mb-2">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {listing.date}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {listing.location}
                      </div>
                    </div>
                    
                    <p className="text-white/70 text-sm">{listing.venue}</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-white/60 text-xs uppercase tracking-wider mb-2">Precio actual</p>
                      <div className="flex items-baseline gap-3">
                        <span className="text-4xl font-extralight text-white">
                          ${listing.currentPrice.toLocaleString()}
                        </span>
                        <span className="text-white/40 text-lg line-through">
                          ${listing.originalPrice.toLocaleString()}
                        </span>
                        {listing.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-300" />}
                        {listing.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-300" />}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-white">
                      <div>
                        <p className="text-white/60 text-xs mb-1">Deuda asumible</p>
                        <p className="text-xl font-light">${listing.debt.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-white/60 text-xs mb-1">Score vendedor</p>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-xl font-light">{listing.sellerRating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {listing.seller.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="text-white">
                          <p className="text-sm font-medium">{listing.seller}</p>
                          <p className="text-xs text-white/60">
                            Hace {listing.daysListed} días • Score: {listing.score}
                          </p>
                        </div>
                      </div>
                      
                      <button className="bg-white text-gray-900 px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-100 transition-all">
                        Ver detalles
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
        
        {/* Spacer final para permitir scrollear la última tarjeta hasta el centro */}
        <div className="h-[30vh]"></div>
      </div>

      {/* El indicador de página sigue siendo absoluto al contenedor principal */}
      <div className="absolute bottom-24 right-5 flex flex-col gap-1.5 z-10">
        {listings.map((_, index) => (
          <div
            key={index}
            className={`transition-all duration-300 rounded-full ${
              index === activeIndex 
                ? 'w-1 h-5 bg-gray-800' 
                : 'w-1 h-1 bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

