import { Space, Text } from "@mantine/core";
import { useAccount } from "wagmi";
import { useCallback } from "react";
import classNames from "classnames";

import {
	useAccountCharacter,
	useToggleLikeNote,
	useMintNote,
} from "@crossbell/connect-kit";
import { useNoteStatus } from "@crossbell/indexer";
import { composeNoteHref, getOrigin } from "~/shared/url";
import { copyToClipboard } from "~/shared/other";
import { useLoginChecker } from "~/shared/wallet/hooks";
import { useRefCallback } from "@crossbell/util-hooks";

import { LoadingOverlay } from "~/shared/components/loading-overlay";
import { Tooltip } from "~/shared/components/tooltip";

import { useNavigateToNote } from "../hooks/use-navigate-to-note";

export function NoteActions({
	characterId,
	noteId,
}: {
	characterId: number;
	noteId: number;
}) {
	const currentCharacter = useAccountCharacter();
	const { data: status } = useNoteStatus(
		characterId,
		noteId,
		currentCharacter ?? null
	);

	const {
		isLiked,
		isLoading: isToggleLikeNoteLoading,
		likeCount,
		toggleLike,
	} = useToggleLikeNote({
		characterId,
		noteId,
		status,
	});

	const { address } = useAccount();
	const mintNote = useMintNote(characterId, noteId, address!);

	const { navigate } = useNavigateToNote(characterId, noteId);
	const { validate } = useLoginChecker();

	const handleLike = useRefCallback(() => {
		if (validate()) {
			toggleLike();
		}
	});

	const handleMint = useRefCallback(() => {
		if (!status?.isMinted && validate({ walletRequired: true })) {
			mintNote.mutate();
		}
	});

	const handleCopyToClipboard = useCallback(async () => {
		await copyToClipboard(getOrigin() + composeNoteHref(characterId, noteId), {
			showNotification: true,
		});
	}, [characterId, noteId]);

	return (
		<div className="flex items-center justify-between">
			<LoadingOverlay
				visible={isToggleLikeNoteLoading || mintNote.isLoading}
				description="Loading..."
				global
			/>

			{/* comment */}
			<ActionButton
				text={status?.commentCount ?? "..."}
				label="Comment"
				icon="i-csb:comment"
				bgHoverColor="group-hover:bg-blue/10"
				textHoverColor="group-hover:text-blue"
				onClick={navigate}
			/>

			{/* like */}
			<ActionButton
				text={likeCount ?? "..."}
				label="Like"
				icon={isLiked ? "i-csb:like-filled" : "i-csb:like"}
				color={isLiked ? "text-red" : "text-dimmed"}
				bgHoverColor="group-hover:bg-red/10"
				textHoverColor="group-hover:text-red"
				onClick={handleLike}
			/>

			{/* mint */}
			<ActionButton
				text={status?.mintCount ?? "..."}
				label="Mint"
				icon="i-csb:mint"
				color={status?.isMinted ? "text-yellow" : "text-dimmed"}
				bgHoverColor="group-hover:bg-yellow/10"
				textHoverColor="group-hover:text-yellow"
				onClick={handleMint}
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
