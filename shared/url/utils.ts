export function isExternalUrl(href: string) {
	const origin = globalThis.location?.origin;
	return !(
		href.startsWith(origin) ||
		href.startsWith("#") ||
		href.startsWith("?") ||
		href.startsWith("/")
	);
}
