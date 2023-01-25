import React from "react";
import { Loading } from "@crossbell/ui";

import { useGenerateHandle } from "../../hooks/use-generate-handle";

import { FiledTips } from "../filed-tips";
import { Textarea } from "../textarea";
import { ActionBtn } from "../action-btn";
import { Field } from "../field";
import { TextInput } from "../text-input";

import styles from "./index.module.css";
import { Avatar } from "./avatar";
import { AvatarIcon, BioIcon, NameIcon } from "./icons";
import { useRefreshDynamicContainer } from "../dynamic-container";

export type MintCharacterProps = {
	onSwitchMode: () => void;
	onSubmit: () => void;
};

export function MintCharacter({ onSwitchMode, onSubmit }: MintCharacterProps) {
	const [file, setFile] = React.useState<File | null>(null);
	const [username, setUsername] = React.useState("");
	const handle = useGenerateHandle(username);
	const [bio, setBio] = React.useState("");
	const refreshDynamicContainer = useRefreshDynamicContainer();
	const isAbleToSubmit = !!(username && handle);

	React.useEffect(refreshDynamicContainer, [handle, username]);

	return (
		<div className={styles.container}>
			<Field icon={<AvatarIcon />} title="Avatar" tips=" * Max size is 2MB.">
				<Avatar file={file} onSelect={setFile} />
			</Field>

			<Field icon={<NameIcon />} title="Name ＆ Handle">
				<TextInput
					value={username}
					onInput={(e) => setUsername(e.currentTarget.value)}
				/>
			</Field>

			{username && (
				<FiledTips className={styles.tips} color={handle ? "#6AD991" : "#999"}>
					Your handle: {handle || <Loading />}
				</FiledTips>
			)}

			<Field icon={<BioIcon />} title="Bio">
				<Textarea value={bio} onInput={(e) => setBio(e.currentTarget.value)} />
			</Field>

			<div className={styles.actions}>
				<ActionBtn color="ghost" size="md" onClick={onSwitchMode}>
					Quickly mint?
				</ActionBtn>

				<ActionBtn
					disabled={!isAbleToSubmit}
					color="green"
					size="md"
					minWidth="133px"
					onClick={onSubmit}
				>
					Next Step
				</ActionBtn>
			</div>
		</div>
	);
}
