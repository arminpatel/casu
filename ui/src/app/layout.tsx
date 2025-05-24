import type { Metadata } from 'next';
import { Inter, Noto_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import styles from './Layout.module.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter-actual',
  weight: ['400', '500', '700', '900'],
});

const notoSans = Noto_Sans({
  subsets: ['latin'],
  variable: '--font-noto-sans-actual',
  weight: ['400', '500', '700', '900'],
});

export const metadata: Metadata = {
  title: 'Casu',
  description: 'Casu',
  icons: {
    icon: 'data:image/x-icon;base64,',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} ${notoSans.className}`}>
      <body>
        <div className={styles.pageWrapper}>
          <div className={styles.layoutContainer}>
            <Header />
            <main className={styles.mainContent}>
              <div className={styles.contentContainer}>
                {children}
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
