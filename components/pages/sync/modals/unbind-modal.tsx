import React, { useState } from "react";
import Image from "@/components/common/Image";
import { openBorderlessModal } from "@/components/common/Modal";
import {
	getPlatformDisplayName,
	getVeriHandle,
	SupportedPlatform,
	useUnbindAccount,
} from "@/utils/apis/operator-sync";
import { Button, Card, Space, Text, LoadingOverlay } from "@mantine/core";
import classNames from "classnames";
import type { StaticImageData } from "next/image";

import HandleGuideMedium from "@/public/images/sync/platforms/medium-bio.png";
import HandleGuideTiktok from "@/public/images/sync/platforms/tiktok-bio.png";
import seeYouImage from "@/public/images/sync/see-you-later.svg";
import { useCurrentCharacter } from "@/utils/apis/indexer";
import { openConfirmModal, closeAllModals } from "@mantine/modals";

import { getChangeBioUrl, openWindowToChangeBio } from "../utils";

const HANDLE_GUIDE_IMAGES: Record<SupportedPlatform, StaticImageData> = {
	medium: HandleGuideMedium,
	tiktok: HandleGuideTiktok,
};

export function openUnbindingModal(
	platform: SupportedPlatform,
	identity: string
) {
	openConfirmModal({
		title: `Unbind`,
		classNames: {
			modal: "rounded-28px p-24px w-312px",
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
				openBorderlessModal({
					zIndex: 10000,
					children: <UnbindingModal platform={platform} identity={identity} />,
					classNames: { modal: "rounded-28px overflow-hidden" },
					closeOnClickOutside: false,
					closeOnEscape: false,
				});
			}, 500);
		},
	});
}

const closeModals = () => closeAllModals();

type UnbindingModalProps = {
	platform: SupportedPlatform;
	identity: string;
};

function UnbindingModal({ platform, identity }: UnbindingModalProps) {
	// steps
	const [step, setStep] = useState(0);

	const { data: character } = useCurrentCharacter();
	const veriHandle = getVeriHandle(character?.handle!);

	const unbindAccount = useUnbindAccount(
		character?.characterId!,
		platform,
		identity
	);

	return (
		<Card className="min-h-50vh flex flex-col justify-between">
			<LoadingOverlay visible={unbindAccount.isLoading} />

			{step === 0 && (
				<>
					<Card.Section>
						<Image
							src={HANDLE_GUIDE_IMAGES[platform]}
							placeholder="empty"
							className="w-full h-auto"
						/>

						<div className="p-24px mb-24px">
							<h4 className="text-24px leading-32px font-400 mt-0 mb-12px">
								UnBind
							</h4>

							<p className="text-16px leading-24px font-400 mt-0 mb-48px">
								Easily unbind your platform and the system will stop syncing
								your content.
							</p>

							<div className="flex items-center mb-12px">
								<Text className="i-csb:person-remove text-36px text-blue-primary mr-8px" />
								<span className="text-16px leading-24px font-500">
									{"Delete our handle in your "}
									<a
										className="text-blue-primary"
										href={getChangeBioUrl(platform, identity)}
										target="_blank"
										rel="noreferrer"
									>
										{platform} account
									</a>
									{" Bio"}
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
									onClick={() => openWindowToChangeBio(platform, identity)}
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
							onClick={closeModals}
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
								unbindAccount.mutate(undefined, {
									onSuccess: () => {
										setStep((v) => v + 1);
									},
								});
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
							onClick={closeModals}
						>
							Awesome
						</Button>
					</div>
				</Card.Section>
			)}
		</Card>
	);
}
