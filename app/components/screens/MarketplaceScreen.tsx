import MobileContainer from '../MobileContainer'
import Header from '../Header'
import BottomNav from '../BottomNav'
import { TrendingUp, TrendingDown, Clock, Percent, Filter, Search, Sparkles, Info, Zap } from 'lucide-react'

interface MarketplaceScreenProps {
  onNavigate: (screen: string, tab?: string) => void
  activeTab: string
}

export default function MarketplaceScreen({ onNavigate, activeTab }: MarketplaceScreenProps) {
  const listings = [
    {
      id: 1,
      event: 'Taylor Swift - The Eras Tour',
      date: '10 Mar 2026',
      venue: 'Estadio GNP Seguros',
      originalPrice: 2500,
      currentPrice: 2200,
      discount: 12,
      debt: 1800,
      seller: 'Ana M.',
      score: 92,
      trend: 'up',
      gradient: 'from-pink-500 to-purple-600',
      emoji: '✨',
      daysListed: 3
    },
    {
      id: 2,
      event: 'Formula 1 - Gran Premio de México',
      date: '29 Oct 2025',
      venue: 'Autódromo Hermanos Rodríguez',
      originalPrice: 4000,
      currentPrice: 3500,
      discount: 13,
      debt: 2800,
      seller: 'Carlos R.',
      score: 88,
      trend: 'down