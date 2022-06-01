import { useStarknet, useStarknetCall } from '@starknet-react/core'
import React, { useMemo } from 'react'
import { useRPlaceContract } from '~/hooks/r_place'

export function Timeleft() {
    const { account } = useStarknet()
    const { contract } = useRPlaceContract()
    const { data, loading, error, refresh } = useStarknetCall({
        contract,
        method: 'view_get_player_timeleft',
        args: account ? [account] : undefined,
    });

    const timeleft = useMemo(() => {
        if (data && data.length > 0) {
            return data[0].toString()
        }
    }, [data]);

    if (!account) {
        return null
    }
    if (loading) {
        return <div>Timeleft loading</div>
    }
    if (error) {
        return <div>Error while fetching timeleft</div>
    }
    if (timeleft) {
        if (timeleft == 0) {
            return <div>You can play!</div>
        }
        return <div>{timeleft}s until you can play</div>
    }
    return null
}
