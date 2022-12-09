import { LoadingOverlay } from "@mantine/core";
import classNames from "classnames";
import React from "react";

import { Header } from "../components/header";
import { PasswordInput } from "../components/password-input";
import { Field } from "../components/field";
import { PasswordIcon } from "../components/icons";
import { NextStepButton } from "../components/next-step-button";

import { SceneKind } from "../types";
import { useResetPasswordStore, useScenesStore } from "../stores";

export function InputEmailToResetPassword2() {
	const store = useResetPasswordStore();
	const scene = useScenesStore();
	const [visible, setVisible] = React.useState(false);

	return (
		<>
			<Header title="Reset Password" />
			<div data-animation="scale-fade-in" className="sm:w-362px p-24px">
				<Field
					title="New Password"
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
					/>
				</Field>

				<div className="flex justify-end mt-48px">
					<NextStepButton
						disabled={!store.computed.canReset}
						onClick={() =>
							store.resetPassword().then((ok) => {
								if (ok) {
									scene.goTo(SceneKind.inputEmailToResetPassword3);
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
