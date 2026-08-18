import SvgIcon from "@/components/SvgIcon";
import styles from "./styles.module.scss";

interface ActionLinkProps {
  label: string;
  icon?: string;
  side?: "left" | "right";
}

export default function ActionLink({ label, icon, side }: ActionLinkProps) {
  return (
    <div className={styles.actionLink}>
      {side === "left" && icon && (
        <SvgIcon
          src={`/icons/${icon}.svg`}
          color="var(--text-secondary)"
          size="1em"
        />
      )}
      <span>{label}</span>
      {side === "right" && icon && (
        <SvgIcon
          src={`/icons/${icon}.svg`}
          color="var(--text-secondary)"
          size="1em"
        />
      )}
    </div>
  );
}
