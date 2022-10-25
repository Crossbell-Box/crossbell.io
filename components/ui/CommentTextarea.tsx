import { usePostNoteForNote } from "@/utils/apis/contract";
import { useCurrentCharacter } from "@/utils/apis/indexer";
import { composeNoteMetadata } from "@/utils/metadata";
import { Button, Space } from "@mantine/core";
import { NoteEntity } from "crossbell.js";
import { useState } from "react";
import Avatar from "../common/Avatar";
import Textarea from "../common/Input/Textarea";
import EmojiPicker from "@/components/common/Input/EmojiPicker";

export function CommentTextarea({ note }: { note: NoteEntity }) {
	const { data: character } = useCurrentCharacter();

	const [value, setValue] = useState("");

	const postNoteForNote = usePostNoteForNote(note.characterId, note.noteId);

	return (
		<div className="px-3 py-3">
			<div className="flex w-full">
				<Avatar
					characterId={character?.characterId}
					character={character}
					size={48}
				/>

				<Space w={10} />

				{/* textarea */}
				<div className="relative flex-grow">
					<Textarea
						placeholder="Type your comment"
						autosize
						minRows={2}
						maxRows={10}
						value={value}
						onChange={(e) => setValue(e.target.value)}
						disabled={postNoteForNote.isLoading}
					/>

					{/* emoji */}
					<div className="absolute top-5px right-5px">
						<EmojiPicker onEmojiSelect={(e) => setValue((v) => v + e)} />
					</div>
				</div>
			</div>

			<Space h={10} />

			<div className="flex justify-end">
				<Button
					disabled={value.length === 0}
					onClick={() => {
						const metadata = composeNoteMetadata({ content: value });
						postNoteForNote.mutate(metadata, {
							onSuccess: () => setValue(""),
						});
					}}
					loading={postNoteForNote.isLoading}
				>
					Comment
				</Button>
			</div>
		</div>
	);
}
