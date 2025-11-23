import { useState } from 'react'
import { Send, User, ShoppingBag, Plus, Mic } from 'lucide-react'

interface HomeScreenProps {
  onNavigate?: (screen: string) => void
}

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  const [chatInput, setChatInput] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const suggestions = [
    "Escapada barata de fin de semana",
    "Vuelos a Cancún a meses",
    "Ver ofertas de reventa",
    "¿Cómo funciona mi crédito?"
  ]

  return (
    <div className="fixed inset-0 w-full h-[100dvh] bg-black overflow-hidden">
      {/* HEADER FIJO */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-3 pb-3 flex items-center justify-between bg-black/95 backdrop-blur-sm border-b border-[#1a1b26]">
        <button 
          onClick={() => onNavigate?.('profile')}
          className="w-10 h-10 rounded-full bg-[#1a1b26] flex items-center justify-center active:bg-[#27283a] transition-colors"
        >
          <User className="w-5 h-5 text-gray-300" />
        </button>
        
        <button 
          onClick={() => onNavigate?.('discover')}
          className="w-10 h-10 rounded-full bg-[#5b5fc7] flex items-center justify-center active:bg-[#6b6fd7] transition-colors shadow-lg shadow-[#5b5fc7]/30"
        >
          <ShoppingBag className="w-5 h-5 text-white" />
        </button>
      </header>

      {/* CONTENIDO CENTRAL SCROLLEABLE */}
      <main 
        className="absolute top-[60px] bottom-[140px] left-0 right-0 overflow-y-auto overflow-x-hidden"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <div className="px-5 py-6">
          {/* Logo Yunus con Glow Effect */}
          <div 
            className={`flex items-center gap-3 mb-6 transition-opacity duration-300 ${
              isFocused ? 'opacity-100' : 'opacity-100'
            }`}
          >
            <div 
              className="w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden flex-shrink-0"
              style={{
                boxShadow: '0 0 20px 8px rgba(255, 255, 255, 0.4)'
              }}
            >
              <img 
                src="/api/placeholder/48/48" 
                alt="Yunus" 
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-medium text-white tracking-tight">Yunus</h2>
          </div>

          {/* Mensaje de Bienvenida */}
          <div 
            className={`mb-8 transition-all duration-300 ${
              isFocused 
                ? 'opacity-0 h-0 overflow-hidden pointer-events-none' 
                : 'opacity-100 h-auto'
            }`}
          >
            <p className="text-[17px] text-gray-200 leading-relaxed font-light">
              Hola. Tu próxima aventura empieza aquí. <br/>
              Dime a dónde quieres ir o qué se te antoja, y yo armo el plan perfecto para ti.
            </p>
          </div>

          {/* Sugerencias */}
          <div 
            className={`flex flex-col items-start gap-2.5 transition-all duration-300 ${
              isFocused 
                ? 'opacity-0 h-0 overflow-hidden pointer-events-none' 
                : 'opacity-100 h-auto'
            }`}
          >
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setChatInput(suggestion)}
                className="w-auto max-w-full bg-[#1a1b26] active:bg-[#27283a] rounded-2xl px-5 py-3.5 text-left transition-all active:scale-98 border border-transparent hover:border-[#2a2b45]"
              >
                <p className="text-[14px] text-gray-300 font-normal leading-snug">
                  {suggestion}
                </p>
              </button>
            ))}
          </div>

          {/* Área de mensajes futuros */}
          <div className="mt-8 space-y-4">
            {/* Aquí irán los mensajes del chat cuando se implementen */}
          </div>
        </div>
      </main>

      {/* FOOTER FIJO - INPUT BAR (ESTILO AI) */}
      <footer 
        className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-6 pt-4"
        style={{
          background: 'linear-gradient(to top, #000000 70%, rgba(0, 0, 0, 0.95) 90%, transparent)'
        }}
      >
        {/* Barra de Input Estilo ChatGPT */}
        <div className="relative flex items-center gap-2 bg-[#1a1b26] rounded-[26px] px-2 py-2 border border-[#2a2b45] shadow-lg">
          {/* Botón Plus (Izquierda) */}
          <button 
            className="w-9 h-9 rounded-full bg-[#27283a] flex items-center justify-center flex-shrink-0 active:bg-[#333447] transition-colors"
            aria-label="Adjuntar"
          >
            <Plus className="w-5 h-5 text-gray-400" />
          </button>

          {/* Input de Texto */}
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Escribe a Yunus..."
            className="flex-1 bg-transparent text-white placeholder-gray-500 text-[16px] focus:outline-none border-0 px-2 py-1"
            style={{ fontSize: '16px' }} // Prevent iOS zoom
          />

          {/* Botón Dinámico (Derecha) */}
          {chatInput.trim() ? (
            <button 
              className="w-9 h-9 rounded-full bg-[#5b5fc7] flex items-center justify-center flex-shrink-0 active:bg-[#6b6fd7] transition-all active:scale-95 shadow-lg shadow-[#5b5fc7]/30"
              aria-label="Enviar mensaje"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          ) : (
            <button 
              className="w-9 h-9 rounded-full bg-[#27283a] flex items-center justify-center flex-shrink-0 active:bg-[#333447] transition-colors"
              aria-label="Mensaje de voz"
            >
              <Mic className="w-5 h-5 text-gray-400" />
            </button>
          )}
        </div>

        {/* Disclaimer */}
        <p className="text-[10px] text-gray-600 mt-3 text-center font-medium leading-relaxed">
          Yunus analiza tu perfil para ofrecerte el mejor plan de pagos.
        </p>
      </footer>

      {/* Global Styles */}
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
        
        /* Hide scrollbar */
        *::-webkit-scrollbar {
          display: none;
        }
        
        /* Smooth transitions */
        .active\\:scale-98:active {
          transform: scale(0.98);
        }
        
        .active\\:scale-95:active {
          transform: scale(0.95);
        }
      `}</style>
    </div>
  )
}