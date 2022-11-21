import React from "react";
import classNames from "classnames";
import { LoadingOverlay } from "@mantine/core";

import { Header } from "../components/header";
import { TextInput } from "../components/text-input";
import { Field } from "../components/field";
import { EmailIcon, PasswordIcon } from "../components/icons";
import { NextStepButton } from "../components/next-step-button";
import { CodeInput } from "../components/code-input";
import { TipsSection } from "../components/tips-section";

import { SceneKind } from "../types";
import { useConnectModalContext } from "../context";
import { useResetPasswordStore, useScenesStore } from "../stores";

export function InputEmailToResetPassword1() {
	const goTo = useScenesStore(({ goTo }) => goTo);
	const store = useResetPasswordStore();
	const { refreshSize } = useConnectModalContext();

	// eslint-disable-next-line react-hooks/exhaustive-deps
	React.useEffect(refreshSize, [store.isCodeSent]);

	return (
		<>
			<Header title="Reset Password" />
			<div data-animation="scale-fade-in" className="w-362px p-24px">
				<Field
					title="Email Address"
					icon={
						<EmailIcon
							className={classNames(
								"transition",
								store.emailErrorMsg ? "text-[#E65040]" : "text-[#FFB74D]"
							)}
						/>
					}
					className="mb-24px"
					tips={<span className="text-[#E65040]">{store.emailErrorMsg}</span>}
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
								className={classNames(
									store.computed.isPending
										? "cursor-progress"
										: store.computed.canSendCode
										? "cursor-pointer"
										: "cursor-not-allowed",
									!store.computed.canSendCode && "bg-opacity-50",
									"transition whitespace-nowrap h-full w-100px flex items-center justify-center font-roboto font-500 text-14px text-white bg-[#6AD991] border-none rounded-r-12px"
								)}
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
					<TipsSection className="-mt-14px mb-24px">
						{
							"We've sent an email to verify your account, make sure it didn't wind up in your Junk Mail and enter the Verification Code"
						}
					</TipsSection>
				)}

				<Field
					title="Verification Code"
					icon={
						<PasswordIcon
							className={classNames(
								"transition",
								store.codeErrorMsg ? "text-[#E65040]" : "text-[#FFB74D]"
							)}
						/>
					}
					tips={<span className="text-[#E65040]">{store.codeErrorMsg}</span>}
				>
					<CodeInput
						size={44}
						count={store.codeCount}
						value={store.code}
						onValueChange={store.updateCode}
					/>
				</Field>

				<div className="flex justify-end mt-48px">
					<NextStepButton
						disabled={!store.computed.canVerifyCode}
						onClick={() =>
							store.verifyCode().then((isCodeValid) => {
								if (isCodeValid) {
									goTo(SceneKind.inputEmailToResetPassword2);
								}
							})
						}
					>
						Next Step
					</NextStepButton>
				</div>
			</div>
			<LoadingOverlay visible={store.computed.isPending} />
		</>
	);
}
