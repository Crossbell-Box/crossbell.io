import React from "react";
import Link from "next/link";
import { Text } from "@mantine/core";

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
			className="block mt-12px mb-24px mx-16px p-24px bg-[#1A1A1A] relative z-1 text-white rounded-20px cursor-pointer"
			onClick={() => hidePromotion({ hideImmediately: false })}
		>
			<button
				onClick={(event) => {
					event.preventDefault();
					hidePromotion({ hideImmediately: true });
				}}
				className="bg-white bg-opacity-0 hover:bg-opacity-10 absolute right-12px top-12px p-4px rounded-full border-none cursor-pointer"
			>
				<Text className="i-csb:close text-white text-24px" />
			</button>

			<div className="flex items-center">
				<div className="rounded-full bg-white w-4px h-4px" />
				<div className="rounded-full bg-white w-8px h-8px mx-8px" />
				<div className="rounded-full bg-white w-4px h-4px" />
			</div>

			<div className="flex items-center font-600 text-16px mt-16px mb-4px">
				<span>New Promotion</span>
				<i className="w-1px h-24px bg-white mx-4px" />
				<span>xSync Achievement</span>
			</div>

			<div className="text-14px font-300 text-[#E9E9E9]">
				xSync supports more platforms, sync to get your achievement now!!!
			</div>
		</Link>
	);
}
