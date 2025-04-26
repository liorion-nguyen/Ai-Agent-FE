'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
export default function ChatbotTrainingPage() {
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    if (!pathname.includes('/overview')) {
      router.push(`${pathname}/overview`);
    }
  }, [pathname, router]);
  return <div></div>;
}
