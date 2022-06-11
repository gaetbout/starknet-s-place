import { useContract } from '@starknet-react/core'
import { Abi } from 'starknet'

import RPlace from '~/abi/s_place.json'

export function useSPlaceContract() {
    return useContract({
        abi: RPlace as Abi,
        address: '0x01345318950b5d02f5f2f31e8bca08884c5aea389646fbfea61dcdfdc9402260',
    })
}
