import { ReactNode } from 'react';
import { dir } from 'i18next';
import { ThemeProvider } from 'next-themes';
import i18nextConfig from '@/i18next.config';
import { Toaster } from '@/components/ui/Toaster';
import initTranslations from '@/shared/lib/i18n/config';
import QueryProvider from '@/shared/provider/QueryProvider';
import TranslationsProvider from '@/shared/provider/TranslationsProvider';
import '@/shared/styles/globals.css';

export const generateMetadata = ({
  params: { lang },
}: {
  params: { lang: string };
}) => {
  return {
    title: `Ai-Agent - ${lang}`,
    description: 'Ai-Agent Application',
  };
};

export function generateStaticParams() {
  return i18nextConfig.locales.map((locale) => ({ lang: locale }));
}

const i18nNamespaces = ['common', 'product-detail'];

export default async function RootLayout({
  children,
  params: { lang },
}: Readonly<{
  children: ReactNode;
  params: { lang: string };
}>) {
  const { resources } = await initTranslations(lang, i18nNamespaces);

  return (
    <html lang={lang} dir={dir(lang)} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <QueryProvider>
            <TranslationsProvider
              namespaces={i18nNamespaces}
              locale={lang}
              resources={resources}
            >
              <Toaster />
              {children}
            </TranslationsProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
