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

type PixResponse = {
  data?: {
    id: string;
    status: string;
    pix: PixData;
  };
  error?: {
    message: string;
    detail: any;
  };
};

export async function generatePixPayment(
  buyer: z.infer<typeof BuyerSchema>,
  amountInCents: number
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
    });

    const result: PixResponse = await response.json();

    if (!response.ok || result.error) {
      console.error('BuckPay API Error:', result.error);
      const errorMessage = result.error?.message || 'Falha ao gerar cobrança Pix.';
      return { success: false, data: null, error: errorMessage };
    }

    if (result.data?.pix) {
      return { success: true, data: result.data.pix, error: null };
    }

    return { success: false, data: null, error: 'Resposta inválida da API de pagamento.' };
  } catch (error) {
    console.error('Network or unexpected error:', error);
    return { success: false, data: null, error: 'Ocorreu um erro de comunicação. Tente novamente.' };
  }
}
