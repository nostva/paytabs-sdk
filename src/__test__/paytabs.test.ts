import { describe, it, expect } from 'vitest';
import PayTabs from '../paytabs.core';

describe('PayTabs', () => {
  it('should verify redirect response with valid signature', () => {
    const paytabs = PayTabs({
      profileId: 'test_profile',
      serverKey: 'test_key',
      region: 'EGY',
    });

    const payload = { cart_id: 'order123', cart_description: 'Order #123' };
    const signature = '5cc1fef661c4e00002851c7b5873d5f419a1e71724d762e430375b385b0260d1';

    expect(paytabs.verifyRedirectResponse(payload, signature)).toBe(true);
  });
});
