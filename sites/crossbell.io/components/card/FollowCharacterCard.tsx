import { Skeleton, Text } from "@mantine/core";
import type { CharacterEntity } from "crossbell.js";
import { Avatar } from "~/shared/components/avatar";
import { CharacterName } from "~/shared/components/character";
import { composeCharacterHref } from "~/shared/url";
import { useRouter } from "next/router";
import { FollowButton } from "~/shared/components/follow-button";

const FollowCharacterCard = ({ character }: { character: CharacterEntity }) => {
	return (
		<div
			className="flex flex-row w-full items-start gap-4 p-4 bg-hover cursor-pointer overflow-hidden"
			onClick={() => {
				window.open(composeCharacterHref(character.handle), "_blank");
			}}
		>
			{/* left - avatar */}
			<div>
				<Avatar size={64} character={character} />
			</div>

			{/* right */}
			<div className="overflow-hidden flex-1">
				{/* top */}
				<div className="flex flex-row flex-wrap justify-between">
					{/* top-left - name & handle */}
					<div>
						<div className="max-w-30vw overflow-hidden text-ellipsis">
							<CharacterName character={character} />
						</div>
						<div className="max-w-30vw overflow-hidden text-ellipsis">
							<Text size="sm" color="dimmed">
								@{character.handle}
							</Text>
						</div>
					</div>

					{/* top-right - follow button */}
					<FollowButton character={character} />
				</div>

				{/* bottom - bio */}
				<div className="overflow-hidden break-words">
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
