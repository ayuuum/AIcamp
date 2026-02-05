import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Amber Master Hub',
  description: 'Integrated Management Dashboard for Amber',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
