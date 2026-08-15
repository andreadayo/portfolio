import Container from "@/components/Container";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Container smallPadding isLast>
      <span>© {currentYear} Andrea Dayo</span>
      <span>Back to top</span>
    </Container>
  );
}
