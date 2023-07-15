export const ERROR_CODES = {
	NOT_CONNECTED: "NOT_CONNECTED",
	NO_CHARACTER: "NO_CHARACTER",
	NOT_ENOUGH_CSB: "NOT_ENOUGH_CSB",
} as const;
export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

export class BizError extends Error {
	constructor(
		message: string,
		public code: ErrorCode,
	) {
		super(message);
		this.code = code;
	}

	toString() {
		return `${this.code}: ${this.message}`;
	}

	toJSON() {
		return {
			message: this.message,
			code: this.code,
		};
	}
}
