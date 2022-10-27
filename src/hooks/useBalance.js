

import { useState, useEffect } from 'react';
import { formatUnits, parseUnits } from '@ethersproject/units';

import { useERC20Contract } from "./useContract";

export function getParseWei(value, unit) {
    if (!value && value !== 0) return;

    return parseUnits(value, unit ?? "ether");
}

export function fullNumber(value, exact) {
    const valueStr = String(value);

    if (value === 0) {
        return "0"
    } else if (typeof value === "number" && isNaN(value)) {
        return "NaN"
    } else if (!value) {
        return "null";
    }

    if (!/e/i.test(valueStr)) return valueStr;

    const strArr = valueStr.split(/[.\e]/);

    if (strArr.length === 3) {
        var [integer, decimal, power] = strArr;
    } else {
        var [integer, power] = strArr;
    }

    const powerNum = Number(power);

    if (powerNum > 0) {
        return `${integer}${decimal ?? ""}${"0".repeat(Math.abs(powerNum) - decimal?.length ?? 0)}`;
    } else {
        return `0.${"0".repeat(Math.abs(powerNum) - integer?.length ?? 0)}${integer}${decimal ?? ""}`;
    }
}

function getFormatNumber(value, unit) {
    return fullNumber(formatUnits(value, unit ?? "ether"));
}

export const useBalance = (tokenAddress) => {
    const [balance, setBalance] = useState();

    const erc20Contract = useERC20Contract(tokenAddress);

    console.log("=============> erc20Contract", erc20Contract);

    const getTokenBalances = async () => {
        if (!erc20Contract) return;

        try {
            const balance = await erc20Contract.balanceOf(tokenAddress);
            console.log(balance);
            setBalance(getFormatNumber(balance));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getTokenBalances();
    }, [erc20Contract]);

    return { balance };
}