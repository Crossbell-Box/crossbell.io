import { Popover, UnstyledButton } from "@mantine/core";

import dynamic from "next/dynamic";
// @ts-ignore
const Picker = dynamic(() => import("@emoji-mart/react"));

export default function EmojiPicker({
	onEmojiSelect,
}: {
	onEmojiSelect: (emoji: string) => void;
}) {
	const handleEmojiSelect = (emoji: any) => {
		// console.log(emoji);
		onEmojiSelect(emoji.native);
	};

	return (
		<Popover
			width={375}
			position="bottom"
			shadow="md"
			withinPortal
			classNames={{
				dropdown: "p-0 bg-transparent b-0",
			}}
		>
			<Popover.Target>
				<UnstyledButton
					className="text-2xl grayscale-100 hover:grayscale-0"
					aria-label="Insert emoji"
				>
					😂
				</UnstyledButton>
			</Popover.Target>
			<Popover.Dropdown>
				<Picker
					// @ts-ignore
					data={async () => {
						const response = await fetch(
							"https://cdn.jsdelivr.net/npm/@emoji-mart/data"
						);

						return response.json();
					}}
					onEmojiSelect={handleEmojiSelect}
				/>
			</Popover.Dropdown>
		</Popover>
	);
}
