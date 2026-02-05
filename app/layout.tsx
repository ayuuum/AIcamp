import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI研修ならAmber',
  description: '助成金で最大75%OFFの実践型生成AI研修',
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
