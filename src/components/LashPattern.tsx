/**
 * Patrón de pestañas para fondos de sección
 * SVG repetible - curvas que simulan pestañas
 */

interface LashPatternProps {
  className?: string
  opacity?: number
}

export function LashPattern({ className = '', opacity = 0.06 }: LashPatternProps) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <svg
        className="h-full w-full"
        style={{ opacity }}
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="lash-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            {[...Array(12)].map((_, i) => (
              <path
                key={i}
                d={`M ${5 + i * 8} 0 C ${10 + i * 8} 25 ${15 + i * 8} 50 ${5 + i * 8} 100`}
                stroke="#c9a962"
                strokeWidth="0.6"
                fill="none"
                strokeLinecap="round"
              />
            ))}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#lash-pattern)" />
      </svg>
    </div>
  )
}
