import React from "react";
import { showNotification } from "@mantine/notifications";
import { useRefCallback } from "@crossbell/util-hooks";
import { LoadingOverlay } from "@crossbell/ui";
import compact from "lodash.compact";

import {
	DynamicScenesContainer,
	DynamicScenesHeader,
	MintCharacterFormNormal,
	useDynamicScenesModal,
} from "../../../../components";
import {
	useUploadAvatar,
	GeneralAccount,
	useConnectedAccount,
	CharacterProfileForm,
	useCharacterProfileForm,
	useUpdateCharacterHandle,
	useUpdateCharacterMetadata,
} from "../../../../hooks";

export function EditCharacterProfile() {
	const form = useCharacterProfileForm();
	const account = useConnectedAccount();
	const updateMetadata = useUpdateCharacterMetadata();
	const updateHandle = useUpdateCharacterHandle();
	const uploadAvatar = useUploadAvatar();
	const isLoading =
		updateMetadata.isLoading ||
		updateHandle.isLoading ||
		uploadAvatar.isLoading;
	const [loadingTips, setLoadingTips] = React.useState("");
	const modal = useDynamicScenesModal();

	const handleSubmit = useRefCallback(async () => {
		const character = account?.character;

		if (!character) return;

		const processList: { tips: string; action: () => Promise<unknown> }[] = [];

		if (form.isHandleChanged()) {
			processList.push({
				tips: "Updating handle",
				action: () =>
					updateHandle.mutateAsync({
						characterId: character.characterId,
						handle: form.handle,
					}),
			});
		}

		if (form.isMetadataChanged()) {
			processList.push({
				tips: "Updating metadata",
				action: async () => {
					const avatar = await uploadAvatar.mutateAsync(form);
					return updateMetadata.mutateAsync({
						characterId: character.characterId,
						edit(metadata) {
							metadata.type = metadata.type ?? "character";
							metadata.name = form.username;
							metadata.avatars = compact([avatar]);
							metadata.bio = form.bio;
						},
					});
				},
			});
		}

		for (const [index, { tips, action }] of processList.entries()) {
			setLoadingTips(`${tips} (${index + 1}/${processList.length})`);
			await action();
		}

		if (processList.length > 0) {
			showNotification({ message: "Profile Updated", color: "green" });
		}

		modal.hide();
	});

	useAutoResetForm({ account, form, isActive: modal.isActive });

	return (
		<DynamicScenesContainer
			padding="10px 24px 36px"
			header={<DynamicScenesHeader title="Edit Profile" />}
		>
			<LoadingOverlay visible={isLoading}>{loadingTips}</LoadingOverlay>
			<MintCharacterFormNormal
				form={form}
				onSubmit={handleSubmit}
				submitBtnText="Save Profile"
			/>
		</DynamicScenesContainer>
	);
}

function useAutoResetForm({
	account,
	form,
	isActive,
}: {
	account: GeneralAccount | null;
	form: CharacterProfileForm;
	isActive: boolean;
}) {
	const bio = account?.character?.metadata?.content?.bio ?? "";
	const username = account?.character?.metadata?.content?.name ?? "";
	const handle = account?.character?.handle ?? "";
	const avatar = account?.character?.metadata?.content?.avatars?.[0] ?? null;

	React.useEffect(() => {
		if (account?.character) {
			form.reset(account.type, { bio, username, handle, avatar });
		}
	}, [account?.type, isActive, bio, username, handle, avatar]);
}
