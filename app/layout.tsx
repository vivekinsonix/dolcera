import { ThemeModeScript } from 'flowbite-react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeInit } from '../.flowbite-react/init';
import CookieBanner from './components/CookieBanner/CookieBanner';
import Header from './components/drawer/header';
import GlobalSpinner from './components/spinner/GlobalSpinner';
import Toaster from './components/toaster/Toaster';
import { DrawerProvider } from './context/DrawerContext';
import './globals.css';
import Footer from './layout/footer';
import ThemeWrapper from './theme';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Dolcera',
  description: 'Empowering digital solutions by Insonix',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Load theme BEFORE hydration to avoid the mismatch */}
        <ThemeModeScript />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-primary `}>
        <DrawerProvider>
          <ThemeWrapper>
            <ThemeInit />
            <Toaster />
            <GlobalSpinner />
            <Header />

            {children}
            <Footer />
            <div
              style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
              className="fixed bottom-0 left-0 right-0 z-50 flex justify-center"
            >
              <CookieBanner />
            </div>
          </ThemeWrapper>
        </DrawerProvider>
      </body>
    </html>
  );
}
