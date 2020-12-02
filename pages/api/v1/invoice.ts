import { toWithError } from 'src/helpers';
import { Request, Response } from 'express';
import { LndApi } from 'src/api/lnd';
import { middlewares } from 'src/helpers/express';
import { getHash } from 'src/helpers/crypto';
import { env, metadata } from 'src/helpers/env';
import { encode } from 'utf8';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export default async function handler(req: Request, res: Response) {
  await middlewares(req, res);

  const {
    query: { amount },
  } = req;

  if (!amount || typeof amount !== 'string' || isNaN(Number(amount))) {
    res.status(200).json({ status: 'ERROR', reason: 'Invalid amount' });
    return;
  }

  const value = Number(amount);

  if (value < env.min) {
    res.status(200).json({ status: 'ERROR', reason: 'Amount below minimum' });
    return;
  }

  if (value > env.max) {
    res.status(200).json({ status: 'ERROR', reason: 'Amount above maximum' });
    return;
  }

  console.log(`Creating ${value} sat manual invoice`);

  const shaHash = getHash(encode(metadata), 'base64');

  const [invoice, error] = await toWithError<{ payment_request: string }>(
    LndApi.getInvoice(value, shaHash)
  );

  if (error || !invoice?.payment_request) {
    console.log('Error creating invoice: ', { error, invoice });
    res.status(200).json({ status: 'ERROR', reason: 'ErrorCreatingInvoice' });
    return;
  }

  const response = {
    pr: invoice.payment_request,
  };

  res.status(200).json(response);
}
