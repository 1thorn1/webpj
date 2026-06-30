import React from 'react';

/**
 * Button — Valorant's primary action language.
 * Default `primary` uses the signature chamfered cut-corner + red fill.
 * Reserve red for genuine actions (Apple's single-accent discipline).
 */
export function Button({
  children,
  variant = 'primary',   // 'primary' | 'solid' | 'ghost' | 'outline'
  size = 'md',           // 'sm' | 'md' | 'lg'
  onDark = false,
  chamfer = true,        // signature cut-corner (primary/solid only)
  disabled = false,
  iconLeft = null,
  iconRight = null,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { padding: '8px 16px', font: '13px', cut: 'var(--cut-10)' },
    md: { padding: '12px 24px', font: '15px', cut: 'var(--cut-10)' },
    lg: { padding: '16px 34px', font: '17px', cut: 'var(--cut-14)' },
  };
  const s = sizes[size] || sizes.md;

  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    fontFamily: 'var(--font-display)',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    fontWeight: 600,
    fontSize: s.font,
    lineHeight: 1,
    padding: s.padding,
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    transition: 'background .15s ease, color .15s ease, transform .08s ease, box-shadow .15s ease',
    userSelect: 'none',
    whiteSpace: 'nowrap',
  };

  const variants = {
    primary: {
      background: 'var(--accent)',
      color: 'var(--on-accent)',
      clipPath: chamfer ? s.cut : 'none',
      borderRadius: chamfer ? 0 : 'var(--r-md)',
    },
    solid: {
      background: onDark ? 'var(--surface-white)' : 'var(--val-void)',
      color: onDark ? 'var(--val-void)' : 'var(--val-bone)',
      clipPath: chamfer ? s.cut : 'none',
      borderRadius: chamfer ? 0 : 'var(--r-md)',
    },
    outline: {
      background: 'transparent',
      color: onDark ? 'var(--val-bone)' : 'var(--val-void)',
      boxShadow: `inset 0 0 0 1.5px ${onDark ? 'var(--border-dark)' : 'var(--val-void)'}`,
      borderRadius: 'var(--r-md)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--accent)',
      borderRadius: 'var(--r-md)',
      letterSpacing: '0.1em',
    },
  };

  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);

  const hoverStyle = !disabled && hover ? {
    primary: { background: 'var(--accent-hover)', boxShadow: onDark ? 'var(--glow-red)' : 'none' },
    solid:   { transform: 'translateY(-1px)' },
    outline: { background: onDark ? 'rgba(255,70,85,0.08)' : 'rgba(15,25,35,0.06)', color: 'var(--accent)', boxShadow: 'inset 0 0 0 1.5px var(--accent)' },
    ghost:   { background: onDark ? 'rgba(255,70,85,0.10)' : 'rgba(255,70,85,0.08)' },
  }[variant] : {};

  const pressStyle = !disabled && press ? { transform: 'scale(0.97)', background: variant === 'primary' ? 'var(--accent-press)' : undefined } : {};

  return (
    <button
      type="button"
      disabled={disabled}
      style={{ ...base, ...variants[variant], ...hoverStyle, ...pressStyle, ...style }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}
