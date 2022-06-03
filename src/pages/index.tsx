import type { NextPage } from 'next'
import { ConnectWallet } from '~/components/ConnectWallet'
import { Timeleft } from '~/components/Timeleft'
import { Board } from '~/components/Board'
import { TransactionList } from '~/components/TransactionList'
import { useSPlaceContract } from '~/hooks/s_place'

const Home: NextPage = () => {
  const { contract } = useSPlaceContract()


  return (
    // TODO ADD GITHUB LINK
    <div >
      <div style={{ display: 'flex' }}>
        <div style={{
          width: '1420px', cursor: 'none',
          lineHeight: '60%'
        }}>
          < Board /></div>
        <div style={{ backgroundColor: '#2d2d6d', color: '#f1ecee', paddingLeft: '20px', height: '100vh', width: '480px', overflow: 'hidden' }}>

          <div style={{ display: 'flex' }}>
            <ConnectWallet />
            <a href="https://github.com/gaetbout/starknet-s-place" target="_blank">Github <img style={{ width: "20px" }} src="/newTab.png"></img></a>
          </div>
          <Timeleft />
          <h2>Recent Transactions</h2>
          <TransactionList /></div></div>
    </div >
  )
}

export default Home
