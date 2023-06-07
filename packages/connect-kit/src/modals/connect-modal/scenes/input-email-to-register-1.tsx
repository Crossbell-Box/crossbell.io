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
import { useEmailRegisterStore, useScenesStore } from "../stores";

import styles from "./input-email-to-register-1.module.css";

export function InputEmailToRegister1() {
	const goTo = useScenesStore(({ goTo }) => goTo);
	const store = useEmailRegisterStore();

	const verifyCode = React.useCallback(() => {
		if (store.computed.canVerifyCode) {
			store.verifyCode().then((isCodeValid) => {
				if (isCodeValid) {
					goTo({ kind: SceneKind.inputEmailToRegister2 });
				}
			});
		}
	}, [store, goTo]);

	return (
		<>
			<Header title="Register Email Account 1/2" />
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
					tips={<span className={styles.fieldTips}>{store.emailErrorMsg}</span>}
				>
					<TextInput
						name="email"
						type="email"
						spellCheck="false"
						autoCorrect="off"
						autoCapitalize="off"
						autoComplete="email"
						onBlur={store.validateEmail}
						value={store.email}
						onKeyDown={({ key }) => {
							if (key === "Enter") {
								store.sendCode();
							}
						}}
						onChange={(e) => store.updateEmail(e.currentTarget.value)}
						disabled={store.computed.isPending}
						className={styles.emailInput}
						rightSection={
							<button
								disabled={!store.computed.canSendCode}
								className={styles.sendEmailBtn}
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
					<TipsSection className={styles.codeSentTips}>
						We've sent a verification email to you. Please check your email
						inbox and enter the Verification Code. If you didn't receive the
						email after a while, please check your spam or junk mail folder or
						contact us.
					</TipsSection>
				)}

				<Field
					title="Verification Code"
					className={styles.field}
					icon={
						<PasswordIcon
							style={{
								color: store.codeErrorMsg
									? "rgb(var(--color-230_80_64))"
									: "rgb(var(--color-255_183_77))",
							}}
						/>
					}
					tips={
						<span className={styles.fieldTips} title={store.codeErrorMsg}>
							{store.codeErrorMsg}
						</span>
					}
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
					<button
						disabled={store.computed.isPending}
						onClick={() => goTo({ kind: SceneKind.inputEmailToConnect })}
						className={styles.goToEmailLoginBtn}
					>
						Have an account already?
					</button>

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
