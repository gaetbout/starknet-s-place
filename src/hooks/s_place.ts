import { useContract } from '@starknet-react/core'
import { Abi } from 'starknet'

import RPlace from '~/abi/s_place.json'

export function useSPlaceContract() {
    return useContract({
        abi: RPlace as Abi,
        address: '0x071701106eb292fd1a2404431bd40350f5c77337d9fc3375ec9b5869fb197a8a',
    })
}
