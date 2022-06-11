import type { NextPage } from 'next'
import { ConnectWallet } from '~/components/ConnectWallet'
import { Timeleft } from '~/components/Timeleft'
import { Board } from '~/components/Board'
import { useSPlaceContract } from '~/hooks/s_place'

const Home: NextPage = () => {
  const { contract } = useSPlaceContract()

  return (
    <div >
      <div className='topMenu'>

        <div className='flex'>
          <Timeleft />
          <ConnectWallet />
          <a href="https://github.com/gaetbout/starknet-s-place" target="_blank">Github
            <img style={{ width: "20px" }} src="/newTab.png"></img>
          </a>
        </div>
      </div>
      <div>
        < Board /></div>
    </div >
  )
}

export default Home
