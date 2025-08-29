import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, useAccount } from 'wagmi'
import { config } from '../config'
import { Account } from '../account'
import { WalletOptions } from './wallet-options'
import Form from './form'
const queryClient = new QueryClient()

function ConnectWallet() {
  const { isConnected } = useAccount()
  if (isConnected) return <Account />
  return <WalletOptions />
}

export function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectWallet />
        <Form />
      </QueryClientProvider>
    </WagmiProvider>
  )
}
export default App