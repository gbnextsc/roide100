'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Truck, ShoppingCart, Lock, QrCode, Copy, ShieldCheck, Microscope, PackageCheck, Star, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { generatePixPayment } from '@/app/actions';

export default function CheckoutPage() {
  const [cep, setCep] = useState('');
  const [shippingCost, setShippingCost] = useState<number | null>(null);
  const [address, setAddress] = useState({ street: '', city: '', state: '', number: '', complement: '' });
  const [error, setError] = useState<string | null>(null);
  const [showFreebieAlert, setShowFreebieAlert] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'form' | 'pix' | 'success'>('form');
  const [pixData, setPixData] = useState<{ code: string; qrcode_base64: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFreebieAlert(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

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
    const amountInCents = Math.round(shippingCost * 100);

    try {
        const result = await generatePixPayment(buyer, amountInCents, fullAddress);

        if (result.success && result.data) {
            setPixData(result.data);
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
        <div className="flex items-center justify-center min-h-screen p-4" style={{ backgroundColor: '#0D1B2A' }}>
            <Card className="w-full max-w-md text-center bg-white p-8">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-green-600">Pedido confirmado!</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Obrigado pela sua compra. Confira seu email, enviamos os detalhes do seu pedido. O código de rastreio será enviado em até 24h.</p>
                     <Link href="/" passHref>
                        <Button variant="link" className="mt-4">Voltar para a página inicial</Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row items-start justify-center min-h-screen p-4 md:p-8" style={{ backgroundColor: '#0D1B2A' }}>
      <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
        
        {/* Left Column */}
        <div className="flex flex-col gap-8 text-white">
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
                <div className="p-4 bg-red-800/50 border border-red-500/50 rounded-lg">
                    <h3 className="font-bold text-lg text-red-300">Alerta de Saúde Pública</h3>
                    <p className="text-red-100">Médica alerta: bebidas contaminadas com metanol podem causar cegueira. Teste rápido e seguro em casa.</p>
                </div>
                <div>
                    <Badge className="text-base bg-[#FF6B00] text-white">GRÁTIS — Pague apenas o frete</Badge>
                    <h1 className="text-4xl font-bold mt-2">Detecte Metanol no Primeiro Gole</h1>
                    <ul className="mt-4 space-y-2 list-disc list-inside text-lg">
                        <li>Resultado em 10 segundos</li>
                        <li>Uso fácil — sem laboratório</li>
                        <li>Protege sua visão e sua vida</li>
                    </ul>
                </div>
           </div>

           <div className="space-y-4">
                <Card className="bg-white/10 border-white/20 text-white">
                    <CardHeader className="flex-row items-center gap-4">
                        <Image src="https://i.pravatar.cc/150?u=mariana" width={50} height={50} alt="Mariana" className="rounded-full" />
                        <div>
                             <CardTitle className="text-base">“Usei antes de sair pra uma festa — me salvou. Recomendo.”</CardTitle>
                             <CardDescription className="text-white/80">Mariana, 34, SP</CardDescription>
                        </div>
                    </CardHeader>
                </Card>
           </div>
           
           <Accordion type="single" collapsible className="w-full text-white">
              <AccordionItem value="item-1">
                <AccordionTrigger>É realmente grátis?</AccordionTrigger>
                <AccordionContent>Sim. Você recebe 1 canudo grátis, paga apenas o frete indicado no checkout.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Quanto tempo para chegar?</AccordionTrigger>
                <AccordionContent>3–7 dias úteis após confirmação do frete.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Como usar?</AccordionTrigger>
                <AccordionContent>Encoste o canudo na bebida, aguarde 10s e compare com a escala de cor inclusa.</AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <p className="text-xs text-white/50">
               Este teste é um produto auxiliar de prevenção. Não substitui atendimento médico. Em caso de ingestão acidental de álcool contaminado, procure atendimento médico imediatamente.
            </p>
        </div>

        {/* Right Column */}
        <div className="w-full">
          <div className="sticky top-8 space-y-6">
            <Card className="bg-white text-gray-800">
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
                                <Image src="https://informaparaiba.com.br/wp-content/uploads/2025/10/unnamed-13-scaled.jpg" width={40} height={40} alt="SafeSip" className="rounded object-cover" />
                                <span className="font-medium">Canudo Detector de Metanol — SafeSip</span>
                            </div>
                            <span className="font-bold">R$ 0,00</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Custo do frete</span>
                            <span className="font-bold">{shippingCost !== null ? `R$ ${shippingCost.toFixed(2)}` : 'R$ --,--'}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-white text-gray-800">
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
                    <p className="text-center text-sm text-muted-foreground">Entrega estimada: 3–7 dias úteis. Pedido sujeito à disponibilidade do lote.</p>
                  </form>
                 ) : (
                    <div className="flex flex-col items-center gap-4 text-center">
                       <h3 className="text-xl font-bold">Pague com Pix para finalizar</h3>
                       <p className="text-sm text-muted-foreground">Escaneie o QR Code com seu app de pagamentos:</p>
                        {pixData && (
                            <Image
                                src={`data:image/png;base64,${pixData.qrcode_base64}`}
                                alt="QR Code Pix"
                                width={250}
                                height={250}
                                className="rounded-md border p-1"
                            />
                        )}
                        <p className="text-sm text-muted-foreground">Ou use o código copia e cola:</p>
                        <div className="w-full flex gap-2">
                            <Input readOnly value={pixData?.code || ''} className="text-xs bg-gray-100"/>
                            <Button type="button" size="icon" variant="outline" onClick={handleCopyPixCode}>
                                <Copy className="h-4 w-4"/>
                            </Button>
                        </div>
                        <Button onClick={() => setPaymentStep('success')} className="w-full bg-green-600 hover:bg-green-700">Já paguei, confirmar pedido</Button>
                        <Button variant="link" onClick={() => setPaymentStep('form')}>Voltar e editar dados</Button>
                    </div>
                 )}
                </CardContent>
            </Card>

             <div className="space-y-4 text-white">
                <div className="flex items-center gap-3">
                    <ShieldCheck className="h-6 w-6 text-green-400" />
                    <p><b>Garantia 7 dias</b> — devolução do frete se não receber.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Microscope className="h-6 w-6 text-blue-400" />
                    <p><b>Testado por especialistas</b> — resultado confiável.</p>
                </div>
                <div className="flex items-center gap-3">
                    <PackageCheck className="h-6 w-6 text-yellow-400" />
                    <p><b>Envio rastreável.</b></p>
                </div>
             </div>
             <Link href="/promo" passHref>
                <Button variant="link" style={{ color: '#FFFFFF' }}>Voltar</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
