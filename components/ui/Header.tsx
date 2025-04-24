'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Sun, Moon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { i18n } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  const toggleLanguage = () => {
    const currentLocale = i18n.language;
    const nextLocale = currentLocale === 'vi' ? 'en' : 'vi';

    const segments = pathname.split('/');
    const locales = ['vi', 'en'];

    if (locales.includes(segments[1])) {
      segments[1] = nextLocale;
    } else {
      segments.splice(1, 0, nextLocale);
    }

    const newPath = segments.join('/') || '/';

    i18n.changeLanguage(nextLocale);
    router.push(newPath);
  };

  if (!mounted) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-3 bg-white dark:bg-black shadow flex justify-between items-center">
      <h1 className="text-xl md:text-2xl font-bold text-black dark:text-white">
        Ai-Agent
      </h1>
      <div className="flex items-center gap-3">
        <button
          onClick={toggleLanguage}
          className="text-2xl bg-transparent hover:opacity-80 transition"
          aria-label="Change language"
        >
          {i18n.language === 'vi' ? '🇺🇸' : '🇻🇳'}
        </button>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-full bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300 dark:hover:bg-zinc-600 transition"
          aria-label="Toggle Theme"
        >
          <span suppressHydrationWarning>
            {theme === 'dark' ? (
              <Sun className="w-6 h-6 text-yellow-400" />
            ) : (
              <Moon className="w-6 h-6 text-gray-800" />
            )}
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;
