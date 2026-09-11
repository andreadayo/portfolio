import Link from "next/link";
import Container from "@/components/Container";
import ThemeToggle from "@/components/ThemeToggle";
import ScrambleText from "@/components/ScrambleText";

export default function Header() {
  return (
    <div id="top">
      <Container smallPadding>
        <Link href="/">
          <span
            style={{
              fontFamily: "var(--font-azeret-mono)",
              fontSize: "var(--text-sm)",
              color: "var(--text-secondary)",
            }}
          >
            <ScrambleText>AD</ScrambleText>
          </span>
        </Link>
        <ThemeToggle />
      </Container>
    </div>
  );
}
