import { indexer } from "@crossbell/indexer";

export type ValidateHandleErrorKind =
	| "existed"
	| "lengthInvalid"
	| "charsInvalid";

export type ValidateHandleResult =
	| { isValid: true; error?: undefined; errorMsg?: undefined }
	| { isValid: false; error: ValidateHandleErrorKind; errorMsg: string };

const ERROR_MSG_MAP: Record<ValidateHandleErrorKind, string> = {
	existed: "The handle is already in use.",
	lengthInvalid: "The handle must be between 3 and 31 characters.",
	charsInvalid:
		"The handle must only contain lower-case letters, numbers, hyphens (-), or underscores (_).",
};

export async function validateHandle(
	handle: string,
): Promise<ValidateHandleResult> {
	if (handle.length >= 32 || handle.length <= 2) {
		return invalid("lengthInvalid");
	}

	if (!/^[\d_a-z-]+$/.test(handle)) {
		return invalid("charsInvalid");
	}

	if (await checkIfExisted(handle)) {
		return invalid("existed");
	}

	return { isValid: true };
}

function invalid(kind: ValidateHandleErrorKind): ValidateHandleResult {
	return {
		isValid: false,
		error: kind,
		errorMsg: ERROR_MSG_MAP[kind],
	};
}

async function checkIfExisted(handle: string): Promise<boolean> {
	return !!(await indexer.character.getByHandle(handle));
}
