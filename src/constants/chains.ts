export enum SupportedChainId {
    MAINNET = 1,
    ROPSTEN = 3,
    RINKEBY = 4,
    GOERLI = 5,
    KOVAN = 42,

    ARBITRUM_ONE = 42161,
    ARBITRUM_RINKEBY = 421611,

    OPTIMISM = 10,
    OPTIMISM_GOERLI = 420,

    POLYGON = 137,
    POLYGON_MUMBAI = 80001,

    // CELO = 42220,
    // CELO_ALFAJORES = 44787,
}

export const CHAIN_IDS_TO_NAMES = {
    [SupportedChainId.MAINNET]: 'mainnet',
    [SupportedChainId.ROPSTEN]: 'ropsten',
    [SupportedChainId.RINKEBY]: 'rinkeby',
    [SupportedChainId.GOERLI]: 'goerli',
    [SupportedChainId.KOVAN]: 'kovan',
    [SupportedChainId.POLYGON]: 'polygon',
    [SupportedChainId.POLYGON_MUMBAI]: 'polygon_mumbai',
    [SupportedChainId.ARBITRUM_ONE]: 'arbitrum',
    [SupportedChainId.ARBITRUM_RINKEBY]: 'arbitrum_rinkeby',
    [SupportedChainId.OPTIMISM]: 'optimism',
    [SupportedChainId.OPTIMISM_GOERLI]: 'optimism_goerli',
    // [SupportedChainId.CELO]: 'celo',
    // [SupportedChainId.CELO_ALFAJORES]: 'celo_alfajores',
}

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = Object.values(SupportedChainId).filter(
    (id) => typeof id === 'number'
) as SupportedChainId[]

export function isSupportedChain(chainId: number | null | undefined): chainId is SupportedChainId {
    return !!chainId && !!SupportedChainId[chainId]
}

export function getChainName(chainId: number | null | undefined) {
    // @ts-ignore
    return chainId ? CHAIN_IDS_TO_NAMES[chainId] : "";
}