import { Button, Skeleton, Text } from "@mantine/core";
import type { CharacterEntity } from "crossbell.js";
import {
	useFollowCharacter,
	useUnfollowCharacter,
} from "@/utils/apis/contract";
import { useModals } from "@mantine/modals";
import {
	useCharacterFollowRelation,
	useCurrentCharacter,
} from "@/utils/apis/indexer";
import Avatar from "../common/Avatar";
import { CharacterName } from "../common/Character";
import { composeCharacterHref } from "@/utils/url";
import { useRouter } from "next/router";

const FollowCharacterCard = ({ character }: { character: CharacterEntity }) => {
	const { data: currentCharacter } = useCurrentCharacter();

	const isSelf = currentCharacter?.characterId === character.characterId;

	const { data: followRelation, isLoadingFollowRelation } =
		useCharacterFollowRelation(
			currentCharacter?.characterId,
			character?.characterId
		);

	const follow = useFollowCharacter(character.characterId!);
	const unfollow = useUnfollowCharacter(character.characterId!);

	const modals = useModals();
	const handleFollow = () => {
		follow.mutate();
	};
	const handleUnfollow = () => {
		modals.openConfirmModal({
			title: `Unfollow @${character.handle}?`,
			children:
				"Their activities will no longer show up in your home timeline. You can still view their profile. ",
			labels: { confirm: "Unfollow", cancel: "Cancel" },
			confirmProps: { color: "red" },
			onConfirm: () => {
				unfollow.mutate();
			},
		});
	};

	const router = useRouter();

	return (
		<div
			className="flex flex-row w-full items-start gap-4 p-4 bg-hover cursor-pointer"
			onClick={() => {
				router.push(composeCharacterHref(character.handle));
			}}
		>
			{/* left - avatar */}
			<div>
				<Avatar size={64} character={character} />
			</div>

			{/* right */}
			<div className="flex-1">
				{/* top */}
				<div className="flex flex-row justify-between">
					{/* top-left - name & handle */}
					<div>
						<div>
							<CharacterName character={character} />
						</div>
						<div>
							<Text size="sm" color="dimmed">
								@{character.handle}
							</Text>
						</div>
					</div>

					{/* top-right - follow button */}
					{!isSelf && (
						<div className="flex w-24" onClick={(e) => e.stopPropagation()}>
							{isLoadingFollowRelation ? (
								<Button radius={"md"} fullWidth p={0} color="dark" loading>
									Follow
								</Button>
							) : followRelation?.isFollowing ? (
								<Button
									radius="md"
									fullWidth
									p={0}
									variant="outline"
									color="dark"
									loading={unfollow.isLoading}
									onClick={handleUnfollow}
								>
									Following
								</Button>
							) : (
								<Button
									radius="md"
									fullWidth
									p={0}
									color="dark"
									loading={follow.isLoading}
									onClick={handleFollow}
								>
									Follow
								</Button>
							)}
						</div>
					)}
				</div>

				{/* bottom - bio */}
				<div>
					<Text lineClamp={2}>{character.metadata?.content?.bio}</Text>
				</div>
			</div>
		</div>
	);
};

export const FollowCharacterSkeleton = () => (
	<div className="flex flex-row w-full items-center gap-4 p-4">
		<Skeleton circle height={60} width={60} />
		<div className="flex flex-col flex-1">
			<Skeleton height={16} width={60} />
			<Skeleton height={14} width={72} mt={4} />
			<Skeleton height={12} mt={4} />
			<Skeleton height={12} mt={2} />
		</div>
		<Skeleton height={30} width={96} />
	</div>
);

export default FollowCharacterCard;
