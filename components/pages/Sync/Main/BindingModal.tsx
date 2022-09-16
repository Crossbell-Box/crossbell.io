import Image from "@/components/common/Image";
import { openBorderlessModal } from "@/components/common/Modal";
import {
	getPlatformUserProfileUrl,
	getVeriHandle,
	SupportedPlatform,
	useBindAccount,
	useUnbindAccount,
} from "@/utils/apis/operator-sync";
import {
	Button,
	Card,
	Code,
	Radio,
	Space,
	Text,
	TextInput,
} from "@mantine/core";
import { dayjs, formatToRFC3339 } from "@/utils/time";

// address guide images
import type { StaticImageData } from "next/image";
import HandleGuideMedium from "@/public/images/pages/sync/veri-handle-guide-medium.png";
import HandleGuideTiktok from "@/public/images/pages/sync/veri-handle-guide-tiktok.png";
import { useState } from "react";
import { useCurrentCharacter } from "@/utils/apis/indexer";
import { copyToClipboard } from "@/utils/other";
import { closeModal, openConfirmModal } from "@mantine/modals";
const HANDLE_GUIDE_IMAGES: Record<SupportedPlatform, StaticImageData> = {
	medium: HandleGuideMedium,
	tiktok: HandleGuideTiktok,
};

// success image
import DoneImage from "@/public/illustrations/done.svg";
import { useHotkeys } from "@mantine/hooks";
import { NextLink } from "@mantine/next";

// unbind success image
import SeeYouImage from "@/public/illustrations/see-you.svg";

const modelId = "binding-modal";

export function openBindingModal(platform: SupportedPlatform) {
	openBorderlessModal({
		// id: modelId,
		zIndex: 10000,
		children: <BindingModal platform={platform} />,
	});
}

export function openUnbindingModal(
	platform: SupportedPlatform,
	identity: string
) {
	openConfirmModal({
		title: `Unbind ${platform}?`,
		children: "Are you sure you don't want to own your data anymore?",
		labels: { confirm: "I've decided", cancel: "Cancel" },
		confirmProps: { color: "red" },
		onConfirm: () => {
			setTimeout(() => {
				openBorderlessModal({
					// id: modelId,
					zIndex: 10000,
					children: <UnbindingModal platform={platform} identity={identity} />,
				});
			}, 500);
		},
	});
}

const openWindowToChangeBio = (
	platform: SupportedPlatform,
	identity: string
) => {
	if (platform === "medium") {
		window.open("https://medium.com/me/settings", "_blank");
	} else if (platform === "tiktok") {
		window.open(`https://www.tiktok.com/@${identity}`, "_blank");
	}
};

function BindingModal({ platform }: { platform: SupportedPlatform }) {
	// 0. input username
	// 1. set address in bio
	// 2. set date to sync

	// steps
	const [step, setStep] = useState(0);
	const stepNames = ["Username", "Verify", "Choose Date"] as const;

	// user inputs
	const [username, setUsername] = useState("");
	const availableDates = ["All", "7 days", "1 month"] as const;
	const [dateRange, setDateRange] =
		useState<typeof availableDates[number]>("All");
	const startTime =
		dateRange === "All"
			? undefined
			: formatToRFC3339(
					dayjs()
						.subtract(dateRange === "7 days" ? 7 : 30, "day")
						.toDate()
			  );

	const { data: character } = useCurrentCharacter();

	const bindAccount = useBindAccount(
		character?.characterId!,
		platform,
		username,
		startTime
	);

	const validateBeforeNext = async () => {
		if (step === 0) {
			// check username
			if (username.length === 0) {
				return false;
			}
		}

		if (step === 2) {
			// bind
			try {
				await bindAccount.mutateAsync();
			} catch {
				return false;
			}
		}

		return true;
	};

	const veriHandle = getVeriHandle(character?.handle!);
	const copyHandle = () => {
		copyToClipboard(veriHandle, { showNotification: true });
	};

	const handleNext = async () => {
		const validated = await validateBeforeNext();
		if (validated === true) {
			setStep((v) => v + 1);
		}
	};

	useHotkeys([["Enter", () => handleNext()]]);

	const renderStepper = () => {
		return (
			<>
				<Text>Step {step + 1}/2</Text>
				<Text className="font-700">{stepNames[step]}</Text>
				<Space h={20} />
			</>
		);
	};

	const renderAccountUrl = () => {
		if (username.length === 0) {
			return <></>;
		}

		const url = getPlatformUserProfileUrl(platform, username);

		return (
			<Text size="sm" color="dimmed">
				Is this you? -{" "}
				<Text
					color="dimmed"
					component={NextLink}
					variant="link"
					href={url}
					target="_blank"
				>
					{url}
				</Text>
			</Text>
		);
	};

	return (
		<Card className="min-h-50vh flex flex-col justify-between">
			{/* step 0 */}
			{step === 0 && (
				<div>
					{renderStepper()}

					<TextInput
						className="my-2"
						size="md"
						label={`Your ${platform} account`}
						icon="@"
						placeholder="Platform ID"
						required
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>

					<Text>{renderAccountUrl()}</Text>
				</div>
			)}

			{/* step 1 */}
			{step === 1 && (
				<Card.Section>
					<Image
						src={HANDLE_GUIDE_IMAGES[platform]}
						className="w-full h-auto"
					/>
					<div className="p-5">
						<div>{renderStepper()}</div>

						<Text>
							To verify, please put{" "}
							<Text color="blue" className="inline">
								your handle
							</Text>{" "}
							into your account bio.
						</Text>

						<div
							className="bg-blueGray/20 h-3em w-full flex justify-center items-center cursor-copy my-2"
							onClick={() => {
								copyHandle();
							}}
						>
							<Text className="font-mono" size="sm">
								{veriHandle}
							</Text>
						</div>

						<Button
							color="blue"
							size="lg"
							onClick={() => {
								copyHandle();
								setTimeout(() => {
									openWindowToChangeBio(platform, username);
								}, 50);
							}}
							radius={100}
							fullWidth
							my="md"
						>
							Copy and Go to Change
						</Button>

						<Text>
							After finished, please click{" "}
							<Text color="blue" className="inline">
								Next
							</Text>{" "}
							to continue.
						</Text>
					</div>
				</Card.Section>
			)}

			{/* step 2 - temporally removed */}
			{/* {step === 2 && (
				<div>
					{renderStepper()}

					<Radio.Group
						orientation="vertical"
						size="md"
						label="Select date range to sync"
						// description="You can change it later"
						value={dateRange}
						onChange={(v: any) => setDateRange(v)}
						required
					>
						{availableDates.map((range) => (
							<Radio color="blue" key={range} value={range} label={range} />
						))}
					</Radio.Group>
				</div>
			)} */}

			{/* step 2 */}
			{step === 2 && (
				<div className="flex flex-col items-center">
					<Image src={DoneImage} className="w-80% h-auto" />

					<Space h={20} />

					<Text size="sm">Congratulation!</Text>
					<Space h={10} />
					<Text size="sm" className="font-500">
						Account bound. You own your data, since now.
					</Text>

					<Space h={20} />
				</div>
			)}

			{/* action button */}
			<div className="flex flex-row justify-end">
				{step > 0 && step <= 1 && (
					<Button
						color="blue"
						size="md"
						variant="outline"
						radius={100}
						onClick={() => {
							setStep(step - 1);
						}}
					>
						Back
					</Button>
				)}
				<Space w={5} />
				{step <= 1 && (
					<Button
						color="blue"
						size="md"
						radius={100}
						onClick={() => handleNext()}
						loading={bindAccount.isLoading}
					>
						Next
					</Button>
				)}
				{step === 2 && (
					<Button
						color="blue"
						size="md"
						radius={100}
						onClick={() => {
							closeModal(modelId);
						}}
						fullWidth
					>
						Awesome
					</Button>
				)}
			</div>
		</Card>
	);
}

function UnbindingModal({
	platform,
	identity,
}: {
	platform: SupportedPlatform;
	identity: string;
}) {
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
			{/* step 0 */}
			{step === 0 && (
				<Card.Section>
					<Image
						src={HANDLE_GUIDE_IMAGES[platform]}
						className="w-full h-auto"
					/>

					<Space h={5} />

					<div className="p-5">
						<Text className="font-700">One More Step</Text>
						<Space h={5} />
						<Text>
							To make sure it is you who is asking to unbind, please remove your
							handle (<Code>{veriHandle}</Code>) from your account bio.
						</Text>

						<Button
							color="blue"
							size="lg"
							onClick={() => {
								openWindowToChangeBio(platform, identity);
							}}
							radius={100}
							fullWidth
							my="md"
						>
							Go to Change
						</Button>
					</div>
				</Card.Section>
			)}

			{/* step 1 */}
			{step === 1 && (
				<div className="flex flex-col justify-center">
					<Image src={SeeYouImage} className="w-80% h-auto" />

					<Space h={20} />

					<Text size="sm">See You Later!</Text>
					<Space h={10} />
					<Text size="sm" className="font-500">
						Account unbound.
					</Text>

					<Space h={20} />
				</div>
			)}

			<div className="flex flex-row justify-end">
				{step === 0 && (
					<>
						<Button
							color="blue"
							variant="outline"
							size="md"
							radius={100}
							onClick={() => {
								closeModal(modelId);
							}}
						>
							Cancel
						</Button>
						<Space w={5} />
						<Button
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
							loading={unbindAccount.isLoading}
						>
							Next
						</Button>
					</>
				)}
				{step === 1 && (
					<Button
						color="blue"
						size="md"
						radius={100}
						onClick={() => {
							closeModal(modelId);
						}}
						fullWidth
					>
						OK
					</Button>
				)}
			</div>
		</Card>
	);
}
