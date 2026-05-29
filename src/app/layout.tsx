import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientProviders from "@/components/ClientProviders";

export const metadata: Metadata = {
  title: "AUTO BOURN | Luxury Pre-Owned Vehicles",
  description: "India's premier luxury pre-owned automotive platform. Curated collection of certified Mercedes-Benz, BMW, Audi, Jaguar, Land Rover and more.",
  keywords: "luxury cars, pre-owned, certified vehicles, Mercedes-Benz, BMW, Audi, premium cars India",
  icons: {
    icon: [{ url: '/logo.jpg', type: 'image/jpeg' }],
    apple: '/logo.jpg',
    shortcut: '/logo.jpg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          <Navbar />
          <main style={{ minHeight: '100vh', paddingTop: '80px' }}>
            {children}
          </main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
