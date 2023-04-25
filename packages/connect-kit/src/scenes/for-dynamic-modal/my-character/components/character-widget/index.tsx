import React from "react";
import { CharacterAvatar, SettingsAccountOutlineIcon } from "@crossbell/ui";
import { extractCharacterName } from "@crossbell/util-metadata";
import { truncateAddress } from "@crossbell/util-ethers";
import {
	GeneralAccount,
	useAccountCharacter,
	useConnectedAccount,
} from "@crossbell/react-account";

import { WalletIcon, EmailIcon } from "../../../../../components";

import styles from "./index.module.css";

export type CharacterWidgetProps = {
	onClickSwitchCharacter: () => void;
};

export function CharacterWidget({
	onClickSwitchCharacter,
}: CharacterWidgetProps) {
	const account = useConnectedAccount();
	const character = useAccountCharacter();

	if (!account || !character) {
		return null;
	}

	const accountAddress = getAccountAddress(account);
	const characterName = extractCharacterName(character);
	const characterHandle = `@${character.handle}`;

	return (
		<div className={styles.container}>
			<div className={styles.characterInfo}>
				<CharacterAvatar
					character={character}
					size="36px"
					className={styles.avatar}
				/>

				<div className={styles.characterInfoMain}>
					<div title={characterName} className={styles.characterName}>
						{characterName}
					</div>
					<div title={characterHandle} className={styles.characterHandle}>
						{characterHandle}
					</div>
				</div>

				{account.type === "wallet" && (
					<SettingsAccountOutlineIcon
						onClick={onClickSwitchCharacter}
						className={styles.switchCharacter}
					/>
				)}
			</div>

			<div className={styles.accountDescription}>
				{getAccountDescription(account)}
			</div>
			<div title={accountAddress} className={styles.accountAddress}>
				{truncateAddress(
					accountAddress,
					account.type === "email"
						? { start: 15, end: 15 }
						: { start: 8, end: 9 }
				)}
			</div>

			{getAccountIcon(account)}
		</div>
	);
}

function getAccountDescription(account: GeneralAccount): string {
	switch (account.type) {
		case "email":
			return "You are Email User";
		case "wallet":
			return "You are Wallet User";
	}
}

function getAccountAddress(account: GeneralAccount): string {
	switch (account.type) {
		case "email":
			return account.email;
		case "wallet":
			return account.address;
	}
}

function getAccountIcon(account: GeneralAccount): React.ReactNode {
	switch (account.type) {
		case "email":
			return <EmailIcon className={styles.emailIcon} />;
		case "wallet":
			return <WalletIcon className={styles.walletIcon} />;
	}
}
