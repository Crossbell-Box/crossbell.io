import React from "react";
import { CharacterAvatar, SettingsAccountOutlineIcon } from "@crossbell/ui";
import { extractCharacterName } from "@crossbell/util-metadata";
import { truncateAddress } from "@crossbell/util-ethers";

import {
	GeneralAccount,
	useAccountCharacter,
	useConnectedAccount,
} from "../../../../hooks";

import { WalletIcon, EmailIcon } from "../../../../components";

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

	return (
		<div className={styles.container}>
			<div className={styles.characterInfo}>
				<CharacterAvatar
					character={character}
					size="36px"
					className={styles.avatar}
				/>

				<div className={styles.characterInfoMain}>
					<div className={styles.characterName}>
						{extractCharacterName(character)}
					</div>
					<div className={styles.characterHandle}>@{character.handle}</div>
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
			<div className={styles.accountAddress}>{getAccountAddress(account)}</div>

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
			return truncateAddress(account.email, { start: 8, end: 9 });
		case "wallet":
			return truncateAddress(account.address, { start: 8, end: 9 });
	}
}

function getAccountIcon(account: GeneralAccount): React.ReactNode {
	switch (account.type) {
		case "email":
			return <EmailIcon className={styles.accountIcon} />;
		case "wallet":
			return <WalletIcon className={styles.accountIcon} />;
	}
}
