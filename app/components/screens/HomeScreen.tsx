import { useState, useEffect } from 'react'
import Head from 'next/head' // Importamos Head para controlar el color de la barra de estado
import MobileContainer from '../MobileContainer'
import { Send, User, ShoppingBag } from 'lucide-react'

interface HomeScreenProps {
  onNavigate: (screen: string, tab?: string) => void
  activeTab?: string // Hice opcional esto para evitar errores si no se usa
}

export default function HomeScreen({ onNavigate, activeTab }: HomeScreenProps) {
  const [chatInput, setChatInput] = useState('')

  const suggestions = [
    "Busca vuelos a Cancún para diciembre",
    "Muestra eventos en CDMX este mes",
    "¿Qué hoteles recomiendas en GDL?",
    "Planea un fin de semana romántico"
  ]

  return (
    <MobileContainer className="bg-black h-screen overflow-hidden flex flex-col">
      {/* Control de la barra de estado del navegador móvil */}
      <Head>
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </Head>

      <style jsx global>{`
        /* Ocultar scrollbar pero permitir scroll */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        
        /* Forzar fondo negro total */
        body {
          background-color: #000000 !important;
        }
      `}</style>

      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between flex-shrink-0 z-10 bg-black">
        <button className="w-9 h-9 rounded-full bg-[#1a1b26] flex items-center justify-center hover:bg-[#27283a] transition-colors border border-[#27283a]">
          <User className="w-4 h-4 text-gray-300" />
        </button>
        <button className="w-9 h-9 rounded-full bg-[#1a1b26] flex items-center justify-center hover:bg-[#27283a] transition-colors border border-[#27283a]">
          <ShoppingBag className="w-4 h-4 text-gray-300" />
        </button>
      </div>

      {/* Área de Chat con Scroll */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 no-scrollbar relative">
        
        {/* Contenedor para centrar contenido si hay poco, o scrollear si hay mucho */}
        <div className="min-h-full flex flex-col justify-end pb-24"> 
          
          {/* Mensaje de bienvenida */}
          <div className="flex items-center gap-3 mb-4 animate-fade-in">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden flex-shrink-0">
               {/* Placeholder para logo Yunus si la imagen falla */}
               <img 
                src="/images/yunus.png" 
                alt="Y" 
                className="w-full h-full object-cover"
                onError={(e) => {e.currentTarget.style.display='none'}} 
              />
            </div>
            <h2 className="text-lg font-medium text-white">Yunus</h2>
          </div>

          <div className="mb-6 animate-fade-in px-1">
            <p className="text-[15px] text-gray-200 leading-relaxed font-light">
              Tu aventura te espera. Puedo ayudarte a encontrar vuelos, hoteles y eventos. ¿Qué hacemos hoy?
            </p>
          </div>

          {/* Sugerencias (Chips) */}
          {/* Cambié 'w-full' por 'flex flex-col items-start' para que no ocupen todo el ancho */}
          <div className="flex flex-col items-start gap-2.5 animate-fade-in">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setChatInput(suggestion)}
                className="w-auto max-w-[90%] bg-[#1a1b26] hover:bg-[#27283a] border border-[#27283a] rounded-2xl px-4 py-2.5 text-left transition-all active:scale-95"
              >
                {/* Fuente más pequeña (text-sm) y color más suave */}
                <p className="text-sm text-gray-300 font-light">{suggestion}</p>
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Input Fijo Inferior */}
      {/* Eliminado el borde superior (border-t) para quitar la línea roja */}
      <div className="flex-shrink-0 px-4 py-4 bg-black z-20">
        <div className="relative">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Pregunta a Yunus..."
            className="w-full bg-[#1a1b26] rounded-full pl-5 pr-12 py-3.5 text-white placeholder-gray-500 text-[15px] focus:outline-none focus:ring-1 focus:ring-[#5b5fc7] border border-[#27283a]"
          />
          <button 
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#5b5fc7] rounded-full flex items-center justify-center hover:bg-[#6b6fd7] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!chatInput.trim()}
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
        <p className="text-[10px] text-gray-600 mt-3 text-center font-medium">
          Yunus puede cometer errores. Verifica información importante.
        </p>
      </div>
    </MobileContainer>
  )
}
