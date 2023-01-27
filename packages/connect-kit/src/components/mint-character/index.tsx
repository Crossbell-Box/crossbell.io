import React from "react";
import { Loading, LoadingOverlay } from "@crossbell/ui";
import { useRefCallback } from "@crossbell/util-hooks";

import { useMintCharacter, useMintCharacterForm } from "../../hooks";

import { FiledTips } from "../filed-tips";
import { Textarea } from "../textarea";
import { ActionBtn } from "../action-btn";
import { Field } from "../field";
import { TextInput } from "../text-input";
import { useRefreshDynamicContainer } from "../dynamic-container";

import styles from "./index.module.css";
import { Avatar } from "./avatar";
import { AvatarIcon, BioIcon, NameIcon } from "./icons";

export type MintCharacterProps = {
	onSwitchMode: () => void;
	afterSubmit: () => void;
};

export function MintCharacter({
	onSwitchMode,
	afterSubmit,
}: MintCharacterProps) {
	const refreshDynamicContainer = useRefreshDynamicContainer();
	const mintCharacter = useMintCharacter({ onSuccess: afterSubmit });
	const form = useMintCharacterForm();
	const mint = useRefCallback(() => mintCharacter.mutate(form));

	React.useEffect(refreshDynamicContainer, [form.handle, form.username]);

	return (
		<div className={styles.container}>
			<LoadingOverlay visible={mintCharacter.isLoading} />

			<Field
				icon={<AvatarIcon />}
				title="Avatar"
				tips={<span className={styles.filedTips}> * Max size is 2MB.</span>}
			>
				<Avatar file={form.avatar} onSelect={form.updateAvatar} />
			</Field>

			<Field icon={<NameIcon />} title="Name ＆ Handle">
				<TextInput
					placeholder="Unique name for your character"
					value={form.username}
					onInput={(e) => form.updateUsername(e.currentTarget.value)}
				/>
			</Field>

			{form.username && (
				<FiledTips
					className={styles.tips}
					color={form.handle ? "#6AD991" : "#999"}
				>
					Your handle: {form.handle || <Loading />}
				</FiledTips>
			)}

			<Field icon={<BioIcon />} title="Bio">
				<Textarea
					placeholder="Tell more about yourself"
					value={form.bio}
					onInput={(e) => form.updateBio(e.currentTarget.value)}
				/>
			</Field>

			<div className={styles.actions}>
				<ActionBtn color="ghost" size="md" onClick={onSwitchMode}>
					Quickly mint?
				</ActionBtn>

				<ActionBtn
					disabled={!form.username || !form.handle}
					color="green"
					size="md"
					minWidth="133px"
					onClick={mint}
				>
					Mint
				</ActionBtn>
			</div>
		</div>
	);
}
