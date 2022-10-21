import React from "react";
import { Divider } from "@mantine/core";
import { StaticImageData } from "next/image";

import { useCurrentCharacter } from "@/utils/apis/indexer";
import {
	SupportedPlatform,
	SUPPORTED_PLATFORMS,
	useCharacterBoundAccounts,
} from "@/utils/apis/operator-sync";

import LoadingOverlay from "@/components/common/LoadingOverlay";
import LogoMedium from "@/public/images/brands/medium.png";
import LogoTiktok from "@/public/images/brands/tiktok.png";

import { sumUpMediaUsage } from "../utils";
import { PlatformCard, PlatformCardProps } from "./platform-card";
import { Welcome } from "./welcome";

const ICON_MAP: Record<SupportedPlatform, StaticImageData> = {
	medium: LogoMedium,
	tiktok: LogoTiktok,
};

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

	const unboundPlatforms = SUPPORTED_PLATFORMS
		// TODO: remove this when tiktok is ready
		.filter((v) => v === "medium")
		.filter((v) => !boundPlatforms?.some((bound) => bound.platform === v))
		.map<PlatformCardProps>((platform) => {
			return {
				isBound: false,
				platform,
				icon: ICON_MAP[platform],
			};
		});

	return (
		<div>
			<h4 className="font-deca my-24px text-18px font-600">Platforms</h4>

			{boundPlatforms.length === 0 && <Welcome />}

			<div className="relative">
				<LoadingOverlay visible={isLoading} />

				{[boundPlatforms, unboundPlatforms]
					.filter((platforms) => platforms.length > 0)
					.map((platforms, index) => (
						<React.Fragment key={index}>
							{index > 0 && <Divider my={44} />}
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
								{platforms.map((platform) => (
									<PlatformCard key={platform.platform} {...platform} />
								))}
							</div>
						</React.Fragment>
					))}
			</div>

			<Divider
				my={44}
				label="More platforms coming soon"
				labelProps={{ color: "dimmed" }}
				labelPosition="center"
			/>
		</div>
	);
}
