import { useCurrentCharacter } from "@/utils/apis/indexer";
import { Button, Card, Divider, Group, Space, Text } from "@mantine/core";
import BaseSection from "./BaseSection";
import Image from "@/components/common/Image";
import {
	getPlatformUserProfileUrl,
	SupportedPlatform,
	SUPPORTED_PLATFORMS,
	useCharacterBoundAccounts,
	useSyncAccount,
} from "@/utils/apis/operator-sync";

// brand images
import LogoMedium from "@/public/images/brands/medium.png";
import LogoTiktok from "@/public/images/brands/tiktok.png";
import { type StaticImageData } from "next/image";
import classNames from "classnames";
import { openBindingModal, openUnbindingModal } from "./BindingModal";
import { bytesToMegabytes } from "../utils";
import { formatDate } from "@/utils/time";
import Tooltip from "@/components/common/Tooltip";
import LoadingOverlay from "@/components/common/LoadingOverlay";
import { NextLink } from "@mantine/next";
import { showNotification } from "@mantine/notifications";
const ICON_MAP = {
	medium: LogoMedium,
	tiktok: LogoTiktok,
} as const;

export default function PlatformsSection() {
	const { data: character } = useCurrentCharacter();
	const { data: boundAccounts, isLoading } = useCharacterBoundAccounts(
		character?.characterId
	);

	const boundPlatforms =
		boundAccounts?.map<PlatformCardProps>((account) => {
			return {
				isBound: true,
				platform: account.platform,
				icon: ICON_MAP[account.platform],
				identity: account.username,
				mediaUsage: sumUpMediaUsage(account.media_usage),
				noteCount: account.notes_count,
				lastUpdatedAt: account.last_updated,
				nextUpdatedAt: account.next_update,
			};
		}) ?? [];

	const unboundPlatforms = SUPPORTED_PLATFORMS.filter(
		(platform) => !boundPlatforms?.some((bound) => bound.platform === platform)
	).map<PlatformCardProps>((platform) => {
		return {
			isBound: false,
			platform,
			icon: ICON_MAP[platform],
		};
	});

	const platforms = [...boundPlatforms, ...unboundPlatforms];

	return (
		<BaseSection title="Platforms">
			<div className="relative grid grid-cols-1 md:grid-cols-2 gap-4">
				<LoadingOverlay visible={isLoading} />
				{platforms?.map((platform) => (
					<PlatformCard key={platform.platform} {...platform} />
				))}
			</div>

			<Divider
				my="md"
				label="More Platforms Coming Soon"
				labelProps={{ color: "dimmed" }}
				labelPosition="center"
			/>
		</BaseSection>
	);
}

type PlatformCardProps = {
	isBound: boolean;
	platform: SupportedPlatform;
	icon: StaticImageData;
	identity?: string;
	mediaUsage?: number;
	noteCount?: number;
	lastUpdatedAt?: string;
	nextUpdatedAt?: string;
};

function PlatformCard({
	isBound,
	platform,
	icon,
	identity,
	mediaUsage,
	noteCount,
	lastUpdatedAt,
	nextUpdatedAt,
}: PlatformCardProps) {
	const stats = [
		{
			label: "Note Count",
			value: (noteCount ?? 0).toString(),
		},
		{
			label: "Media Usage",
			value: bytesToMegabytes(mediaUsage ?? 0).toFixed(2) + " MB",
		},
	];

	const { data: character } = useCurrentCharacter();

	const syncAccount = useSyncAccount(
		character?.characterId!,
		platform,
		identity!
	);

	return (
		<Card className="bg-gray/10 flex flex-col justify-between">
			<div className="flex justify-between items-center">
				<Text className="text-lg font-500 uppercase">{platform}</Text>

				{isBound && (
					<Button
						color="gray"
						size="xs"
						variant="outline"
						radius="xl"
						onClick={() => {
							openUnbindingModal(platform, identity!);
						}}
					>
						Unbind
					</Button>
				)}
			</div>

			<Space h={10} />

			<div className="flex justify-between items-center flex-wrap">
				{/* left - user info */}
				<Group spacing="xs">
					<Image
						src={icon}
						alt={platform}
						width={48}
						height={48}
						className={classNames("rounded-full", {
							["filter-grayscale opacity-50"]: !isBound,
						})}
					/>

					{identity ? (
						<Text
							variant="link"
							color="dark"
							component={NextLink}
							href={getPlatformUserProfileUrl(platform, identity)}
							target="_blank"
						>
							@{identity}
						</Text>
					) : (
						<Text color="dimmed">NOT BOUND</Text>
					)}
				</Group>

				{/* right - usage info */}
				{isBound && (
					<div>
						{stats.map((stat) => (
							<div key={stat.label} className="my-2">
								<Text className="leading-1em font-500">{stat.value}</Text>
								<Text size="xs" color="dimmed" className="leading-1em">
									{stat.label}
								</Text>
							</div>
						))}
					</div>
				)}
			</div>

			<Space h={10} />

			<div className="flex flex-row justify-between items-center flex-wrap">
				{/* button */}
				{!isBound ? (
					<Button
						color="blue"
						size="md"
						radius="xl"
						onClick={() => {
							openBindingModal(platform);
						}}
					>
						Bind
					</Button>
				) : (
					<Button
						color="blue"
						size="md"
						radius="xl"
						onClick={() => {
							syncAccount.mutate(undefined, {
								onSuccess: (data) => {
									showNotification({
										title: data.message,
										message: `Next sync will be at ${formatDate(
											data.result?.next_update
										)}`,
										color: "green",
									});
								},
							});
						}}
						loading={syncAccount.isLoading}
					>
						Sync
					</Button>
				)}

				{/* sync info */}
				{isBound && (
					<Tooltip label={`Next Sync: ${formatDate(nextUpdatedAt!)}`}>
						<Text size="xs" color="dimmed">
							Last Synced: {formatDate(lastUpdatedAt!)}
						</Text>
					</Tooltip>
				)}
			</div>
		</Card>
	);
}

// utils

function sumUpMediaUsage(
	mediaUsage?: NonNullable<
		ReturnType<typeof useCharacterBoundAccounts>["data"]
	>[number]["media_usage"]
) {
	if (!mediaUsage) {
		return 0;
	}

	const total = mediaUsage.reduce((acc, curr) => acc + curr.usage, 0);

	return total;
}
