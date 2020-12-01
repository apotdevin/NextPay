import rateLimit from 'express-rate-limit';
import Cors from 'cors';
import { getIp } from 'src/helpers';
import { Request, Response } from 'express';

const cors = Cors({ origin: '*' });

const limiter = rateLimit({
  windowMs: 10 * 1000,
  max: 4,
  keyGenerator: getIp,
});

export const middlewares = async (req: Request, res: Response) => {
  await runMiddleware(req, res, cors);
  await runMiddleware(req, res, limiter);
};

const runMiddleware = (req: Request, res: Response, fn: any) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
};
