import { Connector } from '@web3-react/types'

import { ConnectionType, injectedConnection } from '../../connection'
import { getConnectionName } from '../../connection/utils'

import METAMASK_ICON_URL from '../../assets/metamask.svg'

import Option from './Option'

export function InstallMetaMaskOption() {
    return <Option
        icon={METAMASK_ICON_URL}
        text="Install MetaMask"
        link='https://metamask.io/'
    />
}

export function MetaMaskOption({ tryActivation }: { tryActivation: (connector: Connector) => void }) {
    return <Option
        icon={METAMASK_ICON_URL}
        text={getConnectionName(ConnectionType.INJECTED, true)}
        onClick={() => tryActivation(injectedConnection.connector)}
    />
}

export function InjectedOption({ tryActivation }: { tryActivation: (connector: Connector) => void }) {
    return <Option
        text={getConnectionName(ConnectionType.INJECTED, false)}
        onClick={() => tryActivation(injectedConnection.connector)}
    />
}