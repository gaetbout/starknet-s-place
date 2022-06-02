import { useContract } from '@starknet-react/core'
import { Abi } from 'starknet'

import RPlace from '~/abi/s_place.json'

export function useSPlaceContract() {
    return useContract({
        abi: RPlace as Abi,
        address: '0x02a53dafd1a823d096477b63d1d708cf1dccafaa0711d6b1646310f4d71d70fe',
    })
}
