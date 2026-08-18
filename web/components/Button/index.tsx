import SvgIcon from "@/components/SvgIcon";
import styles from "./styles.module.scss";

interface ButtonProps {
  icon?: string;
  label: string;
  type?: "primary" | "secondary";
  href?: string;
  target?: "_self" | "_blank";
  onClick?: () => void;
}

export default function Button({
  icon,
  label,
  type = "primary",
  href,
  target = "_self",
  onClick,
}: ButtonProps) {
  const buttonStyles = {
    color: type === "primary" ? "var(--background)" : "var(--text-primary)",
    background: type === "primary" ? "var(--text-primary)" : "var(--surface)",
  };

  if (href) {
    return (
      <a
        className={styles.button}
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        style={buttonStyles}
      >
        <span className={styles.label}>{label}</span>
        {icon && (
          <SvgIcon
            src={`/icons/${icon}.svg`}
            color={
              type === "primary" ? "var(--background)" : "var(--text-primary)"
            }
            size="1em"
          />
        )}
      </a>
    );
  }

  return (
    <div className={styles.button} onClick={onClick} style={buttonStyles}>
      <span className={styles.label}>{label}</span>
      {icon && (
        <SvgIcon
          src={`/icons/${icon}.svg`}
          color={
            type === "primary" ? "var(--background)" : "var(--text-primary)"
          }
          size="1em"
        />
      )}
    </div>
  );
}
