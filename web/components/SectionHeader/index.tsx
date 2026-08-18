import Link from "next/link";
import SvgIcon from "@/components/SvgIcon";
import ActionLink from "@/components/ActionLink";
import styles from "./styles.module.scss";

interface SectionHeaderProps {
  headerIcon: string;
  headerLabel: string;
  actionIcon?: string;
  actionLabel?: string;
  actionLink?: string;
}

export default function SectionHeader({
  headerLabel,
  headerIcon,
  actionIcon,
  actionLabel,
  actionLink,
}: SectionHeaderProps) {
  return (
    <div className={styles.sectionHeader}>
      <div className={styles.header}>
        <SvgIcon
          src={`/icons/${headerIcon}.svg`}
          color="var(--text-primary)"
          size="1em"
        />
        <span className={styles.label}>{headerLabel}</span>
      </div>
      {actionIcon && actionLabel && actionLink && (
        <Link href={actionLink}>
          <ActionLink label={actionLabel} icon={actionIcon} side="right" />
        </Link>
      )}
    </div>
  );
}
