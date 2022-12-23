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

export function InputEmailToRegister2() {
	const goTo = useScenesStore(({ goTo }) => goTo);
	const store = useEmailRegisterStore();
	const [visible, setVisible] = React.useState(false);
	const [isWaiting, setIsWaiting] = React.useState(false);

	return (
		<>
			<Header title="Register Email Account 2/2" />
			<div data-animation="scale-fade-in" className="sm:w-362px p-24px">
				<Field
					title="Password"
					className="mb-24px"
					icon={
						<PasswordIcon
							className={classNames("transition")}
							style={{ color: store.passwordMsg.color }}
						/>
					}
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
					icon={
						<PasswordIcon
							className={classNames("transition")}
							style={{ color: store.password2Msg.color }}
						/>
					}
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
					className="mt-12px"
					checked={store.isPolicyChecked}
					onChange={store.toggleCheckPolicy}
					classNames={{
						inner: "w-12px h-12px flex-shrink-0 mt-4px",
						input: "w-full h-full",
						body: "flex items-start gap-6px",
						label: "pl-0 text-12px text-[#999]",
						labelWrapper: "flex-1",
					}}
					color="green"
					label={
						<span className="whitespace-pre-wrap">
							{"I have read and agree to the "}
							<a
								href="https://legal.xlog.app/Terms-of-Service"
								target="_blank"
								rel="noreferrer"
								className="text-[#F6C549]"
							>
								Terms of Service
							</a>
							{" and\nthe "}
							<a
								href="https://legal.xlog.app/Privacy-Policy"
								target="_blank"
								rel="noreferrer"
								className="text-[#F6C549]"
							>
								Privacy Policy
							</a>
							{"."}
						</span>
					}
					radius="xs"
				/>

				<div className="flex justify-between mt-48px">
					<button
						onClick={() => goTo(SceneKind.inputEmailToConnect)}
						className="transition text-[#999] hover:text-[#111] bg-transparent border-none text-14px font-400 flex items-center justify-center px-0 py-14px font-roboto gap-12px cursor-pointer"
					>
						Have an account already?
					</button>

					<NextStepButton
						disabled={!store.computed.canGoToStep3}
						onClick={() => {
							setIsWaiting(true);
							wait(2000).then(() => goTo(SceneKind.inputEmailToRegister3));
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
