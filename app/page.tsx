'use client'

import { useState } from 'react'
import HomeScreen from './components/screens/HomeScreen'
import PartnerScreen from './components/screens/PartnerScreen'
import TicketSelectionScreen from './components/screens/TicketSelectionScreen'
import CheckoutScreen from './components/screens/CheckoutScreen'
import PaymentPlanScreen from './components/screens/PaymentPlanScreen'
import WalletScreen from './components/screens/WalletScreen'
import MarketplaceScreen from './components/screens/MarketplaceScreen'
import PlansScreen from './components/screens/PlansScreen'
import ProfileScreen from './components/screens/ProfileScreen'

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState('home')
  const [activeTab, setActiveTab] = useState('home')

  const handleNavigation = (screen: string, tab: string | null = null) => {
    setCurrentScreen(screen)
    if (tab) setActiveTab(tab)
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onNavigate={handleNavigation} activeTab={activeTab} />
      case 'partner':
        return <PartnerScreen onNavigate={handleNavigation} />
      case 'ticketSelection':
        return <TicketSelectionScreen onNavigate={handleNavigation} />
      case 'checkout':
        return <CheckoutScreen onNavigate={handleNavigation} />
      case 'paymentPlan':
        return <PaymentPlanScreen onNavigate={handleNavigation} activeTab={activeTab} />
      case 'wallet':
        return <WalletScreen onNavigate={handleNavigation} activeTab={activeTab} />
      case 'marketplace':
        return <MarketplaceScreen onNavigate={handleNavigation} activeTab={activeTab} />
      case 'plans':
        return <PlansScreen onNavigate={handleNavigation} activeTab={activeTab} />
      case 'profile':
        return <ProfileScreen onNavigate={handleNavigation} activeTab={activeTab} />
      default:
        return <HomeScreen onNavigate={handleNavigation} activeTab={activeTab} />
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
      <div className="w-full max-w-[390px] h-[844px] bg-white rounded-[40px] shadow-2xl overflow-hidden relative">
        <div className="absolute inset-0 rounded-[40px] overflow-hidden">
          {renderScreen()}
        </div>
      </div>
    </div>
  )
}
// Actualizado