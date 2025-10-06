'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronDown, Paperclip, CornerDownLeft } from 'lucide-react';
import Image from 'next/image';

export default function ChatPage() {
  const router = useRouter();

  const handleInteraction = () => {
    router.push('/noticias');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm h-[80vh] flex flex-col bg-white rounded-lg shadow-2xl overflow-hidden">
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
          {/* User Message */}
          <div className="flex justify-end">
            <div className="bg-blue-100 text-gray-800 rounded-lg rounded-br-none p-3 max-w-[80%]">
              <p>oi preciso de ajuda</p>
              <p className="text-xs text-right text-gray-500 mt-1">07:37 ✓</p>
            </div>
          </div>

          {/* Assistant Message */}
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-800 rounded-lg rounded-bl-none p-3 max-w-[80%] relative">
              <p>Olá! Você está no Chat do <strong>Ministério da Gestão e da Inovação em Serviços Públicos</strong></p>
              <p className="mt-2">Digite o número de qual atendimento você está buscando:</p>
              <ul className="mt-2 list-none space-y-1">
                <li onClick={handleInteraction} className="cursor-pointer"><strong>1</strong> - Bolsa Verde</li>
                <li onClick={handleInteraction} className="cursor-pointer"><strong>2</strong> - Recuperar conta</li>
              </ul>
              <button onClick={handleInteraction} className="absolute -bottom-2 -right-2 text-gray-500">
                <CornerDownLeft size={18} />
              </button>
            </div>
          </div>
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
            <Paperclip className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
          <p className="text-center text-xs text-gray-400 mt-3">
            Powered by Evolux CX
          </p>
        </div>
      </div>
    </div>
  );
}
