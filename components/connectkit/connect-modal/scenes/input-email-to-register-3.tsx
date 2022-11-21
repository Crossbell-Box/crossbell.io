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
					<p className="text-16px font-500 mt-24px mb-57px">
						Give a name to get your character now!
					</p>
				</div>

				<Field
					title="Your Character Name"
					icon={<MemberIcon className="text-[#FFB74D]" />}
					className="mb-24px flex flex-col items-center"
				>
					<TextInput
						type="text"
						value={store.characterName}
						onChange={(e) => store.updateCharacterName(e.currentTarget.value)}
						onBlur={() => store.validateCharacterName()}
					/>
				</Field>

				<div className="flex justify-end mt-48px">
					<NextStepButton
						disabled={!store.computed.canRegister}
						onClick={() => {
							store.register().then((ok) => {
								if (ok) {
									scene.goTo(SceneKind.inputEmailToRegister4);
								}
							});
						}}
					>
						Mint
					</NextStepButton>
				</div>
			</div>
			<LoadingOverlay visible={store.computed.isPending} />
		</>
	);
}
