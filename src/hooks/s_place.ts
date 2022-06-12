import { useContract } from '@starknet-react/core'
import { Abi } from 'starknet'

import RPlace from '~/abi/s_place.json'

export function useSPlaceContract() {
    return useContract({
        abi: RPlace as Abi,
        address: '0x03880c03b741321318e54ab1012758fc553c31de8c0e153ff35e1904984c21a9',
    })
}
