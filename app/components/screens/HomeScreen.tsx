import { useState, useRef } from 'react'
import { Send, User, ShoppingBag, Heart, Calendar, CheckCircle, Circle, TrendingUp, Users, Target, X, Sparkles, Lock, Unlock, Plus, Mic } from 'lucide-react'

interface HomeScreenProps {
  onNavigate: (screen: string, tab?: string) => void
  activeTab?: string
}

export default function HomeScreen({ onNavigate, activeTab }: HomeScreenProps) {
  const [chatInput, setChatInput] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [activeFilter, setActiveFilter] = useState('Para ti')
  const [currentScreen, setCurrentScreen] = useState(1)
  const [resaleModalOpen, setResaleModalOpen] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<any>(null)
  
  // REFS PARA GESTOS
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const suggestions = [
    "Escapada barata de fin de semana",
    "Vuelos a Cancún a meses",
    "Ver ofertas de reventa (Marketplace)",
    "¿Cómo funciona mi crédito?"
  ]

  const filters = ['Para ti', 'Playas', 'Eventos', 'Ofertas Flash', 'Ciudades']

  // --- DATOS DUMMY ---
  const destinations = [
    { id: 1, title: 'Tulum, Quintana Roo', description: 'Playas paradisíacas y ruinas mayas', image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=800&q=80', monthlyPayment: 899, installments: 6 },
    { id: 2, title: 'CDMX - Concierto Coldplay', description: 'Estadio GNP, Marzo 2025', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80', monthlyPayment: 450, installments: 4 },
    { id: 3, title: 'Puerto Vallarta, Jalisco', description: 'Todo incluido en resort 5 estrellas', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80', monthlyPayment: 1200, installments: 8 },
    { id: 4, title: 'Oaxaca de Juárez', description: 'Cultura, gastronomía y mezcal', image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=800&q=80', monthlyPayment: 650, installments: 6 },
    { id: 5, title: 'Cancún - Spring Break', description: 'Zona hotelera, 5 días / 4 noches', image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&q=80', monthlyPayment: 950, installments: 6 }
  ]

  const adventures = [
    { id: 1, title: 'Tulum, Quintana Roo', subtitle: '6 días • Hotel Boutique', amount: 5394, paid: 4495, remaining: 899, status: 'active', dueDate: 'Este Viernes', payments: { completed: 5, total: 6 }, progress: 83, image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=400&q=80', marketData: { optimalPrice: 4800, confidence: 92, demand: 'Alta', competition: 3 } },
    { id: 2, title: 'Concierto Coldplay', subtitle: 'CDMX • Estadio GNP', amount: 1800, paid: 1800, remaining: 0, status: 'completed', dueDate: null, payments: { completed: 4, total: 4 }, progress: 100, image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80', marketData: { optimalPrice: 2100, confidence: 88, demand: 'Muy Alta', competition: 7 } }
  ]

  const achievements = [
    { id: 1, name: 'Primera Aventura', unlocked: true },
    { id: 2, name: 'Pagador Puntual', unlocked: true },
    { id: 3, name: 'Explorador', unlocked: true },
    { id: 4, name: 'Viajero Elite', unlocked: false }
  ]

  // --- LÓGICA DE SWIPE CORREGIDA ---
  const goToDiscover = () => setCurrentScreen(2)

  const handleTouchStart = (e: React.TouchEvent) => {
    // RESETEAMOS AMBOS VALORES AL TOCAR. ESTO EVITA EL BUG DEL SALTO.
    touchStartX.current = e.touches[0].clientX
    touchEndX.current = null 
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    // SI touchEndX ES NULL, SIGNIFICA QUE NO HUBO MOVIMIENTO (FUE UN CLIC). SALIMOS.
    if (touchStartX.current === null || touchEndX.current === null) return

    const diffX = touchStartX.current - touchEndX.current
    const minSwipeDistance = 60 

    if (Math.abs(diffX) > minSwipeDistance) {
      if (diffX > 0 && currentScreen < 2) {
        setCurrentScreen(prev => prev + 1)
      } else if (diffX < 0 && currentScreen > 0) {
        setCurrentScreen(prev => prev - 1)
      }
    }
    
    // Limpiar refs
    touchStartX.current = null
    touchEndX.current = null
  }

  const openResaleModal = (adventure: any) => {
    setSelectedTicket(adventure)
    setResaleModalOpen(true)
  }

  return (
    <div className="fixed inset-0 w-full h-[100dvh] bg-black flex flex-col overflow-hidden">
      <style>{`
        html, body { background-color: #000000; overscroll-behavior: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* HEADER FIJO - Siempre visible arriba */}
      <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 pb-2 flex items-center justify-between bg-gradient-to-b from-black via-black/90 to-transparent pointer-events-none">
        <button 
          onClick={() => setCurrentScreen(0)}
          className={`pointer-events-auto w-10 h-10 rounded-full flex items-center justify-center transition-colors border border-[#27283a] ${currentScreen === 0 ? 'bg-white text-black' : 'bg-[#1a1b26] text-gray-300'}`}
        >
          <User className="w-5 h-5" />
        </button>
        <button 
          onClick={goToDiscover}
          className={`pointer-events-auto w-10 h-10 rounded-full flex items-center justify-center transition-colors border border-[#27283a] ${currentScreen === 2 ? 'bg-white text-black' : 'bg-[#1a1b26] text-gray-300'}`}
        >
          <ShoppingBag className="w-5 h-5" />
        </button>
      </div>

      {/* CARRUSEL DE PANTALLAS */}
      <div 
        ref={containerRef}
        className="flex-1 flex transition-transform duration-300 ease-out relative"
        style={{ transform: `translateX(-${currentScreen * 100}vw)`, width: '300vw' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* PANTALLA 0: PERFIL (IZQUIERDA) */}
        <div className="w-[100vw] h-full overflow-y-auto no-scrollbar pt-20 pb-24 px-5">
             <div className="pt-2 pb-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#5b5fc7] via-[#7b3ff2] to-[#9b4ff9] flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-[#5b5fc7]/50">C</div>
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center border-2 border-black">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white mb-1.5">Christian</h1>
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1f203a] to-[#0e1027] rounded-full px-3 py-1.5 border border-[#2a2b45]">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#5b5fc7] to-[#7b3ff2]"></div>
                    <span className="text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#5b5fc7] to-[#7b3ff2]">Viajero Confiable • Nivel 2</span>
                  </div>
                </div>
              </div>

              {/* Score */}
              <div className="mb-6 bg-gradient-to-br from-[#1f203a] to-[#0e1027] rounded-3xl p-6 border border-[#2a2b45] shadow-lg shadow-[#003d90]/30">
                 <div className="flex items-end justify-between mb-4">
                    <div>
                      <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#5b5fc7] via-[#7b3ff2] to-[#9b4ff9]">85</span>
                      <span className="text-3xl font-bold text-gray-600">/100</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-300">Excelente</p>
                    </div>
                  </div>
                  <div className="relative w-full h-3 bg-[#0d0e14] rounded-full overflow-hidden mb-4 border border-[#1a1b26]">
                    <div className="absolute left-0 top-0 h-full rounded-full w-[85%] bg-gradient-to-r from-[#5b5fc7] to-[#9b4ff9]"></div>
                  </div>
                  <div className="flex items-center gap-2 pt-3 border-t border-[#2a2b45]">
                    {achievements.map((ach) => (
                      <div key={ach.id} className={`flex-1 h-12 rounded-xl flex items-center justify-center ${ach.unlocked ? 'bg-[#5b5fc7]/20 border border-[#5b5fc7]/30' : 'bg-[#0d0e14] border border-[#1a1b26]'}`}>
                        {ach.unlocked ? <Unlock className="w-5 h-5 text-[#7b3ff2]" /> : <Lock className="w-5 h-5 text-gray-700" />}
                      </div>
                    ))}
                  </div>
              </div>

              {/* Aventuras */}
              <h2 className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">Mis Aventuras</h2>
              <div className="space-y-3">
                  {adventures.map((adventure) => (
                    <div key={adventure.id} className="bg-[#1f203a] rounded-2xl overflow-hidden border border-[#2a2b45] p-4">
                       <div className="flex justify-between items-start mb-2">
                          <h3 className="text-white font-bold">{adventure.title}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${adventure.status === 'active' ? 'bg-blue-900 text-blue-200' : 'bg-green-900 text-green-200'}`}>{adventure.status}</span>
                       </div>
                       <button onClick={() => openResaleModal(adventure)} className="w-full mt-2 py-2 bg-[#2a2b45] text-blue-300 text-xs font-bold rounded-lg border border-blue-500/30">Revender</button>
                    </div>
                  ))}
              </div>
            </div>
        </div>

        {/* PANTALLA 1: CHAT (CENTRO) */}
        <div className="w-[100vw] h-full relative flex flex-col">
          <div className="flex-1 overflow-y-auto no-scrollbar px-5 pt-20 pb-24">
             {/* Logo y Bienvenida (SIEMPRE VISIBLES) */}
             <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden flex-shrink-0 shadow-[0_0_20px_5px_rgba(255,255,255,0.3)]">
                  <img src="/images/yunus.png" alt="Yunus" className="w-full h-full object-cover" />
                </div>
                <h2 className="text-2xl font-medium text-white tracking-tight">Yunus</h2>
             </div>

             <div className="mb-6">
                <p className="text-[17px] text-gray-200 leading-relaxed font-light">
                  Hola. Tu próxima aventura empieza aquí. <br/>
                  Dime a dónde quieres ir y yo armo el plan.
                </p>
             </div>

             {/* Sugerencias: Se ocultan suavemente al activar teclado */}
             <div className={`flex flex-col items-start gap-2.5 transition-all duration-300 ${isFocused ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100'}`}>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setChatInput(suggestion)}
                    className="w-auto max-w-full bg-[#1a1b26] active:bg-[#27283a] rounded-2xl px-5 py-3 text-left transition-all active:scale-95 border border-[#27283a]"
                  >
                    <p className="text-[14px] text-gray-300 font-normal">{suggestion}</p>
                  </button>
                ))}
             </div>
          </div>
        </div>

        {/* PANTALLA 2: DISCOVER (DERECHA) */}
        <div className="w-[100vw] h-full overflow-y-auto no-scrollbar pt-20 pb-24 px-5">
           <h1 className="text-2xl font-semibold text-white mb-4">Descubre</h1>
           <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
              {filters.map((filter) => (
                <button key={filter} onClick={() => setActiveFilter(filter)} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${activeFilter === filter ? 'bg-white text-black' : 'bg-[#1a1b26] text-gray-300'}`}>{filter}</button>
              ))}
           </div>
           <div className="space-y-4">
              {destinations.map((dest) => (
                <div key={dest.id} className="relative rounded-2xl overflow-hidden bg-[#1a1b26] h-64">
                   <img src={dest.image} className="w-full h-full object-cover opacity-60" />
                   <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                      <h3 className="text-white font-bold">{dest.title}</h3>
                      <div className="inline-flex items-center gap-2 bg-[#5b5fc7] rounded-full px-3 py-1 mt-2">
                        <span className="text-xs font-bold text-white">{dest.installments} pagos de ${dest.monthlyPayment}</span>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* INPUT BAR FIJA (Estilo AI - Fuera del carrusel) */}
      <div className="fixed bottom-0 left-0 right-0 z-[60] bg-black px-4 pt-2 pb-6 border-t border-[#1a1b26]">
         <div className="relative flex items-center gap-2 bg-[#1a1b26] rounded-[24px] px-2 py-2 border border-[#2a2b45]">
            {/* Botón Plus */}
            <button className="w-10 h-10 rounded-full bg-[#27283a] flex items-center justify-center flex-shrink-0 active:bg-[#38394f] transition-colors">
              <Plus className="w-5 h-5 text-gray-400" />
            </button>

            {/* Input Transparente */}
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onFocus={() => {
                setIsFocused(true)
                if (currentScreen !== 1) setCurrentScreen(1)
              }}
              onBlur={() => setIsFocused(false)}
              placeholder="Escribe a Yunus..."
              className="flex-1 bg-transparent text-white placeholder-gray-500 text-[16px] focus:outline-none border-0 px-2 h-10"
            />

            {/* Botón Acción Dinámico */}
            {chatInput.trim() ? (
              <button className="w-10 h-10 rounded-full bg-[#5b5fc7] flex items-center justify-center flex-shrink-0 active:bg-[#6b6fd7] transition-colors">
                <Send className="w-5 h-5 text-white" />
              </button>
            ) : (
              <button className="w-10 h-10 rounded-full bg-[#27283a] flex items-center justify-center flex-shrink-0 active:bg-[#38394f] transition-colors">
                <Mic className="w-5 h-5 text-gray-400" />
              </button>
            )}
         </div>
      </div>

      {/* MODAL REVENTA */}
      {resaleModalOpen && selectedTicket && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#1a1b26] rounded-t-3xl border-t border-[#2a2b45] p-5 animate-slide-up">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-white font-bold text-lg">Reventa Inteligente</h3>
               <button onClick={() => setResaleModalOpen(false)}><X className="text-gray-400" /></button>
            </div>
            
            <div className="bg-[#0e1027] p-4 rounded-xl border border-[#2a2b45] mb-4">
               <p className="text-gray-400 text-xs mb-1">Precio sugerido por Yunus AI</p>
               <p className="text-3xl font-bold text-white">${selectedTicket.marketData.optimalPrice}</p>
               <div className="flex gap-2 mt-2">
                 <span className="text-xs bg-green-900 text-green-300 px-2 py-1 rounded">Demanda {selectedTicket.marketData.demand}</span>
                 <span className="text-xs bg-blue-900 text-blue-300 px-2 py-1 rounded">Confianza {selectedTicket.marketData.confidence}%</span>
               </div>
            </div>
            
            <button className="w-full py-4 bg-[#5b5fc7] rounded-xl text-white font-bold mb-3">Publicar ahora</button>
            <button onClick={() => setResaleModalOpen(false)} className="w-full py-4 bg-transparent border border-[#2a2b45] rounded-xl text-gray-400 font-bold">Cancelar</button>
          </div>
        </div>
      )}
    </div>
  )
}
