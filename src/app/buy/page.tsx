
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function BuyPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4" style={{ backgroundColor: '#0D1B2A' }}>
      <div className="w-full max-w-4xl">
        <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://drive.google.com/file/d/1egMvBOIyQBfC0fm8FaZ66vPbi9nbMHaf/preview"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Vídeo de Apresentação"
          ></iframe>
        </div>
      </div>
      <div className="mt-8 relative group">
        <Link href="/checkout">
          <Button size="lg" className="text-lg font-bold uppercase text-white" style={{ backgroundColor: '#FF6B00', color: '#FFFFFF' }}>
            garanta já o seu
          </Button>
          <ArrowRight className="absolute -left-8 top-1/2 -translate-y-1/2 h-6 w-6 text-orange-500 animate-pulse duration-1000" />
          <ArrowRight className="absolute -right-8 top-1/2 -translate-y-1/2 h-6 w-6 text-orange-500 animate-pulse duration-1000 rotate-180" />
        </Link>
      </div>
      <div className="mt-4">
        <Link href="/" passHref>
          <Button variant="link" style={{ color: '#FFFFFF' }}>Voltar para a página inicial</Button>
        </Link>
      </div>
    </div>
  );
}
