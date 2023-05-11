import { CharacterPermissionKey } from "crossbell";
import { useRefCallback } from "@crossbell/util-hooks";
import { type Address } from "viem";

import { useCharacterOperatorHasPermissions } from "./use-character-operator-has-permissions";
import { useAddCharacterOperator } from "./use-add-character-operator";
import { useRemoveCharacterOperator } from "./use-remove-character-operator";

export type UseToggleCharacterOperatorOptions = {
	operatorAddress: Address;
	permissions: CharacterPermissionKey[];
	characterId: number | null | undefined;
};

export function useToggleCharacterOperator({
	operatorAddress,
	permissions,
	characterId,
}: UseToggleCharacterOperatorOptions) {
	const hasPermissions = useCharacterOperatorHasPermissions({
		operatorAddress,
		permissions,
		characterId,
	});

	const add = useAddCharacterOperator();
	const remove = useRemoveCharacterOperator();
	const mutation = hasPermissions ? remove : add;

	const toggleOperator = useRefCallback(async () => {
		if (characterId) {
			await mutation.mutateAsync({
				characterId,
				permissions,
				operator: operatorAddress,
			});
		}
	});

	return [{ hasPermissions, toggleOperator }, mutation] as const;
}
