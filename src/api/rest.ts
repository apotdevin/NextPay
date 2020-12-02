export const fetchInfo = () => fetch('/api/v1/info').then(res => res.json());
export const getInvoice = ({ amount }: { amount: number }) =>
  fetch(`/api/v1/invoice?amount=${amount}`).then(res => res.json());
