import { useCurrentCharacter } from "@/utils/apis/indexer";
import { useCharacterActivation } from "@/utils/apis/operator-sync";
import { Divider } from "@mantine/core";
import CharacterSection from "./CharacterSection";
import OperatorSettingsSection from "./OperatorSettingsSection";
import OperatorSyncWelcome from "./OperatorSyncWelcome";
import PlatformsSection from "./PlatformsSection";

export default function OperatorSyncMain() {
	const { data: character } = useCurrentCharacter();
	const { data: activation, isLoading: isLoadingActivation } =
		useCharacterActivation(character?.characterId);

	return (
		<div>
			{!isLoadingActivation && activation && (
				<div className="px-5">
					<CharacterSection />
					<Divider my="sm" />
					<OperatorSettingsSection />
					<PlatformsSection />
				</div>
			)}

			{!isLoadingActivation && !activation && <OperatorSyncWelcome />}
		</div>
	);
}
