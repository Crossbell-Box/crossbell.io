import React from "react";
import { BigNumber, utils } from "ethers";
import { LogoIcon, LoadingOverlay } from "@crossbell/ui";

import {
	MainBtn,
	Field,
	TextInput,
	useRefreshDynamicContainer,
} from "../../../../components";
import {
	useAccountBalance,
	UseAccountBalanceResult,
	useTransferCsb,
} from "../../../../hooks";
import { OP_SIGN_OPERATOR_ADDRESS } from "../../../../hooks/operator-sign/consts";

import { Header } from "../../components";

import styles from "./index.module.css";

const ZERO = BigNumber.from(0);

enum NormalizeError {
	invalidFormat = "invalidFormat",
	outOfRange = "outOfRange",
}

export function Transfer() {
	const { balance } = useAccountBalance();
	const [value, setValue] = React.useState("0.00");
	const amount = React.useMemo(() => normalizeNumber(value, balance), [value]);
	const { isLoading, mutate: transferCsb } = useTransferCsb();
	const refreshDynamicContainer = useRefreshDynamicContainer();

	React.useEffect(refreshDynamicContainer, [amount]);

	return (
		<div className={styles.container}>
			<LoadingOverlay visible={isLoading} />
			<Header title="$CSB Transfer" />
			<div className={styles.main}>
				<Field
					icon={<LogoIcon className={styles.bell} />}
					title="Amount"
					tips={`Balance:${balance?.formatted}`}
				>
					<TextInput
						autoFocus={true}
						value={value}
						onInput={(e) => {
							setValue(e.currentTarget.value);
						}}
					/>
				</Field>

				{!BigNumber.isBigNumber(amount) && (
					<div className={styles.error}>{normalizeErrorToMsg(amount)}</div>
				)}

				<MainBtn
					className={styles.mainBtn}
					color="yellow"
					disabled={!BigNumber.isBigNumber(amount) || amount.isZero()}
					onClick={() => {
						if (BigNumber.isBigNumber(amount)) {
							transferCsb({
								toAddress: OP_SIGN_OPERATOR_ADDRESS,
								amount: amount,
							});
						}
					}}
				>
					Transfer
				</MainBtn>
			</div>
		</div>
	);
}

function normalizeErrorToMsg(error: NormalizeError) {
	switch (error) {
		case NormalizeError.invalidFormat:
			return "Invalid number format";
		case NormalizeError.outOfRange:
			return "The transfer number should be between 0-0.02";
	}
}

function normalizeNumber(
	input: string | undefined,
	balance: UseAccountBalanceResult["balance"]
): BigNumber | NormalizeError {
	try {
		if (!input || !balance) return ZERO;

		const num = utils.parseUnits(input, balance.decimals);

		if (num.gt(balance.value) || num.lt(ZERO)) {
			return NormalizeError.outOfRange;
		}

		return num;
	} catch {
		return NormalizeError.invalidFormat;
	}
}
