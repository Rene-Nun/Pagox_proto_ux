import { useState, useRef } from 'react'
import { Send, User, ShoppingBag, Heart, Calendar, CheckCircle, Circle, TrendingUp, Users, Target, X, Sparkles, Lock, Unlock, Plus, Mic } from 'lucide-react'

interface HomeScreenProps {
  onNavigate: (screen: string, tab?: string) => void
  activeTab?: string
}

export default function HomeScreen({ onNavigate, activeTab }: HomeScreenProps) {
  const [chatInput, setChatInput] = useState('')
  const [isFocused, setIsFocused] = useState(false) // Estado para controlar el modo "Teclado Activo"
  const [activeFilter, setActiveFilter] = useState('Para ti')
  const [currentScreen, setCurrentScreen] = useState(1)
  const [resaleModalOpen, setResaleModalOpen] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const suggestions = [
    "Escapada barata de fin de semana",
    "Vuelos a Cancún a meses",
    "Ver ofertas de reventa (Marketplace)",
    "¿Cómo funciona mi crédito?"
  ]

  const filters = ['Para ti', 'Playas', 'Eventos', 'Ofertas Flash', 'Ciudades']

  // ... (TUS DATOS DE MUESTRA: destinations, adventures, achievements SE MANTIENEN IGUAL)
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

  const adventures = [
    {
      id: 1,
      title: 'Tulum, Quintana Roo',
      subtitle: '6 días • Hotel Boutique',
      amount: 5394,
      paid: 4495,
      remaining: 899,
      status: 'active',
      dueDate: 'Este Viernes',
      payments: { completed: 5, total: 6 },
      progress: 83,
      image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=400&q=80',
      marketData: {
        optimalPrice: 4800,
        confidence: 92,
        demand: 'Alta',
        competition: 3
      }
    },
    {
      id: 2,
      title: 'Concierto Coldplay',
      subtitle: 'CDMX • Estadio GNP',
      amount: 1800,
      paid: 1800,
      remaining: 0,
      status: 'completed',
      dueDate: null,
      payments: { completed: 4, total: 4 },
      progress: 100,
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80',
      marketData: {
        optimalPrice: 2100,
        confidence: 88,
        demand: 'Muy Alta',
        competition: 7
      }
    },
    {
      id: 3,
      title: 'Puerto Vallarta',
      subtitle: 'Resort 5★ Todo Incluido',
      amount: 9600,
      paid: 7200,
      remaining: 2400,
      status: 'active',
      dueDate: '15 Dic',
      payments: { completed: 6, total: 8 },
      progress: 75,
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=80',
      marketData: {
        optimalPrice: 8200,
        confidence: 85,
        demand: 'Media',
        competition: 5
      }
    },
    {
      id: 4,
      title: 'Oaxaca - Guelaguetza',
      subtitle: 'Festival Cultural',
      amount: 3900,
      paid: 3900,
      remaining: 0,
      status: 'completed',
      dueDate: null,
      payments: { completed: 6, total: 6 },
      progress: 100,
      image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=400&q=80',
      marketData: {
        optimalPrice: 4200,
        confidence: 78,
        demand: 'Baja',
        competition: 2
      }
    }
  ]

  const achievements = [
    { id: 1, name: 'Primera Aventura', unlocked: true },
    { id: 2, name: 'Pagador Puntual', unlocked: true },
    { id: 3, name: 'Explorador', unlocked: true },
    { id: 4, name: 'Viajero Elite', unlocked: false }
  ]

  const goToDiscover = () => {
    setCurrentScreen(2)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const diffX = touchStartX.current - touchEndX.current
    const minSwipeDistance = 50

    if (diffX > minSwipeDistance && currentScreen < 2) {
      setCurrentScreen(currentScreen + 1)
    } else if (diffX < -minSwipeDistance && currentScreen > 0) {
      setCurrentScreen(currentScreen - 1)
    }
  }

  const openResaleModal = (adventure: any) => {
    setSelectedTicket(adventure)
    setResaleModalOpen(true)
  }

  return (
    <div className="fixed inset-0 w-full h-[100dvh] bg-black overflow-hidden">
      <style>{`
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
      `}</style>

      <div 
        ref={containerRef}
        className="flex h-full transition-transform duration-300 ease-out"
        style={{
          transform: `translateX(-${currentScreen * 100}vw)`,
          width: '300vw'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* PANTALLA IZQUIERDA - PERFIL PREMIUM */}
        <div className="w-screen h-full flex-shrink-0 bg-black flex flex-col overflow-hidden">
          {/* ... (TU CÓDIGO DE PERFIL SE QUEDA IGUAL, LO OMITO PARA NO HACER SPAM, PERO IMAGINA QUE AQUÍ VA TODO EL CÓDIGO DE LA PANTALLA IZQUIERDA QUE YA TE GUSTABA) ... */}
           <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="px-5 pt-6 pb-8">
              {/* Header de Perfil Premium */}
              <div className="flex items-center gap-4 mb-8">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#5b5fc7] via-[#7b3ff2] to-[#9b4ff9] flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-[#5b5fc7]/50">
                    C
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center border-2 border-black">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white mb-1.5">Christian</h1>
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1f203a] to-[#0e1027] rounded-full px-3 py-1.5 border border-[#2a2b45]">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#5b5fc7] to-[#7b3ff2]"></div>
                    <span className="text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#5b5fc7] to-[#7b3ff2]">
                      Viajero Confiable • Nivel 2
                    </span>
                  </div>
                </div>
              </div>

              {/* Score Turista - Gamificado */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tu Reputación</h2>
                  <span className="text-xs text-gray-500">Nivel 2 de 5</span>
                </div>
                <div className="bg-gradient-to-br from-[#1f203a] to-[#0e1027] rounded-3xl p-6 border border-[#2a2b45] shadow-lg shadow-[#003d90]/30">
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#5b5fc7] via-[#7b3ff2] to-[#9b4ff9]">
                        85
                      </span>
                      <span className="text-3xl font-bold text-gray-600">/100</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-300">Excelente</p>
                      <p className="text-xs text-gray-500">+12 este mes</p>
                    </div>
                  </div>
                  
                  <div className="relative w-full h-3 bg-[#0d0e14] rounded-full overflow-hidden mb-4 border border-[#1a1b26]">
                    <div 
                      className="absolute left-0 top-0 h-full rounded-full transition-all duration-500"
                      style={{
                        width: '85%',
                        background: 'linear-gradient(90deg, #5b5fc7 0%, #7b3ff2 50%, #9b4ff9 100%)'
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-[#2a2b45]">
                    {achievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className={`flex-1 h-12 rounded-xl flex items-center justify-center transition-all ${
                          achievement.unlocked
                            ? 'bg-gradient-to-br from-[#5b5fc7]/20 to-[#7b3ff2]/20 border border-[#5b5fc7]/30'
                            : 'bg-[#0d0e14] border border-[#1a1b26]'
                        }`}
                      >
                        {achievement.unlocked ? (
                          <Unlock className="w-5 h-5 text-[#7b3ff2]" />
                        ) : (
                          <Lock className="w-5 h-5 text-gray-700" />
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-4 text-center leading-relaxed">
                    Desbloquea experiencias premium y mejores tasas
                  </p>
                </div>
              </div>

              {/* Próximo Compromiso */}
              <div className="mb-6">
                <h2 className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">Próximo Pago</h2>
                <div className="relative bg-gradient-to-br from-[#1f203a] to-[#0e1027] rounded-3xl p-6 border border-[#2a2b45] shadow-lg shadow-[#003d90]/30 overflow-hidden">
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#5b5fc7] to-transparent"></div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-5">
                      <div>
                        <p className="text-sm text-gray-400 mb-2 font-medium">Para tu viaje a</p>
                        <p className="text-2xl font-bold text-white mb-1">Tulum</p>
                        <p className="text-xs text-gray-500">Vence este Viernes</p>
                      </div>
                      <div className="text-right">
                        <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-300">
                          $899
                        </p>
                      </div>
                    </div>
                    
                    <button className="w-full bg-gradient-to-r from-[#5b5fc7] to-[#7b3ff2] hover:from-[#6b6fd7] hover:to-[#8b4ff9] active:scale-98 rounded-2xl py-4 text-white font-bold text-base transition-all shadow-lg shadow-[#5b5fc7]/30">
                      Pagar Ahora
                    </button>
                  </div>
                </div>
              </div>

              {/* Mis Aventuras */}
              <div>
                <h2 className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">Mis Aventuras</h2>
                <div className="space-y-3">
                  {adventures.map((adventure) => (
                    <div
                      key={adventure.id}
                      className="relative bg-gradient-to-br from-[#1f203a] to-[#0e1027] rounded-2xl overflow-hidden border border-[#2a2b45] shadow-lg shadow-[#003d90]/20"
                    >
                      <div className="relative h-32">
                        <img
                          src={adventure.image}
                          alt={adventure.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                        
                        <div className="absolute top-3 right-3">
                          {adventure.status === 'completed' ? (
                            <div className="flex items-center gap-1.5 bg-green-500/20 backdrop-blur-sm rounded-full px-3 py-1.5 border border-green-500/30">
                              <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                              <span className="text-xs font-bold text-green-400">Completado</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 bg-[#5b5fc7]/20 backdrop-blur-sm rounded-full px-3 py-1.5 border border-[#5b5fc7]/30">
                              <Circle className="w-3.5 h-3.5 text-[#5b5fc7]" />
                              <span className="text-xs font-bold text-[#5b5fc7]">Activo</span>
                            </div>
                          )}
                        </div>

                        <div className="absolute bottom-3 left-3 right-3">
                          <h3 className="text-lg font-bold text-white mb-0.5">{adventure.title}</h3>
                          <p className="text-xs text-gray-300">{adventure.subtitle}</p>
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="mb-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-gray-400">
                              {adventure.payments.completed} de {adventure.payments.total} pagos
                            </span>
                            <span className="text-xs font-bold text-white">
                              ${adventure.paid.toLocaleString()} / ${adventure.amount.toLocaleString()}
                            </span>
                          </div>
                          
                          <div className="relative w-full h-2 bg-[#0d0e14] rounded-full overflow-hidden border border-[#1a1b26]">
                            <div 
                              className="absolute left-0 top-0 h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${adventure.progress}%`,
                                background: adventure.status === 'completed' 
                                  ? 'linear-gradient(90deg, #10b981 0%, #059669 100%)'
                                  : 'linear-gradient(90deg, #5b5fc7 0%, #7b3ff2 100%)'
                              }}
                            ></div>
                          </div>
                        </div>

                        {adventure.status === 'active' && adventure.remaining > 0 && (
                          <div className="flex gap-2 pt-3 border-t border-[#2a2b45]">
                            <div className="flex-1">
                              <p className="text-xs text-gray-500 mb-1">Próximo pago</p>
                              <p className="text-sm font-bold text-white">{adventure.dueDate}</p>
                            </div>
                            <button
                              onClick={() => openResaleModal(adventure)}
                              className="px-4 py-2 bg-gradient-to-r from-[#5b5fc7]/20 to-[#7b3ff2]/20 hover:from-[#5b5fc7]/30 hover:to-[#7b3ff2]/30 rounded-xl text-xs font-bold text-[#7b3ff2] border border-[#5b5fc7]/30 transition-all active:scale-95"
                            >
                              Revender
                            </button>
                          </div>
                        )}

                        {adventure.status === 'completed' && (
                          <button
                            onClick={() => openResaleModal(adventure)}
                            className="w-full mt-3 pt-3 border-t border-[#2a2b45] py-2 bg-gradient-to-r from-[#5b5fc7]/20 to-[#7b3ff2]/20 hover:from-[#5b5fc7]/30 hover:to-[#7b3ff2]/30 rounded-xl text-sm font-bold text-[#7b3ff2] border border-[#5b5fc7]/30 transition-all active:scale-95"
                          >
                            Poner en Reventa
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PANTALLA CENTRAL - CHAT (ARREGLADA) */}
        <div className="w-screen h-full flex-shrink-0 bg-black flex flex-col relative">
          
          {/* Header FIJO */}
          <div className="absolute top-0 left-0 right-0 z-10 px-4 pt-3 pb-3 flex items-center justify-between bg-black/95 backdrop-blur-sm">
            <button 
              onClick={() => setCurrentScreen(0)}
              className="w-10 h-10 rounded-full bg-[#1a1b26] flex items-center justify-center active:bg-[#27283a] transition-colors"
            >
              <User className="w-5 h-5 text-gray-300" />
            </button>
            <button 
              onClick={goToDiscover}
              className="w-10 h-10 rounded-full bg-[#5b5fc7] flex items-center justify-center active:bg-[#6b6fd7] transition-colors"
            >
              <ShoppingBag className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Contenido Central Scrollable - Con lógica isFocused para ocultar cosas */}
          <div className="flex-1 px-5 overflow-y-auto" style={{ paddingTop: '4.5rem', paddingBottom: '7rem', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className={`transition-all duration-300 ${isFocused ? 'opacity-0 h-0 overflow-hidden pointer-events-none' : 'opacity-100'}`}>
              
              {/* Logo y Bienvenida */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden flex-shrink-0 shadow-[0_0_20px_8px_rgba(255,255,255,0.3)]">
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

              <div className="flex flex-col items-start gap-2.5">
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

          {/* Input FIJO ABAJO - Estilo AI */}
          <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black via-black/95 to-transparent pt-4 pb-6 px-4">
            <div className="relative flex items-center gap-2 bg-[#1a1b26] rounded-full px-2 py-2 border border-[#2a2b45]">
              {/* Botón Plus */}
              <button className="w-9 h-9 rounded-full bg-[#0d0e14] flex items-center justify-center flex-shrink-0 active:bg-[#1a1b26] transition-colors">
                <Plus className="w-5 h-5 text-gray-400" />
              </button>

              {/* Input Real */}
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onFocus={() => setIsFocused(true)} // Activa modo "Teclado"
                onBlur={() => setIsFocused(false)} // Desactiva modo "Teclado"
                placeholder="Escribe a Yunus..."
                className="flex-1 bg-transparent text-white placeholder-gray-500 text-[16px] focus:outline-none border-0 px-2 h-10"
              />

              {/* Botón Acción Derecha */}
              {chatInput.trim() ? (
                <button className="w-9 h-9 rounded-full bg-[#5b5fc7] flex items-center justify-center flex-shrink-0 active:bg-[#6b6fd7] transition-colors">
                  <Send className="w-4 h-4 text-white" />
                </button>
              ) : (
                <button className="w-9 h-9 rounded-full bg-[#0d0e14] flex items-center justify-center flex-shrink-0 active:bg-[#1a1b26] transition-colors">
                  <Mic className="w-5 h-5 text-gray-400" />
                </button>
              )}
            </div>
            
            {/* Texto de disclaimer - Se oculta si hay teclado para ahorrar espacio */}
            {!isFocused && (
              <p className="text-[10px] text-gray-600 mt-3 text-center font-medium animate-fade-in">
                Yunus analiza tu perfil para ofrecerte el mejor plan de pagos.
              </p>
            )}
          </div>
        </div>

        {/* PANTALLA DERECHA - DISCOVER */}
        <div className="w-screen h-full flex-shrink-0 bg-black flex flex-col">
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

          <div className="flex-1 overflow-y-auto px-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="space-y-4 pb-8">
              {destinations.map((dest) => (
                <div
                  key={dest.id}
                  className="relative rounded-2xl overflow-hidden bg-[#1a1b26] active:scale-98 transition-transform"
                >
                  <div className="relative w-full h-64">
                    <img
                      src={dest.image}
                      alt={dest.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    
                    <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center active:scale-95 transition-transform">
                      <Heart className="w-5 h-5 text-white" />
                    </button>

                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-xl font-bold text-white mb-1">{dest.title}</h3>
                      <p className="text-sm text-gray-300 mb-3">{dest.description}</p>
                      
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

      {/* MODAL DE REVENTA (IGUAL QUE ANTES) */}
      {resaleModalOpen && selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm">
          <div 
            className="w-full max-w-lg bg-gradient-to-br from-[#1f203a] to-[#0e1027] rounded-t-3xl border-t border-x border-[#2a2b45] shadow-2xl animate-slide-up"
            style={{ maxHeight: '85vh' }}
          >
            {/* ... CONTENIDO DEL MODAL SE MANTIENE ... */}
             <div className="flex items-center justify-between p-5 border-b border-[#2a2b45]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5b5fc7] to-[#7b3ff2] flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Análisis de Mercado</h3>
                  <p className="text-xs text-gray-400">Powered by Yunus AI</p>
                </div>
              </div>
              <button
                onClick={() => setResaleModalOpen(false)}
                className="w-9 h-9 rounded-full bg-[#0d0e14] flex items-center justify-center hover:bg-[#1a1b26] transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto" style={{ maxHeight: 'calc(85vh - 80px)', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <div className="relative rounded-2xl overflow-hidden mb-5 border border-[#2a2b45]">
                <img
                  src={selectedTicket.image}
                  alt={selectedTicket.title}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                <div className="absolute bottom-3 left-3">
                  <h4 className="text-base font-bold text-white">{selectedTicket.title}</h4>
                  <p className="text-xs text-gray-300">{selectedTicket.subtitle}</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#5b5fc7]/10 to-[#7b3ff2]/10 rounded-2xl p-5 mb-4 border border-[#5b5fc7]/20">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-[#7b3ff2]" />
                  <h4 className="text-sm font-bold text-gray-300">Precio Óptimo Sugerido</h4>
                </div>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#5b5fc7] to-[#7b3ff2]">
                    ${selectedTicket.marketData.optimalPrice.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500 pb-1">MXN</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Basado en {selectedTicket.marketData.competition} ofertas similares y demanda actual
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="bg-[#0d0e14] rounded-xl p-3 border border-[#1a1b26]">
                  <div className="flex items-center gap-1 mb-2">
                    <Target className="w-4 h-4 text-[#5b5fc7]" />
                    <span className="text-xs font-medium text-gray-400">Confianza</span>
                  </div>
                  <p className="text-2xl font-bold text-white">{selectedTicket.marketData.confidence}%</p>
                </div>

                <div className="bg-[#0d0e14] rounded-xl p-3 border border-[#1a1b26]">
                  <div className="flex items-center gap-1 mb-2">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-xs font-medium text-gray-400">Demanda</span>
                  </div>
                  <p className="text-sm font-bold text-white">{selectedTicket.marketData.demand}</p>
                </div>

                <div className="bg-[#0d0e14] rounded-xl p-3 border border-[#1a1b26]">
                  <div className="flex items-center gap-1 mb-2">
                    <Users className="w-4 h-4 text-yellow-400" />
                    <span className="text-xs font-medium text-gray-400">Ofertas</span>
                  </div>
                  <p className="text-2xl font-bold text-white">{selectedTicket.marketData.competition}</p>
                </div>
              </div>

              <div className="bg-[#0d0e14] rounded-2xl p-4 mb-5 border border-[#1a1b26]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_5px_rgba(255,255,255,0.2)]">
                    <img 
                      src="/images/yunus.png" 
                      alt="Yunus" 
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-300 mb-1">Análisis de Yunus</p>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {selectedTicket.marketData.demand === 'Muy Alta' 
                        ? `Este destino tiene alta demanda. Tu precio está 17% por encima del promedio, pero la urgencia juega a tu favor.`
                        : selectedTicket.marketData.demand === 'Alta'
                        ? `Buen momento para vender. El mercado está activo y tu precio es competitivo.`
                        : `La demanda es moderada. Considera ajustar el precio para vender más rápido.`
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-[#5b5fc7] to-[#7b3ff2] hover:from-[#6b6fd7] hover:to-[#8b4ff9] active:scale-98 rounded-2xl py-4 text-white font-bold text-base transition-all shadow-lg shadow-[#5b5fc7]/30">
                  Publicar en Marketplace
                </button>
                <button 
                  onClick={() => setResaleModalOpen(false)}
                  className="w-full bg-[#0d0e14] hover:bg-[#1a1b26] rounded-2xl py-4 text-gray-400 font-semibold text-base transition-colors border border-[#1a1b26]"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
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
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slide-up {
          animation: slideUp 0.3s ease-out;
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  )
}
