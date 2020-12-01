import { createHash, randomBytes } from 'crypto';

export const getHash = (str: string, encoding: 'hex' | 'base64' = 'hex') =>
  createHash('sha256').update(str).digest(encoding);

export const getRandomBytes = (
  length = 64,
  encoding: 'hex' | 'base64' = 'hex'
) => randomBytes(length).toString(encoding);
