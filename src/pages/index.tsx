import { useStarknetCall } from '@starknet-react/core'
import type { NextPage } from 'next'
import { useMemo } from 'react'
import { ConnectWallet } from '~/components/ConnectWallet'
import { Timeleft } from '~/components/Timeleft'
import { Board } from '~/components/Board'
import { Play } from '~/components/Play'
import { TransactionList } from '~/components/TransactionList'
import { useSPlaceContract } from '~/hooks/s_place'

const Home: NextPage = () => {
  const { contract } = useSPlaceContract()

  return (
    <div >
      <div style={{ display: 'flex' }}>
        <div style={{ width: '1400px' }}>
          <Board /></div>
        <div style={{ paddingLeft: '20px' }}>
          <h2>Wallet</h2>
          <ConnectWallet />
          <h2>S_Place Contract</h2>
          <p>{contract?.address}</p>
          <Timeleft />
          <Play />
          <h2>Recent Transactions</h2>
          <TransactionList /></div></div>
    </div >
  )
}

export default Home
