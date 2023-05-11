import { useCharacter } from "@crossbell/indexer";
import { AttributesMetadata } from "crossbell";

import { useUpdateCharacterMetadata } from "../use-update-character-metadata";

export type UseCharacterAttributeParams = {
	characterId?: number;
	key?: string;
};

type ValidType = Required<AttributesMetadata>["attributes"][0]["value"];

export type UseCharacterAttributeOptions = Exclude<
	Parameters<typeof useUpdateCharacterMetadata>[0],
	undefined
>;

export function useCharacterAttribute<T extends ValidType>(
	{ characterId, key }: UseCharacterAttributeParams,
	options?: UseCharacterAttributeOptions
) {
	const query = useCharacter(characterId);
	const mutation = useUpdateCharacterMetadata(options);
	const data =
		query.data?.metadata?.content?.attributes?.find(
			(attribute) => attribute.trait_type === key
		)?.value ?? null;

	return {
		data,
		isLoading: query.isLoading || mutation.isLoading,
		update(value: T | null) {
			if (!characterId || !key) return;

			mutation.mutate({
				characterId,
				edit(draft) {
					const attributes =
						draft.attributes?.filter((i) => i.trait_type !== key) ?? [];

					if (value !== null) {
						attributes.push({ value, trait_type: key });
					}

					draft.attributes = attributes;
				},
			});
		},
	};
}
