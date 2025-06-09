<div className="flex-1 relative">
{/* --- CONTENEDOR DE SCROLL CON LA SOLUCIÓN --- /}
<div
ref={scrollRef}
onScroll={handleScroll}
className="absolute inset-0 overflow-y-auto snap-y snap-mandatory"
style={{
scrollbarWidth: 'none',
msOverflowStyle: 'none',
// SOLUCIÓN 1: Scroll tipo "página", obliga a detenerse en un elemento
scrollSnapStop: 'always',
// SOLUCIÓN 2: Crea un espacio superior para que el snap se centre en el área visible
scrollPaddingTop: '130px',
}}
>
{/ Se elimina el spacer de aquí para controlar todo con scroll-padding */}
<div className='px-5'>
{listings.map((listing, index) => {
// El resto de tu lógica de tarjetas apiladas se mantiene intacta
const offset = index - activeIndex;
let scale = 1, opacity = 1, translateY = 0, zIndex = 10;
if (offset === 0) {
scale = 1; opacity = 1; translateY = 0; zIndex = 20;
} else if (Math.abs(offset) === 1) {
scale = 0.92; opacity = 0.5; translateY = offset * 15; zIndex = 15;
} else if (Math.abs(offset) === 2) {
scale = 0.85; opacity = 0.25; translateY = offset * 30; zIndex = 10;
} else {
scale = 0.8; opacity = 0.1; translateY = offset * 40; zIndex = 5;
}
return (
// Es importante que cada hijo directo del contenedor de scroll sea un punto de snap
<div key={listing.id} className="snap-center">
<div
className="h-[55vh] mb-2 transition-all duration-300 ease-out"
style={{ transform: scale(${scale}) translateY(${translateY}px), opacity, zIndex }}
>
<div className={h-full rounded-3xl overflow-hidden shadow-xl ${listing.bgColor} relative p-6 flex flex-col}>
{/* El contenido de la tarjeta se mantiene igual /}
<div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl transform translate-x-16 -translate-y-16"></div>
<div className="flex justify-between items-start mb-6">
<div className="text-5xl">{listing.emoji}</div>
<div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
<span className="text-white text-sm font-bold">-{listing.discount}%</span>
</div>
</div>
<div className="flex-1 flex flex-col justify-between">
<div>
<h2 className="text-2xl font-light text-white mb-3 leading-tight">{listing.event}</h2>
<div className="flex items-center gap-4 text-white/80 text-sm mb-2">
<div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{listing.date}</div>
<div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{listing.location}</div>
</div>
<p className="text-white/70 text-sm">{listing.venue}</p>
</div>
<div className="space-y-4">
<div>
<p className="text-white/60 text-xs uppercase tracking-wider mb-2">Precio actual</p>
<div className="flex items-baseline gap-3">
<span className="text-4xl font-extralight text-white">{listing.currentPrice.toLocaleString()}</span>
<span className="text-white/40 text-lg line-through">{listing.originalPrice.toLocaleString()}</span>
{listing.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-300" />}
{listing.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-300" />}
</div>
</div>
<div className="grid grid-cols-2 gap-4 text-white">
<div>
<p className="text-white/60 text-xs mb-1">Deuda asumible</p>
<p className="text-xl font-light">${listing.debt.toLocaleString()}</p>
</div>
<div>
<p className="text-white/60 text-xs mb-1">Score vendedor</p>
<div className="flex items-center gap-1"><Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /><span className="text-xl font-light">{listing.sellerRating}</span></div>
</div>
</div>
<div className="flex items-center justify-between gap-4">
<div className="flex items-center gap-3 flex-1">
<div className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center"><span className="text-white text-sm font-medium">{listing.seller.split(' ').map(n => n[0]).join('')}</span></div>
<div className="text-white"><p className="text-sm font-medium">{listing.seller}</p><p className="text-xs text-white/60">Hace {listing.daysListed} días • Score: {listing.score}</p></div>
</div>
<button className="bg-white text-gray-900 px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-100 transition-all">Ver detalles</button>
</div>
</div>
</div>
</div>
</div>
</div>
);
})}
{/ Un spacer al final para asegurar que la última tarjeta pueda llegar al centro */}
<div className="h-[30vh]"></div>
</div>
</div>
{/* Los filtros flotantes se mantienen igual, por encima de todo */}
<div className="absolute top-0 left-0 right-0 z-10 p-5 pt-3 pointer-events-none">
<div className="relative pointer-events-auto mb-3">
<input type="text" placeholder="Buscar eventos..." className="w-full bg-white rounded-2xl py-3.5 pl-11 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all border border-gray-200" />
<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
<button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100 rounded-xl transition-colors"><Filter className="w-4 h-4 text-gray-600" /></button>
</div>
<div className="flex gap-3 overflow-x-auto scrollbar-hide pointer-events-auto">
{filters.map((filter) => (
<button key={filter.id} onClick={() => setActiveFilter(filter.id)} className={flex items-center gap-2 px-4 py-2 rounded-full transition-all whitespace-nowrap ${ activeFilter === filter.id ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900 bg-white border border-gray-200'}}>
{filter.icon && <filter.icon className="w-3.5 h-3.5" />}
<span className="text-xs font-medium">{filter.label}</span>
</button>
))}
</div>
</div>
{/* El indicador de página se mantiene igual */}
<div className="absolute bottom-24 right-5 flex flex-col gap-1.5 z-20">
{listings.map((_, index) => (
<div key={index} className={transition-all duration-300 rounded-full ${ index === activeIndex ? 'w-1 h-5 bg-gray-800' : 'w-1 h-1 bg-gray-300' }} />
))}
</div>
</div>
</div>
);
}

