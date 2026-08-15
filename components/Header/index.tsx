import Container from "@/components/Container";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  return (
    <Container smallPadding>
      <span>menu</span>
      <span>AD</span>
      <ThemeToggle />
    </Container>
  );
}
