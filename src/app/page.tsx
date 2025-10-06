'use client';

import { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronDown, Send } from 'lucide-react';
import Image from 'next/image';
import { verifyCpf } from './actions';

type Message = {
  id: number;
  sender: 'user' | 'bot';
  text: React.ReactNode;
};

type ConversationState =
  | 'initial'
  | 'awaiting_initial_answer'
  | 'awaiting_cpf'
  | 'awaiting_name_confirmation'
  | 'cpf_validated'
  | 'declined_initial';

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [conversationState, setConversationState] = useState<ConversationState>('initial');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  const addMessage = (sender: 'user' | 'bot', text: React.ReactNode) => {
    setMessages(prev => [...prev, { id: prev.length, sender, text }]);
  };

  useEffect(() => {
    if (conversationState === 'initial') {
      setIsBotTyping(true);
      setTimeout(() => {
        addMessage('bot', 'Olá! Você quer receber um teste gratuito de metanol para bebidas?');
        setConversationState('awaiting_initial_answer');
        setIsBotTyping(false);
      }, 1000);
    }
  }, [conversationState]);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isBotTyping]);


  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const userMessage = inputValue.trim();
    addMessage('user', userMessage);
    setInputValue('');
    setIsBotTyping(true);

    setTimeout(async () => {
      if (conversationState === 'awaiting_initial_answer') {
        if (userMessage.toLowerCase().includes('sim')) {
          addMessage('bot', 'Ótimo! Vamos garantir seu teste gratuito para identificar metanol em bebidas. Vou precisar de alguns dados básicos para reservar.');
          setTimeout(() => {
            addMessage('bot', 'Para reservar um teste, qual é o seu CPF? (ex.: 000.000.000-00)');
            setConversationState('awaiting_cpf');
          }, 1000);
        } else {
          addMessage('bot', 'Sem problema! Se quiser, posso apenas te explicar como o teste funciona e onde é distribuído gratuitamente. Deseja saber mais?');
          setConversationState('declined_initial');
        }
      } else if (conversationState === 'awaiting_cpf') {
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        if (!cpfRegex.test(userMessage)) {
          addMessage('bot', 'Opa! Parece que o CPF informado não é válido. Verifique e envie novamente, por favor, no formato 000.000.000-00.');
        } else {
          const result = await verifyCpf(userMessage);
          if (result.success && result.data) {
             addMessage('bot', <>Perfeito! Seu CPF foi validado. <br/>Agora preciso confirmar alguns dados para gerar o voucher do teste gratuito.</>);
            setTimeout(() => {
              addMessage('bot', `Este é o nome associado ao CPF: **${result.data?.nome}**. Confirma que é você? (Sim/Não)`);
            }, 1000);
            setConversationState('awaiting_name_confirmation');
          } else {
            addMessage('bot', `Não consegui validar o CPF informado. Poderia verificar e tentar novamente? Erro: ${result.error}`);
          }
        }
      } else if (conversationState === 'awaiting_name_confirmation') {
         if (userMessage.toLowerCase().includes('sim')) {
            addMessage('bot', 'Excelente! Em breve você receberá mais instruções.');
            setConversationState('cpf_validated');
         } else {
            addMessage('bot', 'Entendido. Por favor, insira o CPF correto para que possamos validar seus dados.');
            setConversationState('awaiting_cpf');
         }
      } else {
         addMessage('bot', 'Desculpe, não entendi. Como posso ajudar?');
      }
      setIsBotTyping(false);
    }, 1500);
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
      <div ref={chatBodyRef} className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
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
              className={`rounded-lg px-4 py-2 max-w-sm prose ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              {typeof msg.text === 'string' ? <p>{msg.text}</p> : msg.text}
            </div>
             {msg.sender === 'user' && (
               <Avatar className="h-8 w-8">
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
         {isBotTyping && (
          <div className="flex items-end gap-2 justify-start">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://www.gov.br/governodigital/pt-br/acessibilidade-e-usuario/atendimento-gov.br/imagens/avatar-icon.png" alt="Bot" />
              <AvatarFallback>B</AvatarFallback>
            </Avatar>
            <div className="rounded-lg px-4 py-2 max-w-sm bg-gray-200 text-gray-800 rounded-bl-none">
              <div className="flex items-center gap-1">
                  <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
              </div>
            </div>
          </div>
        )}
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
            disabled={isBotTyping}
          />
          <Button type="submit" size="icon" disabled={isBotTyping || inputValue.trim() === ''}>
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
