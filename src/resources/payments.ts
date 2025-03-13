import type { PayTabsClient } from '../paytabs.client';
import type {
  PayTabsPaymentRequest,
  PayTabsPaymentResponse,
  PayTabsPaymentTransaction,
} from '../types';

export class Payments {
  constructor(private client: InstanceType<typeof PayTabsClient>) {}

  async create(
    paymentData: Omit<PayTabsPaymentRequest, 'tran_type' | 'profile_id'>,
  ): Promise<PayTabsPaymentResponse> {
    return this.client.request('/payment/request', {
      ...paymentData,
      tran_type: 'sale',
    });
  }

  async authorize(
    paymentData: Omit<PayTabsPaymentRequest, 'tran_type' | 'profile_id'>,
  ): Promise<PayTabsPaymentResponse> {
    return this.client.request('/payment/request', {
      ...paymentData,
      tran_type: 'auth',
    });
  }

  async capture(
    paymentData: Partial<Omit<PayTabsPaymentRequest, 'tran_type' | 'profile_id'>> & {
      tran_ref: string;
    },
  ): Promise<PayTabsPaymentTransaction> {
    return this.client.request('/payment/request', {
      ...paymentData,
      tran_type: 'capture',
    });
  }

  async refund(
    paymentData: Partial<Omit<PayTabsPaymentRequest, 'tran_type' | 'profile_id'>> & {
      tran_ref: string;
    },
  ): Promise<PayTabsPaymentTransaction> {
    return this.client.request('/payment/request', {
      ...paymentData,
      tran_type: 'refund',
    });
  }

  async retrieve(tran_ref: string): Promise<PayTabsPaymentTransaction> {
    return this.client.request('/payment/query', {
      tran_ref,
    });
  }
}
