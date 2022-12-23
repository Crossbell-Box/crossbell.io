import { detect } from "detect-browser";

export function isIOS(): boolean {
	return detect()?.os?.toLowerCase().includes("ios") ?? false;
}

export function isAndroid(): boolean {
	return detect()?.os?.toLowerCase().includes("android") ?? false;
}

export function isMobile(): boolean {
	return isAndroid() || isIOS();
}
