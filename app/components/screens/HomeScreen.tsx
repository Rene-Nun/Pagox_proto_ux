import React, { useState } from 'react'; import MobileContainer from '../MobileContainer'; import Header from '../Header'; import BottomNav from '../BottomNav'; import { Menu, User, Bell, Check, Home, ShoppingBag, Receipt, Wallet, Eye, EyeOff, ChevronRight, Calendar, Plane, Hotel, Music, Sparkles } from 'lucide-react';

interface HomeScreenProps { onNavigate: (screen: string, tab?: string) => void; activeTab: string; }

export default function HomeScreen({ onNavigate, activeTab }: HomeScreenProps) { const [showEvents, setShowEvents] = useState(false);

return ( <MobileContainer className="pb-20 bg-gray-50 text-gray-900 min-h-screen"> <Header showLogo={true} />

{/* Score Card */}
  <div className="px-4 pt-6">
    <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl p-6 text-white shadow-xl">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-gray-400 text-sm mb-1">Tu score pagox</p>
          <h1 className="text-5xl font-bold">750</h1>
        </div>
        <div className="flex items-center gap-2 bg-green-500/20 px-3 py-1 rounded-full">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span className="text-green-400 text-sm font-medium">Activo</span>
        </div>
      </div>
      <p className="text-gray-300 text-sm mb-4">
        Desbloquea productos futuros y facilita tu regreso al sistema financiero tradicional
      </p>
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-gray-400">
          <span>300</span>
          <span>Score máximo: 850</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full relative"
            style={{ width: '75%' }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg"></div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div className="text-xs text-gray-400">ID: PX-2025-0729</div>
        <p className="text-sm font-medium">MARÍA PÉREZ</p>
      </div>
    </div>
  </div>

  {/* Quick Stats */}
  <div className="px-4 mt-6 grid grid-cols-2 gap-3">
    <div
      onClick={() => onNavigate('PaymentPlanScreen')}
      className="cursor-pointer bg-white rounded-xl p-4 shadow-sm border border-gray-100"
    >
      <div className="flex items-center justify-between mb-2">
        <Calendar className="w-5 h-5 text-blue-600" />
        <span className="text-xs text-blue-600 font-medium">En 12 días</span>
      </div>
      <p className="text-2xl font-bold text-gray-900">$1,825</p>
      <p className="text-xs text-gray-500 mt-1">Próximo pago</p>
    </div>

    <div
      onClick={() => onNavigate('PlansScreen')}
      className="cursor-pointer bg-white rounded-xl p-4 shadow-sm border border-gray-100"
    >
      <div className="flex items-center justify-between mb-2">
        <Receipt className="w-5 h-5 text-purple-600" />
        <span className="text-xs text-gray-500">Activos</span>
      </div>
      <p className="text-2xl font-bold text-gray-900">2</p>
      <p className="text-xs text-gray-500 mt-1">Planes vigentes</p>
    </div>
  </div>

  {/* Main Action Card */}
  <div className="px-4 mt-6">
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            Cumple tus sueños con pagox
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Arma ahora tu aventura con nuestras plataformas asociadas
          </p>
          <button
            onClick={() => onNavigate('PartnerScreen')}
            className="bg-black text-white px-6 py-2.5 rounded-full font-medium text-sm hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
          >
            Explorar
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>

  {/* Marketplace Section */}
  <div className="px-4 mt-6">
    <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Ofertas Exclusivas</h3>
            <p className="text-xs text-white/80">Marketplace pagox</p>
          </div>
        </div>
        <span className="bg-yellow------+------+ truncated for brevity...

