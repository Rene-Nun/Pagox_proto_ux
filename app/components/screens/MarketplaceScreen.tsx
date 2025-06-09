import React, { useState, useRef, useEffect, useMemo } from 'react';
import { TrendingUp, TrendingDown, Filter, Search, Star, MapPin, Calendar, Music, Plane, Sparkles, X } from 'lucide-react';

// --- COMPONENTES AUXILIARES ---

// Un componente Header simple como marcador de posición para la demostración
const Header = ({ title }) => (
  <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-40 border-b border-gray-200">
    <div className="px-5 py-4">
      <h1 className="text-xl font-bold text-gray-900">{title}</h1>
    </div>
  </header>
);


// --- COMPONENTE DE TARJETA DE LISTADO (LISTING) ---

const ListingCard = ({ listing, isActive, observerRef }) => {
  // Determina los estilos de la tarjeta según si es la tarjeta activa
  const cardStyle = {
    opacity: isActive ? 1 : 0.6,
    transform: isActive ? 'scale(1)' : 'scale(0.92)',
    transition: 'transform 300ms ease-out, opacity 300ms ease-out',
  };

  return (
    <div
      ref={observerRef} // Ref para el Intersection Observer
      className="h-[60vh] snap-center shrink-0"
      style={cardStyle}
    >
      <div className={`h-full rounded-3xl overflow-hidden shadow-xl ${listing.bgColor} relative p-6 flex flex-col`}>
        {/* Decoración de fondo */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl transform translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl transform -translate-x-12 translate-y-12"></div>

        {/* Encabezado con emoji y descuento */}
        <div className="flex justify-between items-start mb-6">
          <div className="text-5xl">{listing.emoji}</div>
          <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <span className="text-white text-sm font-bold">-{listing.discount}%</span>
          </div>
        </div>

        {/* Información del evento */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-light text-white mb-3 leading-tight">
              {listing.event}
            </h2>
            <div className="flex items-center gap-4 text-white/80 text-sm mb-2">
              <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{listing.date}</div>
              <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{listing.location}</div>
            </div>
            <p className="text-white/70 text-sm">{listing.venue}</p>
          </div>

          {/* Sección de precio */}
          <div className="space-y-4">
            <div>
              <p className="text-white/60 text-xs uppercase tracking-wider mb-2">Precio actual</p>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-extralight text-white">${listing.currentPrice.toLocaleString()}</span>
                <span className="text-white/40 text-lg line-through">${listing.originalPrice.toLocaleString()}</span>
                {listing.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-300" />}
                {listing.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-300" />}
              </div>
            </div>

            {/* Cuadrícula de información */}
            <div className="grid grid-cols-2 gap-4 text-white">
              <div>
                <p className="text-white/60 text-xs mb-1">Deuda asumible</p>
                <p className="text-xl font-light">${listing.debt.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-white/60 text-xs mb-1">Score vendedor</p>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-xl font-light">{listing.sellerRating}</span>
                </div>
              </div>
            </div>

            {/* Vendedor y Llamada a la Acción (CTA) */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1 overflow-hidden">
                <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center shrink-0">
                  <span className="text-white text-sm font-medium">{listing.seller.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div className="text-white truncate">
                  <p className="text-sm font-medium truncate">{listing.seller}</p>
                  <p className="text-xs text-white/60 truncate">Hace {listing.daysListed} días • Score: {listing.score}</p>
                </div>
              </div>
              <button className="bg-white text-gray-900 px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-200 transition-all shrink-0">
                Ver detalles
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// --- COMPONENTE PRINCIPAL DE LA PANTALLA DEL MARKETPLACE ---

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Refs para cada tarjeta que será observada
  const cardRefs = useRef([]);
  const observerRef = useRef(null);

  const filters = [
    { id: 'todos', label: 'Todos', icon: null },
    { id: 'conciertos', label: 'Conciertos', icon: Music },
    { id: 'viajes', label: 'Viajes', icon: Plane },
    { id: 'ofertas', label: 'Súper ofertas', icon: Sparkles },
    { id: 'eventos', label: 'Eventos', icon: Sparkles },
  ];

  const allListings = [
    { id: 1, event: 'Taylor Swift - The Eras Tour', date: '10 Mar 2026', venue: 'Estadio GNP Seguros', location: 'CDMX', originalPrice: 2500, currentPrice: 2200, discount: 12, debt: 1800, seller: 'Ana Martínez', sellerRating: 4.8, score: 92, trend: 'up', bgColor: 'bg-purple-500', emoji: '✨', daysListed: 3, category: 'conciertos' },
    { id: 2, event: 'Formula 1 - Gran Premio', date: '29 Oct 2025', venue: 'Autódromo Hermanos R.', location: 'CDMX', originalPrice: 4000, currentPrice: 3500, discount: 13, debt: 2800, seller: 'Carlos Rodríguez', sellerRating: 4.5, score: 88, trend: 'down', bgColor: 'bg-red-500', emoji: '🏎️', daysListed: 1, category: 'eventos' },
    { id: 3, event: 'Blink-182 World Tour', date: '15 Ago 2025', venue: 'Palacio de los Deportes', location: 'CDMX', originalPrice: 1800, currentPrice: 1650, discount: 8, debt: 1200, seller: 'Luis Pérez', sellerRating: 4.2, score: 75, trend: 'stable', bgColor: 'bg-gray-800', emoji: '🎸', daysListed: 5, category: 'conciertos' },
    { id: 4, event: 'Cirque du Soleil - Kooza', date: '22 Sep 2025', venue: 'Carpa Santa Fe', location: 'CDMX', originalPrice: 3200, currentPrice: 2800, discount: 13, debt: 2100, seller: 'María García', sellerRating: 4.9, score: 95, trend: 'up', bgColor: 'bg-blue-600', emoji: '🎪', daysListed: 2, category: 'eventos' },
    { id: 5, event: 'Paquete de Viaje a Cancún', date: '5-12 Dic 2025', venue: 'Salida desde CDMX', location: 'Cancún, Q.R.', originalPrice: 15000, currentPrice: 12500, discount: 17, debt: 10000, seller: 'Viajes Veloz', sellerRating: 4.7, score: 91, trend: 'up', bgColor: 'bg-teal-500', emoji: '🏝️', daysListed: 7, category: 'viajes' }
  ];

  // Lógica de filtrado memorizada para los filtros de búsqueda y categoría
  const filteredListings = useMemo(() => {
    let listings = allListings;
    
    // Aplicar filtro de categoría
    if (activeFilter !== 'todos') {
      listings = listings.filter(l => l.category === activeFilter);
    }

    // Aplicar filtro de búsqueda
    if (searchQuery) {
      listings = listings.filter(l => 
        l.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return listings;
  }, [allListings, activeFilter, searchQuery]);

  // Effect para configurar el Intersection Observer
  useEffect(() => {
    // Desconectar el observador anterior si existe
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    // Crear un nuevo Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        const intersectingEntry = entries.find(entry => entry.isIntersecting);
        if (intersectingEntry) {
          const newIndex = parseInt(intersectingEntry.target.dataset.index, 10);
          setActiveIndex(newIndex);
        }
      },
      {
        root: null, // observa intersecciones relativas al viewport
        rootMargin: '0px',
        threshold: 0.7, // Se activa cuando el 70% del elemento es visible
      }
    );

    observerRef.current = observer;
    
    // Observar todas las tarjetas que están actualmente en el DOM
    cardRefs.current.forEach(card => {
      if (card) observer.observe(card);
    });
    
    // Función de limpieza para desconectar el observador
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [filteredListings]); // Volver a ejecutar cuando la lista de tarjetas cambie

  return (
    <div className="h-screen w-full flex flex-col bg-gray-50 font-sans">
      <Header title="Marketplace" />
      
      {/* Sección de Búsqueda y Filtros */}
      <div className="px-5 py-4 space-y-4 bg-gray-50">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por evento o ciudad..."
            className="w-full bg-white rounded-xl py-3 pl-10 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all border border-gray-200"
          />
          <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full">
              <X className="w-4 h-4 text-gray-500" />
            </button>
          )}
        </div>
        
        <div className="flex gap-2.5 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all whitespace-nowrap text-xs font-medium border ${
                activeFilter === filter.id
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'text-gray-600 hover:text-gray-900 bg-white border-gray-200 hover:border-gray-400'
              }`}
            >
              {filter.icon && <filter.icon className="w-3.5 h-3.5" />}
              <span>{filter.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Contenido Principal: Pila de Tarjetas e Indicador */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Contenedor de la Pila de Tarjetas */}
        <div className="flex-1 overflow-y-auto snap-y snap-mandatory p-5 space-y-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {filteredListings.length > 0 ? (
            filteredListings.map((listing, index) => (
              <ListingCard 
                key={listing.id}
                listing={listing}
                isActive={index === activeIndex}
                observerRef={el => {
                  // Almacena la ref de cada elemento de tarjeta en un array
                  cardRefs.current[index] = el;
                  // Añade un atributo de datos para el índice
                  if (el) {
                    el.dataset.index = index;
                  }
                }}
              />
            ))
          ) : (
             <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 p-8">
                <Filter className="w-12 h-12 mb-4 text-gray-300" />
                <h3 className="text-lg font-semibold">No se encontraron resultados</h3>
                <p className="text-sm">Prueba cambiando los filtros o el término de búsqueda.</p>
             </div>
          )}
        </div>

        {/* Indicador de página */}
        {filteredListings.length > 1 && (
          <div className="absolute top-1/2 -translate-y-1/2 right-2 flex flex-col gap-2 z-10 p-2">
            {filteredListings.map((_, index) => (
              <div
                key={index}
                className={`transition-all duration-300 rounded-full ${
                  index === activeIndex 
                    ? 'w-1.5 h-6 bg-gray-800' 
                    : 'w-1.5 h-1.5 bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

