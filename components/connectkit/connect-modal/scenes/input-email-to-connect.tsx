import { Button, Tooltip, LoadingOverlay } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import classNames from "classnames";
import React from "react";

import { Header } from "../components/header";
import { TextInput } from "../components/text-input";
import { PasswordInput } from "../components/password-input";
import { Field } from "../components/field";
import { EmailIcon, PasswordIcon, RegisterIcon } from "../components/icons";
import { NextStepButton } from "../components/next-step-button";

import { SceneKind } from "../types";
import { useScenesStore, useEmailConnectStore } from "../stores";

export function InputEmailToConnect() {
	const goTo = useScenesStore(({ goTo }) => goTo);
	const store = useEmailConnectStore();
	const needAutoDisplayTooltipRef = React.useRef(true);
	const [visible, setVisible] = React.useState(false);
	const tooltip = useTooltipState();

	return (
		<>
			<Header title="Connect Email" />
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
						value={store.email}
						onBlur={store.validateEmail}
						onFocus={tooltip.hide}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							store.updateEmail(e.currentTarget.value)
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
						value={store.password}
						onFocus={tooltip.hide}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							store.updatePassword(e.currentTarget.value)
						}
						onKeyDown={({ key }) => {
							if (key === "Enter") {
								store.connect();
							}
						}}
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
							onClick={() => goTo(SceneKind.inputEmailToRegister1)}
							className="transition text-[#999] hover:text-[#111] bg-transparent border-none text-14px font-400 flex items-center justify-center px-40px py-14px font-roboto gap-12px cursor-pointer"
						>
							<RegisterIcon />
							Register
						</button>
					</Tooltip>

					<NextStepButton
						disabled={!store.computed.isAbleToConnect}
						onClick={store.connect}
					>
						Connect
					</NextStepButton>
				</div>
			</div>
			<LoadingOverlay visible={store.computed.isPending} />
		</>
	);
}

function useTooltipState() {
	const needAutoDisplayTooltipRef = React.useRef(true);
	const [isActive, { open, close }] = useDisclosure(false);

	React.useEffect(() => {
		const timeout = setTimeout(() => {
			if (needAutoDisplayTooltipRef.current) {
				open();
			}
		}, 300);

		return () => clearTimeout(timeout);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return React.useMemo(
		() => ({
			isActive,

			show: open,

			hide() {
				close();
				needAutoDisplayTooltipRef.current = false;
			},
		}),
		[isActive, open, close, needAutoDisplayTooltipRef]
	);
}
