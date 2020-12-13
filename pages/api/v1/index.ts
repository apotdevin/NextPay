import { getIp } from 'src/helpers';
import { Request, Response } from 'express';
import { getHash } from 'src/helpers/crypto';
import { middlewares } from 'src/helpers/express';
import { env, metadata } from 'src/helpers/env';
import { absoluteUrl } from 'src/helpers/url';

export default async function handler(req: Request, res: Response) {
  await middlewares(req, res);

  const ip = getIp(req);
  const ipHash = getHash(ip);

  const { origin } = absoluteUrl(req);

  const response = {
    callback: `${origin}/api/v1/pay/${ipHash}`,
    maxSendable: env.max * 1000,
    minSendable: env.min * 1000,
    metadata,
    commentAllowed: 0,
    tag: 'payRequest',
  };

  res.status(200).json(response);
}
