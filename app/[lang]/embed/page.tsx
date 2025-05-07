import { Suspense } from 'react';
import BoxChat from './components/BoxChat';

export default function EmbedPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BoxChat />
    </Suspense>
  );
}
