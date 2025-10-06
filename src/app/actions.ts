
'use server';

import { z } from 'zod';

const BuyerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

type PixData = {
  code: string;
  qrcode_base64: string;
}

type BuckPayError = {
  message: string;
  detail?: { [key: string]: any } | string;
};

type PixResponse = {
  data?: {
    id: string;
    status: string;
    pix: PixData;
  };
  error?: BuckPayError;
};

export async function generatePixPayment(
  buyer: z.infer<typeof BuyerSchema>,
  amountInCents: number,
  address: { street: string; city: string; state: string; zip: string; number: string; complement?: string }
): Promise<{ success: boolean; data: PixData | null; error: string | null }> {

  console.log('--- Iniciando generatePixPayment ---');
  console.log('Verificando variáveis de ambiente:');
  console.log('BUCKPAY_API_TOKEN existe:', !!process.env.BUCKPAY_API_TOKEN);
  console.log('BUCKPAY_USER_AGENT existe:', !!process.env.BUCKPAY_USER_AGENT);
  
  const externalId = `safesip-${new Date().getTime()}`;
  const apiKey = process.env.BUCKPAY_API_TOKEN;
  const userAgent = process.env.BUCKPAY_USER_AGENT;

  const body = {
    external_id: externalId,
    payment_method: 'pix',
    amount: amountInCents,
    buyer: {
      name: buyer.name,
      email: buyer.email,
    },
    product: {
      id: 'safesip-freebie',
      name: 'Canudo Detector de Metanol - SafeSip',
    },
    shipping: {
        zipcode: address.zip,
        street: address.street,
        number: address.number,
        complement: address.complement,
        city: address.city,
        state: address.state,
        country: 'BR'
    }
  };

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
    'User-Agent': userAgent || 'SafeSip/1.0',
    'api_key': apiKey || '',
  };

  console.log('Corpo da Requisição (Body):', JSON.stringify(body, null, 2));
  console.log('Cabeçalhos da Requisição (Headers):', headers);

  try {
    const response = await fetch('https://api.realtechdev.com.br/v1/transactions', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
      cache: 'no-store'
    });
    
    console.log('Status da Resposta:', response.status, response.statusText);

    const result: PixResponse = await response.json();
    console.log('Resposta da API BuckPay:', JSON.stringify(result, null, 2));

    if (!response.ok || result.error) {
      console.error('BuckPay API Error Details:', result.error);
      let errorMessage = result.error?.message || `Falha na API: ${response.statusText}`;
      if (result.error?.detail) {
          const details = typeof result.error.detail === 'string' 
              ? result.error.detail 
              : Object.entries(result.error.detail).map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join(', ');
          errorMessage += ` (${details})`;
      }
      return { success: false, data: null, error: errorMessage };
    }

    if (result.data?.pix) {
      console.log('Pagamento PIX gerado com sucesso.');
      return { success: true, data: result.data.pix, error: null };
    }

    return { success: false, data: null, error: 'Resposta inválida da API de pagamento.' };
  } catch (error: any) {
    console.error('--- Erro na chamada Fetch ---');
    console.error('Erro de Rede ou Inesperado:', error);
    return { success: false, data: null, error: error.message || 'Ocorreu um erro de comunicação. Tente novamente.' };
  }
}
