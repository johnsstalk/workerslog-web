export default function SiteLogo({ size = 'default' }) {
  const iconSize = size === 'large' ? 40 : size === 'small' ? 26 : 32;
  const textSize = size === 'large' ? 20 : size === 'small' ? 14 : 17;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
      <img
        src="/workers_log_icon.png"
        alt="Workers Log icon"
        width={iconSize}
        height={iconSize}
        style={{ borderRadius: 8, display: 'block', flexShrink: 0 }}
      />
      <span style={{
        fontFamily: "'Sora', sans-serif",
        fontWeight: 700,
        fontSize: textSize,
        color: 'var(--color-on-surface)',
        letterSpacing: '-0.01em',
        lineHeight: 1,
      }}>
        Workers<span style={{ color: 'var(--color-primary)' }}>Log</span>
      </span>
    </div>
  );
}