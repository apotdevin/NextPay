import { Request, Response } from 'express';
import { middlewares } from 'src/helpers/express';
import { env } from 'src/helpers/env';
import { encodeLnurl } from 'src/helpers/lnurl';
import { absoluteUrl } from 'src/helpers/url';

export default async function handler(req: Request, res: Response) {
  await middlewares(req, res);
  const { origin } = absoluteUrl(req);

  res.status(200).json({
    url: encodeLnurl(`${origin}/api/v1`),
    max: env.max,
    min: env.min,
    name: env.name,
  });
}
