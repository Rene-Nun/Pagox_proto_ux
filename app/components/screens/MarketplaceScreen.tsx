import React from 'react';
import Header from '../Header';
import BottomNav from '../BottomNav';
import { TrendingUp, TrendingDown, Clock, Percent, Filter, Search, Sparkles, Info, Zap } from 'lucide-react';

interface MarketplaceProps {
  onNavigate: (screen: string) => void;
  activeTab: string;
}

const MarketplaceScreen: React.FC<MarketplaceProps> = ({ onNavigate, activeTab }) => {
  return (
    // Contenedor principal que sí funciona
    <div className="h-dvh flex flex-col bg-gray-50">
      <Header title="Marketplace" onNavigate={onNavigate} />
      
      <main className="flex-1 overflow-y-auto p-4">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Explorar Mercado</h2>
         <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-gray-700">Producto Destacado</h3>
            <p className="text-sm text-gray-600 mt-2">Descripción breve de un producto o servicio atractivo.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-gray-700">Oferta Especial</h3>
            <p className="text-sm text-gray-600 mt-2">Detalles de una promoción por tiempo limitado.</p>
          </div>
        </div>
      </main>

      <BottomNav activeTab={activeTab} onNavigate={onNavigate} />
    </div>
  );
};

export default MarketplaceScreen;

