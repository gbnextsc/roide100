
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function BuyPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
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
      <div className="mt-8">
        <Button size="lg" className="bg-blue-600 text-lg font-bold text-white hover:bg-blue-700">
          Comprar Agora
        </Button>
      </div>
      <div className="mt-4">
        <Link href="/" passHref>
          <Button variant="link">Voltar para a página inicial</Button>
        </Link>
      </div>
    </div>
  );
}
