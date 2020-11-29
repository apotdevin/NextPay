import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { GlobalStyles } from '../src/styles/GlobalStyle';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>NextPay</title>
      </Head>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}
