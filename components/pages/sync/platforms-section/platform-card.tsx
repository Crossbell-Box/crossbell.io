import Link from "next/link";
import classNames from "classnames";
import prettyBytes from "pretty-bytes";
import { Text } from "@mantine/core";
import React from "react";
import { StaticImageData } from "next/image";
import { showNotification } from "@mantine/notifications";

import { useCurrentCharacter } from "@/utils/apis/indexer";
import {
	getPlatformDisplayName,
	getPlatformUserProfileUrl,
	SupportedPlatform,
	useSyncAccount,
} from "@/utils/apis/operator-sync";
import {
	openBindingModal,
	openUnbindingModal,
} from "@/components/pages/sync/modals";
import Image from "@/components/common/Image";
import { formatDate } from "@/utils/time";
import bindIllustration from "@/public/images/sync/bind-illustration.png";
import dayjs from "dayjs";

export type PlatformCardProps = {
	isBound: boolean;
	platform: SupportedPlatform;
	icon: StaticImageData;
	identity?: string;
	mediaUsage?: number;
	noteCount?: number;
	lastUpdatedAt?: string;
	nextUpdatedAt?: string;
};

const containerStyle: React.CSSProperties = {
	background:
		"linear-gradient(288.05deg, #FEFEFE 10.92%, #F8F8FA 93.8%), #FAFCFF",
};

const bindBtnShadowStyle: React.CSSProperties = {
	background: "linear-gradient(335.58deg, #1268EA 17.63%, #C4DEFF 90.6%)",
};

const unbindBtnShadowStyle: React.CSSProperties = {
	background: "linear-gradient(335.58deg, #CBD9EE 17.63%, #C4DEFF 90.6%)",
};

export function PlatformCard({
	isBound,
	platform,
	icon,
	identity,
	mediaUsage,
	noteCount,
	lastUpdatedAt,
}: PlatformCardProps) {
	const { data: character } = useCurrentCharacter();

	const syncAccount = useSyncAccount(
		character?.characterId!,
		platform,
		identity!
	);

	return (
		<div
			className="relative p-16px rounded-24px border border-1 border-[#E1E8F7]"
			style={containerStyle}
		>
			<div className="absolute z-1 top-40px -right-20px flex">
				<button
					className={classNames(
						"font-roboto text-16px font-500 leading-24px",
						"py-16px px-8px min-w-65px rounded-12px border-none",
						"cursor-pointer transition hover:opacity-90 active:opacity-100",
						isBound
							? "bg-[#DAE2FF] text-blue-primary"
							: "bg-blue-primary text-white"
					)}
					onClick={() => {
						if (isBound) {
							openUnbindingModal(platform, identity!);
						} else {
							openBindingModal(platform);
						}
					}}
				>
					{isBound ? "Unbind" : "Bind"}
				</button>
				<div
					style={isBound ? unbindBtnShadowStyle : bindBtnShadowStyle}
					className="absolute -z-1 left-4px right-4px -bottom-6px opacity-25 rounded-12px filter blur-2.73px h-34px"
				/>
			</div>

			<div className="flex items-center">
				<Image
					src={icon}
					alt={platform}
					width={40}
					height={40}
					className={"rounded-12px"}
				/>

				<p className="m-0 ml-8px text-16px leading-24px font-400">{getPlatformDisplayName(platform)}</p>
			</div>

			{isBound ? (
				<>
					<table className="border-collapse my-24px">
						<tbody>
							<tr className="font-600 text-18px leading-22px text-black font-deca">
								<td className="p-0">{noteCount ?? 0}</td>
								<td className="p-0 pl-8px">
									{prettyBytes(mediaUsage ?? 0, { maximumFractionDigits: 2 })}
								</td>
							</tr>

							<tr className="font-400 text-12px leading-16px text-[#A9AAAB]">
								<td className="p-0">Synced Articles</td>
								<td className="p-0 pl-8px">Used Storage</td>
							</tr>
						</tbody>
					</table>

					<div className="flex items-center">
						<Link
							passHref={true}
							href={
								identity ? getPlatformUserProfileUrl(platform, identity) : ""
							}
						>
							<a
								className={classNames(
									"font-500 text-black text-16px leading-24px tracking-0.15px",
									!identity && "opacity-50"
								)}
								target="_blank"
								rel="noreferrer"
							>
								{identity ? `@${identity}` : "NOT BOUND"}
							</a>
						</Link>

						<div className="ml-auto flex flex-col items-end">
							<div className="flex items-center mb-4px">
								<button
									className={classNames(
										"w-16px h-16px text-blue-primary bg-[#E4EAFD] cursor-pointer border-none p-0 rounded-4px flex items-center justify-center",
										"transition hover:opacity-90 active:opacity-100 disabled:opacity-60 disabled:cursor-not-allowed"
									)}
									disabled={syncAccount.isLoading}
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
								>
									<Text
										className={classNames(
											"i-csb:arrow-circlepath text-16px",
											syncAccount.isLoading && "animate-spin animate-reverse"
										)}
									/>
								</button>

								<div className="font-400 text-12px leading-16px tracking-0.4px ml-8px text-[#A9AAAB]">
									Last synced
								</div>
							</div>

							<div
								className="font-500 text-11px leading-16px tracking-0.5px text-black"
								title={lastUpdatedAt && formatDate(lastUpdatedAt)}
							>
								{lastUpdatedAt
									? dayjs(lastUpdatedAt).format("MM/DD/HH:mm")
									: "(unknown)"}
							</div>
						</div>
					</div>
				</>
			) : (
				<div className="flex flex-col items-center justify-center mb-16px">
					<div className="transform -translate-x-1/7">
						<Image width={90} height={90} src={bindIllustration} />
					</div>
					<p className="m-0 font-400 text-14px leading-20px text-[#49454F]">
						Sync to own your {platform} content
					</p>
				</div>
			)}
		</div>
	);
}
