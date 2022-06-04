import { useStarknetCall } from '@starknet-react/core'
import { useMemo } from 'react'
import { useStarknet, useStarknetInvoke } from '@starknet-react/core'
import { useSPlaceContract } from '~/hooks/s_place'

export function Board() {
    const { contract } = useSPlaceContract()
    const { account } = useStarknet()
    const { loading, error, reset, invoke } = useStarknetInvoke({ contract, method: 'play' })

    // TODO can enhance that  fetch, it's quite bad
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
        return <div className='loading'> <img src="/loading.svg" /></div >
    }

    const onPlay = ((e) => {
        let x = Math.floor(e.clientX / 14)
        let y = Math.floor(e.clientY / 14)
        if (account) {
            invoke({ args: [x, y, 9] });
        }
    });
    var defaultPalette = [
        '#ffffff', '#400000', '#400900', '#234000', '#004000', '#004000', '#004000', '#000d40', '#000040', '#000040', '#000040', '#000040', '#280040', '#400003', '#400000', '#000000',
        '#ff8cdb', '#540000', '#541d00', '#375400', '#005400', '#005400', '#005402', '#002154', '#000054', '#000054', '#000054', '#000054', '#3c0054', '#540017', '#540000', '#0d0d0d',
        '#ff8cff', '#680000', '#683100', '#4b6800', '#006800', '#006800', '#006816', '#003568', '#001168', '#000068', '#000068', '#000068', '#500068', '#68002b', '#680000', '#212121',
        '#ff8cff', '#7c0000', '#7c4500', '#5f7c00', '#0b7c00', '#007c00', '#007c2a', '#00497c', '#00257c', '#00007c', '#00007c', '#10007c', '#64007c', '#7c003f', '#7c0000', '#353535',
        '#ff8cff', '#900400', '#905900', '#739000', '#1f9000', '#009000', '#00903e', '#005d90', '#003990', '#000090', '#000090', '#240090', '#780090', '#900053', '#900000', '#494949',
        '#ac8cff', '#a41800', '#a46d00', '#87a400', '#33a400', '#00a400', '#00a452', '#0071a4', '#004da4', '#0000a4', '#0000a4', '#3800a4', '#8c00a4', '#a40067', '#a40013', '#5d5d5d',
        '#8cc1ff', '#b82c00', '#b88100', '#9bb800', '#47b800', '#00b800', '#00b866', '#0085b8', '#0061b8', '#000db8', '#0000b8', '#4c00b8', '#a000b8', '#b8007b', '#b80027', '#717171',
        '#8cffff', '#cc4000', '#cc9500', '#afcc00', '#5bcc00', '#06cc00', '#00cc7a', '#0099cc', '#0075cc', '#0021cc', '#0c00cc', '#6000cc', '#b400cc', '#cc008f', '#cc003b', '#858585',
        '#8cffff', '#e05400', '#e0a900', '#c3e000', '#6fe000', '#1ae000', '#00e08e', '#00ade0', '#0089e0', '#0035e0', '#2000e0', '#7400e0', '#c800e0', '#e000a3', '#e0004f', '#999999',
        '#8cffff', '#f46814', '#f4bd14', '#d7f414', '#83f414', '#2ef414', '#14f4a2', '#14c1f4', '#149df4', '#1449f4', '#3414f4', '#8814f4', '#dc14f4', '#f414b7', '#f41463', '#adadad',
        '#a6ff8c', '#ff7c28', '#ffd128', '#ebff28', '#97ff28', '#42ff28', '#28ffb6', '#28d5ff', '#28b1ff', '#285dff', '#4828ff', '#9c28ff', '#f028ff', '#ff28cb', '#ff2877', '#c1c1c1',
        '#fbff8c', '#ff903c', '#ffe53c', '#ffff3c', '#abff3c', '#56ff3c', '#3cffca', '#3ce9ff', '#3cc5ff', '#3c71ff', '#5c3cff', '#b03cff', '#ff3cff', '#ff3cdf', '#ff3c8b', '#d5d5d5',
        '#ffff8c', '#ffa450', '#fff950', '#ffff50', '#bfff50', '#6aff50', '#50ffde', '#50fdff', '#50d9ff', '#5085ff', '#7050ff', '#c450ff', '#ff50ff', '#ff50f3', '#ff509f', '#e9e9e9',
        '#ffff8c', '#ffb864', '#ffff64', '#ffff64', '#d3ff64', '#7eff64', '#64fff2', '#64ffff', '#64edff', '#6499ff', '#8464ff', '#d864ff', '#ff64ff', '#ff64ff', '#ff64b3', '#fdfdfd',
        '#ffe08c', '#ffcc78', '#ffff78', '#ffff78', '#e7ff78', '#92ff78', '#78ffff', '#78ffff', '#78ffff', '#78adff', '#9878ff', '#ec78ff', '#ff78ff', '#ff78ff', '#ff78c7', '#ffffff',
        '#ff8c8c', '#ff7878', '#ff6464', '#ff5050', '#ff3c3c', '#ff2828', '#f41414', '#e00000', '#cc0000', '#b80000', '#a40000', '#900000', '#7c0000', '#680000', '#540000', '#400000'
    ]

    // Todo change to handle square side within CSS with a global var
    return (
        <div onClick={onPlay}>
            {megaBoard?.map((val, index) => (
                <div style={{ backgroundColor: defaultPalette[val] }} className='case' key={index}></div>
            ))}
        </div>
    )
}
