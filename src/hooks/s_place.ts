import { useContract } from '@starknet-react/core'
import { Abi } from 'starknet'

import RPlace from '~/abi/s_place.json'

export function useSPlaceContract() {
    return useContract({
        abi: RPlace as Abi,
        address: '0x000565a06870d1afb94785b865d04942f74ac301de111310fb546ccd64b92a19',
    })
}
