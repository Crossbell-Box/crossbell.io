import { Button, Space } from "@mantine/core";
import { NoteEntity } from "crossbell.js";
import { useState } from "react";

import { getOrigin } from "~/shared/url";
import { composeNoteMetadata } from "@crossbell/util-metadata";
import EmojiPicker from "@/components/common/Input/EmojiPicker";
import {
	useAccountCharacter,
	useConnectModal,
	usePostNoteForNote,
} from "@crossbell/connect-kit";

import { Avatar } from "~/shared/components/avatar";
import Textarea from "../common/Input/Textarea";

export function CommentTextarea({ note }: { note: NoteEntity }) {
	const character = useAccountCharacter();
	const connectModal = useConnectModal();

	const [value, setValue] = useState("");

	const postNoteForNote = usePostNoteForNote();

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
					onClick={
						character
							? () => {
									const metadata = composeNoteMetadata(
										{ content: value },
										getOrigin()
									);

									postNoteForNote.mutate(
										{ metadata, note },
										{ onSuccess: () => setValue("") }
									);
							  }
							: connectModal.show
					}
					loading={postNoteForNote.isLoading}
				>
					Comment
				</Button>
			</div>
		</div>
	);
}
