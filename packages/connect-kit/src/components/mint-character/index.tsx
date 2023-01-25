import React from "react";
import { Loading, LoadingOverlay } from "@crossbell/ui";
import { useCreateCharacter } from "@crossbell/connect-kit";
import { useRefCallback, useUploadToIpfs } from "@crossbell/util-hooks";

import { useGenerateHandle } from "../../hooks/use-generate-handle";

import { FiledTips } from "../filed-tips";
import { Textarea } from "../textarea";
import { ActionBtn } from "../action-btn";
import { Field } from "../field";
import { TextInput } from "../text-input";
import { useRefreshDynamicContainer } from "../dynamic-container";

import styles from "./index.module.css";
import { Avatar } from "./avatar";
import { AvatarIcon, BioIcon, NameIcon } from "./icons";
import { useHandleError } from "../../hooks/use-handle-error";

export type MintCharacterProps = {
	onSwitchMode: () => void;
	afterSubmit: () => void;
};

export function MintCharacter({
	onSwitchMode,
	afterSubmit,
}: MintCharacterProps) {
	const refreshDynamicContainer = useRefreshDynamicContainer();
	const model = useMintCharacterModel({ afterSubmit });

	React.useEffect(refreshDynamicContainer, [model.handle, model.username]);

	return (
		<div className={styles.container}>
			<LoadingOverlay visible={model.isSubmitting} />

			<Field icon={<AvatarIcon />} title="Avatar" tips=" * Max size is 2MB.">
				<Avatar file={model.file} onSelect={model.setFile} />
			</Field>

			<Field icon={<NameIcon />} title="Name ＆ Handle">
				<TextInput
					value={model.username}
					onInput={(e) => model.setUsername(e.currentTarget.value)}
				/>
			</Field>

			{model.username && (
				<FiledTips
					className={styles.tips}
					color={model.handle ? "#6AD991" : "#999"}
				>
					Your handle: {model.handle || <Loading />}
				</FiledTips>
			)}

			<Field icon={<BioIcon />} title="Bio">
				<Textarea
					value={model.bio}
					onInput={(e) => model.setBio(e.currentTarget.value)}
				/>
			</Field>

			<div className={styles.actions}>
				<ActionBtn color="ghost" size="md" onClick={onSwitchMode}>
					Quickly mint?
				</ActionBtn>

				<ActionBtn
					disabled={!model.isAbleToSubmit}
					color="green"
					size="md"
					minWidth="133px"
					onClick={model.submit}
				>
					Mint
				</ActionBtn>
			</div>
		</div>
	);
}

export function useMintCharacterModel({
	afterSubmit,
}: Pick<MintCharacterProps, "afterSubmit">) {
	const [file, setFile] = React.useState<File | null>(null);
	const [username, setUsername] = React.useState("");
	const handle = useGenerateHandle(username);
	const [bio, setBio] = React.useState("");
	const createCharacter = useCreateCharacter();
	const uploadToIpfs = useUploadToIpfs();
	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const handleError = useHandleError("Mint Character");

	const submit = useRefCallback(async () => {
		if (!handle || !username) return;

		setIsSubmitting(true);

		try {
			const avatar = file && (await uploadToIpfs.mutateAsync(file));

			await createCharacter.mutateAsync({
				handle,
				metadata: {
					name: username,
					avatars: [avatar].filter(Boolean) as string[],
					bio,
				},
			});

			afterSubmit();
		} catch (error) {
			handleError(error);
		} finally {
			setIsSubmitting(false);
		}
	});

	return {
		file,
		setFile,

		username,
		setUsername,

		handle,

		bio,
		setBio,

		isAbleToSubmit: !!(username && handle),
		isSubmitting,
		submit,
	};
}
