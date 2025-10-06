'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronDown, CornerDownLeft, Send } from 'lucide-react';
import Image from 'next/image';

type Message = {
  sender: 'user' | 'bot';
  text: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const userMessage: Message = { sender: 'user', text: inputValue };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Simulate bot response (echo for now)
    setTimeout(() => {
      const botMessage: Message = { sender: 'bot', text: `Você disse: ${inputValue}` };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 1000);

    setInputValue('');
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
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end gap-2 ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'bot' && (
               <Avatar className="h-8 w-8">
                <AvatarImage src="https://www.gov.br/governodigital/pt-br/acessibilidade-e-usuario/atendimento-gov.br/imagens/avatar-icon.png" alt="Bot" />
                <AvatarFallback>B</AvatarFallback>
              </Avatar>
            )}
            <div
              className={`rounded-lg px-4 py-2 max-w-sm ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              <p>{msg.text}</p>
            </div>
             {msg.sender === 'user' && (
               <Avatar className="h-8 w-8">
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 bg-gray-50 border-t">
        <p className="text-center text-xs text-gray-500 mb-2">Atendente virtual</p>
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Input
            placeholder="Digite o seu texto aqui..."
            className="bg-white"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button type="submit" size="icon">
            <Send className="h-5 w-5" />
          </Button>
        </form>
        <p className="text-center text-xs text-gray-400 mt-3">
          Powered by Evolux CX
        </p>
      </div>
    </div>
  );
}
