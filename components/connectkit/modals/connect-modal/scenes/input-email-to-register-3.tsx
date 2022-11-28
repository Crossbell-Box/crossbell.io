import React from "react";
import { LoadingOverlay, Text, Tooltip } from "@mantine/core";
import Image from "@/components/common/Image";

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
					title={
						<span>
							{"Give your character a name"}
							<Tooltip
								offset={4}
								withinPortal={true}
								px={20}
								py={16}
								radius={16}
								classNames={{ tooltip: "bg-[#6AD991]" }}
								arrowSize={10}
								label={
									<div className="w-312px rounded-16px pb-30px">
										<div className="flex flex-col items-center bg-black rounded-12px">
											<div className="w-125px h-34px relative my-20px">
												<Image
													src="/logos/crossbell-white.svg"
													alt="Crossbell"
													fill
												/>
											</div>

											<div className="aspect-253/128 relative w-full mx-10px mb-10px">
												<Image
													src="/images/connect-kit/what-is-character.png"
													alt="What Is Character"
													fill
												/>
											</div>
										</div>
										<h3 className="text-16px font-600 mt-14px mb-6px">
											Guide - What is Character？
										</h3>
										<p className="text-14px font-400 m-0">
											Character is your Crossbell profile where you can check
											all the content synced from other social media and also
											browse your treasure collection and achievements.
										</p>
									</div>
								}
								openDelay={200}
								multiline={true}
								transition="pop-bottom-left"
								withArrow={true}
							>
								<Text className="i-csb:circle-help inline-block transform -translate-y-1/2" />
							</Tooltip>
						</span>
					}
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
