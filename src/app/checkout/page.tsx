'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Truck, ShoppingCart, Lock } from 'lucide-react';
import Image from 'next/image';

export default function CheckoutPage() {
  const [cep, setCep] = useState('');
  const [shippingCost, setShippingCost] = useState<number | null>(null);
  const [address, setAddress] = useState({ street: '', city: '', state: '' });
  const [error, setError] = useState<string | null>(null);
  const [showFreebieAlert, setShowFreebieAlert] = useState(false);

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
      setError('CEP inválido. Digite 8 números.');
      setShippingCost(null);
      return;
    }
    setError(null);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.ok) {
        throw new Error('Não foi possível buscar o CEP.');
      }
      const data = await response.json();
      if (data.erro) {
        setError('CEP não encontrado.');
        setShippingCost(null);
        setAddress({ street: '', city: '', state: '' });
      } else {
        setAddress({ street: data.logradouro, city: data.localidade, state: data.uf });
        // Lógica de cálculo de frete (valor fixo para demonstração)
        const calculatedShipping = parseFloat((Math.random() * 20 + 10).toFixed(2));
        setShippingCost(calculatedShipping);
      }
    } catch (e) {
      setError('Ocorreu um erro ao calcular o frete.');
      setShippingCost(null);
    }
  };


  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
        <div className="flex flex-col justify-center">
            <div className="bg-white p-8 rounded-xl shadow-lg">
                 <Image
                    src="https://storage.googleapis.com/gemini-studio-main-images/343c9842-8356-4299-813c-35715560b48c.jpeg"
                    alt="Canudo Detector de Metanol SafeSip"
                    width={500}
                    height={500}
                    className="rounded-lg object-cover w-full"
                    data-ai-hint="methanol detector straw"
                />
                 <div className="mt-6">
                    <h2 className="text-2xl font-bold">Canudo Detector de Metanol SafeSip</h2>
                    <p className="text-muted-foreground mt-2">Sua segurança começa no primeiro gole. Detecte metanol em suas bebidas de forma rápida e segura.</p>
                    <Badge variant="secondary" className="mt-4 text-base">GRÁTIS - Pague apenas o frete</Badge>
                </div>
            </div>
        </div>
        <div className="w-full">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Complete seu Pedido</CardTitle>
            </CardHeader>
            <CardContent>
              {showFreebieAlert && (
                 <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-500 rounded-r-lg animate-in fade-in-50 slide-in-from-left-4 duration-500">
                    <p className="text-green-800 font-semibold">
                      Parabéns! Você ganhou um SafeSip. Cubra apenas o custo de envio e receba sua segurança em casa.
                    </p>
                  </div>
              )}
              <form className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Informações Pessoais</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input id="name" placeholder="Seu nome completo" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="seu@email.com" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Custo de Envio</h3>
                  <div className="flex items-start gap-4">
                    <div className="flex-grow">
                      <Label htmlFor="zip">CEP</Label>
                      <Input id="zip" placeholder="00000-000" value={cep} onChange={handleCepChange} maxLength={8} />
                    </div>
                    <Button type="button" onClick={handleCalculateShipping} className="mt-6">
                      <Truck className="mr-2 h-4 w-4" /> Calcular Frete
                    </Button>
                  </div>
                   {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                   {shippingCost !== null && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <p className="font-semibold text-blue-800">Custo do Frete: R$ {shippingCost.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">{address.street}, {address.city} - {address.state}</p>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Endereço de Entrega</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="address-street">Endereço</Label>
                      <Input id="address-street" placeholder="Rua, avenida..." value={address.street} onChange={e => setAddress({...address, street: e.target.value})} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="address-number">Número</Label>
                        <Input id="address-number" placeholder="Nº" />
                      </div>
                      <div className="col-span-2">
                         <Label htmlFor="address-complement">Complemento</Label>
                        <Input id="address-complement" placeholder="Apto, bloco, etc. (opcional)" />
                      </div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">Cidade</Label>
                          <Input id="city" placeholder="Sua cidade" value={address.city} onChange={e => setAddress({...address, city: e.target.value})} />
                        </div>
                        <div>
                          <Label htmlFor="state">Estado</Label>
                          <Input id="state" placeholder="UF" value={address.state} onChange={e => setAddress({...address, state: e.target.value})} />
                        </div>
                      </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    Pagamento Seguro <Lock className="ml-2 h-4 w-4 text-green-600" />
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="card-number">Número do Cartão</Label>
                      <Input id="card-number" placeholder="0000 0000 0000 0000" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry-date">Data de Validade</Label>
                        <Input id="expiry-date" placeholder="MM/AA" />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white" size="lg">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Finalizar Compra
                </Button>
              </form>
            </CardContent>
          </Card>
          <div className="mt-4 text-center">
            <Link href="/buy" passHref>
              <Button variant="link">Voltar</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
