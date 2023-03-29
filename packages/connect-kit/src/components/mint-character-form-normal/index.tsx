import React from "react";
import { Loading } from "@crossbell/ui";

import { CharacterProfileForm } from "../../hooks";

import { FiledTips } from "../filed-tips";
import { Textarea } from "../textarea";
import { ActionBtn } from "../action-btn";
import { Field } from "../field";
import { TextInput } from "../text-input";

import styles from "./index.module.css";
import { Avatar } from "./avatar";
import { AvatarIcon, BioIcon, HandleIcon, NameIcon } from "./icons";

export type MintCharacterFormNormalProps = {
	onSwitchMode?: () => void;
	submitBtnText?: React.ReactNode;
	onSubmit: () => void;
	form: CharacterProfileForm;
};

export function MintCharacterFormNormal({
	onSwitchMode,
	submitBtnText,
	onSubmit,
	form,
}: MintCharacterFormNormalProps) {
	return (
		<div className={styles.container}>
			<Field
				icon={<AvatarIcon />}
				title="Avatar"
				tips={<span className={styles.filedTips}> * Max size is 2MB.</span>}
			>
				<Avatar file={form.avatar} onSelect={form.updateAvatar} />
			</Field>

			<Field icon={<NameIcon />} title="Name">
				<TextInput
					placeholder="Unique name for your character"
					value={form.username}
					onInput={(e) => form.updateUsername(e.currentTarget.value)}
				/>
			</Field>

			{form.accountType === "wallet" && (
				<Field icon={<HandleIcon />} title="Handle">
					<TextInput
						placeholder="Your ID for interacting with the Crossbell"
						value={form.handle}
						onInput={(e) => form.updateHandle(e.currentTarget.value)}
					/>
				</Field>
			)}

			{((): Exclude<React.ReactNode, undefined> => {
				switch (form.handleStatus) {
					case "checking":
						return (
							<FiledTips className={styles.tips} color="#999">
								<Loading />
								Checking
							</FiledTips>
						);

					case "existed":
						return (
							<FiledTips className={styles.tips} color="#D32F2F">
								The handle is already in use. Please choose a different one.
							</FiledTips>
						);

					case "generating":
						return (
							<FiledTips className={styles.tips} color="#999">
								<Loading />
								Generating handle
							</FiledTips>
						);

					case "valid":
						return (
							<FiledTips className={styles.tips} color="#6AD991">
								Valid handle
							</FiledTips>
						);
					case "idle":
						return null;
				}
			})()}

			<Field icon={<BioIcon />} title="Bio">
				<Textarea
					placeholder="Tell more about yourself"
					value={form.bio}
					onInput={(e) => form.updateBio(e.currentTarget.value)}
				/>
			</Field>

			<div className={styles.actions}>
				{onSwitchMode && (
					<ActionBtn color="ghost" size="md" onClick={onSwitchMode}>
						Quickly mint?
					</ActionBtn>
				)}

				<ActionBtn
					disabled={!form.username || !form.handle}
					color="green"
					size="md"
					minWidth="133px"
					onClick={onSubmit}
				>
					{submitBtnText ?? "Mint"}
				</ActionBtn>
			</div>
		</div>
	);
}
