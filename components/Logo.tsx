export function ShieldMark({ size = 60, navy = '#16283d', brass = '#a6752c' }: { size?: number; navy?: string; brass?: string }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 160 224" aria-hidden="true">
      <path
        d="M80 6 L146 30 L146 88 Q146 140 80 168 Q14 140 14 88 L14 30 Z"
        fill="none"
        stroke={navy}
        strokeWidth="8"
      />
      <path
        d="M80 26 L128 44 L128 88 Q128 124 80 148 Q32 124 32 88 L32 44 Z"
        fill="none"
        stroke={brass}
        strokeWidth="4"
      />
      <path
        d="M48 90 L70 112 L114 60"
        fill="none"
        stroke={navy}
        strokeWidth="13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Wordmark({ light = false }: { light?: boolean }) {
  const ink = light ? '#fbf7ee' : '#16283d';
  const sub = light ? 'rgba(251,247,238,0.65)' : 'var(--muted)';
  return (
    <div>
      <div style={{ fontSize: 26, fontWeight: 700, color: ink, lineHeight: 1.1 }}>يقين — Yaqeen</div>
      <div style={{ fontSize: 11.5, color: sub, letterSpacing: 1.5, marginTop: 2 }}>YAQEEN DIGITAL SOLUTIONS</div>
    </div>
  );
}
