import type { AxiosInstance, AxiosResponse } from 'axios';
import axios from 'axios';
import type {
  PaymentRequest,
  PaymentResponse,
  PayTabsConfig,
  TransactionDetailsResponse,
} from './types';
import { API_URLS } from './constants';

/**
 * PayTabs SDK for Node.js
 * A TypeScript SDK to simplify integration with PayTabs payment gateway
 */
export class PayTabs {
  private client: AxiosInstance;
  private config: PayTabsConfig;

  constructor(config: PayTabsConfig) {
    this.config = {
      ...config,
      timeout: config.timeout || 30000,
    };

    this.client = axios.create({
      baseURL: API_URLS[this.config.region],
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.config.serverKey,
      },
    });
  }

  public async createPayment(
    paymentData: Omit<PaymentRequest, 'tran_type' | 'profile_id'>,
  ): Promise<PaymentResponse> {
    const data: PaymentRequest = {
      ...paymentData,
      tran_type: 'sale',
      profile_id: this.config.profileId,
    };

    return this.request<PaymentResponse>('/payment/request', data);
  }

  public async authorizePayment(
    paymentData: Omit<PaymentRequest, 'tran_type' | 'profile_id'>,
  ): Promise<PaymentResponse> {
    const data: PaymentRequest = {
      ...paymentData,
      tran_type: 'auth',
      profile_id: this.config.profileId,
    };

    return this.request<PaymentResponse>('/payment/request', data);
  }

  public async capturePayment(
    paymentData: Partial<Omit<PaymentRequest, 'tran_type' | 'profile_id'>> & {
      tran_ref: string;
    },
  ): Promise<PaymentResponse> {
    const data: Partial<PaymentRequest> = {
      ...paymentData,
      tran_type: 'capture',
      profile_id: this.config.profileId,
    };

    return this.request<PaymentResponse>('/payment/request', data);
  }

  public async refundPayment(
    paymentData: Partial<Omit<PaymentRequest, 'tran_type' | 'profile_id'>> & {
      tran_ref: string;
    },
  ): Promise<PaymentResponse> {
    const data: Partial<PaymentRequest> = {
      ...paymentData,
      tran_type: 'refund',
      profile_id: this.config.profileId,
    };

    return this.request<PaymentResponse>('/payment/request', data);
  }

  public async verifyPayment(args: {
    tran_ref: string;
  }): Promise<TransactionDetailsResponse> {
    return this.getPaymentDetails(args);
  }

  public async getPaymentDetails(args: {
    tran_ref: string;
  }): Promise<TransactionDetailsResponse> {
    const data = {
      profile_id: this.config.profileId,
      tran_ref: args.tran_ref,
    };

    return this.request<TransactionDetailsResponse>('/payment/query', data);
  }

  private async request<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.post(endpoint, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          `PayTabs API error: ${error.response.status} - ${JSON.stringify(error.response.data)}`,
        );
      }
      throw new Error(`PayTabs request failed ${error}`);
    }
  }
}

export default PayTabs;
