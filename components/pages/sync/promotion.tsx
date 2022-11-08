import React from "react";
import Link from "next/link";
import { Text } from "@mantine/core";

import Image from "@/components/common/Image";

import imageUrl from "@/public/images/sync/promotion/banner.png";

const STORAGE_KEY = "promotion:sync-20221105-1";

export function Promotion() {
	const [isClosed, setIsClosed] = React.useState(true);

	const hidePromotion = React.useCallback(
		({ hideImmediately }: { hideImmediately: boolean }) => {
			if (hideImmediately) {
				setIsClosed(true);
			}
			window.localStorage.setItem(STORAGE_KEY, "true");
		},
		[setIsClosed]
	);

	React.useEffect(() => {
		setIsClosed(window.localStorage.getItem(STORAGE_KEY) === "true");
	}, []);

	if (isClosed) {
		return null;
	}

	return (
		<Link
			href="/sync"
			className="block mt-12px mb-24px mx-16px cursor-pointer relative aspect-728/120"
			onClick={() => hidePromotion({ hideImmediately: false })}
		>
			<Image src={imageUrl} fill placeholder="empty" />

			<button
				onClick={(event) => {
					event.preventDefault();
					hidePromotion({ hideImmediately: true });
				}}
				className="bg-white bg-opacity-0 hover:bg-opacity-10 absolute right-12/728 top-12/120 p-4px rounded-full border-none cursor-pointer"
			>
				<Text className="i-csb:close text-white text-24px" />
			</button>
		</Link>
	);
}
