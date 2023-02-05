import { LoadingOverlay } from "@mantine/core";
import classNames from "classnames";
import React from "react";

import { PasswordIcon } from "../../../components";

import { Header } from "../components/header";
import { PasswordInput } from "../components/password-input";
import { Field } from "../components/field";
import { NextStepButton } from "../components/next-step-button";

import { SceneKind } from "../types";
import {
	useConnectModal,
	useResetPasswordStore,
	useResetResetPasswordStore,
	useScenesStore,
} from "../stores";

import styles from "./input-email-to-reset-password-2.module.css";

export function InputEmailToResetPassword2() {
	const store = useResetPasswordStore();
	const scene = useScenesStore();
	const [visible, setVisible] = React.useState(false);
	const { hide: hideModal } = useConnectModal();
	const resetStore = useResetResetPasswordStore();

	return (
		<>
			<Header title="Reset Password" />
			<div data-animation="scale-fade-in" className={styles.container}>
				<Field
					title="New Password"
					className={classNames(styles.passwordField, styles.field)}
					icon={<PasswordIcon style={{ color: store.passwordMsg.color }} />}
					tips={
						<span style={{ color: store.passwordMsg.color }}>
							{store.passwordMsg.value}
						</span>
					}
				>
					<PasswordInput
						visible={visible}
						onVisibleChange={setVisible}
						value={store.password}
						onBlur={store.validatePassword2}
						onChange={(e) => store.updatePassword(e.currentTarget.value)}
					/>
				</Field>

				<Field
					title="Confirm Password"
					className={styles.field}
					icon={<PasswordIcon style={{ color: store.password2Msg.color }} />}
					tips={
						<span style={{ color: store.password2Msg.color }}>
							{store.password2Msg.value}
						</span>
					}
				>
					<PasswordInput
						visible={visible}
						onVisibleChange={setVisible}
						value={store.password2}
						onBlur={store.validatePassword2}
						onChange={(e) => store.updatePassword2(e.currentTarget.value)}
					/>
				</Field>

				<div className={styles.actions}>
					<NextStepButton
						disabled={!store.computed.canReset}
						onClick={() =>
							store.resetPassword().then((ok) => {
								if (ok) {
									scene.goTo({
										kind: SceneKind.congrats,
										title: "Congrats!",
										desc: "Your password has been reset successfully you need to connect again.",
										tips: "Welcome to new Crossbell",
										btnText: "Connect",
										onClose: hideModal,
										onClickBtn() {
											resetStore();
											scene.resetScenes([
												{ kind: SceneKind.selectConnectKind },
												{ kind: SceneKind.inputEmailToConnect },
											]);
										},
									});
								}
							})
						}
					>
						Reset
					</NextStepButton>
				</div>
			</div>
			<LoadingOverlay visible={store.computed.isPending} />
		</>
	);
}
