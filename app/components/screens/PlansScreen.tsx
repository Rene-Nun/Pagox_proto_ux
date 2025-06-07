import React from 'react';
import Header from '../Header';
import BottomNav from '../BottomNav';

interface PlansProps {
  onNavigate: (screen: string) => void;
  activeTab: string;
}

const PlansScreen: React.FC<PlansProps> = ({ onNavigate, activeTab }) => {
  return (
    // Contenedor principal que sí funciona
    <div className="h-dvh flex flex-col bg-gray-50">
      <Header title="Planes" onNavigate={onNavigate} />
      
      <main className="flex-1 overflow-y-auto p-4">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Nuestros Planes</h2>
        <p>Aquí se mostrará la información de los planes disponibles.</p>
      </main>

      <BottomNav activeTab={activeTab} onNavigate={onNavigate} />
    </div>
  );
};

export default PlansScreen;

