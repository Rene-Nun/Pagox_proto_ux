import React from 'react';
import Header from '../Header';
import BottomNav from '../BottomNav';

interface HomeProps {
  onNavigate: (screen: string) => void;
  activeTab: string;
}

const HomeScreen: React.FC<HomeProps> = ({ onNavigate, activeTab }) => {
  return (
    // Contenedor principal que sí funciona
    <div className="h-dvh flex flex-col bg-gray-50">
      <Header title="Inicio" onNavigate={onNavigate} />
      
      <main className="flex-1 overflow-y-auto p-4">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Bienvenido</h2>
        <p>Contenido principal de la página de inicio.</p>
      </main>

      <BottomNav activeTab={activeTab} onNavigate={onNavigate} />
    </div>
  );
};

export default HomeScreen;

