import {
	Button,
	Card,
	Text,
	TextInput,
	LoadingOverlay,
	Tooltip,
} from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { closeAllModals } from "@mantine/modals";
import { useClickOutside } from "@mantine/hooks";
import React from "react";
import classNames from "classnames";
import { Contract } from "crossbell.js";

import { Image } from "~/shared/components/image";
import { openBorderlessModal } from "~/shared/components/modal";
import {
	getPlatformDisplayName,
	getPlatformIdentityKind,
	getPlatformUserProfileUrl,
	getVeriHandle,
	SupportedPlatform,
	useBindAccount,
} from "@crossbell/connect-kit";
import { useAccountCharacter } from "@crossbell/connect-kit";
import { copyToClipboard } from "~/shared/other";
import { ContractProvider } from "@crossbell/contract";

import DoneImage from "@/public/images/sync/congrats.svg";

import {
	openWindowToChangeBio,
	getPlatformSite,
	openPlatformSite,
} from "../utils";
import { BIO_IMAGE_MAP, NAME_IMAGE_MAP } from "./binding-modal.images";

const closeModals = () => closeAllModals();

const modalZIndex = 11;

export function openBindingModal(
	platform: SupportedPlatform,
	contract: Contract
) {
	openBorderlessModal({
		zIndex: modalZIndex,
		children: (
			<ContractProvider contract={contract}>
				<BindingModal platform={platform} />
			</ContractProvider>
		),
		classNames: {
			header: "bg-transparent justify-end",
			content: "rounded-24px overflow-hidden",
		},
		closeOnClickOutside: false,
		closeOnEscape: false,
	});
}

enum Scene {
	form = "form",
	success = "success",
}

function BindingModal({ platform }: { platform: SupportedPlatform }) {
	const [scene, setScene] = React.useState(Scene.form);
	const [username, setUsername] = React.useState("");
	const character = useAccountCharacter();
	const veriHandle = character?.handle && getVeriHandle(character.handle);
	const profileUrl = username && getPlatformUserProfileUrl(platform, username);

	const bindAccount = useBindAccount({
		characterId: character?.characterId,
		platform,
		identity: username,
	});

	const ref = useClickOutside(() => {
		if (!bindAccount.isLoading) {
			closeModals();
		}
	});

	async function submit() {
		if (!bindAccount.isLoading && username) {
			await bindAccount.mutateAsync(undefined, {
				onSuccess() {
					setScene(Scene.success);
				},
			});
		}
	}

	async function copyHandle() {
		if (veriHandle) {
			await copyToClipboard(veriHandle, { showNotification: true });
		}
	}

	useHotkeys([["Enter", submit]]);

	return (
		<Card ref={ref} className="flex flex-col justify-between">
			<LoadingOverlay visible={bindAccount.isLoading} />
			{scene === Scene.form && (
				<div>
					<div>
						<h4 className="text-24px leading-32px font-400 m-0 mb-12px">
							Bind
						</h4>
						<p className="text-16px leading-24px font-400 text-[#49454F] m-0 mb-24px">
							Complete this simple verification process to bind
							<br />
							your platforms.
						</p>
					</div>

					<div className="mt-24px">
						<div className="m-0 text-16px leading-24px font-500 flex items-center">
							<Text className="i-csb:account-circle text-36px mr-8px" />
							<span className="relative">
								{"1. Input "}
								<a
									className="text-blue-primary"
									href={getPlatformSite(platform)}
									target="_blank"
									rel="noreferrer"
								>
									{getPlatformDisplayName(platform)} account
								</a>
								{` ${getPlatformIdentityKind(platform)}.`}

								<Tooltip
									withinPortal={true}
									zIndex={modalZIndex}
									classNames={{ tooltip: "p-0 bg-transparent" }}
									label={
										<Image
											placeholder="empty"
											src={NAME_IMAGE_MAP[platform]}
											className="w-888px max-w-90vw h-auto"
										/>
									}
								>
									<button
										className={classNames(
											"absolute right-0 top-0 transform -translate-y-1/2 translate-x-full",
											"text-16px bg-transparent border-none outline-none color-black p-0 cursor-pointer"
										)}
									>
										<Text className="i-csb:circle-help" />
									</button>
								</Tooltip>
							</span>
						</div>

						<TextInput
							classNames={{
								root: "my-12px bg-[#1C1B1F]/4",
								input: "bg-transparent pl-32px border-none rounded-8px",
							}}
							size="md"
							icon={<span className="text-blue-primary">@</span>}
							placeholder="username"
							required
							value={username}
							autoCapitalize="off"
							autoComplete="off"
							onChange={(e) => {
								setUsername(normalizedUsername(platform, e.target.value));
							}}
						/>

						<p
							className={classNames(
								"text-12px leading-16px font-400 text-[#7D8CA3] mb-15px",
								username ? "opacity-100" : "opacity-0"
							)}
						>
							{"Is this you? "}
							<a
								className="hover:text-blue-primary"
								href={profileUrl}
								target="_blank"
								rel="noreferrer"
							>
								{profileUrl}
							</a>
						</p>
					</div>

					<div className="mt-24px mb-72px">
						<div className="m-0 text-16px leading-24px font-500 flex items-start mb-12px">
							<Text className="i-csb:background-replace text-36px mr-8px flex-shrink-0" />
							<span className="relative mr-9px">
								{step2Description(platform)}
								<Tooltip
									withinPortal={true}
									zIndex={modalZIndex}
									classNames={{ tooltip: "p-0 bg-transparent" }}
									label={
										<Image
											placeholder="empty"
											src={BIO_IMAGE_MAP[platform]}
											className="w-888px max-w-90vw h-auto"
										/>
									}
								>
									<button
										className={classNames(
											"absolute transform -translate-y-1/10 translate-x-0",
											"text-16px bg-transparent border-none outline-none color-black p-0 cursor-pointer"
										)}
									>
										<Text className="i-csb:circle-help" />
									</button>
								</Tooltip>
							</span>
						</div>

						<div className="flex w-full h-44px">
							<div
								title={veriHandle}
								className="h-full bg-[#1C1B1F]/4 border-none rounded-l-8px flex-1 flex items-center justify-center text-[#737272] text-16px leading-24px font-400 w-0 px-2"
							>
								<span className="max-w-full overflow-hidden text-ellipsis">
									{veriHandle}
								</span>
							</div>
							<button
								className={classNames(
									"h-full border border-1 border-[#E1E8F7] rounded-r-8px bg-[#FAFCFF] outline-none",
									"text-14px leading-20px font-500 font-roboto text-blue-primary cursor-pointer p-12px",
									"flex items-center justify-center",
									"filter disabled:grayscale disabled:opacity-60 disabled:cursor-not-allowed"
								)}
								onClick={() =>
									copyHandle().then(() => {
										openWindowToChangeBio(platform, username);
									})
								}
							>
								Copy
								<Text className="i-csb:arrow-forward text-20px ml-4px" />
							</button>
						</div>
					</div>

					<div className="flex items-center justify-end">
						<Button
							className="h-40px font-500"
							color="blue"
							size="md"
							variant="outline"
							radius={100}
							onClick={closeModals}
						>
							Cancel
						</Button>

						<Button
							className="ml-12px h-40px font-500"
							color="blue"
							size="md"
							radius={100}
							disabled={!username || bindAccount.isLoading}
							onClick={submit}
						>
							Confirm
						</Button>
					</div>
				</div>
			)}

			{scene === Scene.success && (
				<Card.Section>
					<div className="flex flex-col items-center">
						<Image
							src={DoneImage}
							placeholder="empty"
							className="w-full h-auto -mt-17px -mb-24px"
						/>

						<p className="text-14px leading-24px font-400 m-0">Congrats!</p>
						<p className="text-16px leading-20px font-600 m-0 mb-24px">
							Bind successfully!
						</p>

						<div className="flex items-center w-full children:h-40px gap-24px p-24px">
							<Button
								color="blue"
								size="md"
								variant="outline"
								radius={100}
								onClick={() => openPlatformSite(platform)}
								fullWidth
							>
								Go to {getPlatformDisplayName(platform)}
							</Button>

							<Button
								color="blue"
								size="md"
								radius={100}
								onClick={closeModals}
								fullWidth
							>
								OK
							</Button>
						</div>
					</div>
				</Card.Section>
			)}
		</Card>
	);
}

function normalizedUsername(
	platform: SupportedPlatform,
	username: string
): string {
	switch (platform) {
		case "tg_channel":
			const regex = /^(https?:\/\/)?t\.me\/([^/]+)$/;
			return (regex.exec(username.trim()) ?? [])[2] || username;
		default:
			return username;
	}
}

function step2Description(platform: SupportedPlatform): string {
	switch (platform) {
		case "tg_channel":
			return "2. To verify, please copy your handle below into Telegram Info Description.";
		case "pixiv":
			return "2. To verify, please copy your handle below into Pixiv Self Introduction.";
		case "medium":
			return "2. To verify, please copy your handle below into Medium Short Bio.";
		case "pinterest":
			return "2. To verify, please copy your handle below into Pinterest About.";
		case "substack":
			return "2. To verify, please copy your handle below into Substack One-line Description.";
		case "tiktok":
			return "2. To verify, please copy your handle below into Tiktok Bio.";
		case "twitter":
			return "2. To verify, please copy your handle below into Twitter Bio.";
		case "jike":
			return "2. To verify, please copy your handle below into Jike Bio.";
	}
}
