import { toWords, encode } from 'bech32';

export const encodeLnurl = (str: string) => {
  const words = toWords(Buffer.from(str, 'utf-8'));
  return encode('lnurl', words);
};
