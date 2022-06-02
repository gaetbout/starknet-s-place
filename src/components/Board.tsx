import { useStarknetCall } from '@starknet-react/core'
import { useMemo } from 'react'
import { useSPlaceContract } from '~/hooks/s_place'

export function Board() {
    const { contract } = useSPlaceContract()

    const { data: board1Result } = useStarknetCall({
        contract,
        method: 'view_get_board',
        args: [0, 110],
    })

    const { data: board2Result } = useStarknetCall({
        contract,
        method: 'view_get_board',
        args: [110, 110],
    })

    const { data: board3Result } = useStarknetCall({
        contract,
        method: 'view_get_board',
        args: [220, 103],
    })

    const megaBoard = useMemo(() => {
        if (board1Result && board1Result.length > 0 && board2Result && board2Result.length > 0 && board3Result && board3Result.length > 0) {
            return (board1Result.arr.concat(board2Result.arr).concat(board3Result.arr))
        }
    }, [board1Result, board2Result, board3Result])

    if (!megaBoard) {

        return <div style={{
            display: 'flex', justifyContent: 'center', height: '100vh'
        }}> <img src="/loading.svg" /></div >
    }

    return (
        <div style={{ marging: '0px' }}>
            {megaBoard?.map((val, index) => (
                <div style={{ display: 'inline-block', width: '14px', height: '14px' }} key={index}>{val.toString()}</div>
            ))}
        </div>
    )
}
