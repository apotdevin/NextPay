export const LndApi = {
  getInvoice: async (value: number, hash: string) => {
    try {
      const headers = new Headers();
      headers.set('Accept', 'application/json');
      headers.set('Content-Type', 'application/json');
      headers.set('Grpc-Metadata-macaroon', process.env.LND_MACAROON || '');

      const response = await fetch(`${process.env.LND_URL}/v1/invoices`, {
        method: 'post',
        headers,
        body: JSON.stringify({
          value,
          memo: 'NextPay Lightning Invoice',
          description_hash: hash,
        }),
      });

      return await response.json();
    } catch (error) {
      console.log('Error generating invoice from LND', { error });
      throw new Error();
    }
  },
};
