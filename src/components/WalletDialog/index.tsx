
import { useCallback } from "react"
import { Stack, Dialog } from "@mui/material"


import { Connector } from '@web3-react/types'


import { getIsInjected, getIsMetaMask, getIsCoinbaseWallet, getConnection } from "../../connection/utils"

import { InstallMetaMaskOption, MetaMaskOption, InjectedOption } from "./InjectedOption"
import { OpenCoinbaseWalletOption, CoinbaseWalletOption } from "./CoinbaseWalletOption"
import { WalletConnectOption } from "./WalletConnectOption"


export default function WalletDiakog({ open, onClose }: { open: boolean, onClose: () => void }) {
    const isInjected = getIsInjected()
    const isMetaMask = getIsMetaMask()
    const isCoinbaseWallet = getIsCoinbaseWallet()

    const isMobile = window.navigator.userAgent.indexOf("Mobile") >= 0;
    const isCoinbaseWalletBrowser = isMobile && isCoinbaseWallet
    const isMetaMaskBrowser = isMobile && isMetaMask
    const isInjectedMobileBrowser = isCoinbaseWalletBrowser || isMetaMaskBrowser

    const tryActivation = useCallback(async (connector: Connector) => {
        try {
            await connector.activate();
            onClose();
        } catch (error) {
            console.debug(`web3-react connection error: ${error}`)
        }
    }, [])

    let injectedOption
    if (!isInjected) {
        if (!isMobile) {
            injectedOption = <InstallMetaMaskOption />
        }
    } else if (!isCoinbaseWallet) {
        if (isMetaMask) {
            injectedOption = <MetaMaskOption tryActivation={tryActivation} />
        } else {
            injectedOption = <InjectedOption tryActivation={tryActivation} />
        }
    }

    let coinbaseWalletOption
    if (isMobile && !isInjectedMobileBrowser) {
        coinbaseWalletOption = <OpenCoinbaseWalletOption />
    } else if (!isMobile || isCoinbaseWalletBrowser) {
        coinbaseWalletOption = <CoinbaseWalletOption tryActivation={tryActivation} />
    }

    const walletConnectionOption =
        (!isInjectedMobileBrowser && <WalletConnectOption tryActivation={tryActivation} />) ?? null

    return <Dialog
        maxWidth={false}
        open={open}
        onClose={onClose}
    >
        <Stack direction="row" flexWrap="wrap" maxWidth="645px" gap="15px" padding="15px" boxSizing="border-box">
            {injectedOption}
            {coinbaseWalletOption}
            {walletConnectionOption}
        </Stack>
    </Dialog>
}