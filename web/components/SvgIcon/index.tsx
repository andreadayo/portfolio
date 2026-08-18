interface SvgIconProps {
  src: string;
  color?: string;
  size?: number | string;
  className?: string;
}

export default function SvgIcon({
  src,
  color = "var(--text-primary)",
  size = 24,
  className,
}: SvgIconProps) {
  return (
    <span
      className={className}
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        display: "inline-block",
        backgroundColor: color,
        mask: `url(${src}) center / contain no-repeat`,
        WebkitMask: `url(${src}) center / contain no-repeat`,
      }}
    />
  );
}
