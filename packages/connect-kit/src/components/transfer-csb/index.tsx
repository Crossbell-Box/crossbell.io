import React from "react";
import { Address, formatUnits, parseUnits } from "viem";
import { LogoIcon, LoadingOverlay } from "@crossbell/ui";

import { MainBtn, Field, FiledTips, TextInput } from "../../components";
import {
	useAccountBalance,
	UseAccountBalanceResult,
	useTransferCsb,
} from "@crossbell/react-account";

import styles from "./index.module.css";

enum NormalizeError {
	invalidFormat = "invalidFormat",
	outOfRange = "outOfRange",
	notEnoughGasFee = "notEnoughGasFee",
}

export type TransferCSBProps = {
	toAddress: Address;
	onSuccess: () => void;
};

const minGasFee = parseUnits("0.000021", 18);

export function TransferCSB({ toAddress, onSuccess }: TransferCSBProps) {
	const { balance } = useAccountBalance();
	const [value, setValue] = React.useState("0.00");
	const maxAmount = getMaxAmount(balance);
	const amount = React.useMemo(() => normalizeNumber(value, balance), [value]);
	const { isLoading, mutate: transferCsb } = useTransferCsb({ onSuccess });
	const errorMsg =
		typeof amount === "bigint" ? null : normalizeErrorToMsg(amount, maxAmount);

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
								onClick={() => setValue(formatUnits(maxAmount, 18))}
							>
								<button disabled={maxAmount <= 0n} className={styles.max}>
									Max
								</button>
							</div>
						}
						onInput={(e) => {
							setValue(e.currentTarget.value);
						}}
					/>

					<FiledTips color="rgb(var(--color-230_80_64))">
						{errorMsg || (
							<>
								<div>Gas Fee: {formatUnits(minGasFee, 18)}</div>
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
					disabled={typeof amount !== "bigint" || amount === 0n}
					onClick={() => {
						if (typeof amount === "bigint") {
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

function normalizeErrorToMsg(error: NormalizeError, maxAmount: bigint) {
	switch (error) {
		case NormalizeError.invalidFormat:
			return "Invalid number format";
		case NormalizeError.outOfRange:
			return (
				<>
					The transfer number should be between{" "}
					<span className={styles.nowrap}>
						0 - {formatUnits(maxAmount, 18)}
					</span>
				</>
			);
		case NormalizeError.notEnoughGasFee:
			return `Require a minimum of ${formatUnits(minGasFee, 18)} gas fee`;
	}
}

function getMaxAmount(balance: UseAccountBalanceResult["balance"]) {
	return balance ? balance.value - minGasFee : parseUnits("0.00", 18);
}

function normalizeNumber(
	input: string | undefined,
	balance: UseAccountBalanceResult["balance"]
): bigint | NormalizeError {
	try {
		if (!input || !balance) return 0n;

		const num = parseUnits(input as `${number}`, balance.decimals);

		if (balance.value <= minGasFee) {
			return NormalizeError.notEnoughGasFee;
		}

		if (num + minGasFee > balance.value || num < 0n) {
			return NormalizeError.outOfRange;
		}

		return num;
	} catch {
		return NormalizeError.invalidFormat;
	}
}
