import create from "zustand";
import debounce from "lodash.debounce";
import { indexer } from "@crossbell/indexer";

import { generateHandleFromName } from "~/shared/character/generate-handle-from-name";

export type MintCharacterForm = {
	avatar: File | null;
	updateAvatar: (file: File | null) => void;

	handle: string;
	username: string;
	updateUsername: (username: string) => void;

	bio: string;
	updateBio: (bio: string) => void;

	reset: () => void;
};

export const useMintCharacterForm = create<MintCharacterForm>((set, get) => {
	const updateHandle = debounce(async (username: string) => {
		if (!username) return;

		const handle = generateHandleFromName(username);
		const isHandleAvailable = !(await indexer.getCharacterByHandle(handle));

		if (username === get().username && isHandleAvailable) {
			set({ handle });
		}
	}, 500);

	return {
		handle: "",

		bio: "",
		updateBio(bio) {
			set({ bio });
		},

		avatar: null,
		updateAvatar(avatar) {
			set({ avatar });
		},

		username: "",
		updateUsername(username) {
			set({ username, handle: "" });
			updateHandle(username);
		},

		reset() {
			set({ username: "", handle: "", bio: "", avatar: null });
		},
	};
});
