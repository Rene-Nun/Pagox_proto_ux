import { useState, useEffect } from 'react'
import MobileContainer from '../MobileContainer'
import { Send, Sparkles, User, ShoppingBag } from 'lucide-react'

interface HomeScreenProps {
  onNavigate: (screen: string, tab?: string) => void
  activeTab: string
}

export default function HomeScreen({ onNavigate, activeTab }: HomeScreenProps) {
  const [chatInput, setChatInput] = useState('')

  const suggestions = [
    "Busca vuelos a Cancún para diciembre",
    "Muestra eventos en CDMX este mes",
    "¿Qué hoteles me recomiendas en Guadalajara?",
    "Ayúdame a planear un fin de semana romántico"
  ]

  return (
    <MobileContainer className="bg-black">
      <style jsx>{`
        .scroll-container::-webkit-scrollbar {
          display: none;
        }
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
      `}</style>

      {/* Header minimalista con botones más pequeños */}
      <div className="px-4 py-3 flex items-center justify-between">
        <button className="w-9 h-9 rounded-full bg-[#27283a] flex items-center justify-center hover:bg-[#34354a] transition-colors">
          <User className="w-5 h-5 text-white" />
        </button>
        <button className="w-9 h-9 rounded-full bg-[#27283a] flex items-center justify-center hover:bg-[#34354a] transition-colors">
          <ShoppingBag className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Chat Messages */}
      <div 
        className="scroll-container flex-1 overflow-y-auto px-4 py-6"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Mensaje de bienvenida estilo Kimi */}
        <div className="flex items-center gap-3 mb-6 animate-fade-in">
          <img 
            src="/images/yunus.png" 
            alt="Yunus" 
            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
          />
          <h2 className="text-xl font-medium text-white">Yunus</h2>
        </div>

        <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <p className="text-[15px] text-white leading-relaxed">
            ¡Tu aventura te espera! Puedo ayudarte a encontrar vuelos, hoteles, eventos y mucho más. ¿Qué te gustaría hacer hoy?
          </p>
        </div>

        {/* Suggestions */}
        <div className="space-y-3 pb-32 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setChatInput(suggestion)}
              className="w-full bg-[#27283a] hover:bg-[#34354a] border border-[#3a3b4f] rounded-2xl px-4 py-3.5 text-left transition-all"
            >
              <p className="text-[15px] text-white">{suggestion}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Input fijo en la parte inferior */}
      <div className="absolute bottom-0 left-0 right-0 bg-black border-t border-[#3a3b4f] px-4 py-4">
        <div className="relative">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Pregunta a Yunus..."
            className="w-full bg-[#27283a] rounded-full px-5 py-3 pr-12 text-white placeholder-gray-400 text-[15px] focus:outline-none focus:ring-1 focus:ring-[#5b5fc7] border border-[#3a3b4f]"
          />
          <button 
            className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 bg-[#5b5fc7] rounded-full flex items-center justify-center hover:bg-[#6b6fd7] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!chatInput.trim()}
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2.5 text-center">
          Yunus puede cometer errores. Verifica información importante.
        </p>
      </div>
    </MobileContainer>
  )
}