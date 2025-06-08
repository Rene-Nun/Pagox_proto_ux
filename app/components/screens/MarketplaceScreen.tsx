import React from 'react';
import Header from '../Header';
import BottomNav from '../BottomNav';
import MobileContainer from '../MobileContainer'; // Usamos el contenedor correcto, como en las otras páginas
import { TrendingUp, TrendingDown, Clock, Percent, Filter, Search, Sparkles, Info, Zap } from 'lucide-react';

interface MarketplaceProps {
  onNavigate: (screen: string) => void;
  activeTab: string;
}

const MarketplaceScreen: React.FC<MarketplaceProps> = ({ onNavigate, activeTab }) => {
  return (
    // Usamos MobileContainer para ser consistentes con las otras pantallas que SÍ funcionan
    <MobileContainer>
      
      <Header title="Marketplace" onNavigate={onNavigate} />
      
      {/* Esta sección de 'main' está diseñada para que el contenido se vea y se pueda hacer scroll */}
      <main className="flex-1 overflow-y-auto p-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Mercado de Productos</h2>
        
        {/* FILA 1 DE CONTENIDO */}
        <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
          <h3 className="text-lg font-semibold text-blue-600">Inversión Inteligente</h3>
          <p className="text-gray-700 mt-2">Maximiza tus ganancias con nuestras herramientas de inversión. Análisis en tiempo real y asesoría experta.</p>
        </div>

        {/* FILA 2 DE CONTENIDO */}
        <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
          <h3 className="text-lg font-semibold text-green-600">Crédito Personal Aprobado</h3>
          <p className="text-gray-700 mt-2">Obtén el crédito que necesitas con tasas preferenciales. Proceso 100% digital y sin papeleo.</p>
        </div>

        {/* FILA 3 DE CONTENIDO */}
        <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
          <h3 className="text-lg font-semibold text-purple-600">Seguro de Vida Completo</h3>
          <p className="text-gray-700 mt-2">Protege a tu familia y tu futuro con nuestra cobertura completa. Tranquilidad garantizada.</p>
        </div>

        {/* FILA 4 DE CONTENIDO EXTRA */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-red-600">Oferta Exclusiva</h3>
          <p className="text-gray-700 mt-2">Abre tu cuenta hoy y recibe un bono de bienvenida. ¡No dejes pasar la oportunidad!</p>
        </div>
      </main>

      {/* El menú inferior se quedará fijo en su lugar */}
      <BottomNav activeTab="Marketplace" onNavigate={onNavigate} />

    </MobileContainer>
  );
};

export default MarketplaceScreen;

