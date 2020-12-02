import { getIp } from 'src/helpers';
import { Request, Response } from 'express';
import { getHash } from 'src/helpers/crypto';
import { middlewares } from 'src/helpers/express';
import { env, metadata } from 'src/helpers/env';

export default async function handler(req: Request, res: Response) {
  await middlewares(req, res);

  const ip = getIp(req);
  const ipHash = getHash(ip);

  const response = {
    callback: `${env.url}/api/v1/pay/${ipHash}`,
    maxSendable: env.max,
    minSendable: env.min,
    metadata,
    commentAllowed: 0,
    tag: 'payRequest',
  };

  res.status(200).json(response);
}
