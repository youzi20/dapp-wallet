
function opacify(amount: number, hexColor: string): string {
    if (!hexColor.startsWith('#')) {
        return hexColor
    }

    if (hexColor.length !== 7) {
        throw new Error(`opacify: provided color ${hexColor} was not in hexadecimal format (e.g. #000000)`)
    }

    if (amount < 0 || amount > 100) {
        throw new Error('opacify: provided amount should be between 0 and 100')
    }

    const opacityHex = Math.round((amount / 100) * 255).toString(16)
    const opacifySuffix = opacityHex.length < 2 ? `0${opacityHex}` : opacityHex

    return `${hexColor.slice(0, 7)}${opacifySuffix}`
}

export const colors = {
    white: '#FFFFFF',
    black: '#000000',
    gray50: '#F5F6FC',
    gray100: '#E8ECFB',
    gray200: '#C9D0E7',
    gray300: '#99A1BD',
    gray400: '#7C85A2',
    gray500: '#5E6887',
    gray600: '#404963',
    gray700: '#293249',
    gray800: '#141B2B',
    gray900: '#0E111A',
    pink50: '#F9ECF1',
    pink100: '#FFD9E4',
    pink200: '#FBA4C0',
    pink300: '#FF6FA3',
    pink400: '#FB118E',
    pink500: '#C41969',
    pink600: '#8C0F49',
    pink700: '#55072A',
    pink800: '#350318',
    pink900: '#2B000B',
    pinkVibrant: '#F51A70',
    red50: '#FAECEA',
    red100: '#FED5CF',
    red200: '#FEA79B',
    red300: '#FD766B',
    red400: '#FA2B39',
    red500: '#C4292F',
    red600: '#891E20',
    red700: '#530F0F',
    red800: '#380A03',
    red900: '#240800',
    redVibrant: '#F14544',
    yellow50: '#F6F2D5',
    yellow100: '#DBBC19',
    yellow200: '#DBBC19',
    yellow300: '#BB9F13',
    yellow400: '#A08116',
    yellow500: '#866311',
    yellow600: '#5D4204',
    yellow700: '#3E2B04',
    yellow800: '#231902',
    yellow900: '#180F02',
    yellowVibrant: '#FAF40A',
    // TODO: add gold 50-900
    gold200: '#EEB317',
    goldVibrant: '#FEB239',
    green50: '#E3F3E6',
    green100: '#BFEECA',
    green200: '#76D191',
    green300: '#40B66B',
    green400: '#209853',
    green500: '#0B783E',
    green600: '#0C522A',
    green700: '#053117',
    green800: '#091F10',
    green900: '#09130B',
    greenVibrant: '#5CFE9D',
    blue50: '#EDEFF8',
    blue100: '#DEE1FF',
    blue200: '#ADBCFF',
    blue300: '#869EFF',
    blue400: '#4C82FB',
    blue500: '#1267D6',
    blue600: '#1D4294',
    blue700: '#09265E',
    blue800: '#0B193F',
    blue900: '#040E34',
    blueVibrant: '#587BFF',
    // TODO: add magenta 50-900
    magentaVibrant: '#FC72FF',
    purple900: '#1C0337',
    // TODO: add all other vibrant variations
    networkEthereum: '#627EEA',
    networkOptimism: '#FF0420',
    networkOptimismSoft: 'rgba(255, 4, 32, 0.16)',
    networkPolygon: '#A457FF',
    networkArbitrum: '#28A0F0',
    networkPolygonSoft: 'rgba(164, 87, 255, 0.16)',
    networkEthereumSoft: 'rgba(98, 126, 234, 0.16)',
}

export const colorsDark = {
    userThemeColor: colors.magentaVibrant,

    backgroundBackdrop: colors.black,
    backgroundSurface: colors.gray900,
    backgroundModule: colors.gray800,
    backgroundInteractive: colors.gray700,
    backgroundFloating: opacify(12, colors.black),
    backgroundOutline: opacify(14, colors.gray300),
    backgroundScrim: opacify(72, colors.gray900),
    backgroundScrolledSurface: opacify(72, colors.gray900),

    textPrimary: colors.white,
    textSecondary: colors.gray300,
    textTertiary: colors.gray500,

    accentAction: colors.blue400,
    accentActive: colors.blue400,
    accentSuccess: colors.green200,
    accentWarning: colors.gold200,
    accentFailure: colors.red300,
    accentCritical: colors.red300,

    accentActionSoft: opacify(24, colors.blue400),
    accentActiveSoft: opacify(24, colors.blue400),
    accentSuccessSoft: opacify(24, colors.green400),
    accentWarningSoft: opacify(24, colors.gold200),
    accentFailureSoft: opacify(12, colors.red400),

    accentTextDarkPrimary: opacify(80, colors.gray900),
    accentTextDarkSecondary: opacify(60, colors.gray900),
    accentTextDarkTertiary: opacify(24, colors.gray900),

    accentTextLightPrimary: colors.gray50,
    accentTextLightSecondary: opacify(72, colors.gray50),
    accentTextLightTertiary: opacify(12, colors.gray50),

    white: colors.white,
    black: colors.black,

    chain_1: colors.networkEthereum,
    chain_3: colors.yellow400,
    chain_4: colors.pink400,
    chain_5: colors.green400,
    chain_10: colors.networkOptimism,
    chain_137: colors.networkPolygon,
    chain_42: colors.networkArbitrum,
    chain_420: colors.networkEthereum,
    chain_42161: colors.networkEthereum,
    chain_421611: colors.networkEthereum,
    chain_80001: colors.networkPolygon,
    chain_137_background: colors.purple900,
    chain_10_background: colors.red900,
    chain_42161_background: colors.blue900,

    deepShadow: '12px 16px 24px rgba(0, 0, 0, 0.24), 12px 8px 12px rgba(0, 0, 0, 0.24), 4px 4px 8px rgba(0, 0, 0, 0.32);',
    shallowShadow: '4px 4px 10px rgba(0, 0, 0, 0.24), 2px 2px 4px rgba(0, 0, 0, 0.12), 1px 2px 2px rgba(0, 0, 0, 0.12);',
    stateOverlayHover: opacify(8, colors.gray300),
    stateOverlayPressed: opacify(24, colors.gray200),
}