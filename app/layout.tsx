import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/shared/SiteHeader';
import { SiteFooter } from '@/components/shared/SiteFooter';

export const metadata: Metadata = {
  title: 'Chefferie des Anghal',
  description: 'Official digital platform of the Anghal Chiefdom in Mahagi, Ituri, DRC.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://example-anghal.chiefdom'),
  openGraph: {
    title: 'Chefferie des Anghal',
    description: 'Heritage, governance, community, and development of the Anghal Chiefdom.',
    type: 'website',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://example-anghal.chiefdom'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="min-h-screen bg-neutral-50 text-neutral-950">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
