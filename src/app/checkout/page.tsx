'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/buy');
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <p className="text-foreground">Redirecionando para o checkout...</p>
    </div>
  );
}
