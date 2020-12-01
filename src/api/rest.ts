export const fetchInfo = () => fetch('/api/v1/info').then(res => res.json());
