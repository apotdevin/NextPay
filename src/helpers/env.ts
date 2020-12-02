export const env = {
  url: process.env.WEB_URL || '',
  max: Number(process.env.MAX) || 0,
  min: Number(process.env.MIN) || 0,
  metadata: process.env.META || 'NextPay Invoice',
  name: process.env.NAME || 'NextPay',
};

export const metadata = JSON.stringify([['text/plain', env.metadata]]);
