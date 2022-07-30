import { CharacterEntity, NoteMetadata } from "crossbell.js";
import { ipfsLinkToHttpLink } from "../ipfs";

/**
 * Receives a note metadata and returns a note object with some basic properties.
 */
export const composeNoteMetadata = (metadata: NoteMetadata): NoteMetadata => {
	if (!metadata.tags) {
		metadata.tags = ["crossbell.io"];
		metadata.sources = ["crossbell.io"];
	}

	return metadata;
};

const MediaTypes = ["image", "video", "audio", "model", "pdf", "html"] as const;
export type MediaType = typeof MediaTypes[number];

export function mimeTypeToMediaType(mimeType: string): MediaType | null {
	if (mimeType.startsWith("image")) {
		return "image";
	}

	if (mimeType.startsWith("video")) {
		return "video";
	}

	if (mimeType.startsWith("audio") || mimeType.endsWith("ogg")) {
		return "audio";
	}

	if (mimeType.startsWith("model")) {
		return "model";
	}

	if (mimeType.startsWith("application/pdf")) {
		return "pdf";
	}

	if (mimeType.startsWith("text/html")) {
		return "html";
	}

	return null;
}

export function getValidAttachments(
	attachments: NoteMetadata["attachments"],
	{
		allowedMediaTypes = MediaTypes,
		withAddressOnly = false,
	}: {
		allowedMediaTypes?: readonly MediaType[];
		withAddressOnly?: boolean;
	} = {}
) {
	if (!attachments) {
		return [];
	}

	return attachments
		.filter((a) => a.mime_type && a.address)
		.map((a) => {
			const mediaType = mimeTypeToMediaType(a.mime_type!);
			if (!mediaType) {
				return null;
			}

			if (withAddressOnly) {
				if (a.address) {
					const src = ipfsLinkToHttpLink(a.address);
					if (allowedMediaTypes.includes(mediaType)) {
						return {
							...a,
							src,
							mediaType,
						};
					}
				}
			} else {
				if (a.content) {
					if (allowedMediaTypes.includes(mediaType)) {
						return {
							...a,
							content: a.content,
							mediaType,
						};
					}
				}
			}

			return null;
		})
		.filter(notEmpty);
}

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
	return value !== null && value !== undefined;
}
