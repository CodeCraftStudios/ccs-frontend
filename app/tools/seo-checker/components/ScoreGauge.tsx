'use client'

interface ScoreGaugeProps {
  score: number
}

const getScoreColor = (score: number) => {
  if (score >= 90) return 'text-green-500'
  if (score >= 80) return 'text-blue-500'
  if (score >= 70) return 'text-yellow-500'
  if (score >= 60) return 'text-orange-500'
  return 'text-red-500'
}

const getScoreColorRaw = (score: number) => {
  if (score >= 90) return '#22c55e' // green
  if (score >= 80) return '#3b82f6' // blue
  if (score >= 70) return '#eab308' // yellow
  if (score >= 60) return '#f97316' // orange
  return '#ef4444' // red
}

export function ScoreGauge({ score }: ScoreGaugeProps) {
  const radius = 100
  const strokeWidth = 20
  const normalizedRadius = radius - strokeWidth / 2
  const circumference = normalizedRadius * Math.PI // Half circle
  const scorePercentage = score / 100
  const strokeDashoffset = circumference - scorePercentage * circumference
  const scoreColor = getScoreColorRaw(score)

  return (
    <div className="relative flex items-center justify-center w-full" style={{ minHeight: '180px' }}>
      <svg
        height={radius + strokeWidth + 10}
        width={(radius * 2) + strokeWidth}
        viewBox={`0 0 ${(radius * 2) + strokeWidth} ${radius + strokeWidth + 10}`}
        className="overflow-visible"
      >
        {/* Background arc */}
        <path
          d={`M ${strokeWidth / 2} ${radius + strokeWidth / 2} A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${(radius * 2) + strokeWidth / 2} ${radius + strokeWidth / 2}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted/20"
          strokeLinecap="round"
        />
        {/* Score arc */}
        <path
          d={`M ${strokeWidth / 2} ${radius + strokeWidth / 2} A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${(radius * 2) + strokeWidth / 2} ${radius + strokeWidth / 2}`}
          fill="none"
          stroke={scoreColor}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 1s ease-in-out',
          }}
        />
      </svg>
      {/* Score text in center */}
      <div className="absolute bottom-0 flex flex-col items-center">
        <div className={`text-5xl md:text-6xl font-bold superfont ${getScoreColor(score)}`}>
          {score}
        </div>
        <div className="text-xs md:text-sm text-muted-foreground mt-1">SEO Score</div>
      </div>
    </div>
  )
}