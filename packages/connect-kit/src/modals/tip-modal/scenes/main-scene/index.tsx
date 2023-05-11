import React from "react";
import { CharacterAvatar, Loading, MiraIcon, useWeb2Url } from "@crossbell/ui";
import { useCharacter } from "@crossbell/indexer";
import { extractCharacterName } from "@crossbell/util-metadata";
import { CharacterEntity } from "crossbell";
import { useRefCallback } from "@crossbell/util-hooks";
import classNames from "classnames";
import { useAccountMiraBalance, useTip } from "@crossbell/react-account";

import { IMAGES } from "../../../../utils";
import { BottomTips, DynamicScenesContainer } from "../../../../components";

import { Header } from "../../components";
import { useScenesStore, useTipModal } from "../../stores";
import { SceneKind } from "../../types";

import styles from "./index.module.css";
import { Options } from "./options";
import { TipsListEntry } from "./tips-list-entry";

export function MainScene() {
	const { characterId, noteId } = useTipModal();
	const { data: character, isLoading: isLoadingCharacter } =
		useCharacter(characterId);
	const { balance, isLoading: isLoadingBalance } = useAccountMiraBalance();
	const onSuccess = useOnSuccess({ character });
	const tip = useTip({ onSuccess });
	const isLoading = isLoadingCharacter || isLoadingBalance || tip.isLoading;

	return (
		<DynamicScenesContainer className={styles.modalContainer} padding="0">
			<div className={classNames(styles.avatar, isLoading && styles.isLoading)}>
				<CharacterAvatar size={72} character={character} />
			</div>

			<div
				className={classNames(
					styles.loadingOverlay,
					isLoading && styles.isLoading
				)}
			>
				<Loading />
			</div>

			<div data-kind="modal-container">
				<Header />

				<p className={styles.title}>Your tips will help to spread the note</p>

				<div className={styles.main}>
					<p className={styles.characterName}>
						{extractCharacterName(character)}
					</p>

					<Options
						balance={balance}
						onSelect={(amount) => {
							if (characterId) {
								tip.mutate({ characterId, noteId, amount });
							}
						}}
					/>

					<div className={styles.tips}>1 MIRA ≈ 1 USDC</div>

					<div className={styles.infos}>
						<div className={styles.mira}>
							<MiraIcon />
							<div>
								{"Balance: "}
								<strong>
									{balance ? (balance.value === 0n ? 0 : balance.formatted) : 0}
									{` MIRA`}
								</strong>
							</div>
						</div>

						<TipsListEntry />
					</div>

					<a
						href="https://mira.crossbell.io"
						target="_blank"
						className={styles.bottomTipsContainer}
					>
						<BottomTips>What is MIRA? Where can I get some?</BottomTips>
					</a>
				</div>
			</div>
		</DynamicScenesContainer>
	);
}

function useOnSuccess({
	character,
}: {
	character: CharacterEntity | null | undefined;
}) {
	const scenes = useScenesStore();
	const tipModal = useTipModal();
	const illustrationUrl = useWeb2Url(IMAGES.tipSuccessIllustration);

	return useRefCallback(() => {
		scenes.goTo({
			kind: SceneKind.congrats,
			title: "Tipped!",
			desc: `Thanks for tipping @${character?.handle}. We think they're pretty awesome too.`,
			tips: "Congrats.",
			onClose: tipModal.hide,
			timeout: "15s",
			btnText: "",
			onClickBtn() {},
			illustration: (
				<div className={styles.successIllustration}>
					<img src={illustrationUrl} width={160} height={160} alt="Coin" />
				</div>
			),
		});
	});
}
