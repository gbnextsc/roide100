'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function BuyPageRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/promo');
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4" style={{ backgroundColor: '#0D1B2A' }}>
      <p className="text-white">Redirecionando...</p>
    </div>
  );
}
