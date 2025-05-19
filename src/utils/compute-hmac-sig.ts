import crypto from 'node:crypto';

export function normalizePayload(payload: { [key: string]: any }) {
  const filteredPayload = Object.fromEntries(
    Object.entries(payload).filter(
      ([_, value]) => value !== null && value !== undefined && value !== '',
    ),
  );

  const sortedPayload = Object.fromEntries(
    Object.entries(filteredPayload).sort(([keyA], [keyB]) => keyA.localeCompare(keyB)),
  );

  const queryString = Object.entries(sortedPayload)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&');

  return queryString;
}

export function computeHMACSignature(payload: any, key: string): string {
  const str_payload = typeof payload === 'object' ? JSON.stringify(payload) : payload;
  const hmac = crypto.createHmac('sha256', key);
  hmac.update(str_payload);
  return hmac.digest('hex');
}
