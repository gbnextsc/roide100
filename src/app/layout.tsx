import type { Metadata } from 'next';
import Script from 'next/script'; // Importe o componente Script
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'], variable: '--font-body' });

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:9002'),
  title: 'Campanha Oficial de Prevenção ao Metanol',
  description: 'Receba seu canudo detector de metanol em casa, pagando apenas o frete. Uma campanha do Governo Federal para proteger sua saúde.',
};

// Substitua 'SEU_ID_DO_PIXEL' pelo ID real do seu pixel (1694561244833653)
const META_PIXEL_ID = '1694561244833653';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*
          IMPORTANTE: No Next.js 13+ (App Router), você não precisa
          colocar o componente <Script> dentro do <head>.
          O componente <Script> é mais robusto quando colocado
          diretamente no corpo do componente.
          Deixaremos o script do Meta *após* o children,
          mas ele também pode ser colocado aqui ou logo após a tag <body>.
          O uso de <Script> com 'strategy="afterInteractive"' garante
          que ele carregue sem bloquear o conteúdo principal.
        */}

        <link rel="icon" href="https://www.gov.br/++theme++padrao_govbr/img/favicon.ico" type="image/x-icon" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} font-body antialiased`}>
        {/* Meta Pixel noscript tag: DEVE SER COLOCADO IMEDIATAMENTE APÓS A TAG <body> */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt="Meta Pixel" // Adicione um alt para acessibilidade
          />
        </noscript>

        {children}

        <Toaster />

        {/*
          Meta Pixel Script:
          Usando o componente <Script> do Next.js.
          strategy="afterInteractive" é geralmente o ideal para rastreadores
          como o Meta Pixel, pois carrega após o conteúdo principal.
        */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />
      </body>
    </html>
  );
}
