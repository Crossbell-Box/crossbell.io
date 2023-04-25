import { useUploadToIpfs } from "@crossbell/util-hooks";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { useHandleError } from "../use-handle-error";
import { useCreateCharacter } from "../use-create-character";

import { BaseCharacterProfileForm } from "./use-character-profile-form";

export type UseMintCharacterParams = Pick<
	BaseCharacterProfileForm,
	"avatar" | "handle" | "username" | "bio"
>;

export type UseMintCharacterParamsOptions = UseMutationOptions<
	unknown,
	unknown,
	UseMintCharacterParams
>;

export function useMintCharacter(options?: UseMintCharacterParamsOptions) {
	const createCharacter = useCreateCharacter();
	const uploadToIpfs = useUploadToIpfs();
	const handleError = useHandleError("Mint Character");

	return useMutation(
		async ({ bio, avatar: file, handle, username }) => {
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
		{
			...options,

			onError(...params) {
				options?.onError?.(...params);
				handleError(params[0]);
			},
		}
	);
}
