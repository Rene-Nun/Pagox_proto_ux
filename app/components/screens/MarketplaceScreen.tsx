import React from 'react';
import Header from '../Header';
import BottomNav from '../BottomNav';
import { TrendingUp, TrendingDown, Clock, Percent, Filter, Search, Sparkles, Info, Zap } from 'lucide-react';

// Definimos la interfaz para las propiedades del componente
interface MarketplaceProps {
  onNavigate: (screen: string) => void;
  activeTab: string;
}

const MarketplaceScreen: React.FC<MarketplaceProps> = ({ onNavigate, activeTab }) => {
  return (
    // Usamos el 'div' que sí funcionaba, en lugar de MobileContainer
    <div className="h-dvh flex flex-col bg-gray-50">
      
      {/* Encabezado de la página */}
      <Header title="Marketplace" onNavigate={onNavigate} />
      
      {/* Contenido principal que se puede desplazar */}
      <main className="flex-1 overflow-y-auto p-4">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Explorar Mercado</h2>
        
        {/* Contenido de ejemplo para rellenar la página */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-gray-700">Producto Destacado</h3>
            <p className="text-sm text-gray-600 mt-2">Descripción breve de un producto o servicio atractivo.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-gray-700">Oferta Especial</h3>
            <p className="text-sm text-gray-600 mt-2">Detalles de una promoción por tiempo limitado.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-gray-700">Nuevo Artículo</h3>
            <p className="text-sm text-gray-600 mt-2">Información sobre el más reciente artículo disponible.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-gray-700">Servicio Popular</h3>
            <p className="text-sm text-gray-600 mt-2">Descripción de un servicio con alta demanda.</p>
          </div>
        </div>
      </main>

      {/* Menú de navegación inferior */}
      <BottomNav activeTab={activeTab} onNavigate={onNavigate} />
    </div>
  );
};

export default MarketplaceScreen;

