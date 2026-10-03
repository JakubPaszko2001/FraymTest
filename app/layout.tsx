import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import ParticleCursor from './components/ParticleCursor';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fraymweb.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "FraymWeb",
    template: "%s | FraymWeb",
  },
  description:
    "FraymWeb — nowoczesne strony internetowe, aplikacje webowe i interaktywne doświadczenia 3D.",
  applicationName: "FraymWeb",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: baseUrl,
    siteName: "FraymWeb",
    title: "FraymWeb",
    description:
      "FraymWeb — nowoczesne strony internetowe, aplikacje webowe i interaktywne doświadczenia 3D.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body>
        <Navbar />
        {children}
        <ParticleCursor />
      </body>
    </html>
  );
}
