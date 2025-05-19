import { describe, expect, it } from 'vitest';
import PayTabs from '../paytabs.core';

describe('PayTabs', () => {
  it('should verify redirect response with valid signature', () => {
    const paytabs = PayTabs({
      profileId: 'test_profile',
      serverKey: 'test_key',
      region: 'EGY',
    });

    const payload = {
      cart_id: 'order123',
      cart_description: 'Order #123',
      signature: '2f94e04e23fe0b72d147da37cf3e9dde331f1d2ce325c5f9d939cdd0ac1d45e1',
    };

    expect(paytabs.verifyRedirectResponse(payload)).toBe(true);
  });
});
