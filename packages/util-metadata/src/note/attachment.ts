import { NoteMetadata } from "crossbell";
import { MediaType, MediaTypes, mimeTypeToMediaType } from "./mimetype";

const ContentTypes = ["address", "content"] as const;
export type ContentType = (typeof ContentTypes)[number];

export function getValidAttachments(
	attachments: NoteMetadata["attachments"],
	{
		allowedMediaTypes = MediaTypes,
		allowedContentTypes = ContentTypes,
		ipfsLinkToHttpLink,
	}: {
		allowedMediaTypes?: readonly MediaType[];
		allowedContentTypes?: readonly ContentType[];
		ipfsLinkToHttpLink: (url: string) => string;
	}
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

			if (a.address && allowedContentTypes.includes("address")) {
				const src = ipfsLinkToHttpLink(a.address);
				if (allowedMediaTypes.includes(mediaType)) {
					return {
						...a,
						src,
						mediaType,
					};
				}
			}

			if (a.content && allowedContentTypes.includes("content")) {
				if (allowedMediaTypes.includes(mediaType)) {
					return {
						...a,
						content: a.content,
						mediaType,
					};
				}
			}

			return null;
		})
		.filter(notEmpty);
}

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
	return value !== null && value !== undefined;
}
