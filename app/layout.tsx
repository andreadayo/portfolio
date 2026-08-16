import type { Metadata } from "next";
import { Azeret_Mono } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.scss";

const neueMontreal = localFont({
  src: [
    {
      path: "../public/fonts/NeueMontreal-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/NeueMontreal-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/NeueMontreal-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/NeueMontreal-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-neue-montreal",
});

const azeretMono = Azeret_Mono({
  variable: "--font-azeret-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Andrea Dayo | Portfolio",
  description: "Software Engineer based in Manila, PH",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${neueMontreal.variable} ${azeretMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <div className="page-shell">
            <Header />
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              {children}
            </div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
