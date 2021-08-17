import { bech32 } from 'bech32';

export const encodeLnurl = (str: string) => {
  const words = bech32.toWords(Buffer.from(str, 'utf-8'));
  return bech32.encode('lnurl', words);
};
