
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function CheckoutPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Checkout</CardTitle>
          </CardHeader>
          <CardContent>
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
                <h3 className="text-lg font-semibold mb-4">Endereço de Entrega</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="address">Endereço</Label>
                    <Input id="address" placeholder="Rua, número, bairro" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">Cidade</Label>
                      <Input id="city" placeholder="Sua cidade" />
                    </div>
                    <div>
                      <Label htmlFor="state">Estado</Label>
                      <Input id="state" placeholder="UF" />
                    </div>
                    <div>
                      <Label htmlFor="zip">CEP</Label>
                      <Input id="zip" placeholder="00000-000" />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Pagamento</h3>
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

              <Button type="submit" className="w-full" size="lg">
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
  );
}
