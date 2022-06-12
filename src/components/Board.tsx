import { useStarknetCall } from '@starknet-react/core'
import { useMemo } from 'react'
import React, { useState } from 'react';
import { useStarknet, useStarknetInvoke } from '@starknet-react/core'
import { useSPlaceContract } from '~/hooks/s_place'




export function Board() {
    const { contract } = useSPlaceContract()
    const [getColorIndex, setColorIndex] = useState(0);
    const { account } = useStarknet()
    const { loading, error, reset, invoke } = useStarknetInvoke({ contract, method: 'play' })
    const { data: board1Result } = useStarknetCall({
        contract,
        method: 'view_get_board',
        args: [0, 111], // Could use the offset to load chunk by chunk and get it faster
    })

    const board = useMemo(() => {
        if (board1Result && board1Result.length > 0) {
            return (board1Result[0])
        }
    }, [board1Result])

    if (!board) {
        return <div className='loading'> <img src="/loading.svg" /></div >
    }

    var defaultPalette = [
        '#f1ecee', '#e16e8b', '#be2734', '#ec1840', '#a46527', '#ea892e', '#f7e26b', '#a2cd3a',
        '#458a40', '#30484e', '#b3dcee', '#4c9dd6', '#005885', '#663a82', '#9c9c9c', '#000000'
    ]
    const onPlay = ((e) => {
        let x = Math.floor((e.clientX - e.target.parentNode.offsetLeft) / 14)
        let y = Math.floor((e.clientY - e.target.parentNode.offsetTop) / 14)
        if (account) {
            invoke({ args: [x, y, getColorIndex] });
        }
    });

    function changeBackground(e) {
        e.target.style.background = defaultPalette[getColorIndex];
    }
    function changeBackgroundOriginal(e, val) {
        e.target.style.background = val;
    }
    // Todo change to handle square side within CSS with a global var
    return (
        <div>
            <div className='flex'>
                {defaultPalette.map((val, index) => (
                    <div style={{ backgroundColor: val }} onClick={() => setColorIndex(index)} className='colorPicker' key={val}> </div>
                ))}
            </div>
            < div className='board' onClick={onPlay} >
                {board?.map((val, index) => (
                    <div onMouseOver={changeBackground}
                        onMouseOut={(e) => changeBackgroundOriginal(e, defaultPalette[val])}
                        style={{ backgroundColor: defaultPalette[val] }} className='case' key={index}></div>
                ))
                }
            </div >
        </div>
    )
}
