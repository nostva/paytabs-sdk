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
