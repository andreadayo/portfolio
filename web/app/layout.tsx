import type { Metadata } from "next";
import { Azeret_Mono } from "next/font/google";
import localFont from "next/font/local";

import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { getSEO, sanityImageUrl } from "@/lib/sanity";

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

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEO();

  if (!seo) {
    return {};
  }

  const socialImage = seo.image ? sanityImageUrl(seo.image) : undefined;

  return {
    title: seo.title ?? undefined,
    description: seo.description ?? undefined,

    keywords: seo.keywords ?? undefined,

    authors: seo.author ? [{ name: seo.author }] : undefined,

    metadataBase: seo.siteUrl ? new URL(seo.siteUrl) : undefined,

    openGraph: {
      title: seo.title ?? undefined,
      description: seo.description ?? undefined,
      url: seo.siteUrl ?? undefined,
      siteName: seo.title ?? undefined,
      type: "website",
      images: socialImage
        ? [
            {
              url: socialImage,
              alt: seo.image?.alt ?? undefined,
            },
          ]
        : undefined,
    },

    twitter: {
      card: socialImage ? "summary_large_image" : "summary",
      title: seo.title ?? undefined,
      description: seo.description ?? undefined,
      images: socialImage ? [socialImage] : undefined,
    },

    icons: {
      icon: [
        {
          url: "/favicon/favicon.ico",
        },
        {
          url: "/favicon/favicon-16x16.png",
          sizes: "16x16",
          type: "image/png",
        },
        {
          url: "/favicon/favicon-32x32.png",
          sizes: "32x32",
          type: "image/png",
        },
      ],
      apple: "/favicon/apple-touch-icon.png",
    },
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${generalSans.variable} ${azeretMono.variable}`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      data-initial-load="true"
    >
      <body>
        <ThemeProvider>
          <div className="page-shell">
            <Header />

            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {children}
            </div>

            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
