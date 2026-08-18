import type { Metadata } from "next";
import { Azeret_Mono } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.scss";

const generalSans = localFont({
  src: [
    {
      path: "../public/fonts/GeneralSans-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/GeneralSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/GeneralSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/GeneralSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-general-sans",
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
      className={`${generalSans.variable} ${azeretMono.variable}`}
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
