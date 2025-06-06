'use client';

import React, { useState } from 'react';
import MobileContainer from '../MobileContainer';
import Header from '../Header';
import BottomNav from '../BottomNav';
import {
  Menu,
  User,
  Bell,
  Check,
  Home,
  ShoppingBag,
  Receipt,
  Wallet,
  Eye,
  EyeOff,
  ChevronRight,
  Calendar,
  Plane,
  Hotel,
  Music,
  Sparkles
} from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (screen: string, tab?: string) => void;
  activeTab: string;
}

export default function HomeScreen({ onNavigate, activeTab }: HomeScreenProps) {
  const [showEvents, setShowEvents] = useState(false);

  return (
    <MobileContainer className="pb-20 bg-gray-50 text-gray-900 min-h-screen">
      <Header showLogo={true} />

      {/* Score Card */}
      <div className="px-4 pt-6">
        <div className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Mi Puntos</p>
            <p className="text-xl font-bold">1,250</p>
          </div>
          <Sparkles className="text-yellow-500 w-6 h-6" />
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 pt-6">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div onClick={() => onNavigate('Viajes')} className="cursor-pointer">
            <Plane className="mx-auto w-6 h-6" />
            <p className="text-xs mt-1">Viajes</p>
          </div>
          <div onClick={() => onNavigate('Hoteles')} className="cursor-pointer">
            <Hotel className="mx-auto w-6 h-6" />
            <p className="text-xs mt-1">Hoteles</p>
          </div>
          <div onClick={() => onNavigate('Eventos')} className="cursor-pointer">
            <Music className="mx-auto w-6 h-6" />
            <p className="text-xs mt-1">Eventos</p>
          </div>
          <div onClick={() => onNavigate('Pagos')} className="cursor-pointer">
            <Wallet className="mx-auto w-6 h-6" />
            <p className="text-xs mt-1">Pagos</p>
          </div>
        </div>
      </div>

      {/* Opciones */}
      <div className="px-4 pt-6 space-y-4">
        <div
          className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm cursor-pointer"
          onClick={() => setShowEvents(!showEvents)}
        >
          <div className="flex items-center space-x-2">
            <Calendar className="text-blue-500 w-5 h-5" />
            <span className="text-sm font-medium">Ver próximos eventos</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>

        {showEvents && (
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <p className="text-sm text-gray-700">No hay eventos por ahora.</p>
          </div>
        )}
      </div>

      <BottomNav activeTab={activeTab} onNavigate={onNavigate} />
    </MobileContainer>
  );
}