import { create } from "zustand";
import { indexer } from "@crossbell/indexer";
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
} from "rxjs";

export type BaseCharacterProfileForm = {
	avatar: string | File | null;
	handle: string;
	username: string;
	bio: string;
};

type HandleStatus = "idle" | "generating" | "checking" | "valid" | "existed";
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

		const checkHandle = async (handle: string): Promise<boolean> => {
			if (!isHandleChanged(handle)) return true;

			return !(await indexer.character.getByHandle(handle));
		};

		const validateHandle = (() => {
			const handle$ = new Subject<string>();

			handle$
				.pipe(
					debounceTime(500),
					switchMap((handle) => {
						if (!handle) return EMPTY;

						return from(checkHandle(handle)).pipe(
							map(
								(isValid): HandleStatus =>
									isValid
										? isHandleChanged(handle)
											? "valid"
											: "idle"
										: "existed"
							),
							startWith("checking" as const),
							takeUntil(cancel$)
						);
					})
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
								from(checkHandle(handle)).pipe(
									map((isValid) => {
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
									map((isFinished) => ({ isFinished, handle }))
								)
							),
							takeUntil(cancel$)
						);
					})
				)
				.subscribe(({ isFinished, handle }) => {
					if (isFinished) {
						set({ handleStatus: "valid", handle });
					} else {
						set({ handleStatus: "generating" });
					}
				});

			return (username: string) => {
				cancelOngoingProcess();
				username$.next(username);
			};
		})();

		return {
			handle: "",
			handleStatus: "idle",
			autoGenerateHandle: true,
			updateHandle(handle) {
				set({ handle });
				validateHandle(handle);
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

				set({ ...baseForm, accountType, handleStatus: "idle" });
			},

			isHandleChanged() {
				return isHandleChanged(get().handle);
			},

			isMetadataChanged() {
				return isMetadataChanged();
			},
		};
	}
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
