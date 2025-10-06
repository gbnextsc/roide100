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

type TransactionStatusResponse = {
    data?: {
        status: string;
    },
    error?: BuckPayError
}

export async function generatePixPayment(
  buyer: z.infer<typeof BuyerSchema>,
  amountInCents: number,
  address: { street: string; city: string; state: string; zip: string; number: string; complement?: string }
): Promise<{ success: boolean; data: { pix: PixData, transactionId: string } | null; error: string | null }> {

  console.log('--- Iniciando generatePixPayment ---');
  
  const externalId = `safesip-${new Date().getTime()}`;
  const apiKey = process.env.BUCKPAY_API_TOKEN || process.env.NEXT_PUBLIC_BUCKPAY_SECRET_KEY;

  const body = {
    external_id: externalId,
    payment_method: 'pix',
    amount: amountInCents,
    buyer: {
      name: buyer.name,
      email: buyer.email,
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
    'User-Agent': 'Buckpay API',
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
    
    console.log('Status da Resposta da Geração PIX:', response.status, response.statusText);

    const result: PixResponse = await response.json();
    console.log('Resposta da API BuckPay (Geração PIX):', JSON.stringify(result, null, 2));

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

    if (result.data?.pix && result.data.id) {
      console.log('Pagamento PIX gerado com sucesso.');
      return { success: true, data: { pix: result.data.pix, transactionId: result.data.id }, error: null };
    }

    return { success: false, data: null, error: 'Resposta inválida da API de pagamento.' };
  } catch (error: any) {
    console.error('--- Erro na chamada Fetch (Geração PIX) ---');
    console.error('Erro de Rede ou Inesperado:', error);
    return { success: false, data: null, error: error.message || 'Ocorreu um erro de comunicação. Tente novamente.' };
  }
}


export async function checkPixStatus(transactionId: string): Promise<{ success: boolean; status?: string; error?: string }> {
  console.log(`--- Verificando status para transactionId: ${transactionId} ---`);
  const apiKey = process.env.BUCKPAY_API_TOKEN || process.env.NEXT_PUBLIC_BUCKPAY_SECRET_KEY;
  const headers = {
    'Authorization': `Bearer ${apiKey}`,
    'User-Agent': 'Buckpay API',
  };

  console.log('Cabeçalhos da Requisição (Verificação):', headers);

  try {
    const response = await fetch(`https://api.realtechdev.com.br/v1/transactions/${transactionId}`, {
      method: 'GET',
      headers: headers,
      cache: 'no-store'
    });
    
    console.log('Status da Resposta (Verificação):', response.status, response.statusText);

    const result: TransactionStatusResponse = await response.json();
    console.log('Resposta da API BuckPay (Verificação):', JSON.stringify(result, null, 2));
    
    if (!response.ok || result.error) {
        let errorMessage = result.error?.message || `API Error: ${response.statusText}`;
        console.error('Erro ao verificar status:', errorMessage);
        return { success: false, error: errorMessage };
    }

    const currentStatus = result.data?.status;
    console.log(`Status atual retornado: ${currentStatus}`);
    
    return { success: true, status: currentStatus };

  } catch (error: any) {
    console.error('--- Erro na chamada Fetch (Verificação) ---', error);
    return { success: false, error: error.message || 'Communication error.' };
  }
}
