import React from "react";
import { Text } from "@mantine/core";
import {
	useAccountCharacter,
	useConnectModal,
	useOpSignSettingsModal,
} from "@crossbell/connect-kit";

import { Image } from "~/shared/components/image";

import { usePromotionState } from "../use-promotion-state";
import imageUrl from "./banner.png";

const STORAGE_KEY = "promotion:op-sign-20230221-1";

export function OPSignPromotion() {
	const { isClosed, hidePromotion } = usePromotionState(STORAGE_KEY);
	const character = useAccountCharacter();
	const opSignSettingsModal = useOpSignSettingsModal();
	const connectModal = useConnectModal();

	if (isClosed) {
		return null;
	}

	return (
		<div
			className="block mt-12px mb-24px mx-16px cursor-pointer relative aspect-728/120"
			onClick={() => {
				if (character) {
					opSignSettingsModal.show(character);
				} else {
					connectModal.show();
				}
			}}
		>
			<Image src={imageUrl} fill placeholder="empty" />

			<button
				onClick={(event) => {
					event.stopPropagation();
					hidePromotion({ hideImmediately: true });
				}}
				className="bg-white bg-opacity-0 hover:bg-opacity-10 absolute right-12/728 top-12/120 p-2px rounded-lg border-none cursor-pointer"
			>
				<Text className="i-csb:close text-white text-24px" />
			</button>
		</div>
	);
}
