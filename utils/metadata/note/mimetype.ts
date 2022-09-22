export const MediaTypes = [
	"image",
	"video",
	"audio",
	"model",
	"pdf",
	"html",
] as const;
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
