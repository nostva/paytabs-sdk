/**
 * Transaction class categorizing different payment types.
 */
export type TransactionClass = 'ecom' | 'moto' | 'recurring';

/**
 * Supported regions for PayTabs.
 */
export type Region = 'ARE' | 'EGY' | 'SAU' | 'OMN' | 'JOR' | 'GLOBAL';

/**
 * Transaction status codes:
 * - `"A"` - Authorized
 * - `"H"` - Hold (Under review)
 * - `"P"` - Pending (Refunds)
 * - `"V"` - Voided
 * - `"E"` - Error
 * - `"D"` - Declined
 * - `"X"` - Expired
 */
export type TransactionStatus = 'A' | 'H' | 'P' | 'V' | 'E' | 'D' | 'X';

/**
 * Transaction types:
 * - `"sale"` - Direct charge.
 * - `"auth"` - Authorization hold.
 * - `"capture"` - Capture a previous auth.
 * - `"void"` - Cancel a previous auth.
 * - `"register"` - Verify card without charging.
 * - `"refund"` - Return money to the customer.
 */
export type TransactionType =
  | 'sale'
  | 'auth'
  | 'capture'
  | 'void'
  | 'register'
  | 'refund';

/**
 * Supported currency codes.
 */
export type CurrencyCode = 'AED' | 'EGP' | 'SAR' | 'OMR' | 'JOD' | 'US';

/**
 * Payment methods accepted by PayTabs.
 */
export type PaymentMthod =
  | 'creditcard'
  | 'amex'
  | 'mada'
  | 'urpay'
  | 'unionpay'
  | 'stcpay'
  | 'stcpayqr'
  | 'valu'
  | 'aman'
  | 'meezaqr'
  | 'omannet'
  | 'knet'
  | 'knetdebit'
  | 'knetcredit'
  | 'applepay'
  | 'samsungpay'
  | 'installment'
  | 'forsa'
  | 'halan'
  | 'tamara'
  | 'amaninstallments'
  | 'souhoola'
  | 'tabby'
  | 'touchpoints'
  | 'paypal'
  | 'sadad';

/**
 * PayTabs configuration settings.
 */
export interface PayTabsConfig {
  profileId: string;
  serverKey: string;
  region: Region;
  timeout?: number;
}

/**
 * Customer details including optional contact and address fields.
 */
export interface CustomerDetails {
  name: string;
  email: string;
  phone?: string;
  street1?: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
  ip?: string;
}

/**
 * Shipping details similar to customer details.
 */
export interface ShippingDetails {
  name?: string;
  email?: string;
  phone?: string;
  street1?: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
}

/**
 * Payment request payload for initiating a transaction.
 */
export interface PaymentRequest {
  /**
   * `profile_id` is the merchant profile ID you can get from your PayTabs dashboard.
   */
  profile_id: string;
  /**
   * `tran_type` is the identification of the type of the transaction such as sale, refund, void, etc.
   */
  tran_type: TransactionType;
  /**
   * tran_class is responsible to identify the class of a transaction such as ECommerce, Recurring, etc.
   */
  tran_class: TransactionClass;
  /**
   * `cart_id` allows merchants to assign a unique identifier to each payment and connect it to his cart or order identification
   */
  cart_id: string;
  /**
   * `cart_description` allows merchants to provide a detailed description of the items or services in the shopping cart.
   */
  cart_description?: string;
  /**
   * `cart_currency` parameter enables merchants to define the exact currency for each transaction.
   */
  cart_currency: CurrencyCode;
  /**
   * `cart_amount` parameter enables merchants to define the exact amount to be charged.
   */
  cart_amount: number;
  /**
   * `callback` URL is used for a server-to-server POST response that is sent (to a pre-defined HTTPS URL) with the full detailed transaction information
   * once the payment process has ended (whether the customer cancels, paid, or failed to pay).
   * It does not depend on the customer's actions;the response will be sent anyway.
   */
  callback?: string;
  /**
   * `return` URL is the URL that PayTabs will redirect customers to after they finish payment process (whether it's authenticated or not).
   * It will redirect customers with a POST response that is sent with the client/cardholder redirection through his browser containing
   * the basic transaction information once the payment process ends (whether the customer cancels, paid, or failed to pay).
   * It depends on the customer's actions, which means if the customer closes the browser right after the payment without waiting
   * to be redirected back to your system, you will not receive this response.
   */
  return?: string;
  /**
   * `tokenize` The tokenization format the generated token should follow.
   */
  tokenize?: number;
  /**
   * `hide_shipping` Indicates whether to hide shipping and billing information or not from the payment page.
   */
  hide_shipping?: boolean;
  /**
   * `customer_details` Indicates the customer details for this payment. If provided, the payment page will be prefilled with the provided data.
   */
  customer_details?: CustomerDetails;
  /**
   * `shipping_details` Indicates the customer shipping details for this payment. If provided, the payment page will be prefilled with the provided data.
   */
  shipping_details?: ShippingDetails;
  /**
   * `payment_methods`
   */
  payment_methods?: ('all' | PaymentMthod | `-${PaymentMthod}`)[];
}

/**
 * Payment Response
 */
export interface PaymentResponse {
  /**
   * `tran_ref` a unique transaction reference identifier. It serves as an important reference point for querying transaction details
   * and managing your transaction processes such as refunds, reversals and captures.
   */
  tran_ref?: string;
  /**
   * `tran_type` is the identification of the type of the transaction such as sale, refund, void, etc.
   */
  tran_type?: TransactionType;
  /**
   * `cart_id` allows merchants to assign a unique identifier to each payment and connect it to his cart or order identification
   */
  cart_id?: string;
  cart_description?: string;
  cart_currency?: CurrencyCode;
  cart_amount?: string;
  tran_total?: string;
  /**
   * `redirect_url` used to redirect customers through the payment process.
   */
  redirect_url?: string;
  /**
   * `trace` Trace information related to the batch or request.
   */
  customer_details: Partial<CustomerDetails>;
  callback?: string;
  return?: string;
  serviceId?: number;
  paymentChannel?: string;
  profileId?: number;
  merchantId?: number;
  trace?: string;
}

/**
 * Transaction Details Response
 */
export interface TransactionDetailsResponse {
  tran_ref?: string;
  transaction_status?: string;
  cart_id?: string;
  cart_description?: string;
  cart_currency?: string;
  cart_amount?: number;
  customer_details?: CustomerDetails;
  payment_result?: {
    response_status?: TransactionStatus;
    response_code?: string;
    response_message?: string;
    transaction_time?: string;
  };
  payment_info?: {
    payment_method?: string;
    card_type?: string;
    card_scheme?: string;
    payment_description?: string;
  };
  serviceId?: number;
  paymentChannel?: string;
  profileId?: number;
  merchantId?: number;
  trace?: string;
}
