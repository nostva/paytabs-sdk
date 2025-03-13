# PayTabs SDK for Node.js

A Node.js package for seamless integration with PayTabs payment gateway.

## Installation

```bash
npm install paytabs-sdk
```

## Quick Start

### Initialize the SDK

Provide your PayTabs credentials to initialize the SDK:

```javascript
import PayTabs from 'paytabs-sdk';

const paytabs = PayTabs({
  profileId: 'YOUR_PROFILE_ID',
  serverKey: 'YOUR_SERVER_KEY',
  region: 'EGY',
});
```

Or using CommonJS:

```javascript
const paytabs = require('paytabs-sdk')({
  profileId: 'YOUR_PROFILE_ID',
  serverKey: 'YOUR_SERVER_KEY',
  region: 'EGY',
});
```

## Usage

### Create Payment Page

Generate a payment page for your transaction. The amount will be deducted directly from the customer's bank account upon purchase submission.

```javascript
const response = await paytabs.payments.create({
  tran_class: 'ecom',
  cart_id: 'order_123',
  cart_description: 'Order #123',
  cart_amount: 100,
  cart_currency: 'EGP',
  callback: 'https://your-domain.com/callback',
  return: 'https://your-domain.com/return',
});
```

### Authorize Payment

Authorize a payment transaction. The amount will be held (authorized) in the customer's bank account but not transferred to your account until captured.

```javascript
const response = await paytabs.payments.authorize({
  tran_class: 'ecom',
  cart_id: 'order_123',
  cart_description: 'Order #123',
  cart_amount: 100,
  cart_currency: 'EGP',
  callback: 'https://your-domain.com/callback',
  return: 'https://your-domain.com/return',
});
```

### Capture Payment

Capture a previously authorized payment. The held amount will be transferred from the customer's bank account to your account.

```javascript
const response = await paytabs.payments.capture({
  tran_ref: 'TST*************',
  tran_class: 'ecom',
  cart_id: 'order_123',
  cart_description: 'Order #123',
  cart_amount: 100,
  cart_currency: 'EGP',
});
```

### Refund Payment

Refund a captured payment. The amount will be returned from your account to the customer's bank account.

```javascript
const response = await paytabs.payments.refund({
  tran_ref: 'TST*************',
  tran_class: 'ecom',
  cart_id: 'order_123',
  cart_description: 'Order #123',
  cart_amount: 100,
  cart_currency: 'EGP',
});
```

### Retrieve Transaction

Retrieve details of a specific transaction:

```javascript
const response = await paytabs.payments.retrieve('TST*************');
```

## Verify Redirect Response

the following method verifies the HMAC signature for the redirect request body. It computes the SHA-256 hash of the payload using your configured server-key and compares it with the provided signature to ensure the integrity of the data.

```javascript
const isValid = paytabs.verifyRedirectResponse(payload, signature);
if (isValid) {
  console.log('Signature is valid. Proceed with processing the response.');
} else {
  console.log('Signature is invalid. Discard the response.');
}
```
