import "./globals.css";
import Navbar from "./components/Navbar";
import ParticleCursor from './components/ParticleCursor';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
