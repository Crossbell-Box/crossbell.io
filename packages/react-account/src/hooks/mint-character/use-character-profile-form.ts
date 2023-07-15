import { create } from "zustand";
import { generateCharacterHandle } from "@crossbell/util-metadata";
import { useUploadToIpfs } from "@crossbell/util-hooks";
import {
	Subject,
	from,
	switchMap,
	map,
	startWith,
	EMPTY,
	takeUntil,
	catchError,
	debounceTime,
	Observable,
} from "rxjs";

import { validateHandle, ValidateHandleErrorKind } from "../../utils";

export type BaseCharacterProfileForm = {
	avatar: string | File | null;
	handle: string;
	username: string;
	bio: string;
};

type HandleStatus =
	| { kind: "idle" | "generating" | "checking" | "valid" }
	| { kind: ValidateHandleErrorKind; msg: string };
type AccountType = "wallet" | "email";

export type CharacterProfileForm = BaseCharacterProfileForm & {
	accountType: AccountType;
	updateAccountType: (type: AccountType) => void;

	updateAvatar: (avatar: BaseCharacterProfileForm["avatar"]) => void;

	handleStatus: HandleStatus;
	updateHandle: (handle: string) => void;

	updateUsername: (username: string) => void;

	updateBio: (bio: string) => void;

	reset: (type: AccountType, form?: BaseCharacterProfileForm) => void;
	isHandleChanged: () => boolean;
	isMetadataChanged: () => boolean;
};

const getBaseForm = (): BaseCharacterProfileForm => ({
	avatar: null,
	bio: "",
	handle: "",
	username: "",
});

export const useCharacterProfileForm = create<CharacterProfileForm>(
	(set, get) => {
		const cancel$ = new Subject();
		const cancelOngoingProcess = () => cancel$.next(null);
		let baseForm = getBaseForm();
		let isHandleEditedManually = false;

		const needAutoGenerateHandle = () => {
			if (get().accountType === "wallet") {
				const isHandleExistedBefore = !!baseForm.handle;
				return !isHandleExistedBefore && !isHandleEditedManually;
			} else {
				// Email user cannot edit handle
				return false;
			}
		};

		const isHandleChanged = (handle: string) => handle !== baseForm.handle;

		const isMetadataChanged = (): boolean => {
			const { username, bio, avatar } = get();

			return (
				username !== baseForm.username ||
				bio !== baseForm.bio ||
				avatar !== baseForm.avatar
			);
		};

		const checkHandle = (() => {
			const handle$ = new Subject<string>();

			handle$
				.pipe(
					debounceTime(500),
					switchMap((handle): Observable<HandleStatus> => {
						if (!handle) return EMPTY;

						if (!isHandleChanged(handle)) {
							return from([{ kind: "idle" }] as const);
						}

						return from(validateHandle(handle)).pipe(
							map(
								({ isValid, error, errorMsg }): HandleStatus =>
									isValid ? { kind: "valid" } : { kind: error, msg: errorMsg },
							),
							startWith({ kind: "checking" as const }),
							takeUntil(cancel$),
						);
					}),
				)
				.subscribe((handleStatus) => {
					set({ handleStatus });
				});

			return (handle: string) => {
				cancelOngoingProcess();
				handle$.next(handle);
			};
		})();

		const generateHandle = (() => {
			const username$ = new Subject<string>();
			const usedErrorMsg = "Handle was used.";

			username$
				.pipe(
					debounceTime(500),
					switchMap((username) => {
						if (!username) return EMPTY;

						return from([username]).pipe(
							map(generateCharacterHandle),
							switchMap((handle) =>
								from(validateHandle(handle)).pipe(
									map(({ isValid }) => {
										if (isValid) {
											return true;
										} else {
											throw usedErrorMsg;
										}
									}),
									catchError((error, retry$) => {
										if (error === usedErrorMsg) {
											return retry$;
										}

										throw error;
									}),
									startWith(false),
									map((isFinished) => ({ isFinished, handle })),
								),
							),
							takeUntil(cancel$),
						);
					}),
				)
				.subscribe(({ isFinished, handle }) => {
					if (isFinished) {
						set({ handleStatus: { kind: "valid" }, handle });
					} else {
						set({ handleStatus: { kind: "generating" } });
					}
				});

			return (username: string) => {
				cancelOngoingProcess();
				username$.next(username);
			};
		})();

		return {
			handle: "",
			handleStatus: { kind: "idle" },
			autoGenerateHandle: true,
			updateHandle(handle) {
				set({ handle });
				checkHandle(handle);
				isHandleEditedManually = true;
			},

			bio: "",
			updateBio(bio) {
				set({ bio });
			},

			avatar: null,
			updateAvatar(avatar) {
				set({ avatar });
			},

			username: "",
			updateUsername(username) {
				if (needAutoGenerateHandle()) {
					set({ username, handle: "" });

					generateHandle(username);
				} else {
					set({ username });
				}
			},

			accountType: "wallet",
			updateAccountType(accountType) {
				set({ accountType });
			},

			reset(accountType: CharacterProfileForm["accountType"], form) {
				baseForm = {
					username: form?.username ?? "",
					handle: form?.handle ?? "",
					bio: form?.bio ?? "",
					avatar: form?.avatar ?? null,
				};

				isHandleEditedManually = false;

				set({ ...baseForm, accountType, handleStatus: { kind: "idle" } });
			},

			isHandleChanged() {
				return isHandleChanged(get().handle);
			},

			isMetadataChanged() {
				return isMetadataChanged();
			},
		};
	},
);

export function useUploadAvatar() {
	const { mutate: _, mutateAsync, ...mutation } = useUploadToIpfs();

	return {
		...mutation,

		async mutateAsync({ avatar }: Pick<CharacterProfileForm, "avatar">) {
			return avatar
				? typeof avatar === "string"
					? avatar
					: mutateAsync(avatar)
				: null;
		},
	};
}
