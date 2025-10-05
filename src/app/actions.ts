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

  const externalId = `safesip-${new Date().getTime()}`;

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

  try {
    const response = await fetch('https://api.realtechdev.com.br/v1/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.BUCKPAY_API_TOKEN}`,
        'User-Agent': `${process.env.BUCKPAY_USER_AGENT}`,
      },
      body: JSON.stringify(body),
      cache: 'no-store'
    });

    const result: PixResponse = await response.json();

    if (!response.ok || result.error) {
      console.error('BuckPay API Error:', result.error);
      // Extrai e formata a mensagem de erro para ser mais útil.
      let errorMessage = result.error?.message || 'Falha ao gerar cobrança Pix.';
      if (result.error?.detail) {
          const details = typeof result.error.detail === 'string' 
              ? result.error.detail 
              : Object.entries(result.error.detail).map(([key, value]) => `${key}: ${value}`).join(', ');
          errorMessage += ` (${details})`;
      }
      return { success: false, data: null, error: errorMessage };
    }

    if (result.data?.pix) {
      return { success: true, data: result.data.pix, error: null };
    }

    return { success: false, data: null, error: 'Resposta inválida da API de pagamento.' };
  } catch (error: any) {
    console.error('Network or unexpected error:', error);
    return { success: false, data: null, error: error.message || 'Ocorreu um erro de comunicação. Tente novamente.' };
  }
}
