import Container from "@/components/Container";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  return (
    <Container smallPadding>
      <span
        style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}
      >
        AD
      </span>
      <ThemeToggle />
    </Container>
  );
}
