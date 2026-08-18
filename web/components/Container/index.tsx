import styles from "./styles.module.scss";

interface Props {
  children: React.ReactNode;
  smallPadding?: boolean;
  fillHeight?: boolean;
  isLast?: boolean;
}

export default function Container({
  children,
  smallPadding = false,
  isLast = false,
  fillHeight = false,
}: Props) {
  return (
    <div
      className={styles.container}
      style={{
        height: fillHeight ? "100%" : "auto",
        borderBottom: isLast ? "none" : "0.063em solid var(--surface)",
      }}
    >
      <div className={styles.left} />
      <div
        className={styles.inner}
        style={{ padding: smallPadding ? "1em 2.5em" : "3em 2.5em" }} // for header and footer
      >
        {children}
      </div>
      <div className={styles.right} />
    </div>
  );
}
