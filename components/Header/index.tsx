import Link from "next/link";
import Container from "@/components/Container";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  return (
    <Container smallPadding>
      <Link href="/">
        <span
          style={{
            fontFamily: "var(--font-azeret-mono)",
            fontSize: "var(--text-sm)",
            color: "var(--text-secondary)",
          }}
        >
          AD
        </span>
      </Link>
      <ThemeToggle />
    </Container>
  );
}
