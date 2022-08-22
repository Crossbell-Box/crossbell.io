import type { CharacterEntity } from "crossbell.js";
import {
	Button,
	ButtonProps,
	createPolymorphicComponent,
	Skeleton,
	Space,
	Text,
} from "@mantine/core";
import { extractCharacterName } from "@/utils/metadata";
import Tooltip from "../common/Tooltip";
import {
	useCharacterFollowRelation,
	useCharacterFollowStats,
	useCurrentCharacter,
} from "@/utils/apis/indexer";
import Avatar from "../common/Avatar";
import { PropsWithChildren } from "react";
import { useModals } from "@mantine/modals";
import {
	useFollowCharacter,
	useUnfollowCharacter,
} from "@/utils/apis/contract";
import { NextLink } from "@mantine/next";
import {
	composeCharacterFollowHref,
	composeWalletCharacterEditHref,
} from "@/utils/url";
import { useRouter } from "next/router";
import Link from "next/link";

// used in character page to display the profile
export default function CharacterProfile({
	character,
}: {
	character?: CharacterEntity | null;
}) {
	const loading = character === undefined;

	const { data: currentCharacter } = useCurrentCharacter();
	const { data: followStatus, isLoading: isLoadingFollowStatus } =
		useCharacterFollowStats(character?.characterId);
	const {
		data: followRelation,
		status: followRelationStatus,
		fetchStatus: followRelationFetchStatus,
	} = useCharacterFollowRelation(
		currentCharacter?.characterId,
		character?.characterId
	);

	const isLoadingFollowRelation =
		followRelationStatus === "loading" && followRelationFetchStatus !== "idle";

	const follow = useFollowCharacter(character?.characterId!);
	const unfollow = useUnfollowCharacter(character?.characterId!);

	const modals = useModals();
	const handleFollow = () => {
		follow.mutate();
	};
	const handleUnfollow = () => {
		modals.openConfirmModal({
			title: `Unfollow @${character?.handle}?`,
			children:
				"Their activities will no longer show up in your home timeline. You can still view their profile. ",
			labels: { confirm: "Unfollow", cancel: "Cancel" },
			confirmProps: { color: "red" },
			onConfirm: () => {
				unfollow.mutate();
			},
		});
	};

	return (
		<div className="py-5 px-5">
			<div className="flex flex-row justify-between">
				{/* left */}
				<div className="flex flex-col justify-between overflow-hidden">
					{/* name and handle */}
					<Skeleton width={loading ? "5em" : "auto"} visible={loading}>
						<div className="break-words">
							<Text className="text-2em font-bold leading-1.25em text-dark">
								{extractCharacterName(character)}
							</Text>
						</div>
					</Skeleton>
					<Skeleton width={loading ? "5em" : "auto"} visible={loading}>
						<div className="break-words">
							<Text className="text-normal font-light leading-1.25em text-dimmed">
								{character?.handle ? `@${character.handle}` : ""}
							</Text>
						</div>
					</Skeleton>

					<Space h={20} />

					{/* bio */}
					<Tooltip label={character?.metadata?.content?.bio}>
						<Skeleton width={loading ? "5em" : "auto"} visible={loading}>
							<Text
								className="text-normal font-light leading-1.25em text-dark"
								lineClamp={3}
							>
								{character?.metadata?.content?.bio}
							</Text>
						</Skeleton>
					</Tooltip>

					<Space h={20} />

					{/* following and followers */}
					<div className="flex flex-row">
						{(
							[
								{
									count: followStatus?.followingCount,
									label: "Following",
									type: "following",
								},
								{
									count: followStatus?.followersCount,
									label: "Followers",
									type: "followers",
								},
							] as const
						).map((el) => (
							<Link
								key={el.label}
								href={composeCharacterFollowHref(character?.handle!, el.type)}
								passHref
							>
								<a className="mr-10 bg-hover cursor-pointer px-1 py-1">
									<Skeleton
										width={isLoadingFollowStatus ? "3em" : "auto"}
										visible={isLoadingFollowStatus}
									>
										<Text className="font-semibold leading-1.25em text-dark">
											{el.count ?? "..."}
										</Text>
									</Skeleton>
									<Text className="font-normal text-xs leading-1.25em text-dimmed">
										{el.label}
									</Text>
								</a>
							</Link>
						))}
					</div>
				</div>

				{/* right */}
				<div className="flex flex-col items-center">
					<Avatar
						characterId={character?.characterId}
						character={character}
						size={128}
						className="rounded-128px hover:rounded-20px transition-border-radius duration-300ms"
					/>

					<Space h={10} />

					{loading || isLoadingFollowRelation ? (
						<BelowAvatarButton loading>Follow</BelowAvatarButton>
					) : character?.characterId === currentCharacter?.characterId ? (
						<BelowAvatarButton
							component={NextLink}
							href={composeWalletCharacterEditHref(character?.characterId!)}
						>
							Edit Character
						</BelowAvatarButton>
					) : followRelation?.isFollowing ? (
						<BelowAvatarButton
							onClick={() => handleUnfollow()}
							loading={unfollow.isLoading}
						>
							Following
						</BelowAvatarButton>
					) : (
						<BelowAvatarButton
							primary
							onClick={() => handleFollow()}
							loading={follow.isLoading}
						>
							Follow
						</BelowAvatarButton>
					)}
				</div>
			</div>
		</div>
	);
}

function BelowAvatarButton_({
	primary = false,
	...props
}: PropsWithChildren<{ primary?: boolean } & ButtonProps>) {
	return (
		<Button
			variant={primary ? "filled" : "outline"}
			color={primary ? "brand" : "dark"}
			className="m-1 text-dark"
			fullWidth
			{...props}
		/>
	);
}
const BelowAvatarButton = createPolymorphicComponent<
	"button",
	ButtonProps & { primary?: boolean }
>(BelowAvatarButton_);
