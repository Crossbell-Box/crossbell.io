import { Checkbox, LoadingOverlay } from "@mantine/core";
import classNames from "classnames";
import React from "react";

import { PasswordIcon } from "../../../components";

import { Header } from "../components/header";
import { PasswordInput } from "../components/password-input";
import { Field } from "../components/field";
import { NextStepButton } from "../components/next-step-button";

import { SceneKind } from "../types";
import { useScenesStore, useEmailRegisterStore } from "../stores";

import styles from "./input-email-to-register-2.module.css";

export function InputEmailToRegister2() {
	const goTo = useScenesStore(({ goTo }) => goTo);
	const store = useEmailRegisterStore();
	const [visible, setVisible] = React.useState(false);
	const [isWaiting, setIsWaiting] = React.useState(false);

	return (
		<>
			<Header title="Register Email Account 2/2" />
			<div data-animation="scale-fade-in" className={styles.container}>
				<Field
					title="Password"
					className={classNames(styles.field, styles.passwordField)}
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
						name="password1"
						autoComplete="new-password"
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
						name="password2"
						autoComplete="new-password"
					/>
				</Field>

				<Checkbox
					className={styles.checkbox}
					checked={store.isPolicyChecked}
					onChange={store.toggleCheckPolicy}
					classNames={{
						inner: styles.checkboxInner,
						input: styles.checkboxInput,
						body: styles.checkboxBody,
						label: styles.checkboxLabel,
						labelWrapper: styles.checkboxLabelWrapper,
					}}
					color="green"
					label={
						<span className={styles.checkboxLabelContent}>
							{"I have read and agree to the "}
							<a
								href="https://legal.xlog.app/Terms-of-Service"
								target="_blank"
								rel="noreferrer"
							>
								Terms of Service
							</a>
							{" and\nthe "}
							<a
								href="https://legal.xlog.app/Privacy-Policy"
								target="_blank"
								rel="noreferrer"
							>
								Privacy Policy
							</a>
							{"."}
						</span>
					}
					radius="xs"
				/>

				<div className={styles.actions}>
					<button
						onClick={() => goTo({ kind: SceneKind.inputEmailToConnect })}
						className={styles.goToEmailLogin}
					>
						Have an account already?
					</button>

					<NextStepButton
						disabled={!store.computed.canGoToStep3}
						onClick={() => {
							setIsWaiting(true);
							wait(2000).then(() =>
								goTo({ kind: SceneKind.inputEmailToRegister3 }),
							);
						}}
					>
						Register
					</NextStepButton>
				</div>
			</div>
			<LoadingOverlay visible={isWaiting} />
		</>
	);
}

function wait(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
