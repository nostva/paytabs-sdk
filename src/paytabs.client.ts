import type { AxiosInstance, AxiosResponse } from 'axios';
import axios from 'axios';
import type { PayTabsConfig, Region } from './types';

export const API_URLS: { [key in Region]: string } = {
  EGY: 'https://secure-egypt.paytabs.com',
  ARE: 'https://secure.paytabs.com',
  JOR: 'https://secure-jordan.paytabs.com',
  OMN: 'https://secure-oman.paytabs.com',
  SAU: 'https://secure.paytabs.sa',
  GLOBAL: 'https://secure-global.paytabs.com',
};

export class PayTabsClient {
  private axios: AxiosInstance;

  constructor(private config: PayTabsConfig) {
    this.axios = axios.create({
      baseURL: API_URLS[config.region],
      timeout: config.timeout || 30000,
      headers: {
        'Content-Type': 'application/json',
        Authorization: config.serverKey,
      },
    });
  }

  async request<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axios.post(endpoint, {
        ...data,
        profile_id: this.config.profileId,
      });
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
