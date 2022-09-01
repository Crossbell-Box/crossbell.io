import { useCurrentCharacter } from "@/utils/apis/indexer";
import { useCharacterActivation } from "@/utils/apis/operator-sync";
import { Divider } from "@mantine/core";
import CharacterSection from "./CharacterSection";
import OperatorSettingsSection from "./OperatorSettingsSection";
import OperatorSyncWelcome from "./OperatorSyncWelcome";
import PlatformsSection from "./PlatformsSection";

export default function OperatorSyncMain() {
	const { data: character, characterId } = useCurrentCharacter();
	const { data: activation, isLoading: isLoadingActivation } =
		useCharacterActivation(character?.characterId);

	const isNoCharacter = !characterId;
	const isNoActivation = !isLoadingActivation && !activation;

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

			{(isNoCharacter || isNoActivation) && <OperatorSyncWelcome />}
		</div>
	);
}
