import React from "react";
import { LoadingOverlay, Tooltip } from "@mantine/core";
import { useWeb2Url, CircleHelpIcon, useUrlComposer } from "@crossbell/ui";

import { useAccountState } from "../../../hooks";
import {
	CheckIcon,
	CrossbellIcon,
	EmailIcon,
	MemberIcon,
	TextInput,
} from "../../../components";
import { IMAGES } from "../../../utils";

import { Header } from "../components/header";
import { Field } from "../components/field";
import { NextStepButton } from "../components/next-step-button";

import { SceneKind } from "../types";
import {
	useConnectModal,
	useEmailRegisterStore,
	useScenesStore,
} from "../stores";

import styles from "./input-email-to-register-3.module.css";

export function InputEmailToRegister3() {
	const urlComposer = useUrlComposer();
	const store = useEmailRegisterStore();
	const scene = useScenesStore();
	const imgUrl = useWeb2Url(IMAGES.whatIsCharacterImg);
	const { hide: hideModal } = useConnectModal();

	const register = React.useCallback(() => {
		if (store.computed.canRegister) {
			store.register().then((ok) => {
				if (ok) {
					const character =
						useAccountState.getState().computed.account?.character;

					scene.goTo({
						kind: SceneKind.congrats,
						title: "Congrats!",
						desc: "Now you can return into the feed and enjoy Crossbell.",
						tips: "Welcome to new Crossbell",
						timeout: "15s",
						btnText: character ? "Check Character" : "Close",
						onClose: hideModal,
						onClickBtn: () => {
							if (character) {
								window.open(urlComposer.characterUrl(character), "_blank");
							}
							hideModal();
						},
					});
				}
			});
		}
	}, [store, scene]);

	return (
		<>
			<Header title="Mint Character" />

			<div data-animation="scale-fade-in" className={styles.container}>
				<div className={styles.tips}>
					<div className={styles.tipsIconSection}>
						<EmailIcon width={72} height={72} className={styles.emailIcon} />
						<CheckIcon width={72} height={72} className={styles.checkIcon} />
					</div>
					<p className={styles.tipsContent}>You’re almost done!</p>
				</div>

				<Field
					title={
						<span>
							{"Give your character a name"}
							<Tooltip
								offset={4}
								withinPortal={true}
								px={20}
								py={16}
								radius={16}
								classNames={{ tooltip: styles.tooltip }}
								arrowSize={10}
								label={
									<div className={styles.tooltipLabel}>
										<div className={styles.tooltipLabelIconSection}>
											<div>
												<CrossbellIcon className={styles.crossbellIcon} />
											</div>

											<div className={styles.whatIsCharacter}>
												<img
													className={styles.whatIsCharacterImg}
													src={imgUrl}
													alt="What Is Character"
												/>
											</div>
										</div>
										<h3 className={styles.whatIsCharacterTitle}>
											Guide - What is Character？
										</h3>
										<p className={styles.whatIsCharacterContent}>
											Character is your Crossbell profile where you can check
											all the content synced from other social media and also
											browse your treasure collection and achievements.
										</p>
									</div>
								}
								openDelay={200}
								multiline={true}
								transition="pop-bottom-left"
								withArrow={true}
							>
								<CircleHelpIcon className={styles.circleHelpIcon} />
							</Tooltip>
						</span>
					}
					icon={<MemberIcon className={styles.memberIcon} />}
					className={styles.nameField}
				>
					<TextInput
						type="text"
						value={store.characterName}
						onChange={(e) => store.updateCharacterName(e.currentTarget.value)}
						onBlur={() => store.validateCharacterName()}
						onKeyDown={({ key }) => {
							if (key === "Enter") {
								register();
							}
						}}
					/>
				</Field>

				<div className={styles.actions}>
					<NextStepButton
						disabled={!store.computed.canRegister}
						onClick={register}
						className={styles.mintBtn}
					>
						Mint
					</NextStepButton>
				</div>
			</div>
			<LoadingOverlay visible={store.computed.isPending} />
		</>
	);
}
