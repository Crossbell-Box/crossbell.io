import React from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
	useSentryPrivacyModal,
	useSentryStatus,
	useAccountCharacterId,
} from "@crossbell/connect-kit";

type CharacterId = number | undefined | null;

export type SentryPrivacyModalStatus = {
	cache: Record<number, boolean | undefined>;
	checkIsDisplayedBefore: (character: { characterId: CharacterId }) => boolean;
	markAsDisplayed: (character: { characterId: CharacterId }) => void;
};

const useSentryPrivacyModalStatus = create(
	persist<SentryPrivacyModalStatus>(
		(set, get) => ({
			cache: {},

			checkIsDisplayedBefore({ characterId }) {
				return characterId ? !!get().cache[characterId] : false;
			},

			markAsDisplayed({ characterId }) {
				if (characterId) {
					set({ cache: { ...get().cache, [characterId]: true } });
				}
			},
		}),
		{ name: "csb.biz.SentryPrivacy" }
	)
);

export function useNeedShowSentryPrivacyModal() {
	const sentryStatus = useSentryStatus();
	const { characterId } = useAccountCharacterId();
	const { checkIsDisplayedBefore } = useSentryPrivacyModalStatus();
	const isDisplayedBefore = checkIsDisplayedBefore({ characterId });

	return (
		!!characterId &&
		!sentryStatus.isLoading &&
		!sentryStatus.isEnabled &&
		!isDisplayedBefore
	);
}

export function ShowSentryPrivacyModalIfNeed() {
	useShowSentryPrivacyModalIfNeed();
	return <></>;
}

export function useShowSentryPrivacyModalIfNeed() {
	const needShowSentryPrivacyModal = useNeedShowSentryPrivacyModal();
	const { isActive, show } = useSentryPrivacyModal();
	const { characterId } = useAccountCharacterId();
	const { markAsDisplayed } = useSentryPrivacyModalStatus();
	const isActiveRef = React.useRef(isActive);
	const { isEnabled } = useSentryStatus();

	React.useEffect(() => {
		const modalIsHided = isActiveRef.current && !isActive;

		if (modalIsHided || isEnabled) {
			markAsDisplayed({ characterId });
		} else if (needShowSentryPrivacyModal) {
			show();
		}

		isActiveRef.current = isActive;
	}, [
		characterId,
		show,
		needShowSentryPrivacyModal,
		isActive,
		markAsDisplayed,
		isEnabled,
	]);
}
