import { Connector } from '@web3-react/types'

import { coinbaseWalletConnection, ConnectionType } from '../../connection'
import { getConnectionName } from '../../connection/utils'

import COINBASE_ICON_URL from '../../assets/coinbase.svg'

import Option from './Option'

export function OpenCoinbaseWalletOption() {
    return <Option
        icon={COINBASE_ICON_URL}
        text="Open in Coinbase Wallet"
        link="https://go.cb-w.com/mtUDhEZPy1"
    />
}

export function CoinbaseWalletOption({ tryActivation }: { tryActivation: (connector: Connector) => void }) {

    return <Option
        icon={COINBASE_ICON_URL}
        text={getConnectionName(ConnectionType.COINBASE_WALLET)}
        onClick={() => tryActivation(coinbaseWalletConnection.connector)}
    />
}