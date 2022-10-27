import { useCallback, useState } from 'react';
import { useWeb3React } from '@web3-react/core'

import styled from '@emotion/styled';


import { Box, Stack, Select, MenuItem, Dialog, Button, SelectChangeEvent } from "@mui/material";

import { networkConnection, walletConnectConnection } from '../../connection'
import { CHAIN_IDS_TO_NAMES, isSupportedChain, getChainName } from '../../constants/chains';
import { getChainInfo } from '../../constants/chainInfo';
import { getRpcUrl } from '../../constants/networks';

import WalletDialog from '../../components/WalletDialog';

import Editor from './Editor';

const Title = styled.div`
font-size: 16px;
font-weight: bold;
margin-bottom: 20px;
`;

const Network = styled.span`
	margin-left: 5px;
	padding: 0 5px;
	border-radius: 4px;
	background: #efefef;
`;

const DOMAIN = '{\n' +
    '    "name": "Ether Mail",\n' +
    '    "version": "1",\n' +
    '    "chainId": 5,\n' +
    '    "verifyingContract": "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC"\n' +
    '}'

const TYPE = '{\n' +
    '   "Person": [\n' +
    '       { "name": "name", "type": "string" },\n' +
    '       { "name": "wallet", "type": "address" }\n' +
    '   ],\n' +
    '   "Mail": [\n' +
    '       { "name": "from", "type": "Person" },\n' +
    '       { "name": "to", "type": "Person" },\n' +
    '       { "name": "contents", "type": "string" }\n' +
    '   ]\n' +
    '}'

const MESSAGE = '{\n' +
    '   "from": {\n' +
    '       "name": "Cow",\n' +
    '       "wallet": "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826"\n' +
    '   },\n' +
    '   "to": {\n' +
    '       "name": "Bob",\n' +
    '       "wallet": "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB"\n' +
    '   },\n' +
    '   "contents": "Hello, Bob!"\n' +
    '}'


const Wallet = () => {
    const { connector, account, chainId, isActive, provider } = useWeb3React();

    const [domain, setDomain] = useState<any>(DOMAIN);
    const [type, setType] = useState<any>(TYPE);
    const [message, setMessage] = useState<any>(MESSAGE);

    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);

    const handleDisconnect = useCallback(() => {
        if (connector && connector.deactivate) {
            connector.deactivate()
        }

        connector.resetState();
    }, [connector])

    const handleSigner = async () => {
        const signer = provider?.getSigner();

        if (signer) {
            const signature = await signer._signTypedData(JSON.parse(domain), JSON.parse(type), JSON.parse(message));

            console.log(signature);
        } else {
            throw new Error("signeris not defined")
        }
    }

    const handleNetwordChange = async (event: SelectChangeEvent<number>) => {
        const chainId = event.target.value as number;

        if (!isSupportedChain(chainId)) {
            throw new Error(`Chain ${chainId} not supported for connector (${typeof connector})`)
        } else if (connector === walletConnectConnection.connector || connector === networkConnection.connector) {
            await connector.activate(chainId)
        } else {
            const info = getChainInfo(chainId)
            const addChainParameter = {
                chainId,
                chainName: info.label,
                rpcUrls: [getRpcUrl(chainId)],
                nativeCurrency: info.nativeCurrency,
                blockExplorerUrls: [info.explorer],
            }
            await connector.activate(addChainParameter)
        }
    };

    return <Box>
        <Stack alignItems="center" spacing="20px" margin="100px 0">
            <Stack direction="row" spacing={2}>
                {loading ?
                    <Button variant="contained">Loading...</Button> :
                    !isActive ?
                        <Button variant="contained" onClick={() => setOpen(true)}>Connect Wallet</Button> :
                        <>
                            <Button
                                variant="contained"
                                size="small"
                                onClick={handleDisconnect}
                            >
                                Disconnect
                            </Button>

                            {/* <Select
                                variant="outlined"
                                size="small"
                                sx={{ width: 140 }}
                                value={chainId}
                                onChange={handleNetwordChange}
                            >
                                {Object.entries(CHAIN_IDS_TO_NAMES).map(([key, value]) => <MenuItem value={key}>{value}</MenuItem>)}
                            </Select> */}
                        </>
                }
            </Stack>

            {isActive && <>
                <Box>
                    {`Account: ${account}`}
                    {chainId && <Network>{getChainName(chainId)}</Network>}
                </Box>
                <Stack direction="row" spacing="30px">
                    <Box>
                        <Title>Domain</Title>
                        <Editor value={domain} onChange={(value) => setDomain(value)} />
                    </Box>
                    <Box>
                        <Title>Type</Title>
                        <Editor value={type} onChange={(value) => setType(value)} />
                    </Box>
                    <Box>
                        <Title>Message</Title>
                        <Editor value={message} onChange={(value) => setMessage(value)} />
                    </Box>
                </Stack>
                <Button
                    variant="contained"
                    size="small"
                    onClick={handleSigner}
                >
                    Signer
                </Button>
            </>}
        </Stack >

        <WalletDialog
            open={open}
            onClose={() => setOpen(false)}
        />
    </Box>

}

export default Wallet;
