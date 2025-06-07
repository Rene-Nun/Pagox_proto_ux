import React from 'react';
import Header from '../Header';
import BottomNav from '../BottomNav';

interface WalletProps {
  onNavigate: (screen: string) => void;
  activeTab: string;
}

const WalletScreen: React.FC<WalletProps> = ({ onNavigate, activeTab }) => {
  return (
    // Contenedor principal que sí funciona
    <div className="h-dvh flex flex-col bg-gray-50">
      <Header title="Cartera" onNavigate={onNavigate} />
      
      <main className="flex-1 overflow-y-auto p-4">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Mi Saldo</h2>
        <p>Aquí se mostrará la información de la cartera del usuario.</p>
      </main>

      <BottomNav activeTab={activeTab} onNavigate={onNavigate} />
    </div>
  );
};

export default WalletScreen;

