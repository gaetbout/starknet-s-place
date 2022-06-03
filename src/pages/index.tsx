import type { NextPage } from 'next'
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
        <div style={{
          width: '1420px', cursor: 'none',
          lineHeight: '60%'
        }}>
          < Board /></div>
        <div style={{ backgroundColor: '#2d2d6d', color: '#f1ecee', paddingLeft: '20px', height: '100vh', width: '480px', overflow: 'hidden' }}>
          <h2>Wallet</h2>
          <ConnectWallet />
          {/* <h2>S_Place Contract</h2>
          <p>{contract?.address}</p> */}
          <Timeleft />
          <h2>Recent Transactions</h2>
          <TransactionList /></div></div>
    </div >
  )
}

export default Home
