import { toWithError } from 'src/helpers';
import { Request, Response } from 'express';
import { LndApi } from 'src/api/lnd';
import { middlewares } from 'src/helpers/express';
import { getHash } from 'src/helpers/crypto';
import { env } from 'src/helpers/env';
import { encode } from 'utf8';
import { storedMetadata } from '..';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export default async function handler(req: Request, res: Response) {
  await middlewares(req, res);

  const {
    query: { hash, amount },
  } = req;

  if (!amount || typeof amount !== 'string' || isNaN(Number(amount))) {
    res.status(200).json({ status: 'ERROR', reason: 'Invalid amount' });
    return;
  }

  // Millisatoshis to satoshis
  const value = Math.round(Number(amount) / 1000);

  if (value < env.min) {
    res.status(200).json({ status: 'ERROR', reason: 'Amount below minimum' });
    return;
  }

  if (value > env.max) {
    res.status(200).json({ status: 'ERROR', reason: 'Amount above maximum' });
    return;
  }

  console.log(`Creating ${value} sat invoice for user ${hash}`);

  const shaHash = getHash(encode(storedMetadata), 'base64');

  const [invoice, error] = await toWithError<{ payment_request: string }>(
    LndApi.getInvoice(value, shaHash)
  );

  if (error || !invoice?.payment_request) {
    res.status(200).json({ status: 'ERROR', reason: 'ErrorCreatingInvoice' });
    return;
  }

  const response = {
    pr: invoice.payment_request,
    successAction: { tag: 'message', message: 'Thank you!' },
    disposable: false,
    routes: [],
  };

  res.status(200).json(response);
}
