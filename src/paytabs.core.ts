import assert from 'node:assert';
import { PayTabsClient } from './paytabs.client';
import { Payments } from './resources/payments';
import type { PayTabsConfig } from './types';
import { computeHMACSignature, normalizePayload } from './utils/compute-hmac-sig';

class PayTabs {
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
    if (!PayTabs.instance) {
      PayTabs.instance = new PayTabs(config);
    }

    return PayTabs.instance;
  }

  /**
   * This function verifies the HMAC signature for the redirect request body.
   * It compares the computed SHA-256 hash of the payload with the provided signature.
   */
  verifyRedirectResponse(payload: { [key: string]: any }) {
    const { signature, ...rest } = payload;
    assert(signature, 'signature property is undefined');
    return computeHMACSignature(normalizePayload(rest), this.serverKey) === signature;
  }
}

export default PayTabs.createPayTabs;
