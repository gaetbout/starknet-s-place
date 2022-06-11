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

    const board = useMemo(() => {
        if (board1Result && board1Result.length > 0) {
            return (board1Result.arr)
        }
    }, [board1Result])

    if (!board) {
        return <div className='loading'> <img src="/loading.svg" /></div >
    }

    var defaultPalette = [
        '#f1ecee', '#e16e8b', '#be2734', '#493c2b', '#a46527', '#ea892e', '#f7e26b', '#a2cd3a',
        '#458a40', '#30484e', '#b3dcee', '#4c9dd6', '#005885', '#663a82', '#9c9c9c', '#000000'
    ]
    const onPlay = ((e) => {
        // TODO add 100px of top menu
        let x = Math.floor(e.clientX / 14)
        let y = Math.floor(e.clientY / 14)
        if (account) {
            invoke({ args: [x, y, 9] });
        }
    });
    // Todo change to handle square side within CSS with a global var
    return (
        <div>
            <div className='flex'>
                {defaultPalette.map((val) => (
                    <div style={{ backgroundColor: val }} className='colorPicker'> </div>
                ))}
            </div>
            <div className='board'> < div onClick={onPlay} >
                {board?.map((val, index) => (
                    <div style={{ backgroundColor: defaultPalette[2] }} className='case' key={index}></div>
                ))
                }
            </div >
            </div >
        </div>
    )
}
