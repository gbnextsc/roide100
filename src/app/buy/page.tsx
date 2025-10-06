'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Truck, ShoppingCart, Lock, QrCode, Copy, ShieldCheck, Microscope, PackageCheck, Star, Loader2, CircleCheck, Menu, Cookie, Contrast, LayoutGrid } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { generatePixPayment, checkPixStatus } from '@/app/actions';

export default function CheckoutPage() {
  const [cep, setCep] = useState('');
  const [shippingCost, setShippingCost] = useState<number | null>(null);
  const [address, setAddress] = useState({ street: '', city: '', state: '', number: '', complement: '' });
  const [error, setError] = useState<string | null>(null);
  const [showFreebieAlert, setShowFreebieAlert] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'form' | 'pix' | 'success'>('form');
  const [pixData, setPixData] = useState<{ code: string; qrcode_base64: string } | null>(null);
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const productPrice = 0.00;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFreebieAlert(true);
    }, 500);
    return () => {
      clearTimeout(timer);
       if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, []);

  const handleManualCheck = async () => {
    if (!transactionId) return;
    setIsLoading(true);
    console.log("Manual check initiated...");
    const result = await checkPixStatus(transactionId);
    console.log("Manual check result:", result);
    if (result.success && result.status === 'paid') {
        console.log("Payment confirmed by manual check! Changing step to success.");
        setPaymentStep('success');
        if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current);
        }
    } else {
        toast({
            title: "Pagamento ainda não confirmado",
            description: "Ainda não recebemos a confirmação do seu pagamento. Por favor, aguarde alguns instantes.",
        });
    }
    setIsLoading(false);
  };

  // Effect to poll for payment status
  useEffect(() => {
    if (paymentStep === 'pix' && transactionId) {
      pollingIntervalRef.current = setInterval(async () => {
        console.log("Checking payment status...");
        const result = await checkPixStatus(transactionId);
        console.log("Polling result:", result);
        if (result.success && result.status === 'paid') {
          console.log("Payment confirmed! Changing step to success.");
          setPaymentStep('success');
          if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current);
          }
        }
      }, 4000);
    }

    // Cleanup function
    return () => {
      if (pollingIntervalRef.current) {
        console.log("Cleaning up polling interval.");
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [paymentStep, transactionId]);

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setCep(value);
  };

  const handleCalculateShipping = async () => {
    if (cep.length !== 8) {
      setError('CEP inválido — use o formato 00000-000');
      setShippingCost(null);
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.ok) {
        throw new Error('Não foi possível buscar o CEP.');
      }
      const data = await response.json();
      if (data.erro) {
        setError('CEP não encontrado.');
        setShippingCost(null);
        setAddress({ street: '', city: '', state: '', number: '', complement: '' });
      } else {
        setAddress(prev => ({ ...prev, street: data.logradouro, city: data.localidade, state: data.uf }));
        setShippingCost(47.90);
      }
    } catch (e) {
      setError('Ocorreu um erro ao calcular o frete.');
      setShippingCost(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyPixCode = () => {
    if (pixData) {
      navigator.clipboard.writeText(pixData.code);
      toast({
        title: 'Código Pix copiado!',
        description: 'Use o código no seu app de pagamentos.',
      });
    }
  };
  
  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!shippingCost) {
        setError("Preencha seu CEP para calcular o frete.");
        setIsLoading(false);
        return;
    }
    const form = e.target as HTMLFormElement;
    const nameInput = form.elements.namedItem('name') as HTMLInputElement;
    const emailInput = form.elements.namedItem('email') as HTMLInputElement;
    const numberInput = form.elements.namedItem('address-number') as HTMLInputElement;
    
    if (!nameInput.value || !emailInput.value || !address.street || !numberInput.value) {
        toast({
            variant: "destructive",
            title: "Erro",
            description: "Por favor, preencha todos os campos de endereço, nome e email.",
        });
        setIsLoading(false);
        return;
    }
    
    const fullAddress = {
        ...address,
        zip: cep,
        number: numberInput.value,
        complement: (form.elements.namedItem('address-complement') as HTMLInputElement).value
    };

    const buyer = { name: nameInput.value, email: emailInput.value };
    const totalAmount = productPrice + shippingCost;
    const amountInCents = Math.round(totalAmount * 100);

    try {
        const result = await generatePixPayment(buyer, amountInCents, fullAddress);

        if (result.success && result.data) {
            setPixData(result.data.pix);
            setTransactionId(result.data.transactionId);
            setPaymentStep('pix');
        } else {
            toast({
                variant: "destructive",
                title: "Erro ao gerar pagamento",
                description: result.error || "Não foi possível gerar o QR Code do Pix. Tente novamente.",
            });
        }
    } catch (error: any) {
         toast({
            variant: "destructive",
            title: "Erro inesperado",
            description: error.message || "Ocorreu um erro. Por favor, tente novamente mais tarde.",
        });
    } finally {
        setIsLoading(false);
    }
  };

  if (paymentStep === 'success') {
    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-background">
            <Card className="w-full max-w-md text-center bg-card p-8 shadow-2xl rounded-xl">
                <CardContent className="pt-6">
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <CircleCheck className="h-20 w-20 text-green-500" />
                        <h2 className="text-2xl font-bold text-gray-800">Pedido Confirmado!</h2>
                        <p className="text-gray-600">
                            Obrigado pela sua confiança! Enviamos todos os detalhes do seu pedido para o seu e-mail. O código de rastreio será enviado em até 24 horas.
                        </p>
                        <Link href="/promo" passHref>
                            <Button variant="link" className="mt-4 text-base">Voltar para a página inicial</Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
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
        <div className="flex flex-col lg:flex-row items-start justify-center flex-1 p-4 md:p-8">
            <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
                
                {/* Left Column */}
                <div className="flex flex-col gap-8 text-foreground">
                <div className="relative">
                    <Image
                        src="https://informaparaiba.com.br/wp-content/uploads/2025/10/unnamed-13-scaled.jpg"
                        alt="Canudos de teste de metanol"
                        width={600}
                        height={600}
                        className="rounded-lg object-cover w-full shadow-2xl"
                        data-ai-hint="methanol detector straw"
                    />
                </div>
                
                <div className="space-y-6">
                        <div className="p-4 bg-red-100 border border-red-200 rounded-lg">
                            <h3 className="font-bold text-lg text-red-800">Alerta de Saúde Pública</h3>
                            <p className="text-red-700">Médica alerta: bebidas contaminadas com metanol podem causar cegueira. Teste rápido e seguro em casa.</p>
                        </div>
                        <div>
                            <Badge className="text-base bg-[#FF6B00] text-white">GRÁTIS — Pague apenas o frete</Badge>
                            <h1 className="text-4xl font-bold mt-2 text-gray-900">Detecte Metanol no Primeiro Gole</h1>
                            <ul className="mt-4 space-y-2 list-disc list-inside text-lg text-gray-700">
                                <li>Resultado em 10 segundos</li>
                                <li>Uso fácil — sem laboratório</li>
                                <li>Protege sua visão e sua vida</li>
                            </ul>
                        </div>
                </div>
                
                <Accordion type="single" collapsible className="w-full text-foreground">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>É realmente grátis?</AccordionTrigger>
                        <AccordionContent>Sim. Você recebe 1 canudo grátis, paga apenas o frete indicado no checkout.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Quanto tempo para chegar?</AccordionTrigger>
                        <AccordionContent>1–3 dias úteis após confirmação do frete.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Como usar?</AccordionTrigger>
                        <AccordionContent>Encoste o canudo na bebida, aguarde 10s e compare com a escala de cor inclusa.</AccordionContent>
                    </AccordionItem>
                    </Accordion>
                    
                    <p className="text-xs text-gray-500">
                    Este teste é um produto auxiliar de prevenção. Não substitui atendimento médico. Em caso de ingestão acidental de álcool contaminado, procure atendimento médico imediatamente.
                    </p>
                </div>

                {/* Right Column */}
                <div className="w-full">
                <div className="sticky top-8 space-y-6">
                    <Card className="bg-card text-card-foreground">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">Complete seu pedido</CardTitle>
                            {showFreebieAlert && (
                                <div className="p-3 bg-green-100 border-l-4 border-green-500 rounded-r-lg">
                                    <p className="text-green-800 font-semibold text-sm">Parabéns! Você ganhou 1 SafeSip. Pague apenas o frete.</p>
                                </div>
                            )}
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between border-b pb-2">
                                    <div className="flex items-center gap-3">
                                        <Image src="https://i.ibb.co/V4nMcjZ/SAFESIP.png" width={40} height={40} alt="SafeSip" className="rounded object-cover" />
                                        <span className="font-medium">Canudo Detector de Metanol — SafeSip</span>
                                    </div>
                                    <span className="font-bold">R$ {productPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Custo do frete</span>
                                    <span className="font-bold">{shippingCost !== null ? `R$ ${shippingCost.toFixed(2)}` : 'R$ --,--'}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-card text-card-foreground">
                        <CardContent className="pt-6">
                        {paymentStep === 'form' ? (
                        <form onSubmit={handlePayment} className="space-y-6">
                            <div>
                            <Label htmlFor="name">Nome Completo</Label>
                            <Input id="name" name="name" placeholder="Seu nome completo" required />
                            </div>
                            <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" name="email" placeholder="seu@email.com" required />
                            </div>
                            <div>
                            <Label htmlFor="zip">CEP</Label>
                            <div className="flex items-start gap-4">
                                <Input id="zip" placeholder="00000-000" value={cep} onChange={handleCepChange} maxLength={8} />
                                <Button type="button" onClick={handleCalculateShipping} disabled={isLoading}>
                                {isLoading && cep.length === 8 ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Truck className="mr-2 h-4 w-4" />} Calcular frete
                                </Button>
                            </div>
                            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                            {shippingCost !== null && (
                                <div className="mt-2 text-sm text-gray-600">{address.street}, {address.city} - {address.state}</div>
                            )}
                            </div>
                            <div>
                            <Label htmlFor="address-street">Endereço</Label>
                            <Input id="address-street" placeholder="Rua, avenida..." value={address.street} onChange={e => setAddress({...address, street: e.target.value})} required/>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-1">
                                <Label htmlFor="address-number">Número</Label>
                                <Input id="address-number" name="address-number" placeholder="Nº" required/>
                            </div>
                            <div className="col-span-2">
                                <Label htmlFor="address-complement">Complemento</Label>
                                <Input id="address-complement" name="address-complement" placeholder="Apto, bloco, etc. (opcional)" />
                            </div>
                            </div>
                            
                            <Button type="submit" size="lg" className="w-full text-lg font-bold text-white" style={{ backgroundColor: '#FF6B00' }} disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Garanta já — Pague só o frete
                            </Button>
                            <p className="text-center text-sm text-muted-foreground">Entrega estimada: 1–3 dias úteis. Pedido sujeito à disponibilidade do lote.</p>
                        </form>
                        ) : (
                            <div className="flex flex-col items-center gap-4 text-center">
                            <h3 className="text-xl font-bold">Pague com Pix para finalizar</h3>
                            <p className="text-sm text-muted-foreground">Escaneie o QR Code ou copie o código. O pedido será confirmado automaticamente após o pagamento.</p>
                                {pixData && shippingCost !== null && (
                                <>
                                    <Image
                                        src={`data:image/png;base64,${pixData.qrcode_base64}`}
                                        alt="QR Code Pix"
                                        width={250}
                                        height={250}
                                        className="rounded-md border p-1"
                                    />
                                    <div className="text-center">
                                        <p className="text-sm text-muted-foreground">Valor total:</p>
                                        <p className="text-2xl font-bold">{`R$ ${(productPrice + shippingCost).toFixed(2)}`}</p>
                                    </div>
                                </>
                                )}
                                <p className="text-sm text-muted-foreground">Ou use o código copia e cola:</p>
                                <div className="w-full flex gap-2">
                                    <Input readOnly value={pixData?.code || ''} className="text-xs bg-gray-100"/>
                                    <Button type="button" size="icon" variant="outline" onClick={handleCopyPixCode}>
                                        <Copy className="h-4 w-4"/>
                                    </Button>
                                </div>
                                <div className='flex flex-col items-center justify-center gap-2 pt-2'>
                                <Loader2 className="h-4 w-4 animate-spin"/>
                                <p className='text-sm text-muted-foreground'>Aguardando pagamento...</p>
                                </div>
                                <Button
                                    onClick={handleManualCheck}
                                    disabled={isLoading}
                                    variant="outline"
                                    className="mt-4"
                                >
                                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                    Já paguei, confirmar pedido
                                </Button>
                                <Button variant="link" onClick={() => setPaymentStep('form')}>Voltar e editar dados</Button>
                            </div>
                        )}
                        </CardContent>
                    </Card>

                    <div className="space-y-4 text-foreground">
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="h-6 w-6 text-green-500" />
                            <p><b>Garantia 7 dias</b> — devolução do frete se não receber.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Microscope className="h-6 w-6 text-blue-500" />
                            <p><b>Testado por especialistas</b> — resultado confiável.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <PackageCheck className="h-6 w-6 text-yellow-500" />
                            <p><b>Envio rastreável.</b></p>
                        </div>
                    </div>
                    <Link href="/promo" passHref>
                        <Button variant="link" className='text-gray-600'>Voltar</Button>
                    </Link>
                </div>
                </div>
            </div>
        </div>
    </div>
  );
}
