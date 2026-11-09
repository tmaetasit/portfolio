// Preview artwork for each project card. Generic shapes only, no figures from real data.
// Replace with screenshots of your PDF pages when they arrive.

const bump = (x, c, w) => Math.exp(-((x - c) ** 2) / (2 * w * w))

function Heatmap() {
  const cols = 16
  const rows = 7
  const cells = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const peak = Math.max(bump(c, 4.2, 1.6), bump(c, 11.6, 1.8))
      const v = peak * (r < 5 ? 1 : 0.3)
      cells.push(
        <rect key={`${r}-${c}`} x={14 + c * 17.6} y={34 + r * 18.5} width="14.5" height="15.5" rx="3"
          fill="var(--accent)" opacity={0.07 + v * 0.88} />,
      )
    }
  }
  return (
    <svg viewBox="0 0 320 200" role="img" aria-label="Heatmap preview">
      <rect x="14" y="12" width="70" height="7" rx="3.5" fill="var(--muted)" opacity="0.5" />
      {cells}
      <rect x="14" y="170" width="120" height="6" rx="3" fill="var(--muted)" opacity="0.35" />
    </svg>
  )
}

function Lines() {
  return (
    <svg viewBox="0 0 320 200" role="img" aria-label="Line chart preview">
      <rect x="14" y="12" width="90" height="7" rx="3.5" fill="var(--muted)" opacity="0.5" />
      {[50, 85, 120, 155].map((y) => (
        <line key={y} x1="14" x2="306" y1={y} y2={y} stroke="var(--line)" strokeWidth="1" />
      ))}
      <path d="M14 140 L60 120 L110 128 L160 90 L210 98 L260 62 L306 56 L306 170 L14 170 Z" fill="var(--accent)" opacity="0.14" />
      <polyline points="14,140 60,120 110,128 160,90 210,98 260,62 306,56" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinejoin="round" />
      <polyline points="14,150 60,146 110,138 160,142 210,126 260,120 306,112" fill="none" stroke="var(--muted)" strokeWidth="2" strokeLinejoin="round" opacity="0.7" />
      <circle cx="306" cy="56" r="4.5" fill="var(--accent)" />
    </svg>
  )
}

function Sov() {
  const rows = [
    [0.42, 0.27, 0.18, 0.13],
    [0.36, 0.3, 0.2, 0.14],
    [0.5, 0.2, 0.18, 0.12],
    [0.31, 0.33, 0.22, 0.14],
    [0.45, 0.25, 0.17, 0.13],
  ]
  const shade = [1, 0.62, 0.38, 0.2]
  return (
    <svg viewBox="0 0 320 200" role="img" aria-label="Share of voice preview">
      <rect x="14" y="12" width="100" height="7" rx="3.5" fill="var(--muted)" opacity="0.5" />
      {rows.map((row, i) => {
        let x = 14
        return (
          <g key={i}>
            <rect x="14" y={38 + i * 29} width="0" height="0" />
            {row.map((w, j) => {
              const width = w * 292
              const rect = (
                <rect key={j} x={x} y={38 + i * 29} width={width - 2} height="20" rx="3" fill="var(--accent)" opacity={shade[j]} />
              )
              x += width
              return rect
            })}
          </g>
        )
      })}
    </svg>
  )
}

function Chat() {
  return (
    <svg viewBox="0 0 320 200" role="img" aria-label="Chat interface preview">
      <rect x="14" y="14" width="150" height="26" rx="10" fill="var(--surface-2)" stroke="var(--line)" />
      <rect x="24" y="24" width="90" height="6" rx="3" fill="var(--muted)" opacity="0.5" />
      <rect x="150" y="52" width="156" height="42" rx="12" fill="var(--accent)" opacity="0.9" />
      <rect x="162" y="64" width="120" height="6" rx="3" fill="var(--on-accent)" opacity="0.7" />
      <rect x="162" y="77" width="84" height="6" rx="3" fill="var(--on-accent)" opacity="0.7" />
      <rect x="14" y="106" width="180" height="26" rx="10" fill="var(--surface-2)" stroke="var(--line)" />
      <rect x="24" y="116" width="120" height="6" rx="3" fill="var(--muted)" opacity="0.5" />
      <rect x="14" y="160" width="292" height="26" rx="13" fill="none" stroke="var(--line)" strokeWidth="1.5" />
      <circle cx="290" cy="173" r="8" fill="var(--accent)" />
    </svg>
  )
}

function Travel() {
  return (
    <svg viewBox="0 0 320 200" role="img" aria-label="Travel app preview">
      <rect x="14" y="12" width="110" height="7" rx="3.5" fill="var(--muted)" opacity="0.5" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={14 + i * 100} y="34" width="92" height="118" rx="10" fill="var(--surface-2)" stroke="var(--line)" />
          <rect x={20 + i * 100} y="40" width="80" height="62" rx="7" fill="var(--accent)" opacity={[0.85, 0.5, 0.3][i]} />
          <rect x={22 + i * 100} y="112" width="56" height="6" rx="3" fill="var(--muted)" opacity="0.6" />
          <rect x={22 + i * 100} y="125" width="38" height="6" rx="3" fill="var(--muted)" opacity="0.35" />
        </g>
      ))}
      <rect x="14" y="166" width="292" height="20" rx="10" fill="none" stroke="var(--line)" strokeWidth="1.5" />
    </svg>
  )
}

function Bars() {
  const rows = [
    [0.95, 0.62],
    [0.72, 0.5],
    [0.36, 0.7],
    [0.26, 0.2],
  ]
  return (
    <svg viewBox="0 0 320 200" role="img" aria-label="Competitor comparison preview">
      <rect x="14" y="12" width="110" height="7" rx="3.5" fill="var(--muted)" opacity="0.5" />
      {rows.map(([a, b], i) => (
        <g key={i}>
          <rect x="14" y={36 + i * 38} width={a * 292} height="14" rx="3" fill="var(--accent)" opacity={i === 0 ? 1 : 0.5} />
          <rect x="14" y={53 + i * 38} width={b * 292} height="10" rx="3" fill="var(--muted)" opacity="0.4" />
        </g>
      ))}
    </svg>
  )
}

const MAP = { heatmap: Heatmap, lines: Lines, sov: Sov, chat: Chat, travel: Travel, bars: Bars }

export function Artwork({ kind }) {
  const C = MAP[kind] || Lines
  return <C />
}
