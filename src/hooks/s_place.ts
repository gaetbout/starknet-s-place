import { useContract } from '@starknet-react/core'
import { Abi } from 'starknet'

import RPlace from '~/abi/s_place.json'

export function useSPlaceContract() {
    return useContract({
        abi: RPlace as Abi,
        address: '0x04833dfa4aa0efd48059dcf260249a4f8e6c35dfa343866b01a1778b75b9f175',
    })
}
