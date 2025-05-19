import crypto from 'node:crypto';

export function computeHMACSignature(payload: any, key: string): string {
  const str_payload = typeof payload === 'object' ? JSON.stringify(payload) : payload;
  const hmac = crypto.createHmac('sha256', key);
  hmac.update(str_payload);
  return hmac.digest('hex');
}
