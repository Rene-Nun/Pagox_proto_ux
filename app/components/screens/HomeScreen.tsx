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

  const quickActions = [
    {
      icon: Plane,
      title: 'Buscar vuelos',
      description: 'Encuentra los mejores vuelos',
      action: () => onNavigate('flightSearch')
    },
    {
      icon: Building,
      title: 'Buscar hoteles',
      description: 'Hospedaje para tu viaje',
      action: () => onNavigate('hotelSearch')
    },
    {
      icon: Music,
      title: 'Ver eventos',
      description: 'Conciertos y experiencias',
      action: () => onNavigate('ticketSelection')
    }
  ]

  const suggestions = [
    "Busca vuelos a Cancún para diciembre",
    "Muestra eventos en CDMX este mes",
    "¿Qué hoteles me recomiendas en Guadalajara?",
    "Ayúdame a planear un fin de semana romántico"
  ]

  const featuredCards = [
    {
      title: 'Marketplace',
      description: 'Ofertas con hasta 70% de descuento',
      icon: '🏷️',
      gradient: 'from-purple-600 to-pink-600',
      action: () => onNavigate('marketplace', 'marketplace')
    },
    {
      title: 'Mis Finanzas',
      description: 'Revisa tus pagos y Score Turista',
      icon: '💳',
      gradient: 'from-blue-600 to-cyan-600',
      action: () => onNavigate('plans', 'plans')
    }
  ]

  return (
    <MobileContainer className="bg-[#0e1028]">
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

      {/* Header con Yunus */}
      <div className="px-5 py-5 border-b border-[#2a2b45]">
        <div className="flex items-center gap-3 mb-3">
          <div className="relative">
            <img 
              src="/images/yunus.png" 
              alt="Yunus" 
              className="w-16 h-16 rounded-full object-cover border-2 border-[#003d90] shadow-lg shadow-[#003d90]/30"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0e1028]"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Yunus AI</h1>
            <p className="text-sm text-gray-400">Tu asistente de viajes</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div 
        className="scroll-container flex-1 overflow-y-auto px-5 py-5 space-y-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Mensaje de bienvenida */}
        <div className="flex items-start gap-3 animate-fade-in">
          <img 
            src="/images/yunus.png" 
            alt="Yunus" 
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />
          <div className="bg-[#1f203a] rounded-2xl rounded-tl-none px-4 py-3 max-w-[85%] border border-[#2a2b45]">
            <p className="text-sm text-white leading-relaxed">
              ¡Tu aventura te espera! Puedo ayudarte a encontrar vuelos, hoteles, eventos y mucho más. ¿Qué te gustaría hacer hoy?
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-2 px-2">
            <Sparkles className="w-4 h-4 text-[#003d90]" />
            <p className="text-xs text-gray-400 font-medium">Acciones rápidas</p>
          </div>
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className="w-full bg-[#1f203a] hover:bg-[#2a2b45] border border-[#2a2b45] hover:border-[#003d90] rounded-xl p-4 text-left transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#003d90] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">{action.title}</p>
                  <p className="text-xs text-gray-400">{action.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Featured Cards */}
        <div className="space-y-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-2 px-2">
            <Sparkles className="w-4 h-4 text-[#003d90]" />
            <p className="text-xs text-gray-400 font-medium">Destacados</p>
          </div>
          {featuredCards.map((card, index) => (
            <button
              key={index}
              onClick={card.action}
              className="w-full bg-gradient-to-br from-[#1f203a] to-[#0e1028] rounded-2xl p-5 border border-[#2a2b45] hover:border-[#003d90] transition-all text-left group"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{card.icon}</span>
                    <h3 className="text-lg font-bold text-white">{card.title}</h3>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">{card.description}</p>
                  <div className="inline-flex items-center gap-2 text-[#003d90] text-sm font-semibold">
                    Ver más
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Suggestions */}
        <div className="space-y-2 animate-fade-in pb-32" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-2 px-2">
            <Sparkles className="w-4 h-4 text-[#003d90]" />
            <p className="text-xs text-gray-400 font-medium">Prueba preguntar</p>
          </div>
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setChatInput(suggestion)}
              className="w-full bg-[#1f203a] hover:bg-[#2a2b45] border border-[#2a2b45] hover:border-[#003d90] rounded-xl px-4 py-3 text-left transition-all"
            >
              <p className="text-sm text-white">{suggestion}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Input fijo en la parte inferior */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#0e1028] border-t border-[#2a2b45] px-5 py-4">
        <div className="relative">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Pregunta a Yunus..."
            className="w-full bg-[#1f203a] rounded-full px-5 py-3.5 pr-14 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#003d90] border border-[#2a2b45]"
          />
          <button 
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#003d90] rounded-full flex items-center justify-center hover:bg-[#0051c7] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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