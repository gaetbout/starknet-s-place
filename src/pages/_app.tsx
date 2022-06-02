import type { AppProps } from 'next/app'
import NextHead from 'next/head'
import { useEffect } from 'react';
import { InjectedConnector, StarknetProvider } from '@starknet-react/core'

function MyApp({ Component, pageProps }: AppProps) {
  const connectors = [new InjectedConnector()]
  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.border = "0";
    document.body.style.fontSize = "100%";
    document.body.style.backgroundColor = "#f1ecee";
  }, []);

  return (
    <StarknetProvider autoConnect connectors={connectors}>
      <NextHead>
        <title>place</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </NextHead>
      <Component {...pageProps} />
    </StarknetProvider>
  )
}

export default MyApp
