import React from 'react';

/**
 * Badge — compact status/role marker. Square-ish, mono label, optional dot.
 * Tones map to the support-signal palette; `accent` uses brand red.
 */
export function Badge({
  children,
  tone = 'neutral',  // 'neutral' | 'accent' | 'teal' | 'gold' | 'green' | 'amber'
  variant = 'soft',  // 'soft' | 'solid' | 'outline'
  dot = false,
  onDark = false,
  style = {},
}) {
  const tones = {
    neutral: { c: onDark ? 'var(--text-on-dark-2)' : 'var(--text-secondary)', base: onDark ? '#9BA8B4' : '#56616B' },
    accent:  { c: 'var(--accent)', base: '255,70,85' },
    teal:    { c: 'var(--teal)',   base: '24,229,200' },
    gold:    { c: 'var(--gold)',   base: '230,180,80' },
    green:   { c: 'var(--green)',  base: '40,183,101' },
    amber:   { c: 'var(--amber)',  base: '232,163,61' },
  };
  const t = tones[tone] || tones.neutral;
  const rgb = tone === 'neutral' ? (onDark ? '155,168,180' : '86,97,107') : t.base;

  const variants = {
    soft:    { background: `rgba(${rgb},0.14)`, color: t.c, boxShadow: 'none' },
    solid:   { background: t.c, color: 'var(--val-void)', boxShadow: 'none' },
    outline: { background: 'transparent', color: t.c, boxShadow: `inset 0 0 0 1px rgba(${rgb},0.5)` },
  };

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '6px',
      fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 500,
      letterSpacing: '0.08em', textTransform: 'uppercase',
      padding: '4px 9px', borderRadius: 'var(--r-sm)', lineHeight: 1.1,
      ...variants[variant], ...style,
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: variant === 'solid' ? 'var(--val-void)' : t.c }} />}
      {children}
    </span>
  );
}
