import type { Metadata } from 'next';
import { ThemeModeScript } from 'flowbite-react';
import { ThemeInit } from '../.flowbite-react/init';
import { Poppins, Lato } from 'next/font/google';

import './globals.css';

import Header from './components/drawer/header';
import Footer from './layout/footer';
import GlobalSpinner from './components/spinner/GlobalSpinner';
import Toaster from './components/toaster/Toaster';
import ThemeWrapper from './theme';
import { DrawerProvider } from './context/DrawerContext';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'], // pick what you use
  variable: '--font-sans', // 🔑 default font for Tailwind + Flowbite
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-heading',
});

export const metadata: Metadata = {
  title: 'Dolcera',
  description: 'Patent Analysis & Market Research services - Dolcera',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${poppins.variable} ${lato.variable}`}>
      <head>
        <ThemeModeScript />
      </head>

      <body className="font-sans bg-white dark:bg-primary">
        <DrawerProvider>
          <ThemeWrapper>
            <ThemeInit />
            <Toaster />
            <GlobalSpinner />
            <Header />

            {children}

            <Footer />
          </ThemeWrapper>
        </DrawerProvider>
      </body>
    </html>
  );
}
