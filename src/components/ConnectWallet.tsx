import { useStarknet, InjectedConnector } from '@starknet-react/core'

export function ConnectWallet() {
  const { account, connect, disconnect, connectors } = useStarknet()

  let accShortened = (() => {
    return (account?.slice(0, 5) + "..." + account?.slice(account.length - 4, account.length))
  });

  if (account) {
    return (
      <div>
        <button onClick={() => disconnect()}>{accShortened()}</button>
      </div>
    )
  } return (
    <>
      {connectors.map((connector, idx) => (
        <button key={idx} onClick={() => connect(connector)}>
          Connect
        </button>
      ))}
    </>
  )
}
