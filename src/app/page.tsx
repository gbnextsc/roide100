'use client';

import { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronDown, Send } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { verifyCpf } from './actions';

type Message = {
  id: number;
  sender: 'user' | 'bot';
  text: React.ReactNode;
};

type ConversationState =
  | 'initial'
  | 'awaiting_initial_answer'
  | 'declined_initial'
  | 'awaiting_cpf'
  | 'awaiting_name'
  | 'awaiting_phone'
  | 'awaiting_location'
  | 'awaiting_previous_rescue'
  | 'awaiting_consent'
  | 'finalized';

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [conversationState, setConversationState] = useState<ConversationState>('initial');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isBotTyping]);


  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '' || isBotTyping) return;

    const userMessage = inputValue.trim();
    addMessage('user', userMessage);
    setInputValue('');
    setIsBotTyping(true);

    setTimeout(async () => {
      const lowerCaseMessage = userMessage.toLowerCase();
      const affirmativeAnswers = ['sim', 'ss', 's', 'quero', 'claro', 'pode', 'aceito'];
      const negativeAnswers = ['não', 'nao', 'n', 'nao aceito', 'não aceito'];


      switch (conversationState) {
        case 'awaiting_initial_answer':
          if (affirmativeAnswers.some(ans => lowerCaseMessage.includes(ans))) {
            addMessage('bot', 'Ótimo! Vamos garantir seu teste gratuito para identificar metanol em bebidas. Vou precisar de alguns dados básicos para reservar.');
            setTimeout(() => {
              addMessage('bot', 'Para reservar um teste, qual é o seu CPF? (ex.: 000.000.000-00)');
              setConversationState('awaiting_cpf');
            }, 1000);
          } else {
            addMessage('bot', 'Sem problema! Se quiser, posso apenas te explicar como o teste funciona e onde é distribuído gratuitamente. Deseja saber mais?');
            setConversationState('declined_initial');
          }
          break;

        case 'awaiting_cpf':
          const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
          if (!cpfRegex.test(userMessage)) {
            addMessage('bot', 'Opa! Parece que o CPF informado não é válido. Verifique e envie novamente, por favor, no formato 000.000.000-00.');
          } else {
            const result = await verifyCpf(userMessage);
            if (result.success) {
              addMessage('bot', 'Perfeito! Seu CPF foi validado. Agora preciso confirmar alguns dados para gerar o voucher do teste gratuito.');
              setTimeout(() => {
                addMessage('bot', 'Confirma seu nome completo como está no CPF?');
              }, 1000);
              setConversationState('awaiting_name');
            } else {
              addMessage('bot', `Não consegui validar o CPF informado. Poderia verificar e tentar novamente? Erro: ${result.error}`);
            }
          }
          break;

        case 'awaiting_name':
            addMessage('bot', `Obrigado, ${userMessage}. Essas informações serão usadas apenas para confirmar a entrega do seu teste gratuito.`);
            setTimeout(() => {
                addMessage('bot', 'Qual telefone com DDD?');
                setConversationState('awaiting_phone');
            }, 1000);
            break;

        case 'awaiting_phone':
            const phoneRegex = /^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/;
            if (!phoneRegex.test(userMessage)) {
                addMessage('bot', 'Hmm, acho que o número está incompleto. Envie novamente com DDD, por exemplo: (11) 91234-5678.');
            } else {
                addMessage('bot', 'Perfeito! Esse número será usado para contato caso precise.');
                 setTimeout(() => {
                    addMessage('bot', 'Em qual cidade / CEP você vai receber?');
                    setConversationState('awaiting_location');
                }, 1000);
            }
            break;
        
        case 'awaiting_location':
            addMessage('bot', `Ok, estamos com estoques para ${userMessage}.`);
            setTimeout(() => {
                addMessage('bot', 'Você já resgatou um teste gratuito antes? (Sim / Não)');
                setConversationState('awaiting_previous_rescue');
            }, 1000);
            break;

        case 'awaiting_previous_rescue':
            if (affirmativeAnswers.some(ans => lowerCaseMessage.includes(ans))) {
                addMessage('bot', 'Entendido! O sistema vai confirmar seu histórico. Caso já tenha retirado um teste, não será necessário um novo resgate.');
            } else {
                addMessage('bot', 'Perfeito, seu CPF está livre para um novo cadastro. Vamos finalizar sua solicitação.');
            }
             setTimeout(() => {
                addMessage('bot', 'Aceita que seus dados sejam usados apenas para validação do resgate e comunicação relacionada ao teste? (Aceito / Não aceito)');
                setConversationState('awaiting_consent');
            }, 1500);
            break;
        
        case 'awaiting_consent':
            if (affirmativeAnswers.some(ans => lowerCaseMessage.includes(ans))) {
                addMessage('bot', 'Obrigado pelo consentimento. Suas informações serão tratadas conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).');
                setTimeout(() => {
                    addMessage('bot', '🎉 Tudo pronto! Seu teste gratuito de metanol foi reservado com sucesso.');
                }, 1500);
                setTimeout(() => {
                     addMessage('bot', (
                        <div className="flex flex-col gap-4">
                            <p>Para solicitar seu SafeSip/Canudo aperte no botão abaixo para receber agora.</p>
                            <Button onClick={() => router.push('/noticias')}>Receber Agora</Button>
                        </div>
                    ));
                    setConversationState('finalized');
                }, 3000);
            } else {
                addMessage('bot', 'Entendido. Sem o consentimento, não podemos prosseguir com o cadastro, pois ele é necessário para garantir a segurança e o controle do programa. Caso mude de ideia, posso reiniciar o processo.');
                setConversationState('declined_initial');
            }
            break;

        default:
          addMessage('bot', 'Desculpe, não entendi. Como posso ajudar?');
          break;
      }
      setIsBotTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
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

      <div ref={chatBodyRef} className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end gap-2 ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'bot' && (
               <Avatar className="h-8 w-8 self-start">
                <Image src="https://www.gov.br/governodigital/pt-br/acessibilidade-e-usuario/atendimento-gov.br/imagens/avatar-icon.png" width={32} height={32} alt="Bot" />
              </Avatar>
            )}
            <div
              className={`rounded-lg px-4 py-2 max-w-sm prose ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              {typeof msg.text === 'string' ? <p dangerouslySetInnerHTML={{ __html: msg.text }} /> : msg.text}
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
            <Avatar className="h-8 w-8 self-start">
              <Image src="https://www.gov.br/governodigital/pt-br/acessibilidade-e-usuario/atendimento-gov.br/imagens/avatar-icon.png" width={32} height={32} alt="Bot" />
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

      <div className="p-4 bg-gray-50 border-t">
        <p className="text-center text-xs text-gray-500 mb-2">Atendente virtual</p>
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Input
            placeholder="Digite o seu texto aqui..."
            className="bg-white"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isBotTyping || conversationState === 'finalized'}
          />
          <Button type="submit" size="icon" disabled={isBotTyping || inputValue.trim() === '' || conversationState === 'finalized'}>
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
