import { useStarknet, InjectedConnector } from '@starknet-react/core'

export function ConnectWallet() {
  const { account, connect, disconnect } = useStarknet()

  let accShortened = (() => {
    return (account?.slice(0, 5) + "..." + account?.slice(account.length - 4, account.length))
  });

  if (account) {
    return (
      <div>
        <button onClick={() => disconnect(new InjectedConnector())}>{accShortened()}</button>
      </div>
    )
  }

  return <button onClick={() => connect(new InjectedConnector())}>Connect</button>
}
