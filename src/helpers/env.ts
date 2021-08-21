export const env = {
  max: Number(process.env.MAX) || 0,
  min: Number(process.env.MIN) || 0,
  metadata: process.env.META || 'NextPay Invoice',
  name: process.env.NAME || 'NextPay',
  thankyou: process.env.THANKYOU || 'Thank you!',
  https: JSON.parse(process.env.HTTPS || 'true'),
  addressUser: process.env.LN_ADDRESS_USER || 'tip',
};

export const metadata = JSON.stringify([['text/plain', env.metadata]]);
