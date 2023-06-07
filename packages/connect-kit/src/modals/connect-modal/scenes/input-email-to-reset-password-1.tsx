import React from "react";
import classNames from "classnames";
import { LoadingOverlay } from "@mantine/core";

import { EmailIcon, PasswordIcon, TextInput } from "../../../components";

import { Header } from "../components/header";
import { Field } from "../components/field";
import { NextStepButton } from "../components/next-step-button";
import { CodeInput } from "../components/code-input";
import { TipsSection } from "../components/tips-section";

import { SceneKind } from "../types";
import { useResetPasswordStore, useScenesStore } from "../stores";

import styles from "./input-email-to-reset-password-1.module.css";

export function InputEmailToResetPassword1() {
	const goTo = useScenesStore(({ goTo }) => goTo);
	const store = useResetPasswordStore();

	const verifyCode = React.useCallback(() => {
		if (store.computed.canVerifyCode) {
			store.verifyCode().then((isCodeValid) => {
				if (isCodeValid) {
					goTo({ kind: SceneKind.inputEmailToResetPassword2 });
				}
			});
		}
	}, [store, goTo]);

	return (
		<>
			<Header title="Reset Password" />
			<div data-animation="scale-fade-in" className={styles.container}>
				<Field
					title="Email Address"
					icon={
						<EmailIcon
							style={{
								color: store.emailErrorMsg
									? "rgb(var(--color-230_80_64))"
									: "rgb(var(--color-255_183_77))",
							}}
						/>
					}
					className={classNames(styles.field, styles.emailField)}
					tips={<span className={styles.tips}>{store.emailErrorMsg}</span>}
				>
					<TextInput
						type="text"
						onBlur={store.validateEmail}
						value={store.email}
						onChange={(e) => store.updateEmail(e.currentTarget.value)}
						disabled={store.computed.isPending}
						rightSection={
							<button
								disabled={!store.computed.canSendCode}
								className={styles.sendCodeBtn}
								style={{
									cursor: store.computed.isPending
										? "progress"
										: store.computed.canSendCode
										? "pointer"
										: "not-allowed",
								}}
								onClick={() => store.sendCode()}
							>
								{store.isCodeSent ? "Try Again" : "Verify"}
								{store.codeResendCountdown > 0
									? ` (${store.codeResendCountdown})`
									: ""}
							</button>
						}
					/>
				</Field>

				{store.isCodeSent && (
					<TipsSection className={styles.sentTips}>
						We've sent an email to you for password reset. Please check your
						email inbox and enter the Verification Code. If you didn't receive
						the email after a while, please check your spam or junk mail folder
						or contact us.
					</TipsSection>
				)}

				<Field
					title="Verification Code"
					icon={
						<PasswordIcon
							style={{
								color: store.codeErrorMsg
									? "rgb(var(--color-230_80_64))"
									: "rgb(var(--color-255_183_77))",
							}}
						/>
					}
					className={styles.field}
					tips={<span className={styles.tips}>{store.codeErrorMsg}</span>}
				>
					<CodeInput
						size={44}
						count={store.codeCount}
						value={store.code}
						onValueChange={store.updateCode}
						onComplete={verifyCode}
					/>
				</Field>

				<div className={styles.actions}>
					<NextStepButton
						disabled={!store.computed.canVerifyCode}
						onClick={verifyCode}
					>
						Next Step
					</NextStepButton>
				</div>
			</div>
			<LoadingOverlay visible={store.computed.isPending} />
		</>
	);
}
