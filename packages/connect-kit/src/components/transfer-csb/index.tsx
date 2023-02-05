import React from "react";
import { BigNumber, utils } from "ethers";
import { LogoIcon, LoadingOverlay } from "@crossbell/ui";

import { MainBtn, Field, TextInput } from "../../components";
import {
	useAccountBalance,
	UseAccountBalanceResult,
	useTransferCsb,
} from "../../hooks";

import styles from "./index.module.css";

const ZERO = BigNumber.from(0);

enum NormalizeError {
	invalidFormat = "invalidFormat",
	outOfRange = "outOfRange",
}

export type TransferCSBProps = {
	toAddress: string;
	onSuccess: () => void;
};

export function TransferCSB({ toAddress, onSuccess }: TransferCSBProps) {
	const { balance } = useAccountBalance();
	const [value, setValue] = React.useState("0.00");
	const maxAmount = balance?.formatted ?? "0.00";
	const amount = React.useMemo(() => normalizeNumber(value, balance), [value]);
	const { isLoading, mutate: transferCsb } = useTransferCsb({ onSuccess });

	return (
		<>
			<LoadingOverlay visible={isLoading} />

			<div className={styles.container}>
				<Field
					icon={<LogoIcon className={styles.bell} />}
					title="Amount"
					tips={`Balance: ${balance?.formatted}`}
				>
					<TextInput
						autoFocus={true}
						value={value}
						className={styles.input}
						rightSection={
							<div
								className={styles.maxContainer}
								onClick={() => setValue(maxAmount)}
							>
								<button className={styles.max}>Max</button>
							</div>
						}
						onInput={(e) => {
							setValue(e.currentTarget.value);
						}}
					/>
				</Field>

				{!BigNumber.isBigNumber(amount) && (
					<div className={styles.error}>
						{normalizeErrorToMsg(amount, maxAmount)}
					</div>
				)}

				<MainBtn
					className={styles.mainBtn}
					color="yellow"
					disabled={!BigNumber.isBigNumber(amount) || amount.isZero()}
					onClick={() => {
						if (BigNumber.isBigNumber(amount)) {
							transferCsb({ toAddress, amount });
						}
					}}
				>
					Transfer
				</MainBtn>
			</div>
		</>
	);
}

function normalizeErrorToMsg(error: NormalizeError, maxAmount: string) {
	switch (error) {
		case NormalizeError.invalidFormat:
			return "Invalid number format";
		case NormalizeError.outOfRange:
			return (
				<>
					The transfer number should be between{" "}
					<span className={styles.nowrap}>0 - {maxAmount}</span>
				</>
			);
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
