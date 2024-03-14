import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.scss';
import StyledComponentsRegistry from '@/lib/AntdRegistry';
import ToasterContextProvider from '@/components/Toaster/Toaster';
import { appConfig } from '@/config/appConfig';
import { ReduxProvider } from '@/store/provider';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { ThemeProviders } from '@/theme/providers';
import React from 'react';

const font = Poppins({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  style: ['normal'],
  variable: '--admin-font',
});

export const metadata: Metadata = {
  title: 'Examination Hue',
  description: 'Examination',
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<RootLayoutProps>) {
  const messages = useMessages();

  unstable_setRequestLocale(locale);
  return (
    <html lang={locale || appConfig.locale || 'en'} suppressHydrationWarning>
      <body className={font.className}>
        <ReduxProvider>
          <NextIntlClientProvider messages={messages}>
            {/* <AuthProvider> */}
            <ThemeProviders>
              <StyledComponentsRegistry>
                <ToasterContextProvider>{children}</ToasterContextProvider>
              </StyledComponentsRegistry>
              {/* </AuthProvider> */}
            </ThemeProviders>
          </NextIntlClientProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
