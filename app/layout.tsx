import "./globals.css";
import GridOverlay from "./components/GridOverlay";
import Navbar from "./components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* <GridOverlay /> */}
        <Navbar />
        {children}
      </body>
    </html>
  );
}
