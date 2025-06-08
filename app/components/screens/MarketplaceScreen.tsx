import React from 'react';
import Header from '../Header';
import BottomNav from '../BottomNav';
import MobileContainer from '../MobileContainer'; // Importante: Usamos MobileContainer
import { TrendingUp, TrendingDown, Clock, Percent, Filter, Search, Sparkles, Info, Zap } from 'lucide-react';

interface MarketplaceProps {
  onNavigate: (screen: string) => void;
  activeTab: string;
}

const MarketplaceScreen: React.FC<MarketplaceProps> = ({ onNavigate, activeTab }) => {
  return (
    // Esta era la versión que funcionaba
    <MobileContainer className="bg-gray-50">
      <Header title="Marketplace" onNavigate={onNavigate} />
      
      <main className="flex-1 overflow-y-auto">
        {/* Aquí iba todo tu contenido específico de la pantalla de marketplace */}
        <p className="p-4">Contenido del Marketplace.</p>
      </main>

      <BottomNav activeTab={activeTab} onNavigate={onNavigate} />
    </MobileContainer>
  );
};

export default MarketplaceScreen;

