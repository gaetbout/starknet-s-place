import { useStarknetCall } from '@starknet-react/core'
import { useMemo } from 'react'
import { useStarknet, useStarknetInvoke } from '@starknet-react/core'
import { useSPlaceContract } from '~/hooks/s_place'

export function Board() {
    const { contract } = useSPlaceContract()
    const { account } = useStarknet()
    const { loading, error, reset, invoke } = useStarknetInvoke({ contract, method: 'play' })

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

    const onPlay = ((e) => {
        let x = Math.floor(e.clientX / 14)
        let y = Math.floor(e.clientY / 14)
        if (account) {
            invoke({ args: [x, y, 9] });
        }
    });
    function changeBackground(e) {
        e.target.style.background = '#ec1840';
        e.target.style.width = '15px';
        e.target.style.height = '15px';
    }
    function changeBackgroundOriginal(e) {
        e.target.style.background = '#f1ecee';
        e.target.style.width = '14px';
        e.target.style.height = '14px';
    }

    return (
        <div onClick={onPlay}>
            {megaBoard?.map((val, index) => (
                <div onMouseOver={changeBackground}
                    onMouseOut={changeBackgroundOriginal} style={{ display: 'inline-block', width: '14px', height: '14px' }} key={index}></div>
            ))}
        </div>
    )
}
