import React from "react";
import Image from "next/image";
import {
	DiscordIcon,
	XSyncLogo,
	XLogLogo,
	XFeedLogo,
	MoreIcon,
} from "@crossbell/ui";
import { Tooltip } from "@mantine/core";

import { Star } from "@/components/pages/landing-page/components/star";

import discordImg from "./discord.png";
import xLogImg from "./x-log.png";
import xSyncImg from "./x-sync.png";
import xFeedImg from "./x-feed.png";
import tampermonkeyImg from "./tampermonkey.svg";
import obsidianImg from "./obsidian.svg";
import mastodon from "./mastodon.svg";
import { AutoShow } from "@/components/pages/landing-page/components/auto-show";
import classNames from "classnames";

function Card({
	children,
	className,
	url,
}: {
	children: React.ReactNode;
	className?: string;
	url: string;
}) {
	return (
		<AutoShow
			as="a"
			href={url}
			target="_blank"
			className={`${className} bg-[#0D0E0F] p-[16px] w-full max-w-[342px] md:max-w-unset border-1 border-solid border-[#E1E8F733] rounded-[24px] !hover:scale-[1.05] transition transition-duration-300`}
		>
			{children}
		</AutoShow>
	);
}

function SmallCard({
	children,
	className,
	url,
	tooltip,
	noHoverEffect,
}: {
	children: React.ReactNode;
	className?: string;
	url?: string;
	tooltip?: string;
	noHoverEffect?: boolean;
}) {
	const node = (
		<div
			className={classNames(
				"w-full max-w-[342px]",
				!tooltip &&
					!noHoverEffect &&
					"!hover:scale-[1.05] transition transition-duration-300"
			)}
		>
			<AutoShow
				as="a"
				className={`${className} bg-[#0D0E0F] p-[16px] text-[15px] w-full border-1 border-solid border-[#E1E8F733] rounded-[16px] whitespace-nowrap flex items-center justify-center gap-[6px]`}
				href={url}
				target="_blank"
			>
				{children}
			</AutoShow>
		</div>
	);

	return tooltip ? <Tooltip label={tooltip}>{node}</Tooltip> : node;
}

export function ModularitySection() {
	return (
		<div className="mt-20 md:mt-0 pt-[35px] pb-[24px] md:pt-[161px] md:pb-[103px] md:pl-[9.5vw] md:pr-[7.7vw] relative z-10">
			<AutoShow>
				<h4 className="font-deca font-300 flex items-center justify-center gap-[4px] text-[20px] md:text-[24px] mt-0 mb-[8px] md:justify-start">
					<Star />
					Seamless Modularity
				</h4>
			</AutoShow>

			<AutoShow>
				<h3 className="text-center md:text-left text-[24px] md:text-[64px] leading-[30px] md:leading-[80px] font-deca font-normal m-0">
					Design with modularity,
					<br />
					make it easy to integrate
				</h3>
			</AutoShow>

			<Mobile />
			<PC />
		</div>
	);
}

function Mobile() {
	return (
		<div className="mt-[67px] flex flex-col gap-[24px] items-center md:hidden">
			<Card url="https://xsync.app">
				<h5 className="m-0 flex items-center gap-[8px] text-[12px]">
					<XSyncLogo className="text-[18px]" /> xSync
				</h5>

				<div className="relative aspect-[1212/734] mt-[16px]">
					<Image fill src={xSyncImg} alt="xSync" />
				</div>
			</Card>

			<Card url="https://discord.bots.gg/bots/1018873453610274877">
				<h5 className="m-0 flex items-center gap-[8px] text-[12px]">
					<DiscordIcon className="text-[#5865F2] text-[18px]" />
					Discord Bot
				</h5>

				<div className="relative aspect-[315/192] mt-[16px]">
					<Image fill src={discordImg} alt="Discord Bot" />
				</div>
			</Card>

			<Card url="https://xlog.app">
				<h5 className="m-0 flex items-center gap-[8px]">
					<XLogLogo className="text-[18px]" />
					xLog
				</h5>

				<div className="relative aspect-[310/221] mt-[16px]">
					<Image fill src={xLogImg} alt="xLog" />
				</div>
			</Card>

			<SmallCard url="https://crossbell.thenomads.social">
				<Image src={mastodon} width={98} height={25} alt="Mastodon" />
			</SmallCard>

			<SmallCard url="https://github.com/saltad-dev/WeSync">
				<Image
					src={tampermonkeyImg}
					width={22}
					height={22}
					alt="Tampermonkey"
				/>
				Tampermonkey
			</SmallCard>

			<SmallCard tooltip="Coming Soon">
				<Image src={obsidianImg} width={22} height={22} alt="Obsidian" />
				Obsidian Plugin
			</SmallCard>
		</div>
	);
}

function PC() {
	return (
		<div className="mt-[67px] gap-[24px] px-2 hidden md:block">
			<div className="items-center flex gap-[1.6vw]">
				<div className="flex flex-col gap-[1.6vw] w-[23.8%]">
					<SmallCard
						tooltip="Coming Soon"
						className="!gap-[8px] !p-[24px] !rounded-[24px] !w-fit !max-w-full"
					>
						<Image src={obsidianImg} width={32} height={32} alt="Obsidian" />
						<span className="text-[22px] font-medium truncate">
							Obsidian Plugin
						</span>
					</SmallCard>

					<Card className="md:max-w-auto" url="https://xsync.app">
						<h5 className="m-0 flex items-center gap-[8px] text-[12px]">
							<XSyncLogo className="w-[32px] h-[32px]" />
							<span className="text-[22px]">xSync</span>
						</h5>

						<div className="relative aspect-[1212/734] mt-[16px]">
							<Image fill src={xSyncImg} alt="xSync" />
						</div>
					</Card>
				</div>

				<Card
					className="w-[37.4%]"
					url="https://discord.bots.gg/bots/1018873453610274877"
				>
					<h5 className="m-0 flex items-center gap-[8px] text-[12px]">
						<DiscordIcon className="text-[#5865F2] w-[32px] h-[32px]" />
						<span className="text-[22px]">Discord Bot</span>
					</h5>

					<div className="relative aspect-[315/192] mt-[16px]">
						<Image fill src={discordImg} alt="Discord Bot" />
					</div>
				</Card>

				<Card className="w-[33%]" url="https://xlog.app">
					<h5 className="m-0 flex items-center gap-[8px]">
						<XLogLogo className="w-[32px] h-[32px]" />
						<span className="text-[22px]">xLog</span>
					</h5>

					<div className="relative aspect-[310/221] mt-[16px]">
						<Image fill src={xLogImg} alt="xLog" />
					</div>
				</Card>
			</div>

			<div className="items-center flex mt-[32px] gap-[1.6vw]">
				<Card className="!w-[42.5%]" url="https://xfeed.app">
					<h5 className="m-0 flex items-center gap-[8px]">
						<XFeedLogo className="w-[32px] h-[32px]" />
						<span className="text-[22px]">xFeed</span>
					</h5>

					<div className="relative aspect-[675/160] mt-[16px]">
						<Image fill src={xFeedImg} alt="xFeed" />
					</div>
				</Card>

				<div className="flex flex-col gap-[1.6vw]">
					<SmallCard
						className="!rounded-[24px]"
						url="https://crossbell.thenomads.social"
					>
						<Image src={mastodon} width={192} height={47} alt="Mastodon" />
					</SmallCard>

					<SmallCard
						className="!gap-[8px] !rounded-[24px]"
						url="https://github.com/saltad-dev/WeSync"
					>
						<Image
							src={tampermonkeyImg}
							width={32}
							height={32}
							alt="Tampermonkey"
						/>
						<span className="text-[22px]">Tampermonkey</span>
					</SmallCard>
				</div>

				<SmallCard className="!h-[141px] !rounded-[24px]" noHoverEffect={true}>
					<MoreIcon className="text-[#fff] text-[32px]" />
					<span className="text-[22px] font-medium">More Coming Soon</span>
				</SmallCard>
			</div>
		</div>
	);
}
