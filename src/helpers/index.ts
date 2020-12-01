import { Request } from 'express';

export const getIp = (req: Request) => {
  if (!req || !req.headers) {
    return '';
  }
  const forwarded = req.headers['x-forwarded-for'];
  const ip = forwarded
    ? Array.isArray(forwarded)
      ? forwarded[0]
      : forwarded.split(/, /)[0]
    : req.connection.remoteAddress;
  return ip || '1.2.3.4';
};

export const toWithError = async <T>(promise: Promise<T>) => {
  return promise
    .then(data => [data, undefined] as const)
    .catch(err => [undefined, err] as const);
};
