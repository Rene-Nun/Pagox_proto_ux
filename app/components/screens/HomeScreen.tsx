import { useState, useRef } from 'react'
import { Send, User, ShoppingBag, Heart, MapPin, Calendar } from 'lucide-react'

interface HomeScreenProps {
  onNavigate: (screen: string, tab?: string) => void
  activeTab?: string
}

export default function HomeScreen({ onNavigate, activeTab }: HomeScreenProps) {
  const [chatInput, setChatInput] = useState('')
  const [activeFilter, setActiveFilter] = useState('Para ti')
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const suggestions = [
    "Escapada barata de fin de semana",
    "Vuelos a Cancún a meses",
    "Ver ofertas de reventa (Marketplace)",
    "¿Cómo funciona mi crédito?"
  ]

  const filters = ['Para ti', 'Playas', 'Eventos', 'Ofertas Flash', 'Ciudades']

  const destinations = [
    {
      id: 1,
      title: 'Tulum, Quintana Roo',
      description: 'Playas paradisíacas y ruinas mayas',
      image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=800&q=80',
      monthlyPayment: 899,
      installments: 6
    },
    {
      id: 2,
      title: 'CDMX - Concierto Coldplay',
      description: 'Estadio GNP, Marzo 2025',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
      monthlyPayment: 450,
      installments: 4
    },
    {
      id: 3,
      title: 'Puerto Vallarta, Jalisco',
      description: 'Todo incluido en resort 5 estrellas',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
      monthlyPayment: 1200,
      installments: 8
    },
    {
      id: 4,
      title: 'Oaxaca de Juárez',
      description: 'Cultura, gastronomía y mezcal',
      image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=800&q=80',
      monthlyPayment: 650,
      installments: 6
    },
    {
      id: 5,
      title: 'Cancún - Spring Break',
      description: 'Zona hotelera, 5 días / 4 noches',
      image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&q=80',
      monthlyPayment: 950,
      installments: 6
    }
  ]

  return (
    <div className="fixed inset-0 w-full h-full bg-black overflow-hidden">
      <style jsx global>{`
        html, body {
          background-color: #000000 !important;
          overscroll-behavior: none !important;
          overflow: hidden !important;
          position: fixed !important;
          width: 100% !important;
          height: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
        }

        * {
          -webkit-overflow-scrolling: auto !important;
          overscroll-behavior: none !important;
        }
      `}</style>

      {/* Contenedor de 3 pantallas con scroll snap */}
      <div 
        ref={scrollContainerRef}
        className="flex h-full w-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {/* Pantalla Izquierda - Vacía por ahora */}
        <div className="min-w-full h-full snap-center bg-black">
          {/* Placeholder vacío */}
        </div>

        {/* Pantalla Central - CHAT (Tu código intacto) */}
        <div className="min-w-full h-full snap-center snap-always bg-black flex flex-col">
          {/* Header */}
          <div className="px-4 pt-3 pb-3 flex items-center justify-between flex-shrink-0 bg-black">
            <button 
              onClick={() => onNavigate('profile')}
              className="w-10 h-10 rounded-full bg-[#1a1b26] flex items-center justify-center active:bg-[#27283a] transition-colors"
            >
              <User className="w-5 h-5 text-gray-300" />
            </button>
            <button 
              onClick={() => onNavigate('wallet')}
              className="w-10 h-10 rounded-full bg-[#1a1b26] flex items-center justify-center active:bg-[#27283a] transition-colors"
            >
              <ShoppingBag className="w-5 h-5 text-gray-300" />
            </button>
          </div>

          {/* Contenido Central */}
          <div className="flex-1 px-5 pt-2 overflow-y-auto" style={{ 
            WebkitOverflowScrolling: 'touch',
            overscrollBehavior: 'none'
          }}>
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img 
                    src="/images/yunus.png" 
                    alt="Yunus" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-2xl font-medium text-white tracking-tight">Yunus</h2>
              </div>

              <div className="mb-6">
                <p className="text-[17px] text-gray-200 leading-relaxed font-light">
                  Hola. Tu próxima aventura empieza aquí. <br/>
                  Dime a dónde quieres ir o qué se te antoja, y yo armo el plan perfecto para ti.
                </p>
              </div>

              <div className="flex flex-col items-start gap-2.5 pb-32">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setChatInput(suggestion)}
                    className="w-auto max-w-full bg-[#1a1b26] active:bg-[#27283a] rounded-2xl px-5 py-3 text-left transition-all active:scale-95"
                  >
                    <p className="text-[14px] text-gray-300 font-normal">{suggestion}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Input fijo abajo */}
          <div className="flex-shrink-0 px-4 pb-8 pt-2 bg-black w-full">
            <div className="relative">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Escribe a Yunus..."
                className="w-full bg-[#1a1b26] rounded-full pl-5 pr-12 py-4 text-white placeholder-gray-500 text-[16px] focus:outline-none focus:ring-1 focus:ring-[#5b5fc7] border-0"
              />
              <button 
                className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-[#5b5fc7] rounded-full flex items-center justify-center active:bg-[#6b6fd7] transition-colors disabled:opacity-50"
                disabled={!chatInput.trim()}
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
            <p className="text-[10px] text-gray-600 mt-3 text-center font-medium">
              Yunus analiza tu perfil para ofrecerte el mejor plan de pagos.
            </p>
          </div>
        </div>

        {/* Pantalla Derecha - DISCOVER */}
        <div className="min-w-full h-full snap-center bg-black flex flex-col">
          {/* Header con filtros */}
          <div className="flex-shrink-0 px-4 pt-3 pb-3 bg-black">
            <h1 className="text-2xl font-semibold text-white mb-4">Descubre</h1>
            <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    activeFilter === filter
                      ? 'bg-white text-black'
                      : 'bg-[#1a1b26] text-gray-300 active:bg-[#27283a]'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Feed de destinos */}
          <div className="flex-1 overflow-y-auto px-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="space-y-4 pb-8">
              {destinations.map((dest) => (
                <div
                  key={dest.id}
                  className="relative rounded-2xl overflow-hidden bg-[#1a1b26] active:scale-98 transition-transform"
                >
                  {/* Imagen */}
                  <div className="relative w-full h-64">
                    <img
                      src={dest.image}
                      alt={dest.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Gradiente */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    
                    {/* Corazón favorito */}
                    <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center active:scale-95 transition-transform">
                      <Heart className="w-5 h-5 text-white" />
                    </button>

                    {/* Contenido sobre la imagen */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-xl font-bold text-white mb-1">{dest.title}</h3>
                      <p className="text-sm text-gray-300 mb-3">{dest.description}</p>
                      
                      {/* Badge de precio */}
                      <div className="inline-flex items-center gap-2 bg-[#5b5fc7] rounded-full px-4 py-2">
                        <Calendar className="w-4 h-4 text-white" />
                        <span className="text-sm font-semibold text-white">
                          {dest.installments} pagos de ${dest.monthlyPayment}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        .active-scale-98:active {
          transform: scale(0.98);
        }
      `}</style>
    </div>
  )
}