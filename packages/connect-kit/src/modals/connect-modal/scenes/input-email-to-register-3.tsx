import React from "react";
import { LoadingOverlay, Tooltip } from "@mantine/core";
import { useWeb2Url, CircleHelpIcon } from "@crossbell/ui";

import {
	CheckIcon,
	CrossbellIcon,
	EmailIcon,
	MemberIcon,
} from "../../../components";
import { IMAGES } from "../../../utils";

import { Header } from "../components/header";
import { TextInput } from "../components/text-input";
import { Field } from "../components/field";
import { NextStepButton } from "../components/next-step-button";

import { SceneKind } from "../types";
import { useEmailRegisterStore, useScenesStore } from "../stores";

import styles from "./input-email-to-register-3.module.css";

export function InputEmailToRegister3() {
	const store = useEmailRegisterStore();
	const scene = useScenesStore();
	const imgUrl = useWeb2Url(IMAGES.whatIsCharacterImg);

	const register = React.useCallback(() => {
		if (store.computed.canRegister) {
			store.register().then((ok) => {
				if (ok) {
					scene.goTo(SceneKind.inputEmailToRegister4);
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
