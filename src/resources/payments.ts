import type { PayTabsClient } from '../paytabs.client';
import type { PaymentRequest, TransactionDetailsResponse } from '../types';

export class Payments {
  constructor(private client: InstanceType<typeof PayTabsClient>) {}

  async create(
    paymentData: Omit<PaymentRequest, 'tran_type' | 'profile_id'>,
  ): Promise<PaymentResponse> {
    return this.client.request('/payment/request', {
      ...paymentData,
      tran_type: 'sale',
    });
  }

  async authorize(
    paymentData: Omit<PaymentRequest, 'tran_type' | 'profile_id'>,
  ): Promise<PaymentResponse> {
    return this.client.request('/payment/request', {
      ...paymentData,
      tran_type: 'auth',
    });
  }

  async capture(
    paymentData: Partial<Omit<PaymentRequest, 'tran_type' | 'profile_id'>> & {
      tran_ref: string;
    },
  ): Promise<PaymentResponse> {
    return this.client.request('/payment/request', {
      ...paymentData,
      tran_type: 'capture',
    });
  }

  async refund(
    paymentData: Partial<Omit<PaymentRequest, 'tran_type' | 'profile_id'>> & {
      tran_ref: string;
    },
  ): Promise<PaymentResponse> {
    return this.client.request('/payment/request', {
      ...paymentData,
      tran_type: 'refund',
    });
  }

  async retrieve(tran_ref: string): Promise<TransactionDetailsResponse> {
    return this.client.request('/payment/query', {
      tran_ref,
    });
  }
}
