import React from 'react';
import Header from '../Header';
import BottomNav from '../BottomNav';
import MobileContainer from '../MobileContainer'; // Importante: Usamos MobileContainer

interface PlansProps {
  onNavigate: (screen: string) => void;
  activeTab: string;
}

const PlansScreen: React.FC<PlansProps> = ({ onNavigate, activeTab }) => {
  return (
    <MobileContainer>
      <Header title="Planes" onNavigate={onNavigate} />
      
      <main className="flex-1 overflow-y-auto p-4">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Nuestros Planes</h2>
        <p>Aquí se mostrará la información de los planes disponibles.</p>
        {/* Aquí iba todo tu contenido específico de la pantalla de planes */}
      </main>

      <BottomNav activeTab={activeTab} onNavigate={onNavigate} />
    </MobileContainer>
  );
};

export default PlansScreen;

