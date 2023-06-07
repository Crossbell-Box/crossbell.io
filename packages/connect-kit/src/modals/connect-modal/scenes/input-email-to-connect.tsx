import { Button, Tooltip, LoadingOverlay } from "@mantine/core";
import { useDisclosure } from "@crossbell/util-hooks";
import classNames from "classnames";
import React from "react";

import { EmailIcon, PasswordIcon, TextInput, Field } from "../../../components";

import { Header } from "../components/header";
import { PasswordInput } from "../components/password-input";
import { NextStepButton } from "../components/next-step-button";

import { SceneKind } from "../types";
import {
	useScenesStore,
	useEmailConnectStore,
	useEmailRegisterStore,
} from "../stores";
import styles from "./input-email-to-connect.module.css";

export function InputEmailToConnect() {
	const goTo = useScenesStore(({ goTo }) => goTo);
	const emailConnectStore = useEmailConnectStore();
	const emailRegisterStore = useEmailRegisterStore();
	const [visible, setVisible] = React.useState(false);
	const tooltip = useTooltipState();

	return (
		<>
			<Header title="Connect Email" />
			<div
				data-animation="scale-fade-in"
				className={styles.container}
				onAnimationEnd={tooltip.markReady}
			>
				<Field
					title="Email Address"
					icon={
						<EmailIcon
							style={{
								color: emailConnectStore.emailErrorMsg
									? "rgb(var(--color-230_80_64))"
									: "rgb(var(--color-255_183_77))",
							}}
						/>
					}
					className={classNames(styles.field, styles.emailField)}
					tips={
						<span className={styles.emailTips}>
							{emailConnectStore.emailErrorMsg}
						</span>
					}
				>
					<TextInput
						name="email"
						type="email"
						spellCheck="false"
						autoCorrect="off"
						autoCapitalize="off"
						autoComplete="email"
						value={emailConnectStore.email}
						onBlur={emailConnectStore.validateEmail}
						onFocus={tooltip.hide}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							emailConnectStore.updateEmail(e.currentTarget.value)
						}
					/>
				</Field>

				<Field
					title="Password"
					icon={<PasswordIcon className={styles.passwordIcon} />}
					tips={
						<Button
							variant="subtle"
							color="gray"
							className={styles.forgotBtn}
							compact={true}
							tabIndex={1}
							onClick={() =>
								goTo({ kind: SceneKind.inputEmailToResetPassword1 })
							}
						>
							Forgot?
						</Button>
					}
				>
					<PasswordInput
						visible={visible}
						onVisibleChange={setVisible}
						value={emailConnectStore.password}
						onFocus={tooltip.hide}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							emailConnectStore.updatePassword(e.currentTarget.value)
						}
						onKeyDown={({ key }) => {
							if (key === "Enter") {
								emailConnectStore.connect();
							}
						}}
						name="password"
						autoComplete="password"
					/>
				</Field>

				<div className={styles.actions}>
					<Tooltip
						label="Register First!"
						withArrow={true}
						opened={tooltip.isActive}
					>
						<button
							onPointerEnter={tooltip.show}
							onPointerLeave={tooltip.hide}
							onClick={() => {
								emailRegisterStore.updateEmail(emailConnectStore.email);
								emailRegisterStore.sendCode();
								goTo({ kind: SceneKind.inputEmailToRegister1 });
							}}
							className={styles.registerBtn}
						>
							Don’t have account?
						</button>
					</Tooltip>

					<NextStepButton
						disabled={!emailConnectStore.computed.isAbleToConnect}
						onClick={emailConnectStore.connect}
					>
						Connect
					</NextStepButton>
				</div>
			</div>
			<LoadingOverlay visible={emailConnectStore.computed.isPending} />
		</>
	);
}

function useTooltipState() {
	const needAutoDisplayTooltipRef = React.useRef(true);
	const [isReady, { open: markReady }] = useDisclosure(false);
	const [isActive, { open, close }] = useDisclosure(false);

	React.useEffect(() => {
		if (!isReady) return;

		const timeout = setTimeout(() => {
			if (needAutoDisplayTooltipRef.current) {
				open();
			}
		}, 300);

		return () => clearTimeout(timeout);
	}, [isReady]);

	return React.useMemo(
		() => ({
			isActive,

			markReady,

			show() {
				if (isReady) {
					open();
				}
			},

			hide() {
				if (isReady) {
					close();
					needAutoDisplayTooltipRef.current = false;
				}
			},
		}),
		[isReady, markReady, isActive, open, close, needAutoDisplayTooltipRef]
	);
}
