import { ReactNode, useEffect, useMemo } from 'react'

import { Connector } from '@web3-react/types'
import { Web3ReactProvider, Web3ReactHooks } from '@web3-react/core'

import Wallet from "./pages/Wallet";

import { Connection } from './connection'
import { getConnectionName } from './connection/utils'

import useConnections from './hooks/useConnections';

function App() {
  const connections = useConnections();
  const connectors: [Connector, Web3ReactHooks][] = connections.map(({ connector, hooks }) => [connector, hooks])

  const key = useMemo(() => connections.map(({ type }: Connection) => getConnectionName(type)).join('-'), [connections])

  return (
    <Web3ReactProvider connectors={connectors} key={key}>
      <Wallet />
    </Web3ReactProvider>
  );
}

export default App;
