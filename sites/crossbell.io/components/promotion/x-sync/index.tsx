import React from "react";
import Link from "next/link";
import { Text } from "@mantine/core";

import { Image } from "~/shared/components/image";
import config from "~/shared/config";

import { usePromotionState } from "../use-promotion-state";
import imageUrl from "./banner.png";

const STORAGE_KEY = "promotion:sync-20221105-1";

export function XSyncPromotion() {
	const { isClosed, hidePromotion } = usePromotionState(STORAGE_KEY);

	if (isClosed) {
		return null;
	}

	return (
		<Link
			href={config.xSync.domain}
			target="_blank"
			className="block mt-12px mb-24px mx-16px cursor-pointer relative aspect-728/120"
			onClick={() => hidePromotion({ hideImmediately: false })}
		>
			<Image src={imageUrl} fill placeholder="empty" />

			<button
				onClick={(event) => {
					event.preventDefault();
					hidePromotion({ hideImmediately: true });
				}}
				className="bg-white bg-opacity-0 hover:bg-opacity-10 absolute right-12/728 top-12/120 p-4px rounded-lg border-none cursor-pointer"
			>
				<Text className="i-csb:close text-white text-24px" />
			</button>
		</Link>
	);
}
