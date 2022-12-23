import { Button, Tooltip, LoadingOverlay } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classNames from "classnames";
import React from "react";

import { EmailIcon, PasswordIcon } from "../../../components";

import { Header } from "../components/header";
import { TextInput } from "../components/text-input";
import { PasswordInput } from "../components/password-input";
import { Field } from "../components/field";
import { NextStepButton } from "../components/next-step-button";

import { SceneKind } from "../types";
import {
	useScenesStore,
	useEmailConnectStore,
	useEmailRegisterStore,
} from "../stores";

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
				className="sm:w-362px p-24px"
				onAnimationEnd={tooltip.markReady}
			>
				<Field
					title="Email Address"
					icon={
						<EmailIcon
							className={classNames(
								"transition",
								emailConnectStore.emailErrorMsg
									? "text-[#E65040]"
									: "text-[#FFB74D]"
							)}
						/>
					}
					className="mb-24px"
					tips={
						<span className="text-[#E65040]">
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
					icon={<PasswordIcon className="text-[#FFB74D]" />}
					tips={
						<Button
							variant="subtle"
							color="gray"
							className="font-400"
							compact={true}
							tabIndex={1}
							onClick={() => goTo(SceneKind.inputEmailToResetPassword1)}
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

				<div className="flex justify-between mt-48px">
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
								goTo(SceneKind.inputEmailToRegister1);
							}}
							className="transition text-[#999] hover:text-[#111] bg-transparent border-none text-14px font-400 flex items-center justify-center px-15px py-14px font-roboto gap-12px cursor-pointer"
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
		if (isReady) {
			console.log("!isReady");
			const timeout = setTimeout(() => {
				console.log("timeout!!");
				if (needAutoDisplayTooltipRef.current) {
					open();
				}
			}, 300);

			return () => clearTimeout(timeout);
		}
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
