export default function SiteLogo({ size = 'default', asLink = false, href = '/' }) {
  const iconSize =
    size === 'large' ? 44 :
    size === 'small' ? 26 :
    size === 'icon'  ? 32 : 32;

  const textSize =
    size === 'large' ? 20 :
    size === 'small' ? 14 : 17;

  const showWordmark = size !== 'icon';

  const icon = (
    <img
      src="/workers_log_icon.png"
      alt="Workers Log icon"
      width={iconSize}
      height={iconSize}
      loading="lazy"
      decoding="async"
      draggable={false}
      style={{
        borderRadius: 8,
        display: 'block',
        flexShrink: 0,
        userSelect: 'none',
        WebkitUserDrag: 'none',
      }}
    />
  );

  const wordmark = showWordmark && (
    <span
      style={{
        fontFamily: "'Sora', sans-serif",
        fontWeight: 700,
        fontSize: textSize,
        color: 'var(--color-on-surface)',
        letterSpacing: '-0.015em',
        lineHeight: 1,
        whiteSpace: 'nowrap',
      }}
    >
      Workers<span style={{ color: 'var(--color-primary)' }}>Log</span>
    </span>
  );

  const inner = (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}>
      {icon}
      {wordmark}
    </div>
  );

  if (asLink) {
    return (
      <a
        href={href}
        aria-label="Workers Log — go to home"
        style={{
          textDecoration: 'none',
          color: 'inherit',
          display: 'inline-flex',
          borderRadius: 8,
          transition: 'opacity 160ms ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.82')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
      >
        {inner}
      </a>
    );
  }
  return inner;
}