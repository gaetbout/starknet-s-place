import { useStarknetCall } from '@starknet-react/core'
import { useMemo } from 'react'
import React, { useCallback, useState } from 'react'
import { useSPlaceContract } from '~/hooks/s_place'

export function Board() {
    const { contract } = useSPlaceContract()

    function sliceArray(obj) {
        let array = (obj as number[])[0]
        const chunkSize = 100;
        let arr = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            const chunk = array.slice(i, i + chunkSize);
            arr.push(chunk);
        }
        return arr.toString()
    }
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

    const board1Value = useMemo(() => {
        if (board1Result && board1Result.length > 0) {
            return sliceArray(board1Result)
        }
    }, [board1Result])

    const board2Value = useMemo(() => {
        if (board2Result && board2Result.length > 0) {
            // console.log("2:" + board2Result)
            return board2Result.toString()
        }
    }, [board2Result])

    const board3Value = useMemo(() => {
        if (board3Result && board3Result.length > 0) {
            // console.log("3:" + board3Result)
            return board3Result.toString()
        }
    }, [board3Result])
    return (
        <div>
            <div>{board1Value}</div>
            <div>{board2Value}</div>
            <div>{board3Value}</div>
        </div>
    )
}
