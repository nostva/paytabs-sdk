# PayTabs SDK for Node.js

A Node.js package for seamless integration with PayTabs payment gateway.

## Installation

```bash
npm install paytabs-sdk
```

## Usage

Initialize the SDK with your PayTabs credentials:

```javascript
import { PayTabs } from 'paytabs-sdk';

const paytabs = new PayTabs({
  profileId: 'YOUR_PROFILE_ID',
  serverKey: 'YOUR_SERVER_KEY',
  region: 'EGY', // Available regions: ARE, EGY, SAU, OMN, JOR
});
```

### Create Payment Page

Generate a payment page for your transaction:

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
