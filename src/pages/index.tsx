import type { NextPage } from 'next'
import { ConnectWallet } from '~/components/ConnectWallet'
import { Timeleft } from '~/components/Timeleft'
import { Board } from '~/components/Board'
import { TransactionList } from '~/components/TransactionList'
import { useSPlaceContract } from '~/hooks/s_place'
import { ColorPicker } from '~/components/ColorPicker/ColorPicker'

const Home: NextPage = () => {
  const { contract } = useSPlaceContract()


  return (
    // TODO ADD GITHUB LINK
    <div >
      <div style={{ display: 'flex' }}>
        <div className='board'>
          < Board /></div>
        <div className='rightMenu'>

          <div style={{ display: 'flex' }}>
            <ConnectWallet />
            <a href="https://github.com/gaetbout/starknet-s-place" target="_blank">Github <img style={{ width: "20px" }} src="/newTab.png"></img></a>
          </div>
          <Timeleft />
          <ColorPicker />
          <h2>Recent Transactions</h2>
          <TransactionList /></div></div>
    </div >
  )
}

export default Home
