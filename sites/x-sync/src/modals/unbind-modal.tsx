import React, { useState } from "react";
import {
	Modal,
	Button,
	Card,
	Space,
	Text,
	LoadingOverlay,
} from "@mantine/core";
import classNames from "classnames";
import { openConfirmModal } from "@mantine/modals";
import { Controlled as Zoom } from "react-medium-image-zoom";

import { Image } from "~/shared/components/image";
import {
	getPlatformDisplayName,
	getVeriHandle,
	SupportedPlatform,
	useUnbindAccount,
} from "@crossbell/connect-kit";
import { useAccountCharacter } from "@crossbell/connect-kit";

import seeYouImage from "@/public/images/sync/see-you-later.svg";

import { getChangeBioUrl, openWindowToChangeBio } from "../utils";

import { BIO_IMAGE_MAP } from "./binding-modal.images";
import { useUnbindModalState } from "./unbind-modal.state";

export function openUnbindingModal(
	platform: SupportedPlatform,
	identity: string
) {
	openConfirmModal({
		title: `Unbind`,
		classNames: {
			content: "rounded-28px p-24px w-312px",
			title: "text-24px font-400 leading-32px",
		},
		children: `Are you sure you'd like to stop syncing your ${getPlatformDisplayName(
			platform
		)} content?`,
		labels: { confirm: "I've decided", cancel: "Cancel" },
		confirmProps: { color: "red", variant: "subtle" },
		cancelProps: { color: "blue", variant: "subtle" },
		onConfirm: () => {
			setTimeout(() => {
				useUnbindModalState.getState().show({ platform, identity });
			}, 500);
		},
	});
}

export function UnbindingModal() {
	const { isActive, meta, hide } = useUnbindModalState();
	const [isZoomed, setIsZoomed] = useState(false);
	// steps
	const [step, setStep] = useState(0);

	const character = useAccountCharacter();
	const veriHandle = character?.handle && getVeriHandle(character?.handle);

	const unbindAccount = useUnbindAccount(character?.characterId);
	const ableToClose = !unbindAccount.isLoading && !isZoomed;

	return (
		<Modal
			opened={isActive}
			onClose={hide}
			zIndex={11}
			padding={0}
			classNames={{ content: "rounded-28px overflow-hidden" }}
			withCloseButton={false}
			closeOnClickOutside={ableToClose}
			closeOnEscape={ableToClose}
		>
			{meta && (
				<Card className="flex flex-col justify-between">
					<LoadingOverlay visible={unbindAccount.isLoading} />

					{step === 0 && (
						<>
							<Card.Section>
								<Zoom isZoomed={isZoomed} onZoomChange={setIsZoomed}>
									<Image
										src={BIO_IMAGE_MAP[meta.platform]}
										placeholder="empty"
										className="w-full h-auto"
									/>
								</Zoom>

								<div className="p-24px mb-24px">
									<h4 className="text-24px leading-32px font-400 mt-0 mb-12px">
										Unbind
									</h4>

									<p className="text-16px leading-24px font-400 mt-0 mb-48px">
										After unbinding, the system will stop syncing your content.
									</p>

									<div className="flex items-center mb-12px">
										<Text className="i-csb:person-remove text-36px text-blue-primary mr-8px" />
										<span className="text-16px leading-24px font-500">
											{"Delete your handle in the "}
											<a
												className="text-blue-primary"
												href={getChangeBioUrl(meta.platform, meta.identity)}
												target="_blank"
												rel="noreferrer"
											>
												{getPlatformDisplayName(meta.platform)} account
											</a>
											{" bio"}
										</span>
									</div>

									<div className="flex w-full h-44px">
										<div className="h-full bg-[#1C1B1F]/4 border-none rounded-l-8px flex-1 flex items-center justify-center text-[#737272] text-16px leading-24px font-400">
											{veriHandle}
										</div>
										<button
											className={classNames(
												"h-full border border-1 border-[#E1E8F7] rounded-r-8px bg-[#FAFCFF] outline-none",
												"text-14px leading-20px font-500 font-roboto text-blue-primary cursor-pointer p-12px",
												"flex items-center justify-center"
											)}
											onClick={() =>
												openWindowToChangeBio(meta.platform, meta.identity)
											}
										>
											Visit
											<Text className="i-csb:arrow-forward text-20px ml-4px" />
										</button>
									</div>
								</div>
							</Card.Section>

							<div className="flex flex-row justify-end">
								<Button
									className="font-500"
									color="blue"
									variant="outline"
									size="md"
									radius={100}
									onClick={hide}
								>
									Cancel
								</Button>
								<Space w={5} />
								<Button
									className="font-500"
									color="blue"
									size="md"
									radius={100}
									onClick={() => {
										if (meta) {
											unbindAccount.mutate(meta, {
												onSuccess: () => {
													setStep((v) => v + 1);
												},
											});
										}
									}}
									disabled={unbindAccount.isLoading}
								>
									Confirm
								</Button>
							</div>
						</>
					)}

					{step === 1 && (
						<Card.Section>
							<div className="flex flex-col justify-center">
								<Image
									src={seeYouImage}
									placeholder="empty"
									className="w-87% h-auto -mt-8%"
								/>

								<p className="text-center font-500 text-16px leading-24px text-[#49454F] mt-0 mb-48px">
									Unbind successfully!
								</p>

								<Button
									className="w-328px h-40px block mx-auto mb-24px text-14px font-500"
									color="blue"
									radius={100}
									onClick={hide}
								>
									Awesome
								</Button>
							</div>
						</Card.Section>
					)}
				</Card>
			)}
		</Modal>
	);
}
