import React from "react";
import { Divider } from "@mantine/core";
import { StaticImageData } from "next/image";

import {
	SupportedPlatform,
	SUPPORTED_PLATFORMS,
	useCharacterBoundAccounts,
	isShowPlatform,
} from "@/utils/apis/operator-sync";

import { useAccountCharacter } from "@/components/connectkit";
import LoadingOverlay from "@/components/common/LoadingOverlay";

import LogoMedium from "@/public/images/sync/platform-icons/medium.svg";
import LogoTiktok from "@/public/images/sync/platform-icons/tiktok.svg";
import LogoTwitter from "@/public/images/sync/platform-icons/twitter.svg";
import LogoTelegram from "@/public/images/sync/platform-icons/telegram.svg";
import LogoPixiv from "@/public/images/sync/platform-icons/pixiv.svg";
import LogoPinterest from "@/public/images/sync/platform-icons/pinterest.svg";
import LogoSubstack from "@/public/images/sync/platform-icons/substack.svg";
import LogoJike from "@/public/images/sync/platform-icons/jike.svg";

import { sumUpMediaUsage } from "../utils";

import { PlatformCard, PlatformCardProps } from "./platform-card";
import { Welcome } from "./welcome";

const ICON_MAP: Record<SupportedPlatform, StaticImageData> = {
	medium: LogoMedium,
	tiktok: LogoTiktok,
	twitter: LogoTwitter,
	tg_channel: LogoTelegram,
	substack: LogoSubstack,
	pinterest: LogoPinterest,
	pixiv: LogoPixiv,
	jike: LogoJike,
};

export default function PlatformsSection() {
	const { data: character } = useAccountCharacter();
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

	const unboundPlatforms = SUPPORTED_PLATFORMS.filter(isShowPlatform)
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
