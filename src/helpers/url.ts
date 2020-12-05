import { Request } from 'express';

export const absoluteUrl = (req: Request, setLocalhost?: string) => {
  let protocol = 'https:';
  let host = req
    ? req.headers['x-forwarded-host'] || req.headers['host']
    : window.location.host;
  if (host && host.indexOf('localhost') > -1) {
    if (setLocalhost) host = 'localhost:3000';
    protocol = 'http:';
  }
  return {
    protocol: protocol,
    host: host,
    origin: protocol + '//' + host,
  };
};
