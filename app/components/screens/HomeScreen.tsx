import React from 'react';
import Header from '../Header';
import BottomNav from '../BottomNav';
import MobileContainer from '../MobileContainer'; // Importante: Usamos MobileContainer

interface HomeProps {
  onNavigate: (screen: string) => void;
  activeTab: string;
}

const HomeScreen: React.FC<HomeProps> = ({ onNavigate, activeTab }) => {
  return (
    <MobileContainer>
      <Header title="Inicio" onNavigate={onNavigate} />
      
      <main className="flex-1 overflow-y-auto p-4">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Bienvenido</h2>
        <p>Contenido principal de la página de inicio.</p>
        {/* Aquí iba todo tu contenido específico de la pantalla de inicio */}
      </main>

      <BottomNav activeTab={activeTab} onNavigate={onNavigate} />
    </MobileContainer>
  );
};

export default HomeScreen;

