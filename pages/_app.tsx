import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { GlobalStyles } from '../src/styles/GlobalStyle';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>NextPay</title>
      </Head>
      <GlobalStyles />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
