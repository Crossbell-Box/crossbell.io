import React from "react";
import classNames from "classnames";
import { LoadingOverlay } from "@mantine/core";

import { useRefreshDynamicContainer } from "../../../components";

import { Header } from "../components/header";
import { TextInput } from "../components/text-input";
import { Field } from "../components/field";
import { EmailIcon, PasswordIcon, RegisterIcon } from "../components/icons";
import { NextStepButton } from "../components/next-step-button";
import { CodeInput } from "../components/code-input";
import { TipsSection } from "../components/tips-section";

import { SceneKind } from "../types";
import { useEmailRegisterStore, useScenesStore } from "../stores";

export function InputEmailToRegister1() {
	const goTo = useScenesStore(({ goTo }) => goTo);
	const store = useEmailRegisterStore();
	const refreshSize = useRefreshDynamicContainer();

	// eslint-disable-next-line react-hooks/exhaustive-deps
	React.useEffect(refreshSize, [store.isCodeSent]);

	const verifyCode = React.useCallback(() => {
		if (store.computed.canVerifyCode) {
			store.verifyCode().then((isCodeValid) => {
				if (isCodeValid) {
					goTo(SceneKind.inputEmailToRegister2);
				}
			});
		}
	}, [store, goTo]);

	return (
		<>
			<Header title="Register Email Account 1/2" />
			<div data-animation="scale-fade-in" className="sm:w-362px p-24px">
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
						className="pr-108px"
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
							"We've sent a verification email to you. Please check your email inbox and enter the Verification Code. If you didn't receive the email after a while, please check your spam or junk mail folder or contact us."
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
					tips={
						<span className="text-[#E65040]" title={store.codeErrorMsg}>
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

				<div className="flex justify-between mt-48px">
					<button
						disabled={store.computed.isPending}
						onClick={() => goTo(SceneKind.inputEmailToConnect)}
						className="transition text-[#999] hover:text-[#111] bg-transparent border-none text-14px font-400 flex items-center justify-center px-40px py-14px font-roboto gap-12px cursor-pointer"
					>
						<RegisterIcon />
						Login
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
