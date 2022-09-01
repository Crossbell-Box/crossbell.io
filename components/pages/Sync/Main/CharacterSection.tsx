import BaseSection from "./BaseSection";
import Avatar from "@/components/common/Avatar";
import { CharacterHandle, CharacterName } from "@/components/common/Character";
import { useCurrentCharacter } from "@/utils/apis/indexer";
import { Group, Text } from "@mantine/core";
import { useCharacterMediaUsage } from "@/utils/apis/operator-sync";

export default function CharacterSection() {
	const { data: character } = useCurrentCharacter();
	const { data: mediaUsage } = useCharacterMediaUsage(character?.characterId);
	const mediaUsageInMB = ((mediaUsage ?? 0) / 1024 / 1024).toFixed(2);

	return (
		<BaseSection title="Character">
			{character ? (
				<div className="flex justify-between items-center flex-wrap">
					{/* left - user info */}
					<Group className="my-5">
						<Avatar character={character} size={52} />

						<div>
							<div>
								<CharacterName character={character} />
							</div>
							<div>
								<CharacterHandle character={character} color="dimmed" />
							</div>
						</div>
					</Group>

					{/* right - media usage */}
					<div>
						<Text className="font-600 font-deca" size={18}>
							{mediaUsageInMB}MB/∞
						</Text>
					</div>
				</div>
			) : (
				<div>No character</div>
			)}
		</BaseSection>
	);
}
