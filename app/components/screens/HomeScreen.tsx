import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import MobileContainer from '../MobileContainer'
import { 
  Send, Sparkles, User, Compass, MessageSquare, 
  CreditCard, Calendar, TrendingUp, Plane, Hotel, Ticket, 
  ChevronRight, X, Wallet
} from 'lucide-react'

// Tipos para nuestras pantallas
type ScreenType = 'profile' | 'chat' | 'discover'

interface HomeScreenProps {
  onNavigate: (screen: string, tab?: string) => void
  // AGREGE ESTA LÍNEA PARA CORREGIR EL ERROR DE BUILD:
  activeTab?: string 
}

export default function HomeScreen({ onNavigate, activeTab }: HomeScreenProps) {
  // Estado principal: Qué pantalla estamos viendo. Iniciamos en 'chat' (centro)
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('chat')
  const [chatInput, setChatInput] = useState('')

  // Configuración de animaciones
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  // Lógica para el Swipe (Gestos)
  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const handleDragEnd = (e: any, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x)

    if (swipe < -swipeConfidenceThreshold) {
      // Deslizar a la izquierda -> Ir a la derecha
      if (currentScreen === 'profile') setCurrentScreen('chat')
      else if (currentScreen === 'chat') setCurrentScreen('discover')
    } else if (swipe > swipeConfidenceThreshold) {
      // Deslizar a la derecha -> Ir a la izquierda
      if (currentScreen === 'discover') setCurrentScreen('chat')
      else if (currentScreen === 'chat') setCurrentScreen('profile')
    }
  }

  // Componentes de las 3 Pantallas
  
  // 1. PANTALLA IZQUIERDA: PERFIL Y FINANZAS
  const ProfileScreen = () => (
    <div className="h-full overflow-y-auto pb-20 bg-[#0e1028] px-5 pt-12">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-[#003d90] to-[#0051c7] rounded-full flex items-center justify-center shadow-lg shadow-[#003d90]/30">
          <User className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Juan Pérez</h2>
          <p className="text-sm text-gray-400">Nivel: Viajero Frecuente</p>
        </div>
      </div>

      {/* Resumen Financiero (Estilo Card Minimalista) */}
      <div className="bg-[#1f203a] rounded-3xl p-6 border border-[#2a2b45] mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#003d90] opacity-10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
        
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-gray-400 text-sm mb-1">Próximo Pago</p>
            <h3 className="text-3xl font-light text-white">$1,825 MXN</h3>
            <p className="text-xs text-[#003d90] font-bold mt-1 flex items-center gap-1">
              <Calendar className="w-3 h-3" /> Vence en 12 días
            </p>
          </div>
          <div className="w-10 h-10 bg-[#0e1028] rounded-full flex items-center justify-center border border-[#2a2b45]">
             <Wallet className="w-5 h-5 text-white" />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-[#2a2b45]/50">
            <span className="text-sm text-gray-300">Score Turista</span>
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-[#0e1028] rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-[75%]"></div>
              </div>
              <span className="text-sm font-bold text-white">750</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de "Hilos" / Viajes Activos */}
      <h3 className="text-lg font-bold text-white mb-4">Mis Viajes</h3>
      <div className="space-y-3">
        {[
          { title: "Vuelo a Cancún", status: "Pagado", icon: Plane, date: "Oct 2025" },
          { title: "Hotel Mazatlán", status: "Activo", icon: Hotel, date: "Dic 2025", active: true },
          { title: "Bad Bunny Tour", status: "En proceso", icon: Ticket, date: "Feb 2026" }
        ].map((item, i) => (
          <div key={i} className="bg-[#1f203a] p-4 rounded-2xl border border-[#2a2b45] flex items-center justify-between group active:scale-95 transition-all">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.active ? 'bg-[#003d90]/20 text-[#003d90]' : 'bg-[#0e1028] text-gray-500'}`}>
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-medium">{item.title}</h4>
                <p className="text-xs text-gray-400">{item.date} • {item.status}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </div>
        ))}
      </div>
    </div>
  )

  // 2. PANTALLA CENTRAL: YUNUS CHAT (HOME)
  const ChatScreen = () => (
    <div className="h-full flex flex-col bg-[#0e1028] relative">
      {/* Header Invisible solo para espacio */}
      <div className="h-16"></div>

      {/* Área Central del Chat */}
      <div className="flex-1 flex flex-col justify-center px-6 pb-20">
        {/* Logo y Saludo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto bg-[#1f203a] rounded-full flex items-center justify-center border border-[#2a2b45] mb-6 shadow-xl shadow-[#003d90]/10 relative">
             <div className="absolute inset-0 bg-[#003d90] opacity-20 rounded-full animate-pulse"></div>
             <img src="/images/yunus.png" alt="Yunus" className="w-12 h-12 object-contain relative z-10" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Hola, Christian</h1>
          <p className="text-gray-400 text-lg">¿A dónde nos escapamos hoy?</p>
        </div>

        {/* Chips de Sugerencia (Estilo Kimi/Comet) */}
        <div className="grid grid-cols-1 gap-3 mb-8 max-w-md mx-auto w-full">
          <button 
            onClick={() => setChatInput("Busca escapadas baratas para este fin")}
            className="bg-[#1f203a] hover:bg-[#2a2b45] border border-[#2a2b45] hover:border-[#003d90] p-4 rounded-2xl text-left transition-all group"
          >
            <span className="text-lg mb-1 block">🏖️</span>
            <span className="text-white font-medium block group-hover:text-[#003d90] transition-colors">Escapada barata de fin de semana</span>
          </button>

          <div className="grid grid-cols-2 gap-3">
             <button className="bg-[#1f203a] hover:bg-[#2a2b45] border border-[#2a2b45] hover:border-[#003d90] p-4 rounded-2xl text-left transition-all">
              <span className="text-lg mb-1 block">✈️</span>
              <span className="text-white font-medium text-sm">Vuelos a Cancún</span>
            </button>
             <button className="bg-[#1f203a] hover:bg-[#2a2b45] border border-[#2a2b45] hover:border-[#003d90] p-4 rounded-2xl text-left transition-all">
              <span className="text-lg mb-1 block">💰</span>
              <span className="text-white font-medium text-sm">¿Cómo funciona?</span>
            </button>
          </div>
        </div>
      </div>

      {/* Input Flotante Inferior */}
      <div className="absolute bottom-8 left-0 right-0 px-5">
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Pregúntale a Yunus..."
            className="w-full bg-[#1f203a] rounded-full pl-6 pr-14 py-4 text-white placeholder-gray-500 shadow-2xl border border-[#2a2b45] focus:border-[#003d90] focus:outline-none transition-colors text-base"
          />
          <button 
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#003d90] rounded-full flex items-center justify-center text-white shadow-lg hover:bg-[#0051c7] active:scale-90 transition-all"
            disabled={!chatInput}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )

  // 3. PANTALLA DERECHA: DISCOVER FEED
  const DiscoverScreen = () => (
    <div className="h-full overflow-y-auto bg-[#0e1028] px-0 pt-12">
      {/* Píldoras de Filtro Superior */}
      <div className="flex gap-2 overflow-x-auto px-5 pb-4 no-scrollbar mb-2">
        {['Para ti', 'Ofertas Flash', 'Playa', 'Eventos'].map((tag, i) => (
          <button key={i} className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium border ${i === 0 ? 'bg-[#003d90] border-[#003d90] text-white' : 'bg-[#1f203a] border-[#2a2b45] text-gray-400'}`}>
            {tag}
          </button>
        ))}
      </div>

      {/* Feed de Cards Visuales */}
      <div className="px-5 space-y-6 pb-20">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-[#1f203a] rounded-3xl overflow-hidden border border-[#2a2b45] shadow-lg group active:scale-95 transition-all">
            {/* Imagen Grande */}
            <div className="h-48 bg-gray-700 relative">
               <img src={`/images/placeholders/dest${item}.jpg`} alt="Destino" className="w-full h-full object-cover opacity-80" />
               <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0e1028] to-transparent h-20"></div>
               <div className="absolute top-4 right-4 bg-[#003d90] text-white text-xs font-bold px-3 py-1 rounded-full">
                 6 pagos de $800
               </div>
            </div>
            {/* Info */}
            <div className="p-5">
              <h3 className="text-xl font-bold text-white mb-1">Fin de semana en Vallarta</h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">Hotel 5 estrellas todo incluido, vuelo redondo saliendo el viernes.</p>
              <button className="w-full py-3 rounded-xl bg-[#2a2b45] text-white font-medium text-sm group-hover:bg-[#003d90] transition-colors flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" /> Ver plan con Yunus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <MobileContainer className="bg-[#0e1028] overflow-hidden">
      
      {/* HEADER DE NAVEGACIÓN SUPERIOR (Indicadores) */}
      <div className="absolute top-0 left-0 right-0 z-50 px-5 pt-4 pb-2 flex justify-between items-center bg-gradient-to-b from-[#0e1028] to-transparent">
        <button 
          onClick={() => setCurrentScreen('profile')}
          className={`p-2 rounded-full transition-colors ${currentScreen === 'profile' ? 'bg-[#1f203a] text-white' : 'text-gray-500'}`}
        >
          <User className="w-6 h-6" />
        </button>

        {/* Indicadores de página (Puntos) */}
        <div className="flex gap-2">
          <div className={`w-1.5 h-1.5 rounded-full transition-all ${currentScreen === 'profile' ? 'bg-white w-3' : 'bg-gray-700'}`} />
          <div className={`w-1.5 h-1.5 rounded-full transition-all ${currentScreen === 'chat' ? 'bg-[#003d90] w-3' : 'bg-gray-700'}`} />
          <div className={`w-1.5 h-1.5 rounded-full transition-all ${currentScreen === 'discover' ? 'bg-white w-3' : 'bg-gray-700'}`} />
        </div>

        <button 
          onClick={() => setCurrentScreen('discover')}
          className={`p-2 rounded-full transition-colors ${currentScreen === 'discover' ? 'bg-[#1f203a] text-white' : 'text-gray-500'}`}
        >
          <Compass className="w-6 h-6" />
        </button>
      </div>

      {/* CONTENEDOR DESLIZABLE ANIMADO */}
      <div className="relative w-full h-full">
        <AnimatePresence initial={false} custom={currentScreen === 'chat' ? 0 : currentScreen === 'discover' ? 1 : -1}>
          
          {currentScreen === 'profile' && (
            <motion.div
              key="profile"
              custom={-1}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={handleDragEnd}
              className="absolute w-full h-full"
            >
              <ProfileScreen />
            </motion.div>
          )}

          {currentScreen === 'chat' && (
            <motion.div
              key="chat"
              custom={0}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={handleDragEnd}
              className="absolute w-full h-full"
            >
              <ChatScreen />
            </motion.div>
          )}

          {currentScreen === 'discover' && (
            <motion.div
              key="discover"
              custom={1}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={handleDragEnd}
              className="absolute w-full h-full"
            >
              <DiscoverScreen />
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </MobileContainer>
  )
}
