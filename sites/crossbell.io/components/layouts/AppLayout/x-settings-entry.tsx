import React from "react";
import { Button } from "@mantine/core";
import { GearIcon } from "@crossbell/ui";
import {
	showXSettingsModal,
	useAccountCharacter,
} from "@crossbell/connect-kit";

export function XSettingsEntry() {
	const character = useAccountCharacter();

	if (!character) return null;

	return (
		<Button
			variant="subtle"
			color="gray"
			size="md"
			radius="md"
			leftIcon={<GearIcon color="dark" className="text-24px" />}
			className="text-[#082135] w-full"
			onClick={showXSettingsModal}
		>
			xSettings
		</Button>
	);
}
