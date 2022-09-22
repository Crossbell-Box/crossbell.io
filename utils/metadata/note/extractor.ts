import { NoteMetadata } from "crossbell.js";
import { getValidAttachments } from "./attachment";
// @ts-ignore
import removeMd from "remove-markdown";

export function extractCoverImageFromNote(
	note?: NoteMetadata | null
): string | undefined {
	if (!note) {
		return undefined;
	}

	const attachments = getValidAttachments(note.attachments, {
		allowedContentTypes: ["address"],
	});

	let imageUrl: string | undefined = undefined;

	// 1. check attachments
	const coverImage = attachments.find((a) => a.mediaType === "image");
	if (coverImage) {
		imageUrl = coverImage.address;
	}

	// 2. check in the content

	if (!imageUrl) {
		const content = note.content;
		if (content) {
			// markdown
			let match = content.match(/!\[.*?\]\((.*?)\)/);
			if (match) {
				imageUrl = match[1];
			}
			// html
			if (!imageUrl) {
				match = content.match(/<img.*?src="(.*?)"/);
				if (match) {
					imageUrl = match[1];
				}
			}
		}
	}

	return imageUrl;
}

export function extractPlainTextFromNote(
	note?: NoteMetadata | null,
	{
		excludeTitle = false,
		length,
		noLineBreaks = false,
	}: {
		excludeTitle?: boolean;
		length?: number;
		noLineBreaks?: boolean;
	} = {}
): string | undefined {
	if (!note) {
		return undefined;
	}

	let content = "";

	if (note.content) {
		content = note.content;
	}

	if (!excludeTitle && note.title) {
		content = note.title + "\n" + content;
	}

	let text = removeMd(note.content, { gfm: true, useImgAltText: false });

	if (length) {
		text = text.slice(0, length);
	}

	if (noLineBreaks) {
		text = text.replace(/\n/g, " ");
	}

	return text;
}
