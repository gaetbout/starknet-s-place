import { useStarknet, useStarknetInvoke } from '@starknet-react/core'
import React, { useCallback, useState } from 'react'
import { useSPlaceContract } from '~/hooks/s_place'

export function Play() {
    const [x, setX] = useState();
    const [y, setY] = useState();
    const [color, setColor] = useState();
    const { account } = useStarknet()
    const { contract: counter } = useSPlaceContract()
    const { loading, error, reset, invoke } = useStarknetInvoke({ contract: counter, method: 'play' })

    const onPlay = useCallback(() => {
        reset();
        if (account && x && y && color) {
            invoke({ args: [x - 1, y - 1, color - 1] });
        }
    }, [account, x, y, color, invoke, reset]);

    return (
        <div>
            <br></br>
            <label>X (between 1 and 100):</label>
            <br></br>
            <input type="number" id="x" name="x" min="1" max="100" onChange={(evt) => setX(evt.target.value)}></input>
            <br></br>
            <label>Y (between 1 and 100):</label>
            <br></br>
            <input type="number" id="y" name="y" min="1" max="100" onChange={(evt) => setY(evt.target.value)}></input>
            <br></br>
            <label>Color (between 1 and 256):</label>
            <br></br>
            <input type="number" id="color" name="color" min="1" max="256" onChange={(evt) => setColor(evt.target.value)}></input>
            <br></br>
            <button disabled={!account || !x || !y || !color} onClick={onPlay}>
                Play {color} at x: {x}, y:{y}
            </button>
        </div>
    )
}
