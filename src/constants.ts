import type { Region } from './types';

/**
 * Base URLs for different PayTabs regions.
 */
export const API_URLS: { [key in Region]: string } = {
  EGY: 'https://secure-egypt.paytabs.com',
  ARE: 'https://secure.paytabs.com',
  JOR: 'https://secure-jordan.paytabs.com',
  OMN: 'https://secure-oman.paytabs.com',
  SAU: 'https://secure.paytabs.sa',
  GLOBAL: 'https://secure-global.paytabs.com',
};
