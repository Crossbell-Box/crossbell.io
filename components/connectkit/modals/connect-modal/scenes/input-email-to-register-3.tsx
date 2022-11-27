import React from "react";
import { LoadingOverlay } from "@mantine/core";

import { Header } from "../components/header";
import { TextInput } from "../components/text-input";
import { Field } from "../components/field";
import { CheckIcon, EmailIcon, MemberIcon } from "../components/icons";
import { NextStepButton } from "../components/next-step-button";

import { SceneKind } from "../types";
import { useEmailRegisterStore, useScenesStore } from "../stores";

export function InputEmailToRegister3() {
	const store = useEmailRegisterStore();
	const scene = useScenesStore();

	const register = React.useCallback(() => {
		if (store.computed.canRegister) {
			store.register().then((ok) => {
				if (ok) {
					scene.goTo(SceneKind.inputEmailToRegister4);
				}
			});
		}
	}, [store, scene]);

	return (
		<>
			<Header title="Mint Character" />

			<div data-animation="scale-fade-in" className="w-362px p-24px">
				<div className="flex flex-col items-center justify-center pt-46px">
					<div className="relative">
						<EmailIcon width={72} height={72} className="text-[#FFB74D]" />
						<CheckIcon
							width={72}
							height={72}
							className="absolute -right-25px -bottom-10px text-[#6AD991]"
						/>
					</div>
					<p className="text-16px font-500 mt-8px mb-44px">
						You’re almost done!
					</p>
				</div>

				<Field
					title="Give your character a name"
					icon={<MemberIcon className="text-[#FFB74D]" />}
					className="mb-24px flex flex-col items-center"
				>
					<TextInput
						type="text"
						value={store.characterName}
						onChange={(e) => store.updateCharacterName(e.currentTarget.value)}
						onBlur={() => store.validateCharacterName()}
						onKeyDown={({ key }) => {
							if (key === "Enter") {
								register();
							}
						}}
					/>
				</Field>

				<div className="flex justify-end mt-48px">
					<NextStepButton
						disabled={!store.computed.canRegister}
						onClick={register}
						className="px-50px"
					>
						Mint
					</NextStepButton>
				</div>
			</div>
			<LoadingOverlay visible={store.computed.isPending} />
		</>
	);
}
