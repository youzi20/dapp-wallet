import { Connector } from '@web3-react/types'

import { ConnectionType, walletConnectConnection } from '../../connection'
import { getConnectionName } from '../../connection/utils'

import WALLET_CONNECT_ICON from '../../assets/walletconnect.svg'

import Option from './Option'

export function WalletConnectOption({ tryActivation }: { tryActivation: (connector: Connector) => void }) {

    return (
        <Option
            icon={WALLET_CONNECT_ICON}
            text={getConnectionName(ConnectionType.WALLET_CONNECT)}
            onClick={() => tryActivation(walletConnectConnection.connector)}
        />
    )
}