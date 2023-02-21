import { Space, Text } from "@mantine/core";
import classNames from "classnames";

import { useRefCallback } from "@crossbell/util-hooks";

import { composeNoteHref, getOrigin } from "~/shared/url";
import { copyToClipboard } from "~/shared/other";
import { LoadingOverlay } from "~/shared/components/loading-overlay";
import { Tooltip } from "~/shared/components/tooltip";

import { useNavigateToNote } from "../hooks/use-navigate-to-note";
import { NoteModel } from "../hooks/use-note-model";

export function NoteActions({ model }: { model: NoteModel }) {
	const { navigate } = useNavigateToNote(model.characterId, model.noteId);

	const handleCopyToClipboard = useRefCallback(async () => {
		await copyToClipboard(
			getOrigin() + composeNoteHref(model.characterId, model.noteId),
			{ showNotification: true }
		);
	});

	return (
		<div className="flex items-center justify-between">
			<LoadingOverlay
				visible={model.isLoading}
				description={model.loadingDescription}
				global
				onClick={(e) => e.stopPropagation()}
			/>

			{/* comment */}
			<ActionButton
				text={model.commentCount ?? "..."}
				label="Comment"
				icon="i-csb:comment"
				bgHoverColor="group-hover:bg-blue/10"
				textHoverColor="group-hover:text-blue"
				onClick={navigate}
			/>

			{/* like */}
			<ActionButton
				text={model.likeCount ?? "..."}
				label="Like"
				icon={model.isLiked ? "i-csb:like-filled" : "i-csb:like"}
				color={model.isLiked ? "text-red" : "text-dimmed"}
				bgHoverColor="group-hover:bg-red/10"
				textHoverColor="group-hover:text-red"
				onClick={model.like}
			/>

			{/* mint */}
			<ActionButton
				text={model.mintCount ?? "..."}
				label="Mint"
				icon="i-csb:mint"
				color={model.isMinted ? "text-yellow" : "text-dimmed"}
				bgHoverColor="group-hover:bg-yellow/10"
				textHoverColor="group-hover:text-yellow"
				onClick={model.mint}
			/>

			{/* share */}
			<ActionButton
				label="Share"
				icon="i-csb:share"
				bgHoverColor="group-hover:bg-green/10"
				textHoverColor="group-hover:text-green"
				onClick={handleCopyToClipboard}
			/>

			{/* used for ui placeholder */}
			<div className="flex items-center"></div>
		</div>
	);
}

function ActionButton({
	text,
	label,
	color = "text-dimmed",
	icon = "i-csb:comment",
	bgHoverColor = "group-hover:bg-blue/10",
	textHoverColor = "group-hover:text-blue",
	onClick,
}: {
	text?: number | string | undefined;
	label: string;
	color?: string;
	icon: string;
	bgHoverColor: string;
	textHoverColor: string;
	onClick?: () => void;
}) {
	return (
		<Tooltip label={label}>
			<div
				className="flex items-center group cursor-pointer"
				onClick={(e) => {
					e.stopPropagation();
					onClick?.();
				}}
			>
				<div className="relative">
					<div
						className={classNames(
							"absolute rounded-100% top-0 bottom-0 left-0 right-0 scale-150",
							bgHoverColor
						)}
					/>
					<Text
						className={classNames("transition", color, icon, textHoverColor)}
					/>
				</div>
				<Space w={5} />
				<Text size="sm" className={classNames("text-dimmed", textHoverColor)}>
					{text}
				</Text>
			</div>
		</Tooltip>
	);
}
