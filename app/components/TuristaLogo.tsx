interface TuristaLogoProps {
  size?: number
  className?: string
}

export default function TuristaLogo({ size = 40, className = '' }: TuristaLogoProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Círculo exterior */}
      <circle 
        cx="50" 
        cy="50" 
        r="48" 
        stroke="#4A7C8C" 
        strokeWidth="2" 
        fill="none"
      />
      
      {/* Círculos decorativos alrededor (16 círculos) */}
      {[...Array(16)].map((_, i) => {
        const angle = (i * 22.5 * Math.PI) / 180
        const radius = 45
        const x = 50 + radius * Math.cos(angle)
        const y = 50 + radius * Math.sin(angle)
        
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="4"
            fill="#4A7C8C"
            opacity={0.6}
          />
        )
      })}
      
      {/* Círculo central más grande */}
      <circle 
        cx="50" 
        cy="50" 
        r="8" 
        fill="#4A7C8C"
      />
      
      {/* Líneas conectoras del centro a los círculos (opcional, crea efecto de red) */}
      {[...Array(16)].map((_, i) => {
        const angle = (i * 22.5 * Math.PI) / 180
        const radius = 45
        const x = 50 + radius * Math.cos(angle)
        const y = 50 + radius * Math.sin(angle)
        
        return (
          <line
            key={`line-${i}`}
            x1="50"
            y1="50"
            x2={x}
            y2={y}
            stroke="#4A7C8C"
            strokeWidth="0.5"
            opacity={0.15}
          />
        )
      })}
    </svg>
  )
}