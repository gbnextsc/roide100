'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronDown, CornerDownLeft } from 'lucide-react';
import Image from 'next/image';

export default function ChatPage() {
  const router = useRouter();

  const handleInteraction = () => {
    router.push('/noticias');
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image
            src="https://www.gov.br/governodigital/pt-br/acessibilidade-e-usuario/atendimento-gov.br/imagens/avatar-icon.png"
            alt="Logo Gov.br"
            width={40}
            height={40}
          />
          <div>
            <p className="font-semibold text-gray-800">Assistente</p>
            <p className="font-bold text-gray-800 text-lg">gov.br</p>
          </div>
        </div>
        <ChevronDown className="text-gray-500" />
      </div>

      {/* Chat Body */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
         {/* Assistant Message will be inserted here */}
      </div>

      {/* Footer */}
      <div className="p-4 bg-gray-50 border-t">
        <p className="text-center text-xs text-gray-500 mb-2">Atendente virtual</p>
        <div className="relative">
          <Input
            placeholder="Digite o seu texto aqui..."
            className="bg-white"
            onClick={handleInteraction}
            readOnly
          />
        </div>
        <p className="text-center text-xs text-gray-400 mt-3">
          Powered by Evolux CX
        </p>
      </div>
    </div>
  );
}
