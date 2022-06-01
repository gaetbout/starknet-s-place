import type { AppProps } from 'next/app'
import NextHead from 'next/head'
import { InjectedConnector, StarknetProvider } from '@starknet-react/core'

function MyApp({ Component, pageProps }: AppProps) {
  const connectors = [new InjectedConnector()]

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
