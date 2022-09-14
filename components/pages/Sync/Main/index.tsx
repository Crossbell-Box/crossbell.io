import {
	useCharacterOperator,
	useCurrentCharacter,
} from "@/utils/apis/indexer";
import {
	OPERATOR_ADDRESS,
	useCharacterActivation,
} from "@/utils/apis/operator-sync";
import { isAddressEqual } from "@/utils/ethers";
import { Divider, Loader } from "@mantine/core";
import CharacterSection from "./CharacterSection";
import OperatorSettingsSection from "./OperatorSettingsSection";
import OperatorSyncWelcome from "./OperatorSyncWelcome";
import PlatformsSection from "./PlatformsSection";

export default function OperatorSyncMain() {
	const { data: character, characterId } = useCurrentCharacter();
	const { data: activation, isLoading: isLoadingActivation } =
		useCharacterActivation(character?.characterId);

	const { data: operator, isLoading: isLoadingOperator } = useCharacterOperator(
		character?.characterId
	);
	const hasOperator = isAddressEqual(operator, OPERATOR_ADDRESS);

	const isNoCharacter = !characterId;
	const isNoActivation = !isLoadingActivation && !activation;

	return (
		<div>
			{!isLoadingActivation && activation && (
				<div className="px-5">
					<CharacterSection />
					<Divider my="sm" />
					{isLoadingOperator ? (
						<div className="w-full flex justify-center">
							<Loader />
						</div>
					) : hasOperator ? (
						<PlatformsSection />
					) : (
						<OperatorSettingsSection />
					)}
				</div>
			)}

			{(isNoCharacter || isNoActivation) && <OperatorSyncWelcome />}
		</div>
	);
}
