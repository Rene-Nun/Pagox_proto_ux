import React from 'react';
import Header from '../Header';
import BottomNav from '../BottomNav';
import MobileContainer from '../MobileContainer'; // Importante: Usamos MobileContainer

interface WalletProps {
  onNavigate: (screen: string) => void;
  activeTab: string;
}

const WalletScreen: React.FC<WalletProps> = ({ onNavigate, activeTab }) => {
  return (
    <MobileContainer>
      <Header title="Cartera" onNavigate={onNavigate} />
      
      <main className="flex-1 overflow-y-auto p-4">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Mi Saldo</h2>
        <p>Aquí se mostrará la información de la cartera del usuario.</p>
        {/* Aquí iba todo tu contenido específico de la pantalla de cartera */}
      </main>

      <BottomNav activeTab={activeTab} onNavigate={onNavigate} />
    </MobileContainer>
  );
};

export default WalletScreen;

