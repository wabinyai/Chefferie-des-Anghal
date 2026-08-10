import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Chefferie des Anghal',
  description: 'Official digital platform of the Anghal Chiefdom in Mahagi, Ituri, DRC.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://example-anghal.chiefdom'),
  openGraph: {
    title: 'Chefferie des Anghal',
    description: 'Heritage, governance, community, and development of the Anghal Chiefdom.',
    type: 'website',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://example-anghal.chiefdom'
  },
  icons: {
    icon: '/favicon.ico'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
