import { useUploadToIpfs } from "@crossbell/util-hooks";

import { createAccountTypeBasedMutationHooks } from "../account-type-based-hooks";
import { useCreateCharacter } from "../use-create-character";
import { BaseCharacterProfileForm } from "./use-character-profile-form";

export type UseMintCharacterParams = Pick<
	BaseCharacterProfileForm,
	"avatar" | "handle" | "username" | "bio"
>;

export const useMintCharacter = createAccountTypeBasedMutationHooks<
	void,
	UseMintCharacterParams
>(
	{
		actionDesc: "mint-character",
		withParams: false,
		connectType: "wallet",
		mustHaveCharacter: false,
	},
	() => {
		const createCharacter = useCreateCharacter();
		const uploadToIpfs = useUploadToIpfs();

		return {
			wallet: {
				supportOPSign: false,
				async action({ bio, avatar: file, handle, username }) {
					if (!handle || !username) return;

					const avatar = file
						? typeof file === "string"
							? file
							: await uploadToIpfs.mutateAsync(file)
						: null;

					await createCharacter.mutateAsync({
						handle,
						metadata: {
							bio,
							name: username,
							avatars: [avatar].filter(Boolean) as string[],
						},
					});
				},
			},
		};
	},
);
