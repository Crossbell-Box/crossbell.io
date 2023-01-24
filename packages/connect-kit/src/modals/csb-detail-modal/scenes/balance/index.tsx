import React from "react";
import { LogoIcon } from "@crossbell/ui";

import { ActionBtn, useRefreshDynamicContainer } from "../../../../components";
import {
	useAccountBalance,
	useAccountCharacters,
	useAccountState,
	useOpSignBalance,
} from "../../../../hooks";

import { useScenesStore } from "../../stores";
import { Characters, Header } from "../../components";
import { SceneKind } from "../../types";

import styles from "./index.module.css";
import classNames from "classnames";

export function Balance() {
	const account = useAccountState((s) => s.wallet);
	const goTo = useScenesStore((s) => s.goTo);
	const { balance } = useAccountBalance();
	const opBalance = useOpSignBalance();
	const { characters } = useAccountCharacters();
	const refreshDynamicContainer = useRefreshDynamicContainer();

	React.useEffect(refreshDynamicContainer, [characters]);

	if (!account) return null;

	return (
		<div className={styles.container}>
			<Header title="$CSB Balance" />

			<div className={styles.section}>
				<div className={styles.address} title={account.address}>
					Your address: {formatAddress(account.address)}
				</div>

				<div className={styles.balance}>
					<LogoIcon />
					{balance?.formatted}
					<ActionBtn
						color="yellow"
						height="32px"
						minWidth="85px"
						onClick={() => goTo({ kind: SceneKind.claimCSB })}
					>
						Claim
					</ActionBtn>
				</div>
			</div>

			{account.siwe && (
				<div className={styles.section}>
					<div
						className={classNames(styles.operatorAccount)}
						onClick={() => goTo({ kind: SceneKind.transfer })}
					>
						Operator Account
						<LogoIcon />
						{opBalance?.formatted}
					</div>

					<div className={styles.characters}>
						<Characters />
					</div>
				</div>
			)}
		</div>
	);
}

function formatAddress(address: string): string {
	return address.toLowerCase().replace(/^(\w{8})\w+(\w{9})$/, "$1...$2");
}
