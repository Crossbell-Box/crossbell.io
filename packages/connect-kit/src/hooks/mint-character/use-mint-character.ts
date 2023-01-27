import { useUploadToIpfs } from "@crossbell/util-hooks";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { OmitActions } from "../../utils";

import { useHandleError } from "../use-handle-error";
import { useCreateCharacter } from "../use-create-character";

import { MintCharacterForm } from "./use-mint-character-form";

export type UseMintCharacterParamsOptions = UseMutationOptions<
	unknown,
	unknown,
	OmitActions<MintCharacterForm>
>;

export function useMintCharacter(options?: UseMintCharacterParamsOptions) {
	const createCharacter = useCreateCharacter();
	const uploadToIpfs = useUploadToIpfs();
	const handleError = useHandleError("Mint Character");

	return useMutation(
		async ({ bio, avatar: file, handle, username }) => {
			if (!handle || !username) return;

			const avatar = file && (await uploadToIpfs.mutateAsync(file));

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
