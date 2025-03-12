import { describe, it, expect } from 'vitest';
import { PayTabs } from '../lib/paytabs';

describe('PayTabs', () => {
  it('should create a PayTabs instance', () => {
    const paytabs = new PayTabs({
      profileId: 'test_profile',
      serverKey: 'test_key',
      region: 'EGY',
    });
    expect(paytabs).toBeInstanceOf(PayTabs);
  });
});
