import React from "react";
import { BigNumber, utils } from "ethers";
import { LogoIcon, LoadingOverlay } from "@crossbell/ui";

import { MainBtn, Field, FiledTips, TextInput } from "../../components";
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
	notEnoughGasFee = "notEnoughGasFee",
}

export type TransferCSBProps = {
	toAddress: string;
	onSuccess: () => void;
};

const minGasFee = utils.parseUnits("0.000021");

export function TransferCSB({ toAddress, onSuccess }: TransferCSBProps) {
	const { balance } = useAccountBalance();
	const [value, setValue] = React.useState("0.00");
	const maxAmount = getMaxAmount(balance);
	const amount = React.useMemo(() => normalizeNumber(value, balance), [value]);
	const { isLoading, mutate: transferCsb } = useTransferCsb({ onSuccess });
	const errorMsg = BigNumber.isBigNumber(amount)
		? null
		: normalizeErrorToMsg(amount, maxAmount);

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
						type="number"
						placeholder="0.00"
						autoFocus={true}
						value={value}
						className={styles.input}
						rightSection={
							<div
								className={styles.maxContainer}
								onClick={() => setValue(utils.formatUnits(maxAmount))}
							>
								<button disabled={maxAmount.lte(ZERO)} className={styles.max}>
									Max
								</button>
							</div>
						}
						onInput={(e) => {
							setValue(e.currentTarget.value);
						}}
					/>

					<FiledTips color="#E65040">
						{errorMsg || (
							<>
								<div>Gas Fee: {utils.formatUnits(minGasFee)}</div>
								<div>
									Tips: With 0.01 $CSB, you can like, comment, and mint roughly
									70 times on our platform!
								</div>
							</>
						)}
					</FiledTips>
				</Field>

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

function normalizeErrorToMsg(error: NormalizeError, maxAmount: BigNumber) {
	switch (error) {
		case NormalizeError.invalidFormat:
			return "Invalid number format";
		case NormalizeError.outOfRange:
			return (
				<>
					The transfer number should be between{" "}
					<span className={styles.nowrap}>
						0 - {utils.formatUnits(maxAmount)}
					</span>
				</>
			);
		case NormalizeError.notEnoughGasFee:
			return `Require a minimum of ${utils.formatUnits(minGasFee)} gas fee`;
	}
}

function getMaxAmount(balance: UseAccountBalanceResult["balance"]) {
	return balance?.value.sub(minGasFee) ?? utils.parseUnits("0.00");
}

function normalizeNumber(
	input: string | undefined,
	balance: UseAccountBalanceResult["balance"]
): BigNumber | NormalizeError {
	try {
		if (!input || !balance) return ZERO;

		const num = utils.parseUnits(input, balance.decimals);

		if (balance.value.lte(minGasFee)) {
			return NormalizeError.notEnoughGasFee;
		}

		if (num.add(minGasFee).gt(balance.value) || num.lt(ZERO)) {
			return NormalizeError.outOfRange;
		}

		return num;
	} catch {
		return NormalizeError.invalidFormat;
	}
}
