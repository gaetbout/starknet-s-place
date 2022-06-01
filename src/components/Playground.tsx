import { useStarknet, InjectedConnector } from '@starknet-react/core'

export function Playground() {
    const { account, connect, disconnect } = useStarknet()

    if (account) {
        return (
            <div>
                <p>Account: {account}</p>
                <button onClick={() => disconnect(new InjectedConnector())}>Lama</button>
            </div>
        )
    }

    return <button onClick={() => connect(new InjectedConnector())}>Connect</button>
}
