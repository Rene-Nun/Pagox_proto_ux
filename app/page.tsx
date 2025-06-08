'use client';

import { useState } from 'react';
import HomeScreen from './components/screens/HomeScreen';
import WalletScreen from './components/screens/WalletScreen';
import MarketplaceScreen from './components/screens/MarketplaceScreen';
import PlansScreen from './components/screens/PlansScreen';
import ProfileScreen from './components/screens/ProfileScreen'; // Asumo que también tenías una pantalla de perfil

// Este es el componente principal que decide qué pantalla mostrar
export default function Home() {
  // El estado 'activeScreen' controla la pantalla visible. Empieza en 'Home'.
  const [activeScreen, setActiveScreen] = useState('Home');

  // Esta función cambia la pantalla visible. Se la pasamos a otros componentes.
  const handleNavigate = (screen: string) => {
    setActiveScreen(screen);
  };

  // Función para renderizar la pantalla correcta según el estado
  const renderScreen = () => {
    switch (activeScreen) {
      case 'Home':
        return <HomeScreen onNavigate={handleNavigate} activeTab="Home" />;
      case 'Wallet':
        return <WalletScreen onNavigate={handleNavigate} activeTab="Wallet" />;
      case 'Marketplace':
        return <MarketplaceScreen onNavigate={handleNavigate} activeTab="Marketplace" />;
      case 'Plans':
        return <PlansScreen onNavigate={handleNavigate} activeTab="Plans" />;
      case 'Profile':
        return <ProfileScreen onNavigate={handleNavigate} activeTab="Profile" />;
      default:
        return <HomeScreen onNavigate={handleNavigate} activeTab="Home" />;
    }
  };

  return (
    <main>
      {renderScreen()}
    </main>
  );
}

