import { SliceFn } from "@crossbell/react-account/utils";

export interface CharacterSlice {
	characterName: string;
	updateCharacterName: (characterName: string) => void;
	validateCharacterName: () => void;
}

export const createCharacterSlice: SliceFn<CharacterSlice> = (set, get) => ({
	characterName: "",
	updateCharacterName: (characterName) => set({ characterName }),
	validateCharacterName: () =>
		set({ characterName: get().characterName.trim() }),
});
