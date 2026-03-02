import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Build Car & Bike History',
    template: '%s | Build Car & Bike History',
  },
  description: 'Comprehensive car and bike history, specifications, and information',
  keywords: ['car history', 'bike history', 'vehicle specifications', 'automotive'],
  authors: [{ name: 'Build Car & Bike History' }],
  creator: 'Build Car & Bike History',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Build Car & Bike History',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
