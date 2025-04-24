'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ShoppingBag } from 'lucide-react';

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white dark:bg-black px-4 text-center">
      <div className="flex items-center mb-6">
        <ShoppingBag className="w-10 h-10 text-blue-600 dark:text-blue-400 mr-2" />
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
          Oops! Page not found
        </h1>
      </div>

      <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md">
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </p>

      <Link
        href="/"
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
      >
        Go back home
      </Link>
    </div>
  );
}
