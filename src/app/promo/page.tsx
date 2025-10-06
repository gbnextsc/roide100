'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ShieldCheck, Truck, Lock, Cookie, Contrast, LayoutGrid, FlaskConical } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

const VIDEO_URL = "https://drive.google.com/file/d/1egMvBOIyQBfC0fm8FaZ66vPbi9nbMHaf/preview";
const CHECKOUT_URL = "/buy";

export default function PromoPage() {
  const ctaRef = useRef<HTMLAnchorElement>(null);

  const handleCtaClick = () => {
    // Analytics event for CTA click
    console.log('Event: cta_click');
    // You can replace console.log with your analytics tracking function
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        ctaRef.current?.focus();
        ctaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    // Prefetch checkout page
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = CHECKOUT_URL;
    document.head.appendChild(link);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-body antialiased">
      <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <a href="https://www.gov.br/pt-br" className="flex items-center gap-2">
              <Image
                src="https://barra.sistema.gov.br/v1/assets/govbr.webp"
                width="108"
                height="29"
                alt="Gov.br Logo"
              />
              <span className="text-sm font-semibold text-gray-600 hidden sm:inline">Governo Federal</span>
            </a>
          <nav className="hidden md:flex items-center gap-4 text-sm lg:gap-6 ml-auto">
            <Button variant="ghost" className="text-gray-600 hover:bg-transparent">Órgãos do Governo</Button>
            <Button variant="ghost" className="text-gray-600 hover:bg-transparent">Acesso à Informação</Button>
            <Button variant="ghost" className="text-gray-600 hover:bg-transparent">Legislação</Button>
            <Button variant="ghost" className="text-gray-600 hover:bg-transparent">Acessibilidade</Button>
          </nav>
          <div className="flex items-center gap-2 ml-auto md:ml-4">
            <div className="h-6 w-px bg-gray-300"></div>
            <Button variant="ghost" size="icon" className="hover:bg-transparent">
              <Cookie className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-transparent">
              <Contrast className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-transparent">
              <LayoutGrid className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 text-center">
        <header className="w-full max-w-4xl mx-auto mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 flex items-center justify-center gap-2">
            <FlaskConical className="h-8 w-8" /> Campanha Oficial de Prevenção ao Metanol
          </h1>
          <p className="mt-2 text-lg md:text-xl text-gray-600">
            Receba seu canudo detector em casa, pagando apenas o frete.
          </p>
        </header>

        <section className="w-full max-w-4xl mx-auto">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">
            Assista antes de consumir qualquer bebida desconhecida
          </h2>
          <div className="relative w-full max-w-[900px] mx-auto" style={{ paddingBottom: '56.25%', height: 0 }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg shadow-2xl border-2 border-gray-200"
              src={VIDEO_URL}
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Vídeo de Apresentação SafeSip"
              loading="lazy"
            ></iframe>
            <div className="absolute top-2 right-2 w-16 h-12 bg-black z-10"></div>
          </div>
          <div className="mt-6">
            <Link
              href={CHECKOUT_URL}
              passHref
              legacyBehavior
            >
              <a
                ref={ctaRef}
                onClick={handleCtaClick}
                role="button"
                aria-label="Ir para checkout do canudo detector de metanol"
                className="inline-block bg-[#ff7300] text-white font-bold text-lg uppercase px-10 py-4 rounded-md shadow-lg transition-transform transform hover:scale-105 hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-300"
              >
                GARANTA JÁ O SEU
              </a>
            </Link>
          </div>
        </section>

        <p className="max-w-2xl mx-auto text-xl md:text-2xl font-medium my-10 text-gray-800">
          Evite cegueira e intoxicação por metanol. Com apenas um teste, você protege sua vida.
        </p>

        <section className="w-full max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-lg text-gray-700">
          <div className="flex items-center justify-center gap-3">
            <ShieldCheck className="h-7 w-7 text-green-500" />
            <span>Testado por especialistas</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Truck className="h-7 w-7 text-blue-500" />
            <span>Envio para todo o Brasil</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Lock className="h-7 w-7 text-yellow-500" />
            <span>Pagamento 100% seguro</span>
          </div>
        </section>
        
        <section className="mt-12 flex flex-col items-center gap-4">
          <Image
                src="https://barra.sistema.gov.br/v1/assets/govbr.webp"
                width="108"
                height="29"
                alt="Gov.br Logo"
              />
          <p className="text-lg font-semibold text-gray-700">Recomendado por profissionais da saúde.</p>
        </section>
      </main>

      <footer className="w-full py-6 text-center text-gray-500 text-sm">
        <p>© 2025 SafeSip™ — Todos os direitos reservados</p>
      </footer>
    </div>
  );
}
