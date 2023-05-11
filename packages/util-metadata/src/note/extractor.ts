import { NoteMetadata } from "crossbell";
import { getValidAttachments } from "./attachment";

export function extractCoverImageFromNote(
	ipfsLinkToHttpLink: (url: string) => string,
	note?: NoteMetadata | null
): string | undefined {
	if (!note) {
		return undefined;
	}

	const attachments = getValidAttachments(note.attachments, {
		ipfsLinkToHttpLink,
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

	let text = removeMd(content, {
		gfm: true,
		stripFrontMatter: true,
		stripHTML: true,
	});

	if (length) {
		text = text.slice(0, length);
	}

	if (noLineBreaks) {
		text = text.replace(/\n/g, " ");
	}

	return text;
}

// copied from https://github.com/tommoor/remove-markdown/blob/main/index.js
// and added support for striping front matter
// may need to extract it to a separate package
function removeMd(
	md = "",
	{
		listUnicodeChar = false,
		stripListHeaders = false,
		stripHTML = false,
		stripFrontMatter = false,
		gfm = false,
		keepImgAltText = false,
	}: {
		listUnicodeChar?: boolean;
		stripListHeaders?: boolean;
		stripHTML?: boolean;
		stripFrontMatter?: boolean;
		gfm?: boolean;
		keepImgAltText?: boolean;
	} = {}
) {
	let output = md;

	try {
		if (stripFrontMatter) {
			output = output.replace(/---\s*([\s\S]*?)\s*---/, "");
		}

		// Remove horizontal rules (stripListHeaders conflict with this rule, which is why it has been moved to the top)
		output = output.replace(/^(-\s*?|\*\s*?|_\s*?){3,}\s*$/gm, "");

		if (stripListHeaders) {
			if (listUnicodeChar)
				output = output.replace(
					/^([\s\t]*)([\*\-\+]|\d+\.)\s+/gm,
					listUnicodeChar + " $1"
				);
			else output = output.replace(/^([\s\t]*)([\*\-\+]|\d+\.)\s+/gm, "$1");
		}
		if (gfm) {
			output = output
				// Header
				.replace(/\n={2,}/g, "\n")
				// Fenced codeblocks
				.replace(/~{3}.*\n/g, "")
				// Strikethrough
				.replace(/~~/g, "")
				// Fenced codeblocks
				.replace(/`{3}.*\n/g, "");
		}
		if (stripHTML) {
			output = output.replace(/<[^>]*>/g, "");
		}

		output = output
			// Remove setext-style headers
			.replace(/^[=\-]{2,}\s*$/g, "")
			// Remove footnotes?
			.replace(/\[\^.+?\](\: .*?$)?/g, "")
			.replace(/\s{0,2}\[.*?\]: .*?$/g, "")
			// Remove images
			.replace(/\!\[(.*?)\][\[\(].*?[\]\)]/g, keepImgAltText ? "$1" : "")
			// Remove inline links
			.replace(/\[(.*?)\][\[\(].*?[\]\)]/g, "$1")
			// Remove blockquotes
			.replace(/^\s{0,3}>\s?/g, "")
			// Remove reference-style links?
			.replace(/^\s{1,2}\[(.*?)\]: (\S+)( ".*?")?\s*$/g, "")
			// Remove atx-style headers
			.replace(/^(\n)?\s{0,}#{1,6}\s+| {0,}(\n)?\s{0,}#{0,}$/gm, "$1$2")
			// Remove emphasis (repeat the line to remove double emphasis)
			.replace(/([\*_]{1,3})(\S.*?\S{0,1})\1/g, "$2")
			.replace(/([\*_]{1,3})(\S.*?\S{0,1})\1/g, "$2")
			// Remove code blocks
			.replace(/(`{3,})(.*?)\1/gm, "$2")
			// Remove inline code
			.replace(/`(.+?)`/g, "$1")
			// Replace two or more newlines with exactly two? Not entirely sure this belongs here...
			.replace(/\n{2,}/g, "\n\n");
	} catch (e) {
		console.error(e);
		return md;
	}
	return output;
}
