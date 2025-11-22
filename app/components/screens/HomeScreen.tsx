import { useState, useEffect } from 'react'
import MobileContainer from '../MobileContainer'
import { Send, Sparkles, Calendar, MapPin, DollarSign, Plane, Building, Music } from 'lucide-react'

interface HomeScreenProps {
  onNavigate: (screen: string, tab?: string) => void
  activeTab: string
}

export default function HomeScreen({ onNavigate, activeTab }: HomeScreenProps) {
  const [chatInput, setChatInput] = useState('')
  const [messages, setMessages] = useState([
    {
      type: 'assistant',
      content: '¡Hola! Soy Yunus, tu asistente de viajes. ¿En qué puedo ayudarte hoy?'
    }
  ])

  const suggestions = [
    "Busca vuelos a Cancún para diciembre",
    "Muestra eventos en CDMX este mes",
    "¿Qué hoteles me recomiendas en Guadalajara?",
    "Ayúdame a planear un fin de semana romántico"
  ]

  return (
    <MobileContainer className="bg-[#0a0a0f]">
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

      {/* Header minimalista */}
      <div className="px-5 py-4 flex items-center justify-between">
        <button className="w-10 h-10 rounded-full bg-[#1a1a2e] flex items-center justify-center hover:bg-[#252540] transition-colors">
          <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
        <button className="w-10 h-10 rounded-full bg-[#1a1a2e] flex items-center justify-center hover:bg-[#252540] transition-colors">
          <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </button>
      </div>

      {/* Chat Messages */}
      <div 
        className="scroll-container flex-1 overflow-y-auto"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Mensaje de bienvenida con logo */}
        <div className="flex items-start gap-3 animate-fade-in px-5 py-5">
          <img 
            src="/images/yunus.png" 
            alt="Yunus" 
            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-white mb-1">Yunus AI</h2>
            <div className="bg-[#1a1a2e] rounded-2xl rounded-tl-none px-4 py-3 border border-[#252540]">
              <p className="text-sm text-gray-200 leading-relaxed">
                ¡Tu aventura te espera! Puedo ayudarte a encontrar vuelos, hoteles, eventos y mucho más. ¿Qué te gustaría hacer hoy?
              </p>
            </div>
          </div>
        </div>

        {/* Suggestions */}
        <div className="space-y-2 animate-fade-in pb-32 px-5" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-[#6b7bee]" />
            <p className="text-xs text-gray-400 font-medium">Prueba preguntar</p>
          </div>
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setChatInput(suggestion)}
              className="w-full bg-[#1a1a2e] hover:bg-[#252540] border border-[#252540] hover:border-[#6b7bee] rounded-2xl px-4 py-3.5 text-left transition-all"
            >
              <p className="text-sm text-gray-200">{suggestion}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Input fijo en la parte inferior */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#0a0a0f] border-t border-[#252540] px-5 py-4">
        <div className="relative">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Pregunta a Yunus..."
            className="w-full bg-[#1a1a2e] rounded-full px-5 py-3.5 pr-14 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#6b7bee] border border-[#252540]"
          />
          <button 
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#6b7bee] rounded-full flex items-center justify-center hover:bg-[#7d8bef] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!chatInput.trim()}
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Yunus puede cometer errores. Verifica información importante.
        </p>
      </div>
    </MobileContainer>
  )
}