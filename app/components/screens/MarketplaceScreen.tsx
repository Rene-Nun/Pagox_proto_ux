import React from 'react';
import Header from '../Header';
import BottomNav from '../BottomNav';
// OJO: No importamos MobileContainer aquí, usamos un div en su lugar
import { TrendingUp, TrendingDown, Clock, Percent, Filter, Search, Sparkles, Info, Zap } from 'lucide-react';

interface MarketplaceProps {
  onNavigate: (screen: string) => void;
  activeTab: string;
}

const MarketplaceScreen: React.FC<MarketplaceProps> = ({ onNavigate, activeTab }) => {
  return (
    // Usamos un div con flexbox para asegurar que el layout funcione
    // Esta es la estructura correcta para ESTA pantalla
    <div className="h-dvh flex flex-col bg-gray-50">
      
      <Header title="Marketplace" onNavigate={onNavigate} />
      
      {/* El contenido principal ahora puede crecer y hacer scroll sin empujar el menú */}
      <main className="flex-1 overflow-y-auto p-4">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Explorar Mercado</h2>
        
        {/* Aquí puedes poner todo el contenido que necesites para tu marketplace */}
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

      {/* El menú inferior se quedará fijo en su lugar */}
      <BottomNav activeTab="Marketplace" onNavigate={onNavigate} />

    </div>
  );
};

export default MarketplaceScreen;

