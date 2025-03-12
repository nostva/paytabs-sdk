import { PayTabsClient } from './paytabs.client';
import { Payments } from './resources/payments';
import type { PayTabsConfig } from './types';
import { computeHMACSignature } from './utils/compute-hmac-sig';

export class PayTabs {
  private client: PayTabsClient;
  private serverKey: string;
  public payments: Payments;

  private static instance: PayTabs | null = null;

  private constructor(config: PayTabsConfig) {
    this.serverKey = config.serverKey;
    this.client = new PayTabsClient(config);
    this.payments = new Payments(this.client);
  }

  public static createPayTabs(config: PayTabsConfig): PayTabs {
    // If instance doesn't exist, create it
    if (!PayTabs.instance) {
      PayTabs.instance = new PayTabs(config);
    }

    return PayTabs.instance;
  }

  /**
   * This function verifies the HMAC signature for the redirect request body.
   * It compares the computed SHA-256 hash of the payload with the provided signature.
   */
  verifyRedirectResponse(payload: any, signature: string) {
    return computeHMACSignature(payload, this.serverKey) === signature;
  }
}

export default PayTabs.createPayTabs;
