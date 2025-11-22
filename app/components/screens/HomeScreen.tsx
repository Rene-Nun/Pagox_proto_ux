import { useState } from 'react'
import Head from 'next/head'
import MobileContainer from '../MobileContainer'
import { Send, User, ShoppingBag } from 'lucide-react'

interface HomeScreenProps {
  onNavigate: (screen: string, tab?: string) => void
  activeTab?: string
}

export default function HomeScreen({ onNavigate, activeTab }: HomeScreenProps) {
  const [chatInput, setChatInput] = useState('')

  const suggestions = [
    "🏖️ Escapada barata de fin de semana",
    "✈️ Vuelos a Cancún a meses",
    "🎟️ Ver ofertas de reventa (Marketplace)",
    "🤔 ¿Cómo funciona mi crédito?"
  ]

  return (
    // USAMOS FIXED INSET-0 PARA BLOQUEAR EL SCROLL DEFINITIVAMENTE
    <div className="fixed inset-0 bg-black flex flex-col overflow-hidden">
      <Head>
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </Head>

      {/* Header Superior */}
      <div className="px-4 py-4 flex items-center justify-between flex-shrink-0 z-20">
        <button className="w-10 h-10 rounded-full bg-[#1a1b26] flex items-center justify-center active:bg-[#27283a] transition-colors border border-[#27283a]">
          <User className="w-5 h-5 text-gray-300" />
        </button>
        <button className="w-10 h-10 rounded-full bg-[#1a1b26] flex items-center justify-center active:bg-[#27283a] transition-colors border border-[#27283a]">
          <ShoppingBag className="w-5 h-5 text-gray-300" />
        </button>
      </div>

      {/* Contenido Central */}
      <div className="flex-1 flex flex-col px-5 pt-4 z-10">
        
        {/* Bloque de Bienvenida */}
        <div className="animate-fade-in">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden flex-shrink-0 border-2 border-[#1a1b26]">
               <img 
                src="/images/yunus.png" 
                alt="Y" 
                className="w-full h-full object-cover"
                onError={(e) => {e.currentTarget.style.display='none'}} 
              />
            </div>
            <h2 className="text-2xl font-medium text-white tracking-tight">Yunus</h2>
          </div>

          <div className="mb-6 pr-2">
            {/* COPY CORREGIDO: CERO MENCIÓN DE PRESUPUESTO */}
            <p className="text-[17px] text-gray-200 leading-relaxed font-light">
              Hola. Tu próxima aventura empieza aquí. <br/>
              Dime a dónde quieres ir o qué se te antoja, y yo armo el plan perfecto para ti.
            </p>
          </div>

          {/* Chips de Sugerencias */}
          <div className="flex flex-col items-start gap-2.5">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setChatInput(suggestion)}
                className="w-auto max-w-full bg-[#1a1b26] active:bg-[#27283a] border border-[#27283a] rounded-2xl px-5 py-3 text-left transition-all active:scale-95"
              >
                <p className="text-[14px] text-gray-300 font-normal">{suggestion}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Barra de Input Inferior - Pegada al fondo */}
      <div className="flex-shrink-0 px-4 pb-6 pt-2 bg-black z-20 w-full">
        <div className="relative">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Escribe a Yunus..."
            className="w-full bg-[#1a1b26] rounded-full pl-5 pr-12 py-4 text-white placeholder-gray-500 text-[16px] focus:outline-none focus:ring-1 focus:ring-[#5b5fc7] border border-[#27283a]"
          />
          <button 
            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-[#5b5fc7] rounded-full flex items-center justify-center active:bg-[#6b6fd7] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
  )
}
